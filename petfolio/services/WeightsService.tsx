import { Weight } from "../types";
import { supabase } from "../utils/supabase";

const addWeightToPet = async (petId: string, value: string, date: string) => {
  try {
    const { data: weight, error: weightError } = await supabase
      .from("weight")
      .insert({ value, date })
      .select()
      .single();

    if (weightError) throw weightError;

    const { error: linkError } = await supabase
      .from("pets_weight")
      .insert({
        pet_id: Number(petId),     
        weight_id: weight.id,      
      });

    if (linkError) {
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

const WeightsService = { getWeights, addWeightToPet };

export default WeightsService;