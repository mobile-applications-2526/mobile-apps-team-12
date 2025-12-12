drop policy "Give anon users access to JPG images in folder 1mzryse_0" on "storage"."objects";

drop policy "Give anon users access to JPG images in folder 1mzryse_1" on "storage"."objects";

drop policy "Give anon users access to JPG images in folder 1mzryse_2" on "storage"."objects";


  create policy "Give users access to own folder 1mzryse_0"
  on "storage"."objects"
  as permissive
  for select
  to public
using (((bucket_id = 'profilepictures'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



  create policy "Give users access to own folder 1mzryse_1"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'profilepictures'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



  create policy "Give users access to own folder 1mzryse_2"
  on "storage"."objects"
  as permissive
  for update
  to public
using (((bucket_id = 'profilepictures'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



