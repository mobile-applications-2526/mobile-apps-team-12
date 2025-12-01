
  create policy "users can delete food"
  on "public"."food"
  as permissive
  for delete
  to public
using (true);



  create policy "users can insert food"
  on "public"."food"
  as permissive
  for insert
  to public
with check (true);



  create policy "users can select food"
  on "public"."food"
  as permissive
  for select
  to public
using (true);



  create policy "users can update food"
  on "public"."food"
  as permissive
  for update
  to public
using (true)
with check (true);



  create policy "EXISTS (     SELECT 1     FROM pets     WHERE pets.id = pet_id "
  on "public"."pets_food"
  as permissive
  for update
  to public
using ((EXISTS ( SELECT 1
   FROM public.pets
  WHERE ((pets.id = pets_food.pet_id) AND (pets.owner_id = auth.uid())))))
with check ((EXISTS ( SELECT 1
   FROM public.pets
  WHERE ((pets.id = pets_food.pet_id) AND (pets.owner_id = auth.uid())))));



  create policy "Users can delete food links for their pets"
  on "public"."pets_food"
  as permissive
  for delete
  to public
using ((EXISTS ( SELECT 1
   FROM public.pets
  WHERE ((pets.id = pets_food.pet_id) AND (pets.owner_id = auth.uid())))));



  create policy "Users can insert food links for their pets"
  on "public"."pets_food"
  as permissive
  for insert
  to public
with check ((EXISTS ( SELECT 1
   FROM public.pets
  WHERE ((pets.id = pets_food.pet_id) AND (pets.owner_id = auth.uid())))));



  create policy "Users can select food links for their pets"
  on "public"."pets_food"
  as permissive
  for select
  to public
using ((EXISTS ( SELECT 1
   FROM public.pets
  WHERE ((pets.id = pets_food.pet_id) AND (pets.owner_id = auth.uid())))));



