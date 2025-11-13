import { SQLiteDatabase } from 'expo-sqlite';
import { getAllPets, getPetWithId } from "../db/pets";
const getPets = async (db: SQLiteDatabase) => {
    try {
        const pets = await getAllPets(db);
        return Array.isArray(pets) ? pets : [];
    } catch (error) {
        console.error(`Error fetching pets`, error);
        throw error;
    }
}


const getPetById = async (db: SQLiteDatabase, id: string) => {
    try {
        const pet = await getPetWithId(db, id);
        return pet;
    } catch (error) {
        console.error(`Error fetching pet`, error);
        throw error;
    }
}

const PetService = { getPets, getPetById };
export default PetService;