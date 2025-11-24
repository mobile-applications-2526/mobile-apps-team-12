import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { set, useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import Button from "./Button";
import { useSQLiteContext } from "expo-sqlite";
import { DatePickerModal } from "react-native-paper-dates";
import { useCallback, useState } from "react";
import PetService from "../services/PetService";
import Ionicons from "@react-native-vector-icons/ionicons";

type FormDataPet = {
  petName: string;
  birthdate: Date;
  description: string;
};

export default function AddPetForm() {
  const [errors, setErrors] = useState<string | null>(null);
  const db = useSQLiteContext(); // get DB from provider
  const { control, handleSubmit } = useForm<FormDataPet>({
    defaultValues: {
      birthdate: new Date(),
    },
  });
  const [open, setOpen] = useState(false);
  const [birthdateSelected, setBirthdateSelected] = useState(false);

  const onSubmit = async (data: FormDataPet) => {
    try {
      const newPet = await PetService.addPet({
        pet: {
          name: data.petName,
          birthdate: data.birthdate,
          description: data.description,
        },
        db,
      });
      console.log(data);
      console.log(newPet);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Register Pet</Text>
      <Controller
        control={control}
        name="petName"
        render={({ field: { onChange, value } }) => (
          <>
            <Text>Name:</Text>
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
            <Text>Birthdate:</Text>
            <View style={styles.dateContainer}>
              
                {birthdateSelected && <Text >{value.toLocaleDateString()}</Text>}
                {!birthdateSelected && (
                  <Text style={styles.dateText}>
                    Select your pet's birthday
                  </Text>
                )}
                <TouchableOpacity onPress={() => setOpen(true)}>
                  <Ionicons
                    name="calendar-number-outline"
                    size={30}
                    color="rgba(0, 28, 5, 1)"
                  />
                </TouchableOpacity>
            </View>
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
          </>
        )}
      />
      <Controller
        control={control}
        name="description"
        render={({ field: { onChange, value } }) => (
          <>
            <Text>Description:</Text>
            <TextInput
              placeholder="Enter a description"
              onChangeText={onChange}
              value={value}
              style={styles.input}
            />
          </>
        )}
      />
      
      <Button label="Add" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    borderColor: "rgb(200, 200, 200)",
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 5,
  },
  dateContainer: {
    borderColor: "rgb(200, 200, 200)",
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    color: "#3C3C434C",
    margin: 5
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
