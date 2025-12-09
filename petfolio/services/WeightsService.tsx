import { Weight } from "../types";
import { supabase } from "../utils/supabase";

const addWeightToPet = async (petId: string, value: string, date: string) => {
  try {
    // Verify the user owns this pet first
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

    // Insert weight
    const { data: weight, error: weightError } = await supabase
      .from("weight")
      .insert({ value, date })
      .select()
      .single();

    if (weightError) {
      console.error("Weight insert failed:", weightError);
      throw weightError;
    }

    console.log("Weight inserted:", weight);

    // Link weight to pet
    const { error: linkError } = await supabase
      .from("pets_weight")
      .insert({
        pet_id: Number(petId),
        weight_id: weight.id,
      });

    if (linkError) {
      console.error("Link insert failed:", linkError);
      await supabase.from("weight").delete().eq("id", weight.id);
      throw linkError;
    }

    return {
      id: weight.id,
      value: weight.value,
      date: weight.date,
    };
  } catch (error) {
    console.error("Error adding weight:", error);
    throw error;
  }
};

const getWeights = async (petId: string) => {
  const { data, error } = await supabase
    .from("pets_weight")
    .select("weight (*)")
    .eq("pet_id", petId);

  if (error) throw error;
  return data.map((item: any) => item.weight);
};

const deleteWeight = async (weightId: string) => {
  try{
// pets_weights record will also be deleted once weightId is gone. (delete Cascade)

    const {error: weightError } = await supabase
      .from("weight")
      .delete()
      .eq("id", weightId);
  
    if(weightError){
      console.error("Failed to delete weight:", weightError);
      throw weightError;
    }

    console.log("Weight deleted successfully:", weightId);
  }catch(error){
    console.error("Error deleting weight:", error);
    throw error;
  }
};

const WeightsService = { getWeights, addWeightToPet, deleteWeight };

export default WeightsService;