import { SQLiteDatabase } from "expo-sqlite";
import { Profile } from "../types";

export async function getProfileByUser(db: SQLiteDatabase, userId: string): Promise<Profile> {
    try {
        const query = `
      SELECT 
        p.id as profile_id,
        p.pictures,
        u.id as user_id,
        u.firstname,
        u.lastname,
        u.email,
        u.phonenumber
      FROM profiles p
      INNER JOIN users u ON p.user_id = u.id
      WHERE u.id = '${userId}'
    `;
        const result = await db.getFirstAsync<any>(query);

        if (!result) return null;

        const profile: Profile = {
            id: result.profile_id,
            pictures: result.pictures,
            user_id: {
                id: result.user_id,
                firstname: result.firstname,
                lastname: result.lastname,
                email: result.email,
                phonenumber: result.phonenumber,
                password: result.password
            },
        };
        return profile;
    } catch (error) {
        console.error("Error getting profile:", error);
        return null;
    }
}
