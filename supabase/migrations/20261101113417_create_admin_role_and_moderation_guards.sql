/*
# Admin role, review access, and moderation guards

1. New Tables
- `admin_users`: one row per administrator account. `user_id` points at the sign-in account. Rows are added by the project owner only, never by the app.

2. New Functions
- `is_admin()`: returns true when the signed-in account has a row in `admin_users`. Callable by signed-in users only.
- `guard_review_status()`: protects review fields on identity registrations (individual and corporate). Non-admins cannot change `verification_status`, and cannot mark a registration approved or rejected. New registrations always start as `pending` verification.
- `guard_product_moderation()`: protects the marketplace status, downloads, and rating fields. Non-admins cannot change them, and new products always start as `pending`.
- `guard_user_kyc()`: protects the `kyc_verified` flag on accounts. Non-admins cannot change it, and new accounts always start unverified.

3. Security changes
- Enabled RLS on `admin_users`; clients can only read their own admin row.
- Administrators can read and update all rows in `users`, `individual_registrations`, `corporate_registrations`, and `marketplace_products`.
- Triggers on the tables above enforce the guards for every role, so the direct data API cannot bypass them.

4. Important notes
- No existing rows are changed. All tables are currently empty.
- Products created by creators now wait for admin approval before appearing in the marketplace.
- Administrator accounts must be added to `admin_users` manually after the account is created.
*/

CREATE TABLE IF NOT EXISTS admin_users (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON admin_users TO authenticated;

DROP POLICY IF EXISTS "Admins can read own admin row" ON admin_users;
CREATE POLICY "Admins can read own admin row"
ON admin_users FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM admin_users WHERE user_id = auth.uid());
$$;

REVOKE EXECUTE ON FUNCTION is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION is_admin() TO authenticated;

CREATE OR REPLACE FUNCTION guard_review_status()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF is_admin() THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'INSERT' THEN
    NEW.verification_status := 'pending';
    IF NEW.registration_status IN ('approved', 'rejected') THEN
      NEW.registration_status := 'submitted';
    END IF;
  ELSE
    IF NEW.verification_status IS DISTINCT FROM OLD.verification_status
      OR (NEW.registration_status IN ('approved', 'rejected')
          AND NEW.registration_status IS DISTINCT FROM OLD.registration_status) THEN
      RAISE EXCEPTION 'Only administrators can change review status';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION guard_review_status() FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION guard_product_moderation()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF is_admin() THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'INSERT' THEN
    NEW.status := 'pending';
    NEW.downloads := 0;
    NEW.rating := 0;
  ELSE
    IF NEW.status IS DISTINCT FROM OLD.status
      OR NEW.downloads IS DISTINCT FROM OLD.downloads
      OR NEW.rating IS DISTINCT FROM OLD.rating THEN
      RAISE EXCEPTION 'Only administrators can change product moderation fields';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION guard_product_moderation() FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION guard_user_kyc()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF is_admin() THEN
    RETURN NEW;
  END IF;

  IF TG_OP = 'INSERT' THEN
    NEW.kyc_verified := false;
  ELSIF NEW.kyc_verified IS DISTINCT FROM OLD.kyc_verified THEN
    RAISE EXCEPTION 'Only administrators can change verification status';
  END IF;

  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION guard_user_kyc() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS guard_review_status_individual ON individual_registrations;
CREATE TRIGGER guard_review_status_individual
BEFORE INSERT OR UPDATE ON individual_registrations
FOR EACH ROW EXECUTE FUNCTION guard_review_status();

DROP TRIGGER IF EXISTS guard_review_status_corporate ON corporate_registrations;
CREATE TRIGGER guard_review_status_corporate
BEFORE INSERT OR UPDATE ON corporate_registrations
FOR EACH ROW EXECUTE FUNCTION guard_review_status();

DROP TRIGGER IF EXISTS guard_product_moderation_trg ON marketplace_products;
CREATE TRIGGER guard_product_moderation_trg
BEFORE INSERT OR UPDATE ON marketplace_products
FOR EACH ROW EXECUTE FUNCTION guard_product_moderation();

DROP TRIGGER IF EXISTS guard_user_kyc_trg ON users;
CREATE TRIGGER guard_user_kyc_trg
BEFORE INSERT OR UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION guard_user_kyc();

DROP POLICY IF EXISTS "Admins can view all users" ON users;
CREATE POLICY "Admins can view all users"
ON users FOR SELECT
TO authenticated
USING (is_admin());

DROP POLICY IF EXISTS "Admins can update all users" ON users;
CREATE POLICY "Admins can update all users"
ON users FOR UPDATE
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can view all individual registrations" ON individual_registrations;
CREATE POLICY "Admins can view all individual registrations"
ON individual_registrations FOR SELECT
TO authenticated
USING (is_admin());

DROP POLICY IF EXISTS "Admins can update all individual registrations" ON individual_registrations;
CREATE POLICY "Admins can update all individual registrations"
ON individual_registrations FOR UPDATE
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can view all corporate registrations" ON corporate_registrations;
CREATE POLICY "Admins can view all corporate registrations"
ON corporate_registrations FOR SELECT
TO authenticated
USING (is_admin());

DROP POLICY IF EXISTS "Admins can update all corporate registrations" ON corporate_registrations;
CREATE POLICY "Admins can update all corporate registrations"
ON corporate_registrations FOR UPDATE
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

DROP POLICY IF EXISTS "Admins can view all products" ON marketplace_products;
CREATE POLICY "Admins can view all products"
ON marketplace_products FOR SELECT
TO authenticated
USING (is_admin());

DROP POLICY IF EXISTS "Admins can update all products" ON marketplace_products;
CREATE POLICY "Admins can update all products"
ON marketplace_products FOR UPDATE
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());
