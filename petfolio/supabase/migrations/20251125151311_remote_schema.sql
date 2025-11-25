alter table "public"."pets" drop constraint "Pets_owner_id_fkey";

alter table "public"."pets" alter column "owner_id" set default auth.uid();

alter table "public"."pets" add constraint "pets_owner_id_fkey" FOREIGN KEY (owner_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."pets" validate constraint "pets_owner_id_fkey";


