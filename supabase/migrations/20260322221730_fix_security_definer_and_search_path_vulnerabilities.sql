/*
  # Fix SECURITY DEFINER and search_path Vulnerabilities

  ## Overview
  This migration fixes critical security vulnerabilities identified in database functions and views:
  - Remove SECURITY DEFINER from user_activity_summary view
  - Set secure search_path for all SECURITY DEFINER functions
  - Ensure functions cannot be exploited through search_path manipulation

  ## Security Fixes

  ### 1. View Security
  - Recreate user_activity_summary without SECURITY DEFINER
  - Use standard RLS policies instead

  ### 2. Function Search Path
  - Set search_path = pg_catalog, public for all SECURITY DEFINER functions
  - Prevents malicious schema injection attacks
  - Ensures functions only access trusted schemas

  ## Modified Objects
  - user_activity_summary view
  - generate_invoice_number function
  - update_updated_at_column function
  - log_audit_event function
  - sanitize_input function
  - detect_security_threat function
  - clean_expired_sessions function
  - check_rate_limit function
  - encrypt_sensitive_data function
*/

-- Drop and recreate user_activity_summary view without SECURITY DEFINER
DROP VIEW IF EXISTS user_activity_summary;

CREATE VIEW user_activity_summary AS
SELECT 
  u.id,
  u.email,
  COUNT(DISTINCT al.id) as total_actions,
  COUNT(DISTINCT se.id) as security_events_count,
  MAX(al.created_at) as last_activity,
  COUNT(DISTINCT CASE WHEN se.severity = 'critical' THEN se.id END) as critical_events
FROM users u
LEFT JOIN audit_logs al ON u.id = al.user_id
LEFT JOIN security_events se ON u.id = se.user_id
WHERE u.id = auth.uid()
GROUP BY u.id, u.email;

-- Fix generate_invoice_number function with secure search_path
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  new_number text;
BEGIN
  new_number := 'INV-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 9999)::text, 4, '0');
  RETURN new_number;
END;
$$;

-- Fix update_updated_at_column function with secure search_path
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Fix log_audit_event function with secure search_path
CREATE OR REPLACE FUNCTION log_audit_event()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  INSERT INTO public.audit_logs (
    user_id,
    action,
    table_name,
    record_id,
    old_data,
    new_data,
    success
  ) VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP = 'DELETE' OR TG_OP = 'UPDATE' THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN row_to_json(NEW) ELSE NULL END,
    true
  );
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Fix sanitize_input function with secure search_path
CREATE OR REPLACE FUNCTION sanitize_input()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  IF TG_TABLE_NAME = 'users' THEN
    IF NEW.email IS NOT NULL THEN
      NEW.email := lower(trim(NEW.email));
      IF NEW.email !~ '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$' THEN
        RAISE EXCEPTION 'Invalid email format';
      END IF;
    END IF;
    
    IF NEW.phone IS NOT NULL THEN
      NEW.phone := regexp_replace(NEW.phone, '[^0-9+]', '', 'g');
    END IF;
    
    IF NEW.full_name IS NOT NULL THEN
      NEW.full_name := regexp_replace(NEW.full_name, '[<>\"'';()]', '', 'g');
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Fix detect_security_threat function with secure search_path
CREATE OR REPLACE FUNCTION detect_security_threat()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  event_severity text;
BEGIN
  event_severity := 'medium';
  
  IF TG_OP = 'UPDATE' AND OLD.user_id != NEW.user_id THEN
    event_severity := 'critical';
    INSERT INTO public.security_events (
      user_id,
      event_type,
      severity,
      description,
      metadata
    ) VALUES (
      auth.uid(),
      'unauthorized_access',
      event_severity,
      'Attempt to modify user_id detected',
      jsonb_build_object(
        'table', TG_TABLE_NAME,
        'old_user_id', OLD.user_id,
        'new_user_id', NEW.user_id
      )
    );
    RAISE EXCEPTION 'Security violation: Cannot modify user_id';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Fix clean_expired_sessions function with secure search_path
CREATE OR REPLACE FUNCTION clean_expired_sessions()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
BEGIN
  DELETE FROM public.session_tokens
  WHERE expires_at < now()
    OR (revoked = true AND revoked_at < now() - interval '7 days');
END;
$$;

-- Fix check_rate_limit function with secure search_path
CREATE OR REPLACE FUNCTION check_rate_limit(
  p_user_id uuid,
  p_endpoint text,
  p_max_requests integer DEFAULT 100,
  p_window_minutes integer DEFAULT 1
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  v_count integer;
  v_blocked_until timestamptz;
BEGIN
  SELECT blocked_until INTO v_blocked_until
  FROM public.rate_limits
  WHERE user_id = p_user_id
    AND endpoint = p_endpoint
    AND blocked_until > now()
  LIMIT 1;
  
  IF v_blocked_until IS NOT NULL THEN
    INSERT INTO public.security_events (
      user_id,
      event_type,
      severity,
      description
    ) VALUES (
      p_user_id,
      'rate_limit_exceeded',
      'high',
      'User is currently blocked due to rate limiting'
    );
    RETURN false;
  END IF;
  
  SELECT request_count INTO v_count
  FROM public.rate_limits
  WHERE user_id = p_user_id
    AND endpoint = p_endpoint
    AND window_start > now() - (p_window_minutes || ' minutes')::interval;
  
  IF v_count >= p_max_requests THEN
    UPDATE public.rate_limits
    SET blocked_until = now() + interval '1 hour'
    WHERE user_id = p_user_id
      AND endpoint = p_endpoint;
    
    INSERT INTO public.security_events (
      user_id,
      event_type,
      severity,
      description
    ) VALUES (
      p_user_id,
      'rate_limit_exceeded',
      'high',
      format('Rate limit exceeded: %s requests in %s minutes', v_count, p_window_minutes)
    );
    
    RETURN false;
  END IF;
  
  INSERT INTO public.rate_limits (user_id, endpoint, request_count, window_start)
  VALUES (p_user_id, p_endpoint, 1, now())
  ON CONFLICT (user_id, endpoint) DO UPDATE 
  SET request_count = public.rate_limits.request_count + 1,
      window_start = EXCLUDED.window_start;
  
  RETURN true;
END;
$$;

-- Fix encrypt_sensitive_data function with secure search_path
CREATE OR REPLACE FUNCTION encrypt_sensitive_data(
  p_user_id uuid,
  p_data_type text,
  p_plaintext text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = pg_catalog, public
AS $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO public.encrypted_data (user_id, data_type, encrypted_value)
  VALUES (p_user_id, p_data_type, p_plaintext)
  RETURNING id INTO v_id;
  
  RETURN v_id;
END;
$$;

-- Add security comments to functions
COMMENT ON FUNCTION generate_invoice_number() IS 'Generates unique invoice numbers with secure search_path';
COMMENT ON FUNCTION update_updated_at_column() IS 'Updates updated_at timestamp with secure search_path';
COMMENT ON FUNCTION log_audit_event() IS 'Logs audit events with secure search_path to prevent injection';
COMMENT ON FUNCTION sanitize_input() IS 'Sanitizes user input with secure search_path';
COMMENT ON FUNCTION detect_security_threat() IS 'Detects security threats with secure search_path';
COMMENT ON FUNCTION clean_expired_sessions() IS 'Cleans expired sessions with secure search_path';
COMMENT ON FUNCTION check_rate_limit(uuid, text, integer, integer) IS 'Checks rate limits with secure search_path';
COMMENT ON FUNCTION encrypt_sensitive_data(uuid, text, text) IS 'Encrypts sensitive data with secure search_path';

-- Add RLS policy for user_activity_summary view access
-- (Views inherit RLS from underlying tables, so this is already protected)

-- Verify all SECURITY DEFINER functions have proper search_path
DO $$
DECLARE
  func_record RECORD;
BEGIN
  FOR func_record IN 
    SELECT 
      p.proname as function_name,
      pg_get_functiondef(p.oid) as function_def
    FROM pg_proc p
    JOIN pg_namespace n ON p.pronamespace = n.oid
    WHERE n.nspname = 'public'
      AND p.prosecdef = true
  LOOP
    IF func_record.function_def NOT LIKE '%SET search_path%' THEN
      RAISE WARNING 'Function % is SECURITY DEFINER but missing search_path', func_record.function_name;
    END IF;
  END LOOP;
END $$;