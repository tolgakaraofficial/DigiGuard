
-- Registration Certificate Bridge Pipeline
-- Tracks the SOPON -> SUPON -> SOFT10 -> Certificate pipeline per registration

CREATE TABLE IF NOT EXISTS registration_pipeline (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_id text NOT NULL,
  user_type text NOT NULL CHECK (user_type IN ('individual', 'corporate', 'personnel')),
  full_name text NOT NULL,
  email text,
  city text,
  id_type text,
  company_name text,
  tax_number text,
  has_profile_photo boolean DEFAULT false,
  photo_url text,

  -- SOPON Stage
  sopon_status text NOT NULL DEFAULT 'pending' CHECK (sopon_status IN ('pending', 'processing', 'completed', 'failed')),
  sopon_score numeric(5,2),
  sopon_completed_at timestamptz,
  sopon_metadata jsonb DEFAULT '{}',

  -- SUPON Stage (deepfake/identity scan)
  supon_status text NOT NULL DEFAULT 'pending' CHECK (supon_status IN ('pending', 'processing', 'completed', 'failed')),
  supon_deepfake_score numeric(5,2),
  supon_identity_score numeric(5,2),
  supon_decision text CHECK (supon_decision IN ('approved', 'rejected', 'manual_review')),
  supon_completed_at timestamptz,

  -- SOFT10 Stage (certificate signing)
  soft10_status text NOT NULL DEFAULT 'pending' CHECK (soft10_status IN ('pending', 'processing', 'completed', 'failed')),
  soft10_cert_id text,
  soft10_token text,
  soft10_blockchain_hash text,
  soft10_block_number bigint,
  soft10_security_score numeric(5,2),
  soft10_completed_at timestamptz,

  -- Final Certificate
  certificate_status text NOT NULL DEFAULT 'pending' CHECK (certificate_status IN ('pending', 'generating', 'ready', 'failed')),
  certificate_url text,
  certificate_ready_at timestamptz,

  overall_status text NOT NULL DEFAULT 'initiated' CHECK (overall_status IN ('initiated', 'sopon_processing', 'supon_processing', 'soft10_processing', 'completed', 'failed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE registration_pipeline ENABLE ROW LEVEL SECURITY;

CREATE POLICY "select_registration_pipeline" ON registration_pipeline FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_registration_pipeline" ON registration_pipeline FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "update_registration_pipeline" ON registration_pipeline FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_registration_pipeline" ON registration_pipeline FOR DELETE TO authenticated USING (true);

-- Index for fast lookup by registration_id
CREATE INDEX IF NOT EXISTS idx_registration_pipeline_reg_id ON registration_pipeline(registration_id);
CREATE INDEX IF NOT EXISTS idx_registration_pipeline_status ON registration_pipeline(overall_status);
