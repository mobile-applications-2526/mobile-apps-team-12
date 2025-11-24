import { SQLiteDatabase } from 'expo-sqlite';
import uuid from 'react-native-uuid';
import { Medication, Pet, Vaccin, Weight } from '../types';

interface PetInput {
    name: string;
    birthdate: string;
    description: string;
}

// interface Pet extends PetInput {
//     id: string;
//     created_at: string;
//     updated_at: string;
// }

// CREATE: Add a new pet
export async function addPet(
    db: SQLiteDatabase,
    pet: PetInput
): Promise<Pet | null> {
    try {
        const petId = uuid.v4().toString();
        await db.runAsync(
            `INSERT INTO pets (id, name, birthdate, description)
            VALUES (?, ?, ?, ?); `,
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
export async function getAllPets(db: SQLiteDatabase): Promise<Pet[]> {
    try {
        const query = ` select * from pets`;
        const allPets = await db.getAllAsync<Pet>(query);
        return allPets
    } catch (error) {
        console.error("Error getting all pets:", error);
        return [];
    };
}

export async function getPetWithId(db: SQLiteDatabase, id: string): Promise<Pet> {
    try {
        const query = `select * from pets where id = '${id}'`;
        const petId = await db.getFirstAsync<Pet>(query);

        const queryWeight = `
        SELECT w.id, w.value, w.date
        FROM weight w
        INNER JOIN pets_weight pw ON pw.weight_id = w.id
        WHERE pw.pet_id = '${id}';`;
        const weight = await db.getAllAsync<Weight>(queryWeight);

        const vaccinQuery = `
        SELECT v.id, v.name, v.type, v.shot_date, v.expire_date
        FROM vaccins v
        INNER JOIN pets_vaccins pv ON pv.vaccin_id = v.id
        WHERE pv.pet_id = '${id}';`;
        const vaccins = await db.getAllAsync<Vaccin>(vaccinQuery);

        const medicationQuery = `
        SELECT m.id, m.name, m.description, m.quantity
        FROM medications m
        INNER JOIN pets_medications pm ON pm.medication_id = m.id
        WHERE pm.pet_id = '${id}';`;
        const medication = await db.getAllAsync<Medication>(medicationQuery);

        const pet: Pet = {
            ...petId,
            vaccins,
            medication,
            weight
        };
        return pet
    } catch (error) {
        console.error("Error getting pet:", error);
        return null;
    };
}