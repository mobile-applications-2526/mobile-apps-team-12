import { getMedById } from "../db/medications";
import { supabase } from "../utils/supabase";

const getMedicationById = async (medId: string) => {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("No user logged in");
    if (!medId) throw new Error("No medication ID given");
    const { data: medication, error: medicationError } = await supabase
      .from("medication")
      .select("*")
      .eq("id", medId);

    if (medicationError) throw medicationError;
    return Array.isArray(medication) ? medication : [];
  } catch (error) {
    console.error(`Error fetching medication`, error);
    throw error;
  }
};

const MedicationService = { getMedicationById };

export default MedicationService;
