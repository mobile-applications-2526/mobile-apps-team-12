import { SQLiteDatabase } from 'expo-sqlite';
import { getAllPets, addPet as addPetDb, getPetWithId } from "../db/pets";
import { ca } from 'react-native-paper-dates';
import { PetInput } from '../types';
import { supabase } from '../utils/supabase';
import { Pet, PetType } from '../types';

const getMyPets = async () => {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("No user logged in");

    const {data:pets, error: petsError} = await supabase
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

// const addPet = async ({ pet, db }: { pet: PetInput, db: SQLiteDatabase }) => {
//   try {

//     const newPet = await addPetDb(db, { name: pet.name, birthdate: pet.birthdate.toLocaleDateString(), description: pet.description });
//     return newPet;
//   }
//   catch (error) {
//     console.error('Error in PetService adding pet:', error);
//   }
// }




const getPetById = async ( petId: string) => {
  try {
   const { data} = await supabase.from("pets")    .select(`
      *,
      pets_weight!inner(
        weight!inner(*)
      ),
      pets_medication!inner(
        medication!inner(*)
      ),
      pets_vaccin!inner(
        vaccins!inner(*)
      )
    `)
    .eq("id", petId)
    .single();

       const mappedPet: Pet = {
    id: String(data.id),
    name: data.name,
    birthdate: new Date(data.birthdate),
    description: data.description,
    type: data.type as PetType,
    weight: data.pets_weight?.map((pw: any) => ({
      id: pw.weight.id,
      value: pw.weight.value,
      date: new Date(pw.weight.date),
    })) ?? [],
    medication: data.pets_medication?.map((pm: any) => ({
      id: pm.medication.id,
      name: pm.medication.name,
      description: pm.medication.description,
      quantity: pm.medication.quantity,
    })) ?? [],
    vaccins: data.pets_vaccin?.map((pv: any) => ({
      id: pv.vaccins.id,
      name: pv.vaccins.name,
      type: pv.vaccins.type,
      shot_date: pv.vaccins.shot_date ? new Date(pv.vaccins.shot_date) : undefined,
      expire_date: pv.vaccins.expire_date ? new Date(pv.vaccins.expire_date) : undefined,
    })) ?? [],
  };

  return mappedPet;

   } catch (error) {
    console.error(`Error fetching pets`, error);
    throw error;
  }

}

const PetService = { getMyPets,getPetById };

export default PetService;