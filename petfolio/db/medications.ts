import { SQLiteDatabase } from "expo-sqlite";
import { Medication } from "../types";

export async function getMedById(db: SQLiteDatabase, id: string): Promise<Medication> {
    try {
        const query = `select * from medications where id = '${id}'`;
        const medication = await db.getFirstAsync<Medication>(query);
        return medication
    } catch (error) {
        console.error("Error getting medication:", error);
        return null;
    };
}