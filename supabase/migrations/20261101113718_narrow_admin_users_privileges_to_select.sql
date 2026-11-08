/*
# Narrow admin_users privileges to read-only for signed-in users

1. Modified Tables
- `admin_users`: signed-in users keep only the SELECT privilege. Insert, update, delete and truncate privileges are removed for them. The anonymous role has no privileges.

2. Security
- Signed-in users can only read their own admin row, through the existing policy.
- Administrators are added and removed by the database owner only.

3. Important notes
- The admin check function runs with owner rights, so it continues to work after this change.
*/

REVOKE ALL ON admin_users FROM authenticated;
GRANT SELECT ON admin_users TO authenticated;
