import { supabase } from "../utils/supabase";

const getVaccinById = async (id: string) => {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("No user logged in");
    if (!id) throw new Error("No vaccination ID given");
    const { data: vaccination, error: vaccinationError } = await supabase
      .from("vaccins")
      .select("*")
      .eq("id", id);

    if (vaccinationError) throw vaccinationError;
    return Array.isArray(vaccination) ? vaccination : [];
  } catch (error) {
    console.error(`Error fetching vaccination`, error);
    throw error;
  }
};

const VaccinationService = { getVaccinById };

export default VaccinationService;
