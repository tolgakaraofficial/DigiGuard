/*
# Corporate Service Architecture (Kurumsal Servis Mimarisi)

## Purpose
Implements the corporate service architecture for DigiGuard — a catalog of enterprise-grade
services (KYC verification, blockchain certification, AI deepfake detection, API gateway access),
SLA monitoring, tenant subscriptions, and API key management. This bridges the existing PUKO AI
Orchestrator and registration pipeline with a structured service layer for corporate clients.

## New Tables

### 1. `corporate_services` — Service Catalog
Master catalog of all services offered to corporate clients.
- `id` (uuid PK)
- `service_code` (text, unique) — e.g. 'KYC_VERIFY', 'DEEPFAKE_SCAN', 'BLOCKCHAIN_CERT'
- `service_name` (text) — Display name (Turkish)
- `service_description` (text) — What the service does
- `service_category` (text) — 'identity' | 'security' | 'certification' | 'ai_analysis' | 'integration' | 'monitoring'
- `layer` (text) — Which AI layer handles it: 'SOPON' | 'SUPON' | 'SOFT10' | 'CROSS_LAYER'
- `base_price_monthly` (numeric) — Base monthly price in USD
- `price_per_call` (numeric) — Price per API call in USD
- `is_active` (boolean, default true)
- `created_at` (timestamptz)

### 2. `service_tiers` — Subscription Tiers
Defines the service tier levels (Basic, Professional, Enterprise, Custom).
- `id` (uuid PK)
- `tier_code` (text, unique) — 'BASIC' | 'PROFESSIONAL' | 'ENTERPRISE' | 'CUSTOM'
- `tier_name` (text) — Display name
- `tier_description` (text)
- `max_api_calls_per_month` (integer) — API call limit
- `max_concurrent_requests` (integer) — Concurrency limit
- `sla_uptime_percent` (numeric) — Guaranteed uptime (e.g. 99.9)
- `sla_response_time_ms` (integer) — Guaranteed response time in ms
- `sla_support_hours` (text) — Support coverage (e.g. '24/7', 'Business Hours')
- `monthly_price_usd` (numeric)
- `features` (jsonb) — List of included features
- `is_active` (boolean, default true)
- `created_at` (timestamptz)

### 3. `corporate_tenants` — Corporate Client Registry
Corporate clients/organizations registered for DigiGuard services.
- `id` (uuid PK)
- `company_name` (text, not null)
- `tax_number` (text)
- `contact_email` (text)
- `contact_phone` (text)
- `tier_id` (uuid FK -> service_tiers.id)
- `subscription_status` (text) — 'active' | 'suspended' | 'trial' | 'expired' | 'pending'
- `api_key` (text, unique) — Generated API key for gateway access
- `api_key_hash` (text) — SHA-256 hash of the API key
- `rate_limit_per_minute` (integer, default 100)
- `total_api_calls_this_month` (integer, default 0)
- `last_api_call_at` (timestamptz)
- `onboarding_date` (timestamptz)
- `contract_end_date` (timestamptz)
- `metadata` (jsonb) — Additional flexible data
- `created_at` (timestamptz)

### 4. `tenant_service_subscriptions` — Service-to-Tenant Mapping
Maps which services each corporate tenant is subscribed to.
- `id` (uuid PK)
- `tenant_id` (uuid FK -> corporate_tenants.id ON DELETE CASCADE)
- `service_id` (uuid FK -> corporate_services.id ON DELETE CASCADE)
- `status` (text) — 'active' | 'suspended' | 'pending_activation'
- `monthly_quota` (integer) — Monthly call quota for this service
- `calls_this_month` (integer, default 0)
- `last_called_at` (timestamptz)
- `activated_at` (timestamptz)
- `created_at` (timestamptz)
- UNIQUE constraint on (tenant_id, service_id)

### 5. `sla_metrics` — SLA Monitoring & Tracking
Tracks SLA compliance metrics per tenant per service.
- `id` (uuid PK)
- `tenant_id` (uuid FK -> corporate_tenants.id ON DELETE CASCADE)
- `service_id` (uuid FK -> corporate_services.id ON DELETE CASCADE)
- `metric_date` (date, not null) — The day these metrics cover
- `total_requests` (integer, default 0)
- `successful_requests` (integer, default 0)
- `failed_requests` (integer, default 0)
- `avg_response_time_ms` (numeric)
- `max_response_time_ms` (integer)
- `uptime_percent` (numeric) — Calculated uptime for the day
- `sla_breached` (boolean, default false)
- `incident_count` (integer, default 0)
- `created_at` (timestamptz)
- UNIQUE constraint on (tenant_id, service_id, metric_date)

### 6. `api_gateway_logs` — API Gateway Request Log
Logs every API request through the DigiGuard gateway for audit and monitoring.
- `id` (uuid PK)
- `tenant_id` (uuid FK -> corporate_tenants.id ON DELETE CASCADE)
- `service_id` (uuid FK -> corporate_services.id ON DELETE CASCADE)
- `endpoint` (text) — The API endpoint called
- `method` (text) — HTTP method (GET, POST, etc.)
- `status_code` (integer) — HTTP response status
- `response_time_ms` (integer)
- `request_ip` (text)
- `request_size_bytes` (integer)
- `response_size_bytes` (integer)
- `error_message` (text)
- `sopon_processed` (boolean, default false) — Whether SOPON layer processed it
- `supon_decision` (text) — SUPON layer decision if applicable
- `soft10_certified` (boolean, default false) — Whether SOFT10 certified the response
- `created_at` (timestamptz)

## Security (RLS)
All tables have RLS enabled. Since the app uses anon+authenticated pattern (no dedicated sign-in
for the dashboard panels), policies allow both `anon` and `authenticated` roles to read and write.
This is consistent with the existing `registration_pipeline` and PUKO orchestrator tables.

## Important Notes
1. Seed data includes 6 corporate services, 4 service tiers, and 3 sample corporate tenants
2. API keys are generated as `dg_sk_` prefixed strings with random hex suffixes
3. SLA metrics table is designed for daily aggregation — one row per tenant+service+day
4. The API gateway log table feeds the SIEM-style monitoring in the IT Panel
5. All foreign keys use ON DELETE CASCADE to maintain referential integrity
*/

-- ============================================================
-- 1. corporate_services — Service Catalog
-- ============================================================
CREATE TABLE IF NOT EXISTS corporate_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_code text UNIQUE NOT NULL,
  service_name text NOT NULL,
  service_description text,
  service_category text NOT NULL DEFAULT 'identity',
  layer text NOT NULL DEFAULT 'CROSS_LAYER',
  base_price_monthly numeric(10,2) DEFAULT 0,
  price_per_call numeric(10,4) DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE corporate_services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_corporate_services" ON corporate_services;
CREATE POLICY "anon_select_corporate_services" ON corporate_services FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_corporate_services" ON corporate_services;
CREATE POLICY "anon_insert_corporate_services" ON corporate_services FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_corporate_services" ON corporate_services;
CREATE POLICY "anon_update_corporate_services" ON corporate_services FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_corporate_services" ON corporate_services;
CREATE POLICY "anon_delete_corporate_services" ON corporate_services FOR DELETE
  TO anon, authenticated USING (true);

-- ============================================================
-- 2. service_tiers — Subscription Tiers
-- ============================================================
CREATE TABLE IF NOT EXISTS service_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tier_code text UNIQUE NOT NULL,
  tier_name text NOT NULL,
  tier_description text,
  max_api_calls_per_month integer DEFAULT 10000,
  max_concurrent_requests integer DEFAULT 10,
  sla_uptime_percent numeric(5,2) DEFAULT 99.9,
  sla_response_time_ms integer DEFAULT 500,
  sla_support_hours text DEFAULT 'Business Hours',
  monthly_price_usd numeric(10,2) DEFAULT 0,
  features jsonb DEFAULT '[]'::jsonb,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE service_tiers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_service_tiers" ON service_tiers;
CREATE POLICY "anon_select_service_tiers" ON service_tiers FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_service_tiers" ON service_tiers;
CREATE POLICY "anon_insert_service_tiers" ON service_tiers FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_service_tiers" ON service_tiers;
CREATE POLICY "anon_update_service_tiers" ON service_tiers FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_service_tiers" ON service_tiers;
CREATE POLICY "anon_delete_service_tiers" ON service_tiers FOR DELETE
  TO anon, authenticated USING (true);

-- ============================================================
-- 3. corporate_tenants — Corporate Client Registry
-- ============================================================
CREATE TABLE IF NOT EXISTS corporate_tenants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  tax_number text,
  contact_email text,
  contact_phone text,
  tier_id uuid REFERENCES service_tiers(id) ON DELETE SET NULL,
  subscription_status text DEFAULT 'pending',
  api_key text UNIQUE,
  api_key_hash text,
  rate_limit_per_minute integer DEFAULT 100,
  total_api_calls_this_month integer DEFAULT 0,
  last_api_call_at timestamptz,
  onboarding_date timestamptz,
  contract_end_date timestamptz,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE corporate_tenants ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_corporate_tenants" ON corporate_tenants;
CREATE POLICY "anon_select_corporate_tenants" ON corporate_tenants FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_corporate_tenants" ON corporate_tenants;
CREATE POLICY "anon_insert_corporate_tenants" ON corporate_tenants FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_corporate_tenants" ON corporate_tenants;
CREATE POLICY "anon_update_corporate_tenants" ON corporate_tenants FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_corporate_tenants" ON corporate_tenants;
CREATE POLICY "anon_delete_corporate_tenants" ON corporate_tenants FOR DELETE
  TO anon, authenticated USING (true);

-- ============================================================
-- 4. tenant_service_subscriptions — Service-to-Tenant Mapping
-- ============================================================
CREATE TABLE IF NOT EXISTS tenant_service_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES corporate_tenants(id) ON DELETE CASCADE,
  service_id uuid NOT NULL REFERENCES corporate_services(id) ON DELETE CASCADE,
  status text DEFAULT 'pending_activation',
  monthly_quota integer DEFAULT 1000,
  calls_this_month integer DEFAULT 0,
  last_called_at timestamptz,
  activated_at timestamptz,
  created_at timestamptz DEFAULT now(),
  UNIQUE(tenant_id, service_id)
);

ALTER TABLE tenant_service_subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_tenant_subscriptions" ON tenant_service_subscriptions;
CREATE POLICY "anon_select_tenant_subscriptions" ON tenant_service_subscriptions FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_tenant_subscriptions" ON tenant_service_subscriptions;
CREATE POLICY "anon_insert_tenant_subscriptions" ON tenant_service_subscriptions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_tenant_subscriptions" ON tenant_service_subscriptions;
CREATE POLICY "anon_update_tenant_subscriptions" ON tenant_service_subscriptions FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_tenant_subscriptions" ON tenant_service_subscriptions;
CREATE POLICY "anon_delete_tenant_subscriptions" ON tenant_service_subscriptions FOR DELETE
  TO anon, authenticated USING (true);

-- ============================================================
-- 5. sla_metrics — SLA Monitoring & Tracking
-- ============================================================
CREATE TABLE IF NOT EXISTS sla_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid NOT NULL REFERENCES corporate_tenants(id) ON DELETE CASCADE,
  service_id uuid NOT NULL REFERENCES corporate_services(id) ON DELETE CASCADE,
  metric_date date NOT NULL,
  total_requests integer DEFAULT 0,
  successful_requests integer DEFAULT 0,
  failed_requests integer DEFAULT 0,
  avg_response_time_ms numeric(10,2),
  max_response_time_ms integer,
  uptime_percent numeric(5,2) DEFAULT 100.0,
  sla_breached boolean DEFAULT false,
  incident_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(tenant_id, service_id, metric_date)
);

ALTER TABLE sla_metrics ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_sla_metrics" ON sla_metrics;
CREATE POLICY "anon_select_sla_metrics" ON sla_metrics FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_sla_metrics" ON sla_metrics;
CREATE POLICY "anon_insert_sla_metrics" ON sla_metrics FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_sla_metrics" ON sla_metrics;
CREATE POLICY "anon_update_sla_metrics" ON sla_metrics FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_sla_metrics" ON sla_metrics;
CREATE POLICY "anon_delete_sla_metrics" ON sla_metrics FOR DELETE
  TO anon, authenticated USING (true);

-- ============================================================
-- 6. api_gateway_logs — API Gateway Request Log
-- ============================================================
CREATE TABLE IF NOT EXISTS api_gateway_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id uuid REFERENCES corporate_tenants(id) ON DELETE CASCADE,
  service_id uuid REFERENCES corporate_services(id) ON DELETE CASCADE,
  endpoint text,
  method text DEFAULT 'GET',
  status_code integer,
  response_time_ms integer,
  request_ip text,
  request_size_bytes integer,
  response_size_bytes integer,
  error_message text,
  sopon_processed boolean DEFAULT false,
  supon_decision text,
  soft10_certified boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE api_gateway_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_api_gateway_logs" ON api_gateway_logs;
CREATE POLICY "anon_select_api_gateway_logs" ON api_gateway_logs FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_api_gateway_logs" ON api_gateway_logs;
CREATE POLICY "anon_insert_api_gateway_logs" ON api_gateway_logs FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_api_gateway_logs" ON api_gateway_logs;
CREATE POLICY "anon_update_api_gateway_logs" ON api_gateway_logs FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_api_gateway_logs" ON api_gateway_logs;
CREATE POLICY "anon_delete_api_gateway_logs" ON api_gateway_logs FOR DELETE
  TO anon, authenticated USING (true);

-- ============================================================
-- Indexes for performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_corporate_services_category ON corporate_services(service_category);
CREATE INDEX IF NOT EXISTS idx_corporate_services_layer ON corporate_services(layer);
CREATE INDEX IF NOT EXISTS idx_corporate_tenants_status ON corporate_tenants(subscription_status);
CREATE INDEX IF NOT EXISTS idx_corporate_tenants_tier ON corporate_tenants(tier_id);
CREATE INDEX IF NOT EXISTS idx_tenant_subscriptions_tenant ON tenant_service_subscriptions(tenant_id);
CREATE INDEX IF NOT EXISTS idx_tenant_subscriptions_service ON tenant_service_subscriptions(service_id);
CREATE INDEX IF NOT EXISTS idx_sla_metrics_tenant_date ON sla_metrics(tenant_id, metric_date);
CREATE INDEX IF NOT EXISTS idx_sla_metrics_breached ON sla_metrics(sla_breached) WHERE sla_breached = true;
CREATE INDEX IF NOT EXISTS idx_api_gateway_logs_tenant ON api_gateway_logs(tenant_id);
CREATE INDEX IF NOT EXISTS idx_api_gateway_logs_created ON api_gateway_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_api_gateway_logs_status ON api_gateway_logs(status_code);

-- ============================================================
-- Seed Data: Service Catalog (6 services)
-- ============================================================
INSERT INTO corporate_services (service_code, service_name, service_description, service_category, layer, base_price_monthly, price_per_call) VALUES
('KYC_VERIFY', 'KYC Kimlik Dogrulama', 'Bireysel ve kurumsal kimlik dogrulama servisi — SOPON filtreleme + SUPON biyometrik analiz', 'identity', 'CROSS_LAYER', 499.00, 0.15),
('DEEPFAKE_SCAN', 'Deepfake Tespit Servisi', 'AI destekli deepfake tespiti — SUPON katmani tarafindan yurutulur, medya dosyalari analiz edilir', 'ai_analysis', 'SUPON', 799.00, 0.25),
('BLOCKCHAIN_CERT', 'Blockchain Sertifikasyon', 'SOFT 10 katmani ile kriptografik JWT/JWS imzali blockchain sertifikasi uretimi', 'certification', 'SOFT10', 999.00, 0.50),
('API_GATEWAY', 'API Gateway Erisimi', 'Kurumsal musteriler icin REST/SOAP/GraphQL API erisimi — rate limiting ve kimlik dogrulama dahil', 'integration', 'SOPON', 299.00, 0.05),
('SIEM_MONITORING', 'SIEM Guvenlik Izleme', 'Gercek zamanli guvenlik olay izleme ve log analizi — SUPON anomali tespiti ile entegre', 'monitoring', 'SUPON', 599.00, 0.10),
('ZERO_TRUST_AUTH', 'Zero-Trust Kimlik Dogrulama', 'Sifir guven modeli ile surekli kimlik dogrulama ve erisim kontrolu — Capraz katman', 'security', 'CROSS_LAYER', 1299.00, 0.30)
ON CONFLICT (service_code) DO NOTHING;

-- ============================================================
-- Seed Data: Service Tiers (4 tiers)
-- ============================================================
INSERT INTO service_tiers (tier_code, tier_name, tier_description, max_api_calls_per_month, max_concurrent_requests, sla_uptime_percent, sla_response_time_ms, sla_support_hours, monthly_price_usd, features) VALUES
('BASIC', 'Temel Paket', 'Kucuk ve orta olcekli isletmeler icin temel DigiGuard servisleri', 10000, 10, 99.5, 1000, 'Is Saatleri (9-18)', 499.00, '["KYC Dogrulama", "Email Destek", "Temel Raporlama", "5 Kullanici"]'::jsonb),
('PROFESSIONAL', 'Profesyonel Paket', 'Buyuyen isletmeler icin gelismis guvenlik ve API erisimi', 100000, 50, 99.9, 500, 'Is Saatleri + Acil 7/24', 1499.00, '["KYC + Deepfake", "API Gateway", "SIEM Izleme", "Oncelikli Destek", "50 Kullanici", "SLA Raporlama"]'::jsonb),
('ENTERPRISE', 'Kurumsal Paket', 'Buyuk kurulular icin tam kapsamli guvenlik ve sertifikasyon', 1000000, 200, 99.99, 200, '7/24 Destek', 4999.00, '["Tum Servisler", "Zero-Trust Auth", "Blockchain Sertifika", "Ozel Entegrasyon", "Sinirsiz Kullanici", "Ozel SLA", "Dedicated Manager"]'::jsonb),
('CUSTOM', 'Ozel Paket', 'Ozel gereksinimleri olan kurulular icin tam ozellestirilebilir cozum', 999999999, 500, 99.999, 100, '7/24 + Dedicated', 0.00, '["Tam Ozellestirme", "On-Premise Secenegi", "Ozel SLA", "Dedicated Infrastructure", "White-label"]'::jsonb)
ON CONFLICT (tier_code) DO NOTHING;

-- ============================================================
-- Seed Data: Corporate Tenants (3 sample tenants)
-- ============================================================
INSERT INTO corporate_tenants (company_name, tax_number, contact_email, contact_phone, tier_id, subscription_status, api_key, rate_limit_per_minute, total_api_calls_this_month, onboarding_date, contract_end_date, metadata) VALUES
('Karprime Technology INC.', 'KRPRM1234567890', 'tech@karprime.com', '+90-212-555-0100', (SELECT id FROM service_tiers WHERE tier_code = 'ENTERPRISE'), 'active', 'dg_sk_karprime_a1b2c3d4e5f6g7h8', 500, 458230, '2025-01-15T00:00:00Z', '2026-12-31T00:00:00Z', '{"sector": "technology", "employees": 250, "contract_type": "annual"}'::jsonb),
('Anadolu Guvenlik A.S.', 'ANGLG9876543210', 'info@anadoluguvenlik.com', '+90-312-555-0200', (SELECT id FROM service_tiers WHERE tier_code = 'PROFESSIONAL'), 'active', 'dg_sk_anadolu_i9j8k7l6m5n4o3p2', 100, 87420, '2025-03-01T00:00:00Z', '2026-08-31T00:00:00Z', '{"sector": "security", "employees": 85, "contract_type": "annual"}'::jsonb),
('Marmara Finans Ltd.', 'MRMRF5678901234', 'ops@marmarafinans.com', '+90-216-555-0300', (SELECT id FROM service_tiers WHERE tier_code = 'BASIC'), 'trial', 'dg_sk_marmara_q1r2s3t4u5v6w7x8', 50, 12450, '2026-06-01T00:00:00Z', '2026-09-01T00:00:00Z', '{"sector": "finance", "employees": 30, "contract_type": "trial"}'::jsonb)
ON CONFLICT DO NOTHING;

-- ============================================================
-- Seed Data: Tenant Service Subscriptions
-- ============================================================
INSERT INTO tenant_service_subscriptions (tenant_id, service_id, status, monthly_quota, calls_this_month, activated_at)
SELECT t.id, s.id, 'active', 100000, FLOOR(RANDOM() * 50000), '2025-01-15T00:00:00Z'
FROM corporate_tenants t, corporate_services s
WHERE t.company_name = 'Karprime Technology INC.' AND s.service_code IN ('KYC_VERIFY', 'DEEPFAKE_SCAN', 'BLOCKCHAIN_CERT', 'API_GATEWAY', 'SIEM_MONITORING', 'ZERO_TRUST_AUTH')
ON CONFLICT (tenant_id, service_id) DO NOTHING;

INSERT INTO tenant_service_subscriptions (tenant_id, service_id, status, monthly_quota, calls_this_month, activated_at)
SELECT t.id, s.id, 'active', 50000, FLOOR(RANDOM() * 30000), '2025-03-01T00:00:00Z'
FROM corporate_tenants t, corporate_services s
WHERE t.company_name = 'Anadolu Guvenlik A.S.' AND s.service_code IN ('KYC_VERIFY', 'DEEPFAKE_SCAN', 'API_GATEWAY', 'SIEM_MONITORING')
ON CONFLICT (tenant_id, service_id) DO NOTHING;

INSERT INTO tenant_service_subscriptions (tenant_id, service_id, status, monthly_quota, calls_this_month, activated_at)
SELECT t.id, s.id, 'active', 10000, FLOOR(RANDOM() * 8000), '2026-06-01T00:00:00Z'
FROM corporate_tenants t, corporate_services s
WHERE t.company_name = 'Marmara Finans Ltd.' AND s.service_code IN ('KYC_VERIFY', 'API_GATEWAY')
ON CONFLICT (tenant_id, service_id) DO NOTHING;

-- ============================================================
-- Seed Data: SLA Metrics (last 7 days for Karprime)
-- ============================================================
INSERT INTO sla_metrics (tenant_id, service_id, metric_date, total_requests, successful_requests, failed_requests, avg_response_time_ms, max_response_time_ms, uptime_percent, sla_breached, incident_count)
SELECT t.id, s.id, CURRENT_DATE - n,
  FLOOR(RANDOM() * 5000 + 3000),
  FLOOR(RANDOM() * 4900 + 2990),
  FLOOR(RANDOM() * 50),
  ROUND((RANDOM() * 200 + 80)::numeric, 2),
  FLOOR(RANDOM() * 500 + 200),
  (99.9 + RANDOM() * 0.099)::numeric(5,2),
  CASE WHEN RANDOM() < 0.05 THEN true ELSE false END,
  CASE WHEN RANDOM() < 0.05 THEN 1 ELSE 0 END
FROM corporate_tenants t, corporate_services s, generate_series(1, 7) AS n
WHERE t.company_name = 'Karprime Technology INC.'
  AND s.service_code IN ('KYC_VERIFY', 'DEEPFAKE_SCAN', 'BLOCKCHAIN_CERT')
ON CONFLICT (tenant_id, service_id, metric_date) DO NOTHING;
