/*
# Add social_links column to users table

1. Modified Tables
- `users`
  - Add `social_links` (jsonb) - stores social media links (twitter, linkedin, instagram, facebook, youtube, telegram, website)

2. Notes
- Stored as JSONB for flexible structure
- Nullable since not all users will provide social links
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'social_links'
  ) THEN
    ALTER TABLE users ADD COLUMN social_links jsonb;
  END IF;
END $$;
