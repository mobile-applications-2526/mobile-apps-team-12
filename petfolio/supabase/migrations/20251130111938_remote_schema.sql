
  create policy "Users can delete own profile"
  on "public"."profiles"
  as permissive
  for delete
  to public
using ((auth.uid() = user_id));



  create policy "Users can update own profile"
  on "public"."profiles"
  as permissive
  for update
  to public
using ((auth.uid() = user_id))
with check ((auth.uid() = user_id));



  create policy "Users can view own profile"
  on "public"."profiles"
  as permissive
  for select
  to public
using ((auth.uid() = user_id));



  create policy "Users can view own user information"
  on "public"."user_information"
  as permissive
  for select
  to public
using ((auth.uid() = auth_user_id));



