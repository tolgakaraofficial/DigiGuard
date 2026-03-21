/*
  # Create biometric data table

  1. New Tables
    - `biometric_data`
      - `id` (uuid, primary key) - Kayıt ID'si
      - `user_id` (uuid, foreign key) - Kullanıcı referansı
      - `face_descriptor` (text) - Yüz tanıma verileri
      - `voice_signature` (text) - Ses imzası
      - `confidence_score` (float) - Güven puanı
      - `created_at` (timestamp) - Oluşturma tarihi
      - `updated_at` (timestamp) - Güncelleme tarihi

  2. Security
    - Enable RLS on `biometric_data` table
    - Add policy for users to read their own biometric data
    - Add policy for users to create their biometric data
    - Add policy for users to update their own biometric data
    - Add policy for users to delete their own biometric data

  3. Foreign Keys
    - `user_id` references `users(id)` ON DELETE CASCADE
*/

CREATE TABLE IF NOT EXISTS biometric_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  face_descriptor text,
  voice_signature text,
  confidence_score float DEFAULT 0.0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE biometric_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own biometric data"
  ON biometric_data FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own biometric data"
  ON biometric_data FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own biometric data"
  ON biometric_data FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own biometric data"
  ON biometric_data FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_biometric_user_id ON biometric_data(user_id);
