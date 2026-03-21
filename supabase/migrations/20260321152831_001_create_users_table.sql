/*
  # Create users table

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - Kullanıcı ID'si
      - `email` (text, unique) - E-posta adresi
      - `phone` (text, unique) - Telefon numarası
      - `is_verified` (boolean) - Doğrulama durumu
      - `is_registered` (boolean) - Kayıt durumu
      - `created_at` (timestamp) - Oluşturma tarihi
      - `updated_at` (timestamp) - Güncelleme tarihi

  2. Security
    - Enable RLS on `users` table
    - Add policy for users to read their own data
    - Add policy for users to update their own data
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  phone text UNIQUE NOT NULL,
  is_verified boolean DEFAULT false,
  is_registered boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own data"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
