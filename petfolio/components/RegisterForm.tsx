import React, { useEffect, useCallback, useState } from 'react';
import { StyleSheet, View, Text, TextInput} from "react-native";
import { useForm } from 'react-hook-form';
import { useRouter } from "expo-router";
import Button from "./Button";
import { ScrollView } from 'react-native';
export default function RegisterForm() {    
    const router = useRouter();
    const { register, handleSubmit, setValue } = useForm();
    const [isRegistered, setIsRegistered] = useState(false);
    const onSubmit = useCallback((data) => {
        if (isRegistered == false) {
            alert("you are registered");
            setIsRegistered(true);
        }
        else {setIsRegistered(false);}
    }, [])
     const onChangeField = useCallback((name) => (text) => {
        setValue(name, text);
    }, []);



    return (
        <ScrollView contentContainerStyle={{ padding: 20 }}>
            <View>
                <Text style={styles.title}>Register here</Text>
                <Text>First Name</Text>
                <TextInput style={styles.input} onChangeText={onChangeField("first-name")}/>
                <Text>Last Name</Text>
                <TextInput style={styles.input}/>
                <Text>Email</Text>
                <TextInput style={styles.input} />
                <Text>Phonenumber</Text>
                <TextInput style={styles.input}/>
                <Text>Password</Text>
                <TextInput style={styles.input} secureTextEntry={true}/>
                <Text>Confirm Password</Text>
                <TextInput style={styles.input} secureTextEntry={true}/>
            </View>
            <View style={styles.buttonContainer}>
                <Button label="register" onPress={handleSubmit(onSubmit)} />
                <Button label="cancel" onPress={() => router.navigate("/")} />
            </View>
        </ScrollView>
    )
}
const styles = StyleSheet.create({
    input: {
        borderBlockColor: "rgb(200, 200, 200)",
        borderWidth: 2,
        borderBottomWidth: 2,
        paddingVertical: 5,
        paddingHorizontal: 15,
        margin: 2
    },
    buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    },
       title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#3D3D3D",
    margin: 5,
  },
})