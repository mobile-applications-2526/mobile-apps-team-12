
  create policy "Profile can be made when user registers"
  on "public"."profiles"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Users are able to add userinformation"
  on "public"."user_information"
  as permissive
  for insert
  to authenticated
with check (true);



  create policy "Users can delete their own user_information"
  on "public"."user_information"
  as permissive
  for delete
  to public
using ((( SELECT auth.uid() AS uid) = auth_user_id));



