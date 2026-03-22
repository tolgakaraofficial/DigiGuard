/*
  # Kullanıcı İstatistikleri ve Şehir Verileri Sistemi

  1. Yeni Tablolar
    - `user_statistics`
      - `id` (uuid, primary key)
      - `total_certified_users` (bigint) - Toplam sertifikalı kullanıcı sayısı
      - `last_updated` (timestamptz) - Son güncelleme zamanı
      - `created_at` (timestamptz)
    
    - `city_statistics`
      - `id` (uuid, primary key)
      - `city_name` (text) - Şehir adı
      - `city_code` (text) - Plaka kodu
      - `certified_users` (integer) - Sertifikalı kullanıcı sayısı
      - `region` (text) - Bölge bilgisi
      - `coordinates` (jsonb) - Koordinat bilgileri
      - `last_updated` (timestamptz)
      - `created_at` (timestamptz)

  2. Güvenlik
    - RLS etkin
    - Public read politikaları (istatistikler herkese açık)
    - Sadece authenticated kullanıcılar güncelleme yapabilir

  3. İlk Veri
    - Örnek şehir verileri ile başlangıç
    - Gerçek zamanlı güncellenebilir yapı
*/

-- user_statistics tablosu
CREATE TABLE IF NOT EXISTS user_statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  total_certified_users bigint DEFAULT 0 NOT NULL,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE user_statistics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view user statistics"
  ON user_statistics
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can update statistics"
  ON user_statistics
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- city_statistics tablosu
CREATE TABLE IF NOT EXISTS city_statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  city_name text NOT NULL,
  city_code text NOT NULL UNIQUE,
  certified_users integer DEFAULT 0 NOT NULL,
  region text NOT NULL,
  coordinates jsonb DEFAULT '{"lat": 0, "lng": 0}'::jsonb,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE city_statistics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view city statistics"
  ON city_statistics
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert city statistics"
  ON city_statistics
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update city statistics"
  ON city_statistics
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- İlk veri ekleme
INSERT INTO user_statistics (total_certified_users) VALUES (152847)
ON CONFLICT DO NOTHING;

-- Türkiye şehirleri için örnek veri
INSERT INTO city_statistics (city_name, city_code, certified_users, region, coordinates) VALUES
  ('İstanbul', '34', 42315, 'Marmara', '{"lat": 41.0082, "lng": 28.9784}'::jsonb),
  ('Ankara', '06', 28456, 'İç Anadolu', '{"lat": 39.9334, "lng": 32.8597}'::jsonb),
  ('İzmir', '35', 19872, 'Ege', '{"lat": 38.4237, "lng": 27.1428}'::jsonb),
  ('Bursa', '16', 12543, 'Marmara', '{"lat": 40.1826, "lng": 29.0665}'::jsonb),
  ('Antalya', '07', 9876, 'Akdeniz', '{"lat": 36.8969, "lng": 30.7133}'::jsonb),
  ('Adana', '01', 8234, 'Akdeniz', '{"lat": 37.0000, "lng": 35.3213}'::jsonb),
  ('Konya', '42', 7123, 'İç Anadolu', '{"lat": 37.8746, "lng": 32.4932}'::jsonb),
  ('Gaziantep', '27', 6534, 'Güneydoğu Anadolu', '{"lat": 37.0662, "lng": 37.3833}'::jsonb),
  ('Şanlıurfa', '63', 4521, 'Güneydoğu Anadolu', '{"lat": 37.1591, "lng": 38.7969}'::jsonb),
  ('Kocaeli', '41', 5678, 'Marmara', '{"lat": 40.8533, "lng": 29.8815}'::jsonb),
  ('Mersin', '33', 4987, 'Akdeniz', '{"lat": 36.8121, "lng": 34.6415}'::jsonb),
  ('Diyarbakır', '21', 3876, 'Güneydoğu Anadolu', '{"lat": 37.9144, "lng": 40.2306}'::jsonb),
  ('Kayseri', '38', 4234, 'İç Anadolu', '{"lat": 38.7312, "lng": 35.4787}'::jsonb),
  ('Eskişehir', '26', 3987, 'İç Anadolu', '{"lat": 39.7767, "lng": 30.5206}'::jsonb),
  ('Samsun', '55', 3456, 'Karadeniz', '{"lat": 41.2867, "lng": 36.3300}'::jsonb),
  ('Denizli', '20', 2987, 'Ege', '{"lat": 37.7765, "lng": 29.0864}'::jsonb),
  ('Trabzon', '61', 2543, 'Karadeniz', '{"lat": 41.0015, "lng": 39.7178}'::jsonb),
  ('Hatay', '31', 2876, 'Akdeniz', '{"lat": 36.4018, "lng": 36.3498}'::jsonb),
  ('Balıkesir', '10', 2345, 'Marmara', '{"lat": 39.6484, "lng": 27.8826}'::jsonb),
  ('Manisa', '45', 2123, 'Ege', '{"lat": 38.6191, "lng": 27.4289}'::jsonb)
ON CONFLICT (city_code) DO NOTHING;

-- Otomatik güncelleme için trigger fonksiyonu
CREATE OR REPLACE FUNCTION update_total_certified_users()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE user_statistics
  SET total_certified_users = (SELECT COALESCE(SUM(certified_users), 0) FROM city_statistics),
      last_updated = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER
SET search_path = public;

-- Trigger oluştur
DROP TRIGGER IF EXISTS update_user_stats_on_city_change ON city_statistics;
CREATE TRIGGER update_user_stats_on_city_change
  AFTER INSERT OR UPDATE OR DELETE ON city_statistics
  FOR EACH STATEMENT
  EXECUTE FUNCTION update_total_certified_users();