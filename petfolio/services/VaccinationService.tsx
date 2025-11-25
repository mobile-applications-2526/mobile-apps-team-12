import { SQLiteDatabase } from "expo-sqlite";
import { getVacById } from "../db/vaccinations";

const getVaccinById = async (db: SQLiteDatabase, id: string) => {
    try {
        const vac = await getVacById(db, id);
        return vac;
    } catch (error) {
        console.error(`Error fetching vaccin`, error);
        throw error;
    }
}

const VaccinationService = { getVaccinById };

export default VaccinationService;