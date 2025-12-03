import { getMedById } from "../db/medications";
import { Medication } from "../types";
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

const addMedicationToPet = async (petId: string, name: string, description: string, quantity: string): Promise<Medication> => {
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

    const { data: medication, error: medicationError } = await supabase
      .from("medication")
      .insert({ name, description, quantity })
      .select()
      .single();

    if (medicationError) {
      console.error("Medication insert failed:", medicationError);
      throw medicationError;
    }

    console.log("Medication inserted:", medication);

    const { error: linkError } = await supabase
      .from("pets_medication")
      .insert({
        pet_id: Number(petId),
        medication_id: medication.id,
      });

    if (linkError) {
      console.error("Linking medication to pet failed:", linkError);
      await supabase.from("medication").delete().eq("id", medication.id);
      throw linkError;
    }

    return {
      id: medication.id,
      name: medication.name,
      description: medication.description,
      quantity: medication.quantity,
    };
  } catch (error) {
    console.error("Error in addMedicationToPet:", error);
    throw error;
  }
};

const updateMedication = async (medicationId: string, updatedMedication: { name?: string; description?: string; quantity?: string; }) => {
  try {
    const { data, error } = await supabase
      .from("medication")
      .update(updatedMedication)
      .eq("id", Number(medicationId))
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error updating medication`, error);
    throw error;
  }
};

const deleteMedication = async (medicationId: string) => {
  try {
    const { error: linkError } = await supabase
      .from("pets_medication")
      .delete()
      .eq("medication_id", medicationId);

    if (linkError) {
      console.error("Failed to delete medication link:", linkError);
      throw linkError;
    }

    const { error: medicationError } = await supabase
      .from("medication")
      .delete()
      .eq("id", medicationId);

    if (medicationError) {
      console.error("Failed to delete medication:", medicationError);
      throw medicationError;
    }

    console.log("Medication deleted successfully:", medicationId);
  } catch (error) {
    console.error("Error deleting medication:", error);
    throw error;
  }
};

const MedicationService = { getMedicationById, addMedicationToPet, updateMedication, deleteMedication };

export default MedicationService;
