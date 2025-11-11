import { SQLiteDatabase } from 'expo-sqlite';
import uuid from 'react-native-uuid';

interface PetInput {
    name: string;
    birthdate: string;
    description: string;
}

interface Pet extends PetInput {
    id: string;
    created_at: string;
    updated_at: string;
}

// CREATE: Add a new pet
export async function addPet(
    db: SQLiteDatabase,
    pet: PetInput
): Promise<Pet | null> {
    try {
        const petId = uuid.v4().toString();
        await db.runAsync(
            `INSERT INTO pets (id, name, birthdate, description, created_at, updated_at)
            VALUES (?, ?, ?, ?, datetime('now'), datetime('now')); `,
            [
                petId,
                pet.name,
                pet.birthdate,
                pet.description,
            ]
        );
        const newPet = await db.getFirstAsync<Pet>(
            `SELECT * FROM pets WHERE ID = ?`, [petId]
        );
        return newPet;
    } catch (error) {
        console.error('Error adding pet:', error);
        throw error;
    }
}

// READ: get All Pets
export async function getAllPets(db: SQLiteDatabase): Promise<Pet[]>{
    try {
        const query = ` select * from pets`;
        const allPets = await db.getAllAsync<Pet>(query);
        return allPets
    } catch (error) {
    console.error("Error getting all pets:", error);
    return [];
    }; 
}