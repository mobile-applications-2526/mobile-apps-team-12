
  create policy "users can update pet"
  on "public"."pets"
  as permissive
  for update
  to public
using ((owner_id = auth.uid()));



  create policy "Give anon users access to JPG images in folder 1mzryse_0"
  on "storage"."objects"
  as permissive
  for select
  to public
using (((bucket_id = 'profilepictures'::text) AND (storage.extension(name) = 'jpg'::text) AND (lower((storage.foldername(name))[1]) = 'public'::text) AND (auth.role() = 'anon'::text)));



  create policy "Give anon users access to JPG images in folder 1mzryse_1"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'profilepictures'::text) AND (storage.extension(name) = 'jpg'::text) AND (lower((storage.foldername(name))[1]) = 'public'::text) AND (auth.role() = 'anon'::text)));



  create policy "Give anon users access to JPG images in folder 1mzryse_2"
  on "storage"."objects"
  as permissive
  for update
  to public
using (((bucket_id = 'profilepictures'::text) AND (storage.extension(name) = 'jpg'::text) AND (lower((storage.foldername(name))[1]) = 'public'::text) AND (auth.role() = 'anon'::text)));



