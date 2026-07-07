
-- PUKO AI Orchestrator System Tables
-- Departments: HR, Physical Security, IT, Operations
CREATE TABLE IF NOT EXISTS departments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  name_tr text NOT NULL,
  code text NOT NULL UNIQUE,
  department_type text NOT NULL CHECK (department_type IN ('hr', 'physical_security', 'it', 'operations', 'management')),
  agent_name text NOT NULL,
  agent_status text NOT NULL DEFAULT 'active' CHECK (agent_status IN ('active', 'standby', 'offline', 'error')),
  puko_cycle_stage text NOT NULL DEFAULT 'planla' CHECK (puko_cycle_stage IN ('planla', 'uygula', 'kontrol_et', 'onlem_al')),
  config jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_departments" ON departments FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_departments" ON departments FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_departments" ON departments FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_departments" ON departments FOR DELETE TO authenticated USING (true);

-- Core Policies: AI-generated JSON rules per department
CREATE TABLE IF NOT EXISTS core_policies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id uuid REFERENCES departments(id) ON DELETE CASCADE,
  policy_name text NOT NULL,
  policy_type text NOT NULL CHECK (policy_type IN ('access_control', 'authentication', 'data_validation', 'threat_response', 'certification')),
  puko_stage text NOT NULL CHECK (puko_stage IN ('planla', 'uygula', 'kontrol_et', 'onlem_al')),
  rules jsonb NOT NULL DEFAULT '{}',
  ai_generated boolean DEFAULT true,
  confidence_score numeric(5,2) DEFAULT 95.00,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE core_policies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_core_policies" ON core_policies FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_core_policies" ON core_policies FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_core_policies" ON core_policies FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_core_policies" ON core_policies FOR DELETE TO authenticated USING (true);

-- Incident Alerts: Real-time threat and anomaly alerts
CREATE TABLE IF NOT EXISTS incident_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
  alert_type text NOT NULL CHECK (alert_type IN ('ip_blocked', 'user_suspended', 'brute_force', 'anomaly', 'certificate_fraud', 'unauthorized_access', 'data_breach')),
  severity text NOT NULL CHECK (severity IN ('critical', 'high', 'medium', 'low', 'info')),
  title text NOT NULL,
  description text,
  source_ip text,
  affected_user text,
  auto_action_taken text,
  ai_confidence numeric(5,2),
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open', 'investigating', 'resolved', 'false_positive')),
  metadata jsonb DEFAULT '{}',
  detected_at timestamptz DEFAULT now(),
  resolved_at timestamptz
);

ALTER TABLE incident_alerts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_incident_alerts" ON incident_alerts FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_incident_alerts" ON incident_alerts FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_incident_alerts" ON incident_alerts FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_incident_alerts" ON incident_alerts FOR DELETE TO authenticated USING (true);

-- Realtime Logs: SIEM-style log entries per department
CREATE TABLE IF NOT EXISTS realtime_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id uuid REFERENCES departments(id) ON DELETE SET NULL,
  log_level text NOT NULL CHECK (log_level IN ('debug', 'info', 'warning', 'error', 'critical')),
  source text NOT NULL,
  event_type text NOT NULL,
  message text NOT NULL,
  user_agent text,
  ip_address text,
  sopon_score numeric(5,2),
  supon_decision text,
  soft10_token text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE realtime_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_realtime_logs" ON realtime_logs FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_realtime_logs" ON realtime_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_realtime_logs" ON realtime_logs FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_realtime_logs" ON realtime_logs FOR DELETE TO authenticated USING (true);

-- AI Generated UIs: Dynamic panel configurations per department
CREATE TABLE IF NOT EXISTS ai_generated_uis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  department_id uuid REFERENCES departments(id) ON DELETE CASCADE,
  ui_name text NOT NULL,
  ui_type text NOT NULL CHECK (ui_type IN ('form', 'dashboard', 'report', 'alert_panel', 'metrics')),
  schema_definition jsonb NOT NULL DEFAULT '{}',
  layout_config jsonb NOT NULL DEFAULT '{}',
  is_active boolean DEFAULT true,
  version integer DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE ai_generated_uis ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_ai_generated_uis" ON ai_generated_uis FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_ai_generated_uis" ON ai_generated_uis FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_ai_generated_uis" ON ai_generated_uis FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_ai_generated_uis" ON ai_generated_uis FOR DELETE TO authenticated USING (true);

-- Seed initial departments
INSERT INTO departments (name, name_tr, code, department_type, agent_name, puko_cycle_stage, config)
VALUES
  ('Human Resources', 'İnsan Kaynakları', 'HR-001', 'hr', 'HR-Agent v2.1', 'uygula', '{"employees": 142, "active_kyc": 138, "pending_review": 4}'),
  ('Physical Security', 'Fiziksel Güvenlik', 'PS-001', 'physical_security', 'PhySec-Agent v1.8', 'kontrol_et', '{"zones": 12, "active_sensors": 847, "cameras": 64}'),
  ('Information Technology', 'Bilgi Teknolojileri', 'IT-001', 'it', 'IT-Agent v3.0', 'onlem_al', '{"servers": 28, "endpoints": 412, "active_threats": 3}'),
  ('Operations', 'Operasyon', 'OPS-001', 'operations', 'Ops-Agent v1.5', 'planla', '{"workflows": 24, "active_tasks": 67, "completion_rate": 94}')
ON CONFLICT (code) DO NOTHING;

-- Seed sample incident alerts
INSERT INTO incident_alerts (alert_type, severity, title, description, source_ip, auto_action_taken, ai_confidence, status)
VALUES
  ('brute_force', 'critical', 'Brute-Force Saldırısı Tespit Edildi', '5 dakikada 150+ başarısız giriş denemesi', '185.220.101.45', 'IP engellendi, kullanıcı askıya alındı', 98.7, 'resolved'),
  ('anomaly', 'high', 'Anormal Sertifika Üretimi', 'Tek oturumda 23 sertifika üretimi tespit edildi', '10.0.0.147', 'Oturum kapatıldı, inceleme başlatıldı', 94.2, 'investigating'),
  ('unauthorized_access', 'high', 'Yetkisiz Bölge Erişim Girişimi', 'Güvenlik bölgesi B-4 yetkisiz erişim denemesi', NULL, 'Kapı kilitleme protokolü aktifleştirildi', 99.1, 'resolved'),
  ('ip_blocked', 'medium', 'Şüpheli IP Engellendi', 'Tor exit node üzerinden giriş denemesi', '193.32.127.88', 'IP otomatik engellendi', 87.5, 'open')
ON CONFLICT DO NOTHING;
