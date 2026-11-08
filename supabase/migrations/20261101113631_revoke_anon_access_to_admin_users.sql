/*
# Remove anonymous access to admin_users

1. Modified Tables
- `admin_users`: the anonymous role no longer has any privileges on this table.

2. Security
- Administrator accounts are no longer discoverable through the public API by people who are not signed in.
- Signed-in users can still read only their own admin row through the existing policy.

3. Important notes
- The admin console checks administrator status through a function, which is unaffected by this change.
*/

REVOKE ALL ON admin_users FROM anon;
