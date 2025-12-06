import { ca } from "react-native-paper-dates";
import { PetInput } from "../types";
import { supabase } from "../utils/supabase";
import { Pet, PetType } from "../types";
import FoodService from "./FoodService";
import MedicationService from "./MedicationService";
import WeightsService from "./WeightsService";
import VaccinationService from "./VaccinationService";

const getMyPets = async () => {
  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("No user logged in");

    const { data: pets, error: petsError } = await supabase
      .from("pets")
      .select("*")
      .eq("owner_id", user.id);

    if (petsError) throw petsError;
    return Array.isArray(pets) ? pets : [];
  } catch (error) {
    console.error(`Error fetching pets`, error);
    throw error;
  }
};

const addPet = async ({ pet }: { pet: PetInput }) => {
  try {
        const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("No user logged in");

    const payload = {
      name: pet.name,
      birthdate: pet.birthdate ?? null,
      description: pet.description ?? null,
      type: pet.type ?? null,
      owner_id: user.id,
    };

    const { data: insertedPets, error: insertError } = await supabase
      .from("pets")
      .insert(payload)
      .select() // ask PostgREST to return the inserted row(s)
      .single();

    if (insertError) throw insertError;
    if (!insertedPets || !insertedPets.id) {
      throw new Error("Failed to create pet (no id returned)");
    }

        const fullPet = await getPetById(String(insertedPets.id));
    return fullPet;
  }
  catch (error) {
        console.error("Error adding pet", error);
    throw error;
  }
}

const getPetById = async (petId: string) => {
  try {
    const { data } = await supabase
      .from("pets")
      .select(
        `
    *,
    pets_weight(
      weight(*)
    ),
    pets_medication(
      medication(*)
    ),
    pets_vaccin(
      vaccins(*)
    ),
    pets_food(
      food(*)
    )
  `
      )
      .eq("id", petId)
      .single();

    const mappedPet: Pet = {
      id: String(data.id),
      name: data.name,
      birthdate: data.birthdate,
      description: data.description,
      type: data.type as PetType,
      weight:
        data.pets_weight?.map((pw: any) => ({
          id: pw.weight.id,
          value: pw.weight.value,
          date: pw.weight.date,
        })) ?? [],
      medication:
        data.pets_medication?.map((pm: any) => ({
          id: pm.medication.id,
          name: pm.medication.name,
          description: pm.medication.description,
          quantity: pm.medication.quantity,
        })) ?? [],
      vaccins:
        data.pets_vaccin?.map((pv: any) => ({
          id: pv.vaccins.id,
          name: pv.vaccins.name,
          type: pv.vaccins.type,
          shot_date: pv.vaccins.shot_date ? pv.vaccins.shot_date : undefined,
          expire_date: pv.vaccins.expire_date
            ? pv.vaccins.expire_date
            : undefined,
        })) ?? [],
      food:
        data.pets_food?.map((pf: any) => ({
          id: pf.food.id,
          name: pf.food.name,
          description: pf.food.description,
          quantity: pf.food.quantity,
        })) ?? [],
    };
    return mappedPet;
  } catch (error) {
    console.error(`Error fetching pets`, error);
    throw error;
  }
};

const deletePetAndExtras = async (petData: Pet) => {
  try {
    await Promise.all([
      ...(petData.food || []).map(f => 
        FoodService.deleteFood(f.id).then(() => 
          console.log("deleted food:", f.name)
        )
      ),
      ...(petData.medication || []).map(m => 
        MedicationService.deleteMedication(m.id).then(() => 
          console.log("deleted meds:", m.name)
        )
      ),
      ...(petData.vaccins || []).map(v => 
        VaccinationService.deleteVaccin(v.id).then(() => 
          console.log("deleted vaccin:", v.name)
        )
      ),
      ...(petData.weight || []).map(w => 
        WeightsService.deleteWeight(w.id).then(() => 
          console.log("deleted weight:", w.value)
        )
      )
    ]);
    const {error} = await supabase
    .from("pets")
    .delete()
    .eq("id", petData.id);
    if (error) {
      throw error;
    }
  } catch (err) {
        console.error(`Error deleting pet`, err);
    throw err;
  }
}

const PetService = { getMyPets, getPetById, addPet, deletePetAndExtras };

export default PetService;
