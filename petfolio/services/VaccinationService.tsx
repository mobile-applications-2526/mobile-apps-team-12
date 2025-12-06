import { Vaccin } from "../types";
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

const addVaccinToPet = async (petId: string, name: string, type: string, shot_date: Date, expire_date: Date): Promise<Vaccin> => {
  try {
    const { data: petCheck, error: petCheckError } = await supabase
      .from("pets")
      .select("id, owner_id")
      .eq("id", Number(petId))
      .single();

    if (petCheckError) {
      console.error("Pet check failed:", petCheckError);
      throw new Error("Could not verify pet ownership");
    }

    console.log("Pet check passed:", petCheck);

    const { data: vaccin, error: vaccinError } = await supabase
      .from("vaccins")
      .insert({ name, type, shot_date, expire_date })
      .select()
      .single();

    if (vaccinError) {
      console.error("Vaccin insert failed:", vaccinError);
      throw vaccinError;
    }

    console.log("Vaccin inserted:", vaccin);

    const { error: linkError } = await supabase
      .from("pets_vaccin")
      .insert({
        pet_id: Number(petId),
        vaccin_id: vaccin.id,
      });

    if (linkError) {
      console.error("Linking vaccin to pet failed:", linkError);
      await supabase.from("vaccin").delete().eq("id", vaccin.id);
      throw linkError;
    }

    return {
      id: vaccin.id,
      name: vaccin.name,
      type: vaccin.type,
      shot_date: vaccin.shot_date,
      expire_date: vaccin.expire_date
    };
  } catch (error) {
    console.error("Error in addVaccinToPet:", error);
    throw error;
  }
};
const deleteVaccin = async (vaccinationId: string) => {
    try{
// pets_vaccin record will also be deleted once vaccinId is gone. (delete Cascade)

        const {error: vaccinationError} = await supabase
            .from("vaccins")
            .delete()
            .eq("id", vaccinationId);
        
        if(vaccinationError){
            console.error("Failed to delete vaccination:", vaccinationError);
            throw vaccinationError;
        }

        console.log("vaccination deleted successfully:", vaccinationId);
    }catch(error){
        console.error("Error deleting vaccination:", error);
        throw error;
    }
};

const VaccinationService = { getVaccinById, addVaccinToPet, deleteVaccin };

export default VaccinationService;
