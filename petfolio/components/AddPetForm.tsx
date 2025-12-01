import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import Button from "./Button";
import { DatePickerModal } from "react-native-paper-dates";
import { useState } from "react";
import PetService from "../services/PetService";
import Ionicons from "@react-native-vector-icons/ionicons";
import { PetType } from "../types";
import { useRouter } from "expo-router";

type FormDataPet = {
  petName: string;
  birthdate: Date;
  description: string;
  type: PetType;
};

export default function AddPetForm() {
  const router = useRouter();
  const [errors, setErrors] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const { control, handleSubmit } = useForm<FormDataPet>({
    defaultValues: {
      birthdate: new Date(),
      type: null,
    },
  });
  const [open, setOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [birthdateSelected, setBirthdateSelected] = useState(false);

  const onSubmit = async (data: FormDataPet) => {
    setErrors(null);
    setMessage(null);
    try {
      const newPet = await PetService.addPet({
        pet: {
          name: data.petName,
          birthdate: data.birthdate,
          description: data.description,
          type: data.type,
        },
      });
      console.log(data);
      console.log(newPet);
      setMessage("Pet added succesfully!");
      setTimeout(() => router.navigate("/homepage"), 2000);
    } catch (error) {
      setErrors(error);
      console.log(error);
    }
  };

  return (
    <View>
      {message && <Text style={styles.success} >{message}</Text>}
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
              {birthdateSelected && <Text>{value.toLocaleDateString()}</Text>}
              {!birthdateSelected && (
                <Text style={styles.dateText}>Select your pet's birthday</Text>
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
      <Controller
        control={control}
        name="type"
        render={({ field: { onChange, value } }) => (
          <>
            <Text>Type:</Text>

            <TouchableOpacity
              style={styles.selectBox}
              onPress={() => setTypeOpen(true)}
            >
              <Text>{value || "Select pet type"}</Text>
              <Ionicons
                name="chevron-down-outline"
                size={24}
                color="rgba(0, 28, 5, 1)"
              />
            </TouchableOpacity>

            {/* Modal list for selecting pet type */}
            {typeOpen && (
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  {Object.values(PetType).map((petType) => (
                    <TouchableOpacity
                      key={petType}
                      style={styles.modalItem}
                      onPress={() => {
                        onChange(petType);
                        setTypeOpen(false);
                      }}
                    >
                      <Text style={styles.modalItemText}>{petType}</Text>
                    </TouchableOpacity>
                  ))}
                  <TouchableOpacity
                    onPress={() => setTypeOpen(false)}
                    style={styles.closeButton}
                  >
                    <Text style={{ color: "white" }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
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
    margin: 5,
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
  selectBox: {
    borderColor: "rgb(200, 200, 200)",
    borderWidth: 2,
    paddingVertical: 10,
    paddingHorizontal: 10,
    margin: 5,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "70%",
  },

  modalItem: {
    paddingVertical: 12,
  },

  modalItemText: {
    fontSize: 18,
  },

  closeButton: {
    marginTop: 15,
    backgroundColor: "#444",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
});
