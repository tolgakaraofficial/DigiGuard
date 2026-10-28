/*
# Create storage policies for marketplace bucket

1. Security
- Allow anyone to read (public bucket)
- Allow authenticated users to upload to their own folder
- Allow users to update/delete their own files
*/

DROP POLICY IF EXISTS "marketplace_read" ON storage.objects;
CREATE POLICY "marketplace_read"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'marketplace');

DROP POLICY IF EXISTS "marketplace_insert" ON storage.objects;
CREATE POLICY "marketplace_insert"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'marketplace');

DROP POLICY IF EXISTS "marketplace_update" ON storage.objects;
CREATE POLICY "marketplace_update"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'marketplace');

DROP POLICY IF EXISTS "marketplace_delete" ON storage.objects;
CREATE POLICY "marketplace_delete"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'marketplace');
