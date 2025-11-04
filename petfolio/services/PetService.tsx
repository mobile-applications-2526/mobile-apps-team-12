import { SQLiteDatabase } from 'expo-sqlite';
import {getAllPets} from "../db/pets";
const getPets = async (db: SQLiteDatabase) => {
    try {
            const pets = await getAllPets(db);
            return Array.isArray(pets) ? pets : [];
        } catch (error) {
            console.error(`Error fetching pets`, error);
            throw error;
        }
    }

const PetService = { getPets };
export default PetService;