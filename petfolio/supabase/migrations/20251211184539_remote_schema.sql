alter table "public"."pets" add column "picture" text;


  create policy "Give users access to own folder 11vo5lg_0"
  on "storage"."objects"
  as permissive
  for select
  to public
using (((bucket_id = 'petpictures'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



  create policy "Give users access to own folder 11vo5lg_1"
  on "storage"."objects"
  as permissive
  for insert
  to public
with check (((bucket_id = 'petpictures'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



  create policy "Give users access to own folder 11vo5lg_2"
  on "storage"."objects"
  as permissive
  for update
  to public
using (((bucket_id = 'petpictures'::text) AND (( SELECT (auth.uid())::text AS uid) = (storage.foldername(name))[1])));



