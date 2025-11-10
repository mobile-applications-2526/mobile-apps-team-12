import { SQLiteDatabase } from "expo-sqlite";
import { getProfileByUser } from "../db/profile";

const getProfileByUserId = async (db: SQLiteDatabase, userId: string) => {
    try {
        const profile = await getProfileByUser(db, userId);
        return profile;
    } catch (error) {
        console.error(`Error fetching user profile`, error);
        throw error;
    }
}

const ProfileService = { getProfileByUserId };
export default ProfileService;