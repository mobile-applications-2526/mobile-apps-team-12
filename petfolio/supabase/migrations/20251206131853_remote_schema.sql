alter table "public"."pets_food" drop constraint "pets_food_food_id_fkey";

alter table "public"."pets_food" drop constraint "pets_food_pet_id_fkey";

alter table "public"."profiles" drop constraint "profiles_user_id_fkey";

alter table "public"."pets_food" add constraint "pets_food_food_id_fkey" FOREIGN KEY (food_id) REFERENCES public.food(id) ON DELETE CASCADE not valid;

alter table "public"."pets_food" validate constraint "pets_food_food_id_fkey";

alter table "public"."pets_food" add constraint "pets_food_pet_id_fkey" FOREIGN KEY (pet_id) REFERENCES public.pets(id) ON DELETE CASCADE not valid;

alter table "public"."pets_food" validate constraint "pets_food_pet_id_fkey";

alter table "public"."profiles" add constraint "profiles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.user_information(auth_user_id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_user_id_fkey";


  create policy "Enable delete for users based on user_id"
  on "public"."pets"
  as permissive
  for delete
  to public
using ((( SELECT auth.uid() AS uid) = owner_id));



