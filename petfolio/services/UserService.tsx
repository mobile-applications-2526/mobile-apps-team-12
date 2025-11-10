import { SQLiteDatabase } from "expo-sqlite";
import { getAllUsers } from "../db/users";


const registerUser = async (userData) => {
    try {
        const response = await fetch(
            process.env.NEXT_PUBLIC_API_URL + "/users/register",
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(userData),
            }
        );

        if (!response || !response.ok) {
            // Throw a clear error so callers can handle failures explicitly
            const text = await (response?.text?.() || Promise.resolve(""));
            throw new Error(
                `Failed to sign up user: ${response?.status ?? "no-response"} ${text}`
            );
        }

        return response;
    } catch (error) {
        console.error(error);
        // Re-throw so callers don't receive undefined and can handle errors.
        throw error;
    }
};

const getUsers = async (db: SQLiteDatabase) => {
    try {
        const users = await getAllUsers(db);
        return Array.isArray(users) ? users : [];
    } catch (error) {
        console.error(`Error fetching users`, error);
        throw error;
    }
}

const UserService = { registerUser, getUsers }
export default UserService;