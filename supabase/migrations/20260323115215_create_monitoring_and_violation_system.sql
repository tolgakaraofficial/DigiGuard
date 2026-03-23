/*
  # Kimlik İzleme ve İhlal Tespit Sistemi

  1. Yeni Tablolar
    - `identity_scans`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `scan_type` (text: 'image', 'video', 'audio', 'certificate', 'profile')
      - `scan_status` (text: 'pending', 'scanning', 'completed', 'failed')
      - `sources_scanned` (jsonb: array of scanned sources)
      - `total_sources` (integer: total number of sources)
      - `scanned_sources` (integer: completed scans)
      - `started_at` (timestamptz)
      - `completed_at` (timestamptz)
      - `created_at` (timestamptz)
    
    - `identity_violations`
      - `id` (uuid, primary key)
      - `scan_id` (uuid, foreign key to identity_scans)
      - `user_id` (uuid, foreign key to auth.users)
      - `violation_type` (text: 'unauthorized_image', 'fake_profile', 'identity_theft', 'certificate_fraud', 'deepfake')
      - `severity` (text: 'low', 'medium', 'high', 'critical')
      - `source_platform` (text: platform name)
      - `source_url` (text: URL of violation)
      - `detection_confidence` (numeric: 0-100)
      - `content_type` (text: 'image', 'video', 'audio', 'text', 'document')
      - `evidence_data` (jsonb: screenshots, metadata)
      - `status` (text: 'detected', 'reviewing', 'confirmed', 'false_positive', 'resolved')
      - `detected_at` (timestamptz)
      - `resolved_at` (timestamptz)
      - `created_at` (timestamptz)
    
    - `scan_reports`
      - `id` (uuid, primary key)
      - `scan_id` (uuid, foreign key to identity_scans)
      - `user_id` (uuid, foreign key to auth.users)
      - `report_type` (text: 'summary', 'detailed', 'violation')
      - `total_violations` (integer)
      - `critical_violations` (integer)
      - `high_violations` (integer)
      - `medium_violations` (integer)
      - `low_violations` (integer)
      - `platforms_scanned` (jsonb: list of platforms)
      - `report_data` (jsonb: full report data)
      - `generated_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Güvenlik
    - RLS tüm tablolar için etkinleştirildi
    - Kullanıcılar sadece kendi verilerini görebilir
    - Kullanıcılar kendi taramalarını başlatabilir
    - Raporlar sadece tarama sahibi tarafından görülebilir

  3. İndeksler
    - Performans için gerekli indeksler eklendi
    - Zaman bazlı sorgular için timestamp indeksleri
    - İhlal durumu ve şiddet bazlı filtreleme için indeksler
*/

CREATE TABLE IF NOT EXISTS identity_scans (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  scan_type text NOT NULL CHECK (scan_type IN ('image', 'video', 'audio', 'certificate', 'profile', 'full')),
  scan_status text NOT NULL DEFAULT 'pending' CHECK (scan_status IN ('pending', 'scanning', 'completed', 'failed')),
  sources_scanned jsonb DEFAULT '[]'::jsonb,
  total_sources integer DEFAULT 0,
  scanned_sources integer DEFAULT 0,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS identity_violations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id uuid REFERENCES identity_scans(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  violation_type text NOT NULL CHECK (violation_type IN ('unauthorized_image', 'fake_profile', 'identity_theft', 'certificate_fraud', 'deepfake', 'data_breach')),
  severity text NOT NULL DEFAULT 'medium' CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  source_platform text NOT NULL,
  source_url text,
  detection_confidence numeric DEFAULT 0 CHECK (detection_confidence >= 0 AND detection_confidence <= 100),
  content_type text CHECK (content_type IN ('image', 'video', 'audio', 'text', 'document')),
  evidence_data jsonb DEFAULT '{}'::jsonb,
  status text NOT NULL DEFAULT 'detected' CHECK (status IN ('detected', 'reviewing', 'confirmed', 'false_positive', 'resolved')),
  detected_at timestamptz DEFAULT now(),
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS scan_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  scan_id uuid REFERENCES identity_scans(id) ON DELETE CASCADE NOT NULL,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  report_type text NOT NULL DEFAULT 'summary' CHECK (report_type IN ('summary', 'detailed', 'violation')),
  total_violations integer DEFAULT 0,
  critical_violations integer DEFAULT 0,
  high_violations integer DEFAULT 0,
  medium_violations integer DEFAULT 0,
  low_violations integer DEFAULT 0,
  platforms_scanned jsonb DEFAULT '[]'::jsonb,
  report_data jsonb DEFAULT '{}'::jsonb,
  generated_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_identity_scans_user_id ON identity_scans(user_id);
CREATE INDEX IF NOT EXISTS idx_identity_scans_status ON identity_scans(scan_status);
CREATE INDEX IF NOT EXISTS idx_identity_scans_created_at ON identity_scans(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_identity_violations_user_id ON identity_violations(user_id);
CREATE INDEX IF NOT EXISTS idx_identity_violations_scan_id ON identity_violations(scan_id);
CREATE INDEX IF NOT EXISTS idx_identity_violations_severity ON identity_violations(severity);
CREATE INDEX IF NOT EXISTS idx_identity_violations_status ON identity_violations(status);
CREATE INDEX IF NOT EXISTS idx_identity_violations_detected_at ON identity_violations(detected_at DESC);

CREATE INDEX IF NOT EXISTS idx_scan_reports_user_id ON scan_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_scan_reports_scan_id ON scan_reports(scan_id);
CREATE INDEX IF NOT EXISTS idx_scan_reports_generated_at ON scan_reports(generated_at DESC);

ALTER TABLE identity_scans ENABLE ROW LEVEL SECURITY;
ALTER TABLE identity_violations ENABLE ROW LEVEL SECURITY;
ALTER TABLE scan_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own scans"
  ON identity_scans
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own scans"
  ON identity_scans
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scans"
  ON identity_scans
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own violations"
  ON identity_violations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own violations"
  ON identity_violations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own violations"
  ON identity_violations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own reports"
  ON scan_reports
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own reports"
  ON scan_reports
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);
