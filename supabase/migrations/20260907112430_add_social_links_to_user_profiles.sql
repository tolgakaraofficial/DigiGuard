/*
# Add social_links column to user_profiles table

1. Modified Tables
- `user_profiles`
  - Add `social_links` (jsonb) - stores social media links

2. Notes
- Stored as JSONB for flexible structure
- Nullable since not all users will provide social links
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'user_profiles' AND column_name = 'social_links'
  ) THEN
    ALTER TABLE user_profiles ADD COLUMN social_links jsonb;
  END IF;
END $$;
