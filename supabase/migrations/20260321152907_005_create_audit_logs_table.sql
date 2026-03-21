/*
  # Create audit logs table

  1. New Tables
    - `audit_logs`
      - `id` (uuid, primary key) - Log ID'si
      - `user_id` (uuid, foreign key) - Kullanıcı referansı
      - `action` (text) - Gerçekleştirilen aksiyon
      - `resource_type` (text) - Kaynak türü
      - `resource_id` (uuid) - Kaynak ID'si
      - `changes` (jsonb) - Yapılan değişiklikler
      - `ip_address` (inet) - IP adresi
      - `user_agent` (text) - Tarayıcı bilgisi
      - `created_at` (timestamp) - Oluşturma tarihi

  2. Security
    - Enable RLS on `audit_logs` table
    - Add policy for users to read their own logs

  3. Foreign Keys
    - `user_id` references `users(id)` ON DELETE CASCADE

  4. Indexes
    - Add index on user_id for filtering
    - Add index on created_at for time-based queries
    - Add index on action for analysis
*/

CREATE TABLE IF NOT EXISTS audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  action text NOT NULL,
  resource_type text,
  resource_id uuid,
  changes jsonb DEFAULT '{}'::jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own audit logs"
  ON audit_logs FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE INDEX IF NOT EXISTS idx_audit_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_action ON audit_logs(action);
