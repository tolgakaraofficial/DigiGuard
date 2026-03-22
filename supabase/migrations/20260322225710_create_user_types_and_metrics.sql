/*
  # Kullanıcı Türleri ve Metrikler Sistemi

  1. Yeni Tablolar
    - `user_profiles`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `phone` (text)
      - `user_type` (text) - 'corporate', 'individual', 'personnel'
      - `full_name` (text)
      - `company_name` (text, nullable) - Kurumsal için
      - `department` (text, nullable) - Personel için
      - `is_verified` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `user_type_statistics`
      - `id` (uuid, primary key)
      - `user_type` (text)
      - `total_users` (bigint)
      - `verified_users` (bigint)
      - `pending_users` (bigint)
      - `active_users` (bigint)
      - `last_updated` (timestamptz)
      - `created_at` (timestamptz)

    - `city_statistics_by_type`
      - `id` (uuid, primary key)
      - `city_code` (text)
      - `user_type` (text)
      - `certified_users` (integer)
      - `last_updated` (timestamptz)
      - `created_at` (timestamptz)

  2. Güvenlik
    - RLS etkin
    - Kullanıcılar sadece kendi verilerini görebilir
    - İstatistikler herkese açık

  3. İlk Veri
    - 3 kullanıcı türü için başlangıç verileri
    - Şehir bazlı dağılım verileri
*/

-- user_profiles tablosu
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  phone text,
  user_type text NOT NULL CHECK (user_type IN ('corporate', 'individual', 'personnel')),
  full_name text NOT NULL,
  company_name text,
  department text,
  is_verified boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid()::text = id::text);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = id::text)
  WITH CHECK (auth.uid()::text = id::text);

-- user_type_statistics tablosu
CREATE TABLE IF NOT EXISTS user_type_statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_type text NOT NULL UNIQUE CHECK (user_type IN ('corporate', 'individual', 'personnel')),
  total_users bigint DEFAULT 0 NOT NULL,
  verified_users bigint DEFAULT 0 NOT NULL,
  pending_users bigint DEFAULT 0 NOT NULL,
  active_users bigint DEFAULT 0 NOT NULL,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_type_statistics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view type statistics"
  ON user_type_statistics
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can update type statistics"
  ON user_type_statistics
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- city_statistics_by_type tablosu
CREATE TABLE IF NOT EXISTS city_statistics_by_type (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_code text NOT NULL,
  user_type text NOT NULL CHECK (user_type IN ('corporate', 'individual', 'personnel')),
  certified_users integer DEFAULT 0 NOT NULL,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(city_code, user_type)
);

ALTER TABLE city_statistics_by_type ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view city type statistics"
  ON city_statistics_by_type
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert city type statistics"
  ON city_statistics_by_type
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update city type statistics"
  ON city_statistics_by_type
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- İlk veri ekleme - Kullanıcı türü istatistikleri
INSERT INTO user_type_statistics (user_type, total_users, verified_users, pending_users, active_users) VALUES
  ('corporate', 48234, 45892, 1842, 44156),
  ('individual', 89456, 85234, 3122, 82890),
  ('personnel', 15157, 14521, 436, 14012)
ON CONFLICT (user_type) DO UPDATE SET
  total_users = EXCLUDED.total_users,
  verified_users = EXCLUDED.verified_users,
  pending_users = EXCLUDED.pending_users,
  active_users = EXCLUDED.active_users,
  last_updated = now();

-- İstanbul için kullanıcı türü dağılımı
INSERT INTO city_statistics_by_type (city_code, user_type, certified_users) VALUES
  ('34', 'corporate', 18543),
  ('34', 'individual', 20234),
  ('34', 'personnel', 3538),
  ('06', 'corporate', 12456),
  ('06', 'individual', 14123),
  ('06', 'personnel', 1877),
  ('35', 'corporate', 8234),
  ('35', 'individual', 10123),
  ('35', 'personnel', 1515),
  ('16', 'corporate', 5234),
  ('16', 'individual', 6123),
  ('16', 'personnel', 1186),
  ('07', 'corporate', 3987),
  ('07', 'individual', 5012),
  ('07', 'personnel', 877),
  ('01', 'corporate', 3456),
  ('01', 'individual', 4123),
  ('01', 'personnel', 655),
  ('42', 'corporate', 2987),
  ('42', 'individual', 3623),
  ('42', 'personnel', 513),
  ('27', 'corporate', 2765),
  ('27', 'individual', 3234),
  ('27', 'personnel', 535),
  ('63', 'corporate', 1876),
  ('63', 'individual', 2345),
  ('63', 'personnel', 300),
  ('41', 'corporate', 2345),
  ('41', 'individual', 2876),
  ('41', 'personnel', 457)
ON CONFLICT (city_code, user_type) DO UPDATE SET
  certified_users = EXCLUDED.certified_users,
  last_updated = now();

-- Otomatik güncelleme fonksiyonu
CREATE OR REPLACE FUNCTION update_user_type_totals()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE user_statistics
  SET total_certified_users = (
    SELECT COALESCE(SUM(total_users), 0) FROM user_type_statistics
  ),
  last_updated = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- Trigger oluştur
DROP TRIGGER IF EXISTS update_total_on_type_change ON user_type_statistics;
CREATE TRIGGER update_total_on_type_change
  AFTER INSERT OR UPDATE ON user_type_statistics
  FOR EACH STATEMENT
  EXECUTE FUNCTION update_user_type_totals();