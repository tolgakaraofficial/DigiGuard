/*
  # Create threat detections table

  1. New Tables
    - `threat_detections`
      - `id` (uuid, primary key) - Tehdit ID'si
      - `user_id` (uuid, foreign key) - Kullanıcı referansı
      - `threat_type` (text) - Tehdit türü (deepfake, voice_spoof, etc)
      - `confidence_score` (float) - Güven puanı
      - `media_hash` (text) - Medya hash'i
      - `details` (jsonb) - Tehdit detayları
      - `action_taken` (text) - Alınan aksiyon
      - `created_at` (timestamp) - Oluşturma tarihi

  2. Security
    - Enable RLS on `threat_detections` table
    - Add policy for users to read their own detections
    - Add policy for system to create detections

  3. Foreign Keys
    - `user_id` references `users(id)` ON DELETE CASCADE

  4. Indexes
    - Add index on user_id for filtering
    - Add index on threat_type for analysis
    - Add index on created_at for time-based queries
*/

CREATE TABLE IF NOT EXISTS threat_detections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  threat_type text NOT NULL CHECK (threat_type IN ('deepfake', 'voice_spoof', 'image_manipulation', 'unknown')),
  confidence_score float NOT NULL DEFAULT 0.0,
  media_hash text,
  details jsonb DEFAULT '{}'::jsonb,
  action_taken text DEFAULT 'logged',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE threat_detections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own threat detections"
  ON threat_detections FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_threat_user_id ON threat_detections(user_id);
CREATE INDEX IF NOT EXISTS idx_threat_type ON threat_detections(threat_type);
CREATE INDEX IF NOT EXISTS idx_threat_created ON threat_detections(created_at);
