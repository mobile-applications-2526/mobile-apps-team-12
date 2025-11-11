import { StyleSheet, Text, TextInput } from "react-native";
import { set, useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import Button from "./Button";
import { useSQLiteContext } from "expo-sqlite";
import { DatePickerModal } from "react-native-paper-dates";
import { useCallback, useState } from "react";
import PetService from "../services/PetService";

type FormDataPet = {
  petName: string;
  birthdate: Date;
  description: string;
};

export default function AddPetForm() {
  const db = useSQLiteContext(); // get DB from provider
  const { control, handleSubmit } = useForm<FormDataPet>({
    defaultValues: {
      birthdate: new Date(),
    },
  });
  const [open, setOpen] = useState(false);
  const [birthdateSelected, setBirthdateSelected]= useState(false)

  const onSubmit = async (data: FormDataPet) => {
    const pet= await PetService.addPet({pet: {petName: data.petName, birthdate: data.birthdate, description: data.description}, db});
    console.log(data);
  };
  return (
    <>
      <Text style={styles.title}>Register Pet</Text>
      <Controller
        control={control}
        name="petName"
        render={({ field: { onChange, value } }) => (
          <>
            <Text>Name of your pet</Text>
            <TextInput
              placeholder="Enter your pet's name"
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          </>
        )}
      />
      <Controller
        control={control}
        name="birthdate"
        render={({ field: { onChange, value } }) => (
          <>
            <Button
              onPress={() => setOpen(true)}
              label="Pick single date"
            ></Button>
            <DatePickerModal
              locale="en"
              mode="single"
              visible={open}
              date={value}
              onDismiss={() => setOpen(false)}
              onConfirm={({ date }) => {
                setOpen(false);
                onChange(date);
                setBirthdateSelected(true);
              }}
            />
            {birthdateSelected &&
            <Text>Selected date: {value.toDateString()}</Text>
            }
          </>
        )}
      />

      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <TextInput
            placeholder="Enter a description"
            onChangeText={onChange}
            value={value}
            style={styles.input}
          />
        )}
      />
      <Button label="Add" onPress={handleSubmit(onSubmit)} />
    </>
  );
}
const styles = StyleSheet.create({
  input: {
    borderBlockColor: "rgb(200, 200, 200)",
    borderWidth: 2,
    borderBottomWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 15,
    margin: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3D3D3D",
    margin: 3,
  },
  success: {
    color: "#00a00bff",
    marginVertical: 5,
  },
  error: {
    color: "#d20202ff",
  },
});
