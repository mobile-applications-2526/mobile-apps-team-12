alter table "public"."pets_food" drop constraint "pets_food_food_id_fkey";

alter table "public"."pets_food" drop constraint "pets_food_pet_id_fkey";

alter table "public"."pets_medication" drop constraint "pets_medication_medication_id_fkey";

alter table "public"."pets_medication" drop constraint "pets_medication_pet_id_fkey";

alter table "public"."pets_vaccin" drop constraint "pets_vaccin_pet_id_fkey";

alter table "public"."pets_vaccin" drop constraint "pets_vaccin_vaccin_id_fkey";

alter table "public"."pets_weight" drop constraint "pets_weight_pet_id_fkey";

alter table "public"."pets_weight" drop constraint "pets_weight_weight_id_fkey";

alter table "public"."pets_food" add constraint "pets_food_food_id_fkey" FOREIGN KEY (food_id) REFERENCES public.food(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."pets_food" validate constraint "pets_food_food_id_fkey";

alter table "public"."pets_food" add constraint "pets_food_pet_id_fkey" FOREIGN KEY (pet_id) REFERENCES public.pets(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."pets_food" validate constraint "pets_food_pet_id_fkey";

alter table "public"."pets_medication" add constraint "pets_medication_medication_id_fkey" FOREIGN KEY (medication_id) REFERENCES public.medication(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."pets_medication" validate constraint "pets_medication_medication_id_fkey";

alter table "public"."pets_medication" add constraint "pets_medication_pet_id_fkey" FOREIGN KEY (pet_id) REFERENCES public.pets(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."pets_medication" validate constraint "pets_medication_pet_id_fkey";

alter table "public"."pets_vaccin" add constraint "pets_vaccin_pet_id_fkey" FOREIGN KEY (pet_id) REFERENCES public.pets(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."pets_vaccin" validate constraint "pets_vaccin_pet_id_fkey";

alter table "public"."pets_vaccin" add constraint "pets_vaccin_vaccin_id_fkey" FOREIGN KEY (vaccin_id) REFERENCES public.vaccins(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."pets_vaccin" validate constraint "pets_vaccin_vaccin_id_fkey";

alter table "public"."pets_weight" add constraint "pets_weight_pet_id_fkey" FOREIGN KEY (pet_id) REFERENCES public.pets(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."pets_weight" validate constraint "pets_weight_pet_id_fkey";

alter table "public"."pets_weight" add constraint "pets_weight_weight_id_fkey" FOREIGN KEY (weight_id) REFERENCES public.weight(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."pets_weight" validate constraint "pets_weight_weight_id_fkey";


