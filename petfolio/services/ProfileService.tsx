import { SQLiteDatabase } from "expo-sqlite";

const getProfileByUserId = async (db: SQLiteDatabase, userId: string) => {
    try {
        const profile = await getProfileByUserId(db, userId);
        return profile;
    } catch (error) {
        console.error(`Error fetching user profile`, error);
        throw error;
    }
}

const ProfileService = { getProfileByUserId };
export default ProfileService;