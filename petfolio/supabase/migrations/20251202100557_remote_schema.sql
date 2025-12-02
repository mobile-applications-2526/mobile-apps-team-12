
  create policy "users can delete medication"
  on "public"."medication"
  as permissive
  for delete
  to public
using (true);



  create policy "users can insert medication"
  on "public"."medication"
  as permissive
  for insert
  to public
with check (true);



  create policy "users can select medication"
  on "public"."medication"
  as permissive
  for select
  to public
using (true);



  create policy "users can update medication"
  on "public"."medication"
  as permissive
  for update
  to public
using (true)
with check (true);



  create policy "EXISTS (     SELECT 1     FROM pets     WHERE pets.id = pet_id "
  on "public"."pets_medication"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM public.pets
  WHERE ((pets.id = pets_medication.pet_id) AND (pets.owner_id = auth.uid())))))
with check ((EXISTS ( SELECT 1
   FROM public.pets
  WHERE ((pets.id = pets_medication.pet_id) AND (pets.owner_id = auth.uid())))));




-- Vaccins


  create policy "users can delete vaccins"
  on "public"."vaccins"
  as permissive
  for delete
  to public
using (true);



  create policy "users can insert vaccins"
  on "public"."vaccins"
  as permissive
  for insert
  to public
with check (true);



  create policy "users can select vaccins"
  on "public"."vaccins"
  as permissive
  for select
  to public
using (true);



  create policy "users can update vaccins"
  on "public"."vaccins"
  as permissive
  for update
  to public
using (true)
with check (true);



  create policy "EXISTS (     SELECT 1     FROM pets     WHERE pets.id = pet_id "
  on "public"."pets_vaccin"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM public.pets
  WHERE ((pets.id = pets_vaccin.pet_id) AND (pets.owner_id = auth.uid())))))
with check ((EXISTS ( SELECT 1
   FROM public.pets
  WHERE ((pets.id = pets_vaccin.pet_id) AND (pets.owner_id = auth.uid())))));




