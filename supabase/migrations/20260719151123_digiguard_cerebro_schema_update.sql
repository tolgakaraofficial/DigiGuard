/*
# DigiGuard & Cerebro — Tam Teşekküllü Dönüşüm Protokolü Şema Güncellemesi

## Genel Bakış
Mevcut şemaya DigiGuard & Cerebro protokolüne ait kolonlar ve tablolar ekler.
Tek-kullanıcılı demo modu olduğu için tüm politikalar `TO anon, authenticated`
olarak yazılmıştır.

## Değişiklikler
1. `users` tablosuna `ghost_id`, `spon_hash`, `softon_token`, `user_type`,
   `kyc_verified` kolonları eklendi (idempotent DO block).
2. Yeni tablolar: `digital_assets`, `dg_threats`, `dg_invoices`,
   `constitution_articles`, `protocol_steps`.
3. RLS + anon CRUD politikaları tüm yeni tablolarda etkin.
*/

-- 1. users tablosuna kolon ekle (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='users' AND column_name='ghost_id') THEN
    ALTER TABLE users ADD COLUMN ghost_id text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='users' AND column_name='spon_hash') THEN
    ALTER TABLE users ADD COLUMN spon_hash text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='users' AND column_name='softon_token') THEN
    ALTER TABLE users ADD COLUMN softon_token text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='users' AND column_name='user_type') THEN
    ALTER TABLE users ADD COLUMN user_type text NOT NULL DEFAULT 'individual';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_schema='public' AND table_name='users' AND column_name='kyc_verified') THEN
    ALTER TABLE users ADD COLUMN kyc_verified boolean NOT NULL DEFAULT false;
  END IF;
END $$;

-- 2. digital_assets
CREATE TABLE IF NOT EXISTS digital_assets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  asset_hash text NOT NULL,
  creator text NOT NULL,
  category text NOT NULL,
  certified boolean NOT NULL DEFAULT false,
  mesam boolean NOT NULL DEFAULT false,
  royalties jsonb NOT NULL DEFAULT '[]'::jsonb,
  event_timestamp text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE digital_assets ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_dg_assets" ON digital_assets;
CREATE POLICY "anon_select_dg_assets" ON digital_assets FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_dg_assets" ON digital_assets;
CREATE POLICY "anon_insert_dg_assets" ON digital_assets FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_dg_assets" ON digital_assets;
CREATE POLICY "anon_update_dg_assets" ON digital_assets FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_dg_assets" ON digital_assets;
CREATE POLICY "anon_delete_dg_assets" ON digital_assets FOR DELETE TO anon, authenticated USING (true);

-- 3. dg_threats (Cerebro Sentinel tehdit kayıtları)
CREATE TABLE IF NOT EXISTS dg_threats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  threat_type text NOT NULL,
  severity text NOT NULL DEFAULT 'medium',
  blocked boolean NOT NULL DEFAULT true,
  vector text NOT NULL,
  event_timestamp text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE dg_threats ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_dg_threats" ON dg_threats;
CREATE POLICY "anon_select_dg_threats" ON dg_threats FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_dg_threats" ON dg_threats;
CREATE POLICY "anon_insert_dg_threats" ON dg_threats FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_dg_threats" ON dg_threats;
CREATE POLICY "anon_update_dg_threats" ON dg_threats FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_dg_threats" ON dg_threats;
CREATE POLICY "anon_delete_dg_threats" ON dg_threats FOR DELETE TO anon, authenticated USING (true);

-- 4. dg_invoices (DGU token faturaları — mevcut invoices ile çakışmasın)
CREATE TABLE IF NOT EXISTS dg_invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_id text NOT NULL,
  amount numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'DGU',
  status text NOT NULL DEFAULT 'pending',
  due_date text,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE dg_invoices ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_dg_invoices" ON dg_invoices;
CREATE POLICY "anon_select_dg_invoices" ON dg_invoices FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_dg_invoices" ON dg_invoices;
CREATE POLICY "anon_insert_dg_invoices" ON dg_invoices FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_dg_invoices" ON dg_invoices;
CREATE POLICY "anon_update_dg_invoices" ON dg_invoices FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_dg_invoices" ON dg_invoices;
CREATE POLICY "anon_delete_dg_invoices" ON dg_invoices FOR DELETE TO anon, authenticated USING (true);

-- 5. constitution_articles
CREATE TABLE IF NOT EXISTS constitution_articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  article_number integer NOT NULL,
  title text NOT NULL,
  body text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE constitution_articles ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_constitution" ON constitution_articles;
CREATE POLICY "anon_select_constitution" ON constitution_articles FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_constitution" ON constitution_articles;
CREATE POLICY "anon_insert_constitution" ON constitution_articles FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_constitution" ON constitution_articles;
CREATE POLICY "anon_update_constitution" ON constitution_articles FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_constitution" ON constitution_articles;
CREATE POLICY "anon_delete_constitution" ON constitution_articles FOR DELETE TO anon, authenticated USING (true);

-- 6. protocol_steps
CREATE TABLE IF NOT EXISTS protocol_steps (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  step_number integer NOT NULL,
  name text NOT NULL,
  description text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);
ALTER TABLE protocol_steps ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_select_protocol" ON protocol_steps;
CREATE POLICY "anon_select_protocol" ON protocol_steps FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "anon_insert_protocol" ON protocol_steps;
CREATE POLICY "anon_insert_protocol" ON protocol_steps FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "anon_update_protocol" ON protocol_steps;
CREATE POLICY "anon_update_protocol" ON protocol_steps FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
DROP POLICY IF EXISTS "anon_delete_protocol" ON protocol_steps;
CREATE POLICY "anon_delete_protocol" ON protocol_steps FOR DELETE TO anon, authenticated USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_users_ghost_id ON users(ghost_id);
CREATE INDEX IF NOT EXISTS idx_dg_threats_severity ON dg_threats(severity);
CREATE INDEX IF NOT EXISTS idx_dg_invoices_status ON dg_invoices(status);
CREATE INDEX IF NOT EXISTS idx_protocol_status ON protocol_steps(status);
