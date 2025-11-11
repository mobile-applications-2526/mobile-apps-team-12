import { StyleSheet, Text, TextInput } from "react-native";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import Button from "./Button";

export default function AddPetForm() {
    const {control, handleSubmit } = useForm();
    const onSubmit = (data) => {
        // add pet to local database SQLite (to be implemented later)
        console.log(data);
    }
    return (
        <>
        <Text style={styles.title}>Register Pet</Text>
        <Controller
        control = {control}
        name="petName"
        render={({ field }) => (
          <TextInput
            {...field}
            style={styles.input}
            placeholder="Enter pet name"
          />
        )}/>
        <Button label="Add" onPress={handleSubmit(onSubmit)} />
        </>
    )
}
const styles = StyleSheet.create({
    input: {
        borderBlockColor: "rgb(200, 200, 200)",
        borderWidth: 2,
        borderBottomWidth: 2,
        paddingVertical: 5,
        paddingHorizontal: 15,
        margin: 1
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "#3D3D3D",
        margin: 3,
    },
    success: {
        color:  "#00a00bff",
        marginVertical: 5
    },
    error: {
        color:  "#d20202ff",
    },
})