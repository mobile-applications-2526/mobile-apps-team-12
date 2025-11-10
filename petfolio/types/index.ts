export type User = {
    id: string
    firstname: String,
    lastname: String,
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
    user_id: User,
    pictures: [];
}