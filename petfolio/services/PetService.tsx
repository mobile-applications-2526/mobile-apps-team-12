import { SQLiteDatabase } from 'expo-sqlite';
import {getAllPets, addPet as addPetDb} from "../db/pets";
import { ca } from 'react-native-paper-dates';



const getPets = async (db: SQLiteDatabase) => {
    try {
            const pets = await getAllPets(db);
            return Array.isArray(pets) ? pets : [];
        } catch (error) {
            console.error(`Error fetching pets`, error);
            throw error;
        }
    }

const addPet = async ({ pet, db}) =>  {
    try {
        const newPet = await addPetDb(db,pet);
        return newPet;
    }
    catch (error) {
        console.error('Error adding pet:', error);
        throw error;
    }
}

const PetService = { getPets, addPet };
export default PetService;