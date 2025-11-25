export enum PetType {
    Cat = 'Cat',
    Dog = 'Dog',
    Rabbit = 'Rabbit',
    Fish = 'Fish',
    Hamster = 'Hamster',
    Bird = 'Bird'
}

export type User = {
    id: string
    firstname: String,
    lastname: String,
    email: String,
    phonenumber: String,
    password: String,
}

export type Weight = {
    id: string,
    value: string,
    date: string
}

export type Medication = {
    id: string,
    name: string,
    description: string,
    quantity: string
}

export type Vaccin = {
    id: string,
    name: string,
    type: string,
    shot_date: string,
    expire_date: string
}

export type Pet = {
    id: string,
    name: string,
    birthdate: Date,
    description: string,
    type?: PetType,
    vaccins?: Vaccin[],
    medication?: Medication[],
    weight?: Weight[]
}

export type PetInput = {
    name: string,
    birthdate: Date,
    description: string,


}

export type Profile = {
    id: string,
    user_id: User,
    pictures: [];

}