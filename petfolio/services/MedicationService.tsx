import { SQLiteDatabase } from "expo-sqlite";
import { getMedById } from "../db/medications";

const getMedicationById = async (db: SQLiteDatabase, id: string) => {
    try {
        const med = await getMedById(db, id);
        return med;
    } catch (error) {
        console.error(`Error fetching medication`, error);
        throw error;
    }
}

const MedicationService = { getMedicationById };

export default MedicationService;