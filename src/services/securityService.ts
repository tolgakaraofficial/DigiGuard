import { supabase } from './supabaseClient';

export interface SecurityEvent {
  eventType: 'failed_login' | 'suspicious_activity' | 'rate_limit_exceeded' | 'unauthorized_access' | 'data_breach_attempt' | 'sql_injection_attempt' | 'xss_attempt' | 'invalid_token' | 'session_hijack';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  metadata?: Record<string, any>;
}

export const securityService = {
  sanitizeInput(input: string): string {
    if (!input) return '';

    return input
      .replace(/[<>]/g, '')
      .replace(/javascript:/gi, '')
      .replace(/on\w+=/gi, '')
      .replace(/script/gi, '')
      .replace(/eval\(/gi, '')
      .replace(/expression\(/gi, '')
      .trim();
  },

  sanitizeEmail(email: string): string {
    if (!email) return '';

    const sanitized = email.toLowerCase().trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(sanitized)) {
      throw new Error('Invalid email format');
    }

    return sanitized;
  },

  sanitizePhone(phone: string): string {
    if (!phone) return '';

    return phone.replace(/[^0-9+]/g, '');
  },

  detectSQLInjection(input: string): boolean {
    const sqlPatterns = [
      /(\b(SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE)\b)/gi,
      /(union.*select)/gi,
      /(;\s*drop\s+table)/gi,
      /(-{2}|\/\*|\*\/)/g,
      /(\bOR\b.*=.*)/gi,
      /('|"|;|--)/g
    ];

    return sqlPatterns.some(pattern => pattern.test(input));
  },

  detectXSS(input: string): boolean {
    const xssPatterns = [
      /<script[^>]*>.*?<\/script>/gi,
      /javascript:/gi,
      /on\w+\s*=/gi,
      /<iframe[^>]*>/gi,
      /<object[^>]*>/gi,
      /<embed[^>]*>/gi,
      /eval\(/gi,
      /expression\(/gi
    ];

    return xssPatterns.some(pattern => pattern.test(input));
  },

  validateInput(input: string, fieldName: string): string {
    if (this.detectSQLInjection(input)) {
      this.logSecurityEvent({
        eventType: 'sql_injection_attempt',
        severity: 'critical',
        description: `SQL injection attempt detected in ${fieldName}`,
        metadata: { fieldName, input: input.substring(0, 100) }
      });
      throw new Error('Invalid input detected');
    }

    if (this.detectXSS(input)) {
      this.logSecurityEvent({
        eventType: 'xss_attempt',
        severity: 'critical',
        description: `XSS attempt detected in ${fieldName}`,
        metadata: { fieldName, input: input.substring(0, 100) }
      });
      throw new Error('Invalid input detected');
    }

    return this.sanitizeInput(input);
  },

  async logSecurityEvent(event: SecurityEvent): Promise<void> {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      await supabase
        .from('security_events')
        .insert({
          user_id: user?.id || null,
          event_type: event.eventType,
          severity: event.severity,
          description: event.description,
          metadata: event.metadata || {},
          resolved: false
        });
    } catch (error) {
      console.error('Failed to log security event:', error);
    }
  },

  async checkRateLimit(endpoint: string, maxRequests: number = 100): Promise<boolean> {
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        return false;
      }

      const { data, error } = await supabase.rpc('check_rate_limit', {
        p_user_id: user.id,
        p_endpoint: endpoint,
        p_max_requests: maxRequests,
        p_window_minutes: 1
      });

      if (error) {
        console.error('Rate limit check failed:', error);
        return true;
      }

      return data === true;
    } catch (error) {
      console.error('Rate limit error:', error);
      return true;
    }
  },

  async createSession(ipAddress?: string, userAgent?: string): Promise<string> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    const tokenHash = this.generateSecureToken();
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const { data, error } = await supabase
      .from('session_tokens')
      .insert({
        user_id: user.id,
        token_hash: tokenHash,
        ip_address: ipAddress,
        user_agent: userAgent,
        expires_at: expiresAt.toISOString()
      })
      .select()
      .maybeSingle();

    if (error) {
      throw new Error('Failed to create session');
    }

    return tokenHash;
  },

  async revokeSession(tokenHash: string): Promise<void> {
    const { error } = await supabase
      .from('session_tokens')
      .update({
        revoked: true,
        revoked_at: new Date().toISOString()
      })
      .eq('token_hash', tokenHash);

    if (error) {
      throw new Error('Failed to revoke session');
    }
  },

  async validateSession(tokenHash: string): Promise<boolean> {
    const { data, error } = await supabase
      .from('session_tokens')
      .select('*')
      .eq('token_hash', tokenHash)
      .eq('revoked', false)
      .gt('expires_at', new Date().toISOString())
      .maybeSingle();

    if (error || !data) {
      return false;
    }

    await supabase
      .from('session_tokens')
      .update({ last_activity: new Date().toISOString() })
      .eq('id', data.id);

    return true;
  },

  generateSecureToken(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  },

  async encryptSensitiveData(dataType: string, plaintext: string): Promise<string> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      throw new Error('User not authenticated');
    }

    const { data, error } = await supabase.rpc('encrypt_sensitive_data', {
      p_user_id: user.id,
      p_data_type: dataType,
      p_plaintext: plaintext
    });

    if (error) {
      throw new Error('Failed to encrypt data');
    }

    return data;
  },

  async getAuditLogs(limit: number = 50): Promise<any[]> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return [];
    }

    const { data, error } = await supabase
      .from('audit_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Failed to fetch audit logs:', error);
      return [];
    }

    return data || [];
  },

  async getSecurityEvents(limit: number = 50): Promise<any[]> {
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return [];
    }

    const { data, error } = await supabase
      .from('security_events')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) {
      console.error('Failed to fetch security events:', error);
      return [];
    }

    return data || [];
  },

  hashPassword(password: string): string {
    return btoa(password);
  },

  validatePassword(password: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      errors.push('Password must contain at least one special character');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  },

  isSecureContext(): boolean {
    return window.isSecureContext && window.location.protocol === 'https:';
  },

  async cleanExpiredSessions(): Promise<void> {
    try {
      await supabase.rpc('clean_expired_sessions');
    } catch (error) {
      console.error('Failed to clean expired sessions:', error);
    }
  }
};
