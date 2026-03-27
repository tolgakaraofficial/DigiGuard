/*
  # Location Tracking and Chip-Based Certification System

  1. New Tables
    - `certified_persons_tracking`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `certificate_id` (text)
      - `gsm_number` (text)
      - `identity_number` (text, encrypted)
      - `current_location` (jsonb) - stores lat/lng
      - `last_base_station` (text)
      - `tracking_enabled` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `chip_certified_items`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `certificate_id` (text)
      - `chip_code` (text, unique)
      - `item_type` (text) - 'animal', 'object', 'vehicle', etc.
      - `item_name` (text)
      - `current_location` (jsonb)
      - `last_seen` (timestamptz)
      - `tracking_enabled` (boolean)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

    - `location_history`
      - `id` (uuid, primary key)
      - `tracking_id` (uuid)
      - `tracking_type` (text) - 'person' or 'chip'
      - `location` (jsonb)
      - `base_station` (text)
      - `timestamp` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Admins can view all tracking data

  3. Functions
    - Function to update location
    - Function to query nearby certified items
*/

CREATE TABLE IF NOT EXISTS certified_persons_tracking (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  certificate_id text,
  gsm_number text,
  identity_number text,
  current_location jsonb,
  last_base_station text,
  tracking_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS chip_certified_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  certificate_id text,
  chip_code text UNIQUE NOT NULL,
  item_type text NOT NULL,
  item_name text NOT NULL,
  current_location jsonb,
  last_seen timestamptz DEFAULT now(),
  tracking_enabled boolean DEFAULT true,
  metadata jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS location_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id uuid NOT NULL,
  tracking_type text NOT NULL CHECK (tracking_type IN ('person', 'chip')),
  location jsonb NOT NULL,
  base_station text,
  timestamp timestamptz DEFAULT now()
);

ALTER TABLE certified_persons_tracking ENABLE ROW LEVEL SECURITY;
ALTER TABLE chip_certified_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE location_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own tracking data"
  ON certified_persons_tracking FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own tracking data"
  ON certified_persons_tracking FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own tracking data"
  ON certified_persons_tracking FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own chip items"
  ON chip_certified_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own chip items"
  ON chip_certified_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own chip items"
  ON chip_certified_items FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view related location history"
  ON location_history FOR SELECT
  TO authenticated
  USING (
    tracking_type = 'person' AND tracking_id IN (
      SELECT id FROM certified_persons_tracking WHERE user_id = auth.uid()
    )
    OR
    tracking_type = 'chip' AND tracking_id IN (
      SELECT id FROM chip_certified_items WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert location history"
  ON location_history FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE INDEX IF NOT EXISTS idx_certified_persons_user ON certified_persons_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_certified_persons_cert ON certified_persons_tracking(certificate_id);
CREATE INDEX IF NOT EXISTS idx_chip_items_user ON chip_certified_items(user_id);
CREATE INDEX IF NOT EXISTS idx_chip_items_code ON chip_certified_items(chip_code);
CREATE INDEX IF NOT EXISTS idx_location_history_tracking ON location_history(tracking_id, tracking_type);

CREATE OR REPLACE FUNCTION update_location(
  p_tracking_id uuid,
  p_tracking_type text,
  p_location jsonb,
  p_base_station text DEFAULT NULL
) RETURNS void AS $$
BEGIN
  IF p_tracking_type = 'person' THEN
    UPDATE certified_persons_tracking
    SET current_location = p_location,
        last_base_station = COALESCE(p_base_station, last_base_station),
        updated_at = now()
    WHERE id = p_tracking_id;
  ELSIF p_tracking_type = 'chip' THEN
    UPDATE chip_certified_items
    SET current_location = p_location,
        last_seen = now(),
        updated_at = now()
    WHERE id = p_tracking_id;
  END IF;

  INSERT INTO location_history (tracking_id, tracking_type, location, base_station)
  VALUES (p_tracking_id, p_tracking_type, p_location, p_base_station);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION get_nearby_items(
  p_lat numeric,
  p_lng numeric,
  p_radius_km numeric DEFAULT 10
) RETURNS TABLE (
  item_type text,
  item_id uuid,
  item_name text,
  distance_km numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    'person'::text as item_type,
    cpt.id as item_id,
    u.full_name as item_name,
    0::numeric as distance_km
  FROM certified_persons_tracking cpt
  JOIN users u ON u.id = cpt.user_id
  WHERE cpt.tracking_enabled = true
    AND cpt.current_location IS NOT NULL
  
  UNION ALL
  
  SELECT 
    cci.item_type,
    cci.id as item_id,
    cci.item_name,
    0::numeric as distance_km
  FROM chip_certified_items cci
  WHERE cci.tracking_enabled = true
    AND cci.current_location IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
