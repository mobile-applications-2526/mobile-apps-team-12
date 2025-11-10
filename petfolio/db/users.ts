import { SQLiteDatabase } from "expo-sqlite";
import { User } from "../types";

export async function getAllUsers(db: SQLiteDatabase): Promise<User[]> {
    try {
        const query = ` select * from users`;
        const allUsers = await db.getAllAsync<User>(query);
        return allUsers
    } catch (error) {
        console.error("Error getting all users:", error);
        return [];
    };
}