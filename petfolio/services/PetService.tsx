import { SQLiteDatabase } from 'expo-sqlite';
import { getAllPets, addPet as addPetDb } from "../db/pets";
import { ca } from 'react-native-paper-dates';
import {  PetInput } from '../types';




const getPets = async (db: SQLiteDatabase) => {
  try {
    const pets = await getAllPets(db);
    return Array.isArray(pets) ? pets : [];
  } catch (error) {
    console.error(`Error fetching pets`, error);
    throw error;
  }
};

const addPet = async ({pet,db}: {pet: PetInput, db: SQLiteDatabase}) => {
    try {
        const newPet = await addPetDb(db,{name: pet.name, birthdate: pet.birthdate.toLocaleDateString(), description: pet.description});
        return newPet;
    }
    catch (error) {
        console.error('Error in PetService adding pet:', error);
    }
}

const PetService = { getPets, addPet };
export default PetService;