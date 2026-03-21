/*
  # Create verification tokens table

  1. New Tables
    - `verification_tokens`
      - `id` (uuid, primary key) - Token ID'si
      - `user_id` (uuid, foreign key) - Kullanıcı referansı
      - `token` (text, unique) - Token değeri
      - `type` (text) - Token türü (email, phone, etc)
      - `expires_at` (timestamp) - Geçerlilik süresi
      - `used_at` (timestamp) - Kullanım tarihi
      - `created_at` (timestamp) - Oluşturma tarihi

  2. Security
    - Enable RLS on `verification_tokens` table
    - Add policy for users to read their own tokens
    - Add policy for system to manage tokens

  3. Foreign Keys
    - `user_id` references `users(id)` ON DELETE CASCADE

  4. Indexes
    - Add index on token for lookup
    - Add index on user_id for filtering
*/

CREATE TABLE IF NOT EXISTS verification_tokens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token text UNIQUE NOT NULL,
  type text NOT NULL CHECK (type IN ('email', 'phone', 'reset')),
  expires_at timestamptz NOT NULL,
  used_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE verification_tokens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own tokens"
  ON verification_tokens FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_verification_token ON verification_tokens(token);
CREATE INDEX IF NOT EXISTS idx_verification_user_id ON verification_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_verification_expires ON verification_tokens(expires_at);
