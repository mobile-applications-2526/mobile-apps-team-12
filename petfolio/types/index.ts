export enum PetType {
  Cat = "Cat",
  Dog = "Dog",
  Rabbit = "Rabbit",
  Fish = "Fish",
  Hamster = "Hamster",
  Bird = "Bird",
}

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  password: string;
};

export type Weight = {
  id: string;
  value: string;
  date: string;
};

export type Medication = {
  id: string;
  name: string;
  description: string;
  quantity: string;
};

export type Vaccin = {
  id: string;
  name: string;
  type: string;
  shot_date: Date;
  expire_date: Date;
};

export type Food = {
  id: string;
  name: string;
  description: string;
  quantity: string;
};

export type Pet = {
  id: string;
  name: string;
  birthdate: Date;
  description: string;
  type?: PetType;
  vaccins?: Vaccin[];
  medication?: Medication[];
  weight?: Weight[];
  food?: Food[];
};

export type PetInput = {
  name: string;
  birthdate: Date;
  description: string;
  type: PetType;
};

export type Profile = {
  id: string;
  user_id: string;
  firstname: string;
  lastname: string;
  email: string;
  phonenumber: string;
  pictures: [];
};
