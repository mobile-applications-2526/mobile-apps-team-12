import { supabase } from "../utils/supabase";

const getProfileByUserId = async () => {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("No user logged in");
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (profileError) throw profileError;
    return profile;
  } catch (error) {
    console.error(`Error fetching profile`, error);
    throw error;
  }
};

const ProfileService = { getProfileByUserId };
export default ProfileService;
