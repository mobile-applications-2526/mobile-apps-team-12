export type User = {
    id: string
    firstName: String,
    lastName: String,
    email: String,
    phonenumber: String,
    password: String,
}

export type Pet = {
    id: string,
    name: string,
    birthdate: string,
    description: string,
    created_at: string,
    updated_at: string,
}

export type Profile = {
    id: string,
    userId: User,
    pictures: [];
}