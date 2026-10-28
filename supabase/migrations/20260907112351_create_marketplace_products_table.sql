/*
# Create marketplace_products table

1. New Tables
- `marketplace_products`
  - `id` (uuid, primary key)
  - `title` (text, not null) - product name
  - `description` (text, not null) - product description
  - `category` (text, not null) - prototype, software, algorithm, ai_model, template, certificate
  - `price` (numeric, not null) - price in USD
  - `currency` (text, default 'USD')
  - `creator_id` (uuid, not null) - references auth.users
  - `creator_name` (text) - creator display name
  - `creator_ghost_id` (text) - creator's GOST ID
  - `file_url` (text) - URL to uploaded file in storage
  - `status` (text, default 'pending') - pending, approved, rejected
  - `downloads` (integer, default 0)
  - `rating` (numeric, default 0) - 0-5 star rating
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())

2. Security
- Enable RLS on `marketplace_products`.
- Anyone can browse approved products (SELECT with status = 'approved' is public).
- Authenticated users can insert their own products.
- Creators can update/delete their own products.
- Admins can update status (via service role, not exposed here).

3. Notes
- Revenue share is 50/50: 50% to creator, 50% to project treasury.
- Products must be approved before appearing in the marketplace.
- File uploads go to Supabase Storage 'marketplace' bucket.
*/

CREATE TABLE IF NOT EXISTS marketplace_products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  currency text NOT NULL DEFAULT 'USD',
  creator_id uuid NOT NULL DEFAULT auth.uid() REFERENCES auth.users(id) ON DELETE CASCADE,
  creator_name text,
  creator_ghost_id text,
  file_url text,
  status text NOT NULL DEFAULT 'pending',
  downloads integer NOT NULL DEFAULT 0,
  rating numeric NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE marketplace_products ENABLE ROW LEVEL SECURITY;

-- Anyone can browse approved products (public marketplace)
DROP POLICY IF EXISTS "browse_approved_products" ON marketplace_products;
CREATE POLICY "browse_approved_products"
ON marketplace_products FOR SELECT
TO anon, authenticated
USING (status = 'approved');

-- Authenticated users can insert their own products
DROP POLICY IF EXISTS "insert_own_products" ON marketplace_products;
CREATE POLICY "insert_own_products"
ON marketplace_products FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = creator_id);

-- Creators can update their own products
DROP POLICY IF EXISTS "update_own_products" ON marketplace_products;
CREATE POLICY "update_own_products"
ON marketplace_products FOR UPDATE
TO authenticated
USING (auth.uid() = creator_id)
WITH CHECK (auth.uid() = creator_id);

-- Creators can delete their own products
DROP POLICY IF EXISTS "delete_own_products" ON marketplace_products;
CREATE POLICY "delete_own_products"
ON marketplace_products FOR DELETE
TO authenticated
USING (auth.uid() = creator_id);

-- Index for faster browsing
CREATE INDEX IF NOT EXISTS idx_marketplace_products_status ON marketplace_products(status);
CREATE INDEX IF NOT EXISTS idx_marketplace_products_category ON marketplace_products(category);
CREATE INDEX IF NOT EXISTS idx_marketplace_products_creator ON marketplace_products(creator_id);
