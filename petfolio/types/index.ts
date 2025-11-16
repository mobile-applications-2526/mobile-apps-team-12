export type User = {
    firstName : String,
    lastName: String,
    email: String,
    phonenumber: String,
    password: String,
}

export type Pet = {
    id: string,
    name: string,
    birthdate: Date,
    description: string,
}

export type PetInput = {
    name: string,
    birthdate: Date,
    description: string,
}