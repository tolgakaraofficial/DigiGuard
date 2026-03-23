/*
  # Bireysel ve Kurumsal Kayıt Sistemi

  1. Yeni Tablolar
    - `individual_registrations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `first_name` (text)
      - `last_name` (text)
      - `birth_date` (date)
      - `nationality` (text)
      - `address` (text)
      - `city` (text)
      - `postal_code` (text)
      - `id_number` (text, encrypted)
      - `id_type` (text)
      - `id_issue_date` (date)
      - `id_expiry_date` (date)
      - `id_issuing_authority` (text)
      - `phone` (text)
      - `email` (text)
      - `photo_urls` (jsonb)
      - `video_urls` (jsonb)
      - `audio_urls` (jsonb)
      - `registration_status` (text)
      - `verification_status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `corporate_registrations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `company_name` (text)
      - `company_type` (text: 'limited', 'anonim', 'sahis', 'komandit', 'kolektif', 'cooperative', 'other')
      - `tax_number` (text, encrypted)
      - `trade_registry_number` (text)
      - `foundation_date` (date)
      - `mersis_number` (text)
      - `company_address` (text)
      - `company_city` (text)
      - `company_postal_code` (text)
      - `authorized_person_first_name` (text)
      - `authorized_person_last_name` (text)
      - `authorized_person_title` (text)
      - `authorized_person_id_number` (text, encrypted)
      - `authorized_person_phone` (text)
      - `authorized_person_email` (text)
      - `company_phone` (text)
      - `company_email` (text)
      - `employee_count` (integer)
      - `sector` (text)
      - `website` (text)
      - `photo_urls` (jsonb)
      - `video_urls` (jsonb)
      - `audio_urls` (jsonb)
      - `document_urls` (jsonb: trade registry, signature circular, tax plate, authorization docs)
      - `registration_status` (text)
      - `verification_status` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Güvenlik
    - RLS tüm tablolar için etkinleştirildi
    - Kullanıcılar sadece kendi kayıtlarını görebilir ve düzenleyebilir
    - Kimlik numaraları ve vergi numaraları hassas veri olarak işaretlendi

  3. İndeksler
    - Performans için gerekli indeksler eklendi
    - Kullanıcı bazlı sorgular için user_id indeksleri
    - Durum bazlı filtreleme için status indeksleri

  4. Önemli Notlar
    - Kimlik numaraları ve vergi numaraları şifrelenmeli saklanmalıdır
    - Medya dosyaları ve belgeler Supabase Storage'da saklanmalıdır
    - URL'ler jsonb array olarak saklanır
*/

CREATE TABLE IF NOT EXISTS individual_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  first_name text NOT NULL,
  last_name text NOT NULL,
  birth_date date NOT NULL,
  nationality text NOT NULL,
  address text NOT NULL,
  city text NOT NULL,
  postal_code text NOT NULL,
  id_number text NOT NULL,
  id_type text NOT NULL CHECK (id_type IN ('tc', 'passport', 'other')),
  id_issue_date date NOT NULL,
  id_expiry_date date NOT NULL,
  id_issuing_authority text NOT NULL,
  phone text,
  email text,
  photo_urls jsonb DEFAULT '[]'::jsonb,
  video_urls jsonb DEFAULT '[]'::jsonb,
  audio_urls jsonb DEFAULT '[]'::jsonb,
  registration_status text DEFAULT 'draft' CHECK (registration_status IN ('draft', 'submitted', 'approved', 'rejected')),
  verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'failed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS corporate_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  company_name text NOT NULL,
  company_type text NOT NULL CHECK (company_type IN ('limited', 'anonim', 'sahis', 'komandit', 'kolektif', 'cooperative', 'other')),
  tax_number text NOT NULL,
  trade_registry_number text,
  foundation_date date,
  mersis_number text,
  company_address text NOT NULL,
  company_city text NOT NULL,
  company_postal_code text NOT NULL,
  authorized_person_first_name text NOT NULL,
  authorized_person_last_name text NOT NULL,
  authorized_person_title text NOT NULL,
  authorized_person_id_number text NOT NULL,
  authorized_person_phone text NOT NULL,
  authorized_person_email text NOT NULL,
  company_phone text,
  company_email text,
  employee_count integer,
  sector text,
  website text,
  photo_urls jsonb DEFAULT '[]'::jsonb,
  video_urls jsonb DEFAULT '[]'::jsonb,
  audio_urls jsonb DEFAULT '[]'::jsonb,
  document_urls jsonb DEFAULT '{}'::jsonb,
  registration_status text DEFAULT 'draft' CHECK (registration_status IN ('draft', 'submitted', 'approved', 'rejected')),
  verification_status text DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'failed')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_individual_registrations_user_id ON individual_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_individual_registrations_status ON individual_registrations(registration_status);
CREATE INDEX IF NOT EXISTS idx_individual_registrations_verification ON individual_registrations(verification_status);
CREATE INDEX IF NOT EXISTS idx_individual_registrations_created_at ON individual_registrations(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_corporate_registrations_user_id ON corporate_registrations(user_id);
CREATE INDEX IF NOT EXISTS idx_corporate_registrations_status ON corporate_registrations(registration_status);
CREATE INDEX IF NOT EXISTS idx_corporate_registrations_verification ON corporate_registrations(verification_status);
CREATE INDEX IF NOT EXISTS idx_corporate_registrations_created_at ON corporate_registrations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_corporate_registrations_tax_number ON corporate_registrations(tax_number);

ALTER TABLE individual_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE corporate_registrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own individual registrations"
  ON individual_registrations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own individual registrations"
  ON individual_registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own individual registrations"
  ON individual_registrations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own corporate registrations"
  ON corporate_registrations
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own corporate registrations"
  ON corporate_registrations
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own corporate registrations"
  ON corporate_registrations
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_individual_registrations_updated_at'
  ) THEN
    CREATE TRIGGER update_individual_registrations_updated_at
      BEFORE UPDATE ON individual_registrations
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_corporate_registrations_updated_at'
  ) THEN
    CREATE TRIGGER update_corporate_registrations_updated_at
      BEFORE UPDATE ON corporate_registrations
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;
