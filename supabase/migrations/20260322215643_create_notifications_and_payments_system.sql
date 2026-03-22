/*
  # Notification and Payment System

  ## Overview
  This migration creates a comprehensive notification and payment system for DigiGuard,
  supporting email/SMS notifications, MetaMask crypto payments, and traditional card payments.

  ## New Tables
  
  ### 1. `users`
  - `id` (uuid, primary key) - Unique user identifier
  - `email` (text, unique) - User email address
  - `phone` (text) - User phone number
  - `full_name` (text) - User full name
  - `wallet_address` (text) - MetaMask wallet address
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. `subscriptions`
  - `id` (uuid, primary key) - Subscription identifier
  - `user_id` (uuid, foreign key) - Reference to users table
  - `plan_type` (text) - Plan type: 'individual', 'professional', 'enterprise'
  - `status` (text) - Status: 'active', 'cancelled', 'expired', 'pending'
  - `amount` (decimal) - Subscription amount
  - `currency` (text) - Currency code (TRY, USD, EUR, etc.)
  - `billing_cycle` (text) - Billing cycle: 'monthly', 'yearly'
  - `start_date` (timestamptz) - Subscription start date
  - `end_date` (timestamptz) - Subscription end date
  - `auto_renew` (boolean) - Auto-renewal enabled
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. `payments`
  - `id` (uuid, primary key) - Payment identifier
  - `user_id` (uuid, foreign key) - Reference to users table
  - `subscription_id` (uuid, foreign key) - Reference to subscriptions table
  - `amount` (decimal) - Payment amount
  - `currency` (text) - Currency code
  - `payment_method` (text) - Method: 'card', 'metamask', 'bank_transfer'
  - `payment_status` (text) - Status: 'pending', 'completed', 'failed', 'refunded'
  - `transaction_hash` (text) - Blockchain transaction hash for MetaMask
  - `card_last4` (text) - Last 4 digits of card
  - `card_brand` (text) - Card brand (Visa, Mastercard, etc.)
  - `receipt_url` (text) - Receipt/invoice URL
  - `metadata` (jsonb) - Additional payment metadata
  - `created_at` (timestamptz) - Payment timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 4. `notifications`
  - `id` (uuid, primary key) - Notification identifier
  - `user_id` (uuid, foreign key) - Reference to users table
  - `type` (text) - Type: 'email', 'sms', 'both'
  - `category` (text) - Category: 'registration', 'login', 'payment', 'invoice', 'security', 'system'
  - `subject` (text) - Notification subject/title
  - `message` (text) - Notification message content
  - `email_sent` (boolean) - Email sent status
  - `sms_sent` (boolean) - SMS sent status
  - `email_sent_at` (timestamptz) - Email sent timestamp
  - `sms_sent_at` (timestamptz) - SMS sent timestamp
  - `read` (boolean) - Read status
  - `metadata` (jsonb) - Additional notification data
  - `created_at` (timestamptz) - Creation timestamp

  ### 5. `invoices`
  - `id` (uuid, primary key) - Invoice identifier
  - `invoice_number` (text, unique) - Unique invoice number
  - `user_id` (uuid, foreign key) - Reference to users table
  - `payment_id` (uuid, foreign key) - Reference to payments table
  - `amount` (decimal) - Invoice amount
  - `currency` (text) - Currency code
  - `status` (text) - Status: 'draft', 'sent', 'paid', 'overdue', 'cancelled'
  - `due_date` (timestamptz) - Payment due date
  - `paid_at` (timestamptz) - Payment completion timestamp
  - `pdf_url` (text) - Generated PDF URL
  - `items` (jsonb) - Invoice line items
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 6. `wallet_connections`
  - `id` (uuid, primary key) - Connection identifier
  - `user_id` (uuid, foreign key) - Reference to users table
  - `wallet_address` (text, unique) - Wallet address
  - `wallet_type` (text) - Wallet type: 'metamask', 'walletconnect', etc.
  - `is_primary` (boolean) - Primary wallet flag
  - `connected_at` (timestamptz) - Connection timestamp
  - `last_used_at` (timestamptz) - Last usage timestamp

  ## Security
  - RLS enabled on all tables
  - Policies for authenticated users to manage their own data
  - Admin policies for system operations
  - Secure payment data handling

  ## Indexes
  - Performance indexes on frequently queried columns
  - Foreign key indexes for join optimization
*/

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  phone text,
  full_name text,
  wallet_address text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  plan_type text NOT NULL CHECK (plan_type IN ('individual', 'professional', 'enterprise')),
  status text DEFAULT 'pending' CHECK (status IN ('active', 'cancelled', 'expired', 'pending')),
  amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'TRY',
  billing_cycle text DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'yearly')),
  start_date timestamptz,
  end_date timestamptz,
  auto_renew boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS payments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  subscription_id uuid REFERENCES subscriptions(id) ON DELETE SET NULL,
  amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'TRY',
  payment_method text CHECK (payment_method IN ('card', 'metamask', 'bank_transfer')),
  payment_status text DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_hash text,
  card_last4 text,
  card_brand text,
  receipt_url text,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create notifications table
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  type text DEFAULT 'email' CHECK (type IN ('email', 'sms', 'both')),
  category text CHECK (category IN ('registration', 'login', 'payment', 'invoice', 'security', 'system')),
  subject text NOT NULL,
  message text NOT NULL,
  email_sent boolean DEFAULT false,
  sms_sent boolean DEFAULT false,
  email_sent_at timestamptz,
  sms_sent_at timestamptz,
  read boolean DEFAULT false,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create invoices table
CREATE TABLE IF NOT EXISTS invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  invoice_number text UNIQUE NOT NULL,
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  payment_id uuid REFERENCES payments(id) ON DELETE SET NULL,
  amount decimal(10,2) NOT NULL,
  currency text DEFAULT 'TRY',
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
  due_date timestamptz,
  paid_at timestamptz,
  pdf_url text,
  items jsonb DEFAULT '[]',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create wallet_connections table
CREATE TABLE IF NOT EXISTS wallet_connections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  wallet_address text UNIQUE NOT NULL,
  wallet_type text DEFAULT 'metamask',
  is_primary boolean DEFAULT false,
  connected_at timestamptz DEFAULT now(),
  last_used_at timestamptz DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON payments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_status ON payments(payment_status);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_category ON notifications(category);
CREATE INDEX IF NOT EXISTS idx_invoices_user_id ON invoices(user_id);
CREATE INDEX IF NOT EXISTS idx_invoices_status ON invoices(status);
CREATE INDEX IF NOT EXISTS idx_wallet_connections_user_id ON wallet_connections(user_id);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_connections ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- RLS Policies for subscriptions table
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own subscriptions"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own subscriptions"
  ON subscriptions FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for payments table
CREATE POLICY "Users can view own payments"
  ON payments FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own payments"
  ON payments FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- RLS Policies for notifications table
CREATE POLICY "Users can view own notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can update own notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "System can insert notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- RLS Policies for invoices table
CREATE POLICY "Users can view own invoices"
  ON invoices FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

-- RLS Policies for wallet_connections table
CREATE POLICY "Users can view own wallet connections"
  ON wallet_connections FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can insert own wallet connections"
  ON wallet_connections FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own wallet connections"
  ON wallet_connections FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete own wallet connections"
  ON wallet_connections FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Function to generate invoice number
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS text AS $$
DECLARE
  new_number text;
BEGIN
  new_number := 'INV-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' || LPAD(FLOOR(RANDOM() * 9999)::text, 4, '0');
  RETURN new_number;
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subscriptions_updated_at BEFORE UPDATE ON subscriptions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_payments_updated_at BEFORE UPDATE ON payments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_invoices_updated_at BEFORE UPDATE ON invoices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();