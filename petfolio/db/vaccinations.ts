import { SQLiteDatabase } from "expo-sqlite";
import { Vaccin } from "../types";

export async function getVacById(db: SQLiteDatabase, id: string): Promise<Vaccin> {
    try {
        const query = `select * from vaccins where id = '${id}'`;
        const vaccins = await db.getFirstAsync<Vaccin>(query);
        return vaccins
    } catch (error) {
        console.error("Error getting vaccins:", error);
        return null;
    };
}