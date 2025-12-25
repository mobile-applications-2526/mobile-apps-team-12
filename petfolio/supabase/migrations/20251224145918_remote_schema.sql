alter table "public"."reminder" add column "notification_id" text;

CREATE UNIQUE INDEX reminder_notification_id_key ON public.reminder USING btree (notification_id);

alter table "public"."reminder" add constraint "reminder_notification_id_key" UNIQUE using index "reminder_notification_id_key";


