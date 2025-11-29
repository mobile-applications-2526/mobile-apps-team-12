import React, { useEffect, useCallback, useState } from 'react';
import { StyleSheet, View, Text, TextInput} from "react-native";
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from "expo-router";
import Button from "./Button";
import UserService from "../services/UserService"
export default function LoginForm() {    
    const router = useRouter();
    const { control, handleSubmit, watch, formState: { errors } } = useForm();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInError, setLoggedInError] = useState("");
    const onSubmit = useCallback(async (data) => {
        const { confirmPassword, ...userData } = data; //confirmPassword is not data we need to send to the backend
        console.log(userData);
        try {
            const response = await UserService.loginUser(userData);
            if (response) {
                setIsLoggedIn(true);
                setTimeout(() => router.navigate("/homepage"), 2000);
            }
        } catch (error) {
            // network or server error; show friendly message
            console.error(error);
            setLoggedInError(
                "Network or server error. Please check your connection and try again."
            );
        }

    }, [])

    return (
        <View>
            <View>
                <Text style={styles.title}>Log in here</Text>
                {loggedInError && <Text style={styles.error}>{loggedInError}</Text>}
                {isLoggedIn && <Text style={styles.success}>Login succesfull!</Text>}
                    <Text>Email*</Text>
                    <Controller
                        control={control}
                        name="email"
                        rules={{ required: {value: true, message: "This field is required"}, 
                            pattern: {
                                value: /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/,
                                message: 'Please enter a valid email address',
                                },
                        }}
                        render={({ field: { onChange, value }, fieldState: {error} }) => (
                            <>
                        <TextInput
                            style={styles.input}
                            onChangeText={onChange}
                            value={value}
                        />
                        {error && <Text style={styles.error}>{error.message}</Text>}
                        </>
                        )}
                    />
                    <Text>Password*</Text>
                    <Controller
                        control={control}
                        name="password"
                        rules={{ required: {value: true, message: "This field is required"}}}
                       render={({ field: { onChange, value }, fieldState: {error} }) => (
                            <>
                            <TextInput
                                style={styles.input}
                                onChangeText={onChange}
                                value={value}
                                secureTextEntry={true}
                            />
                            {error && <Text style={styles.error}>{error.message}</Text>}
                            </>
                            )}
                    />
            </View>
            <View style={styles.buttonContainer}>
                <Button label="login" onPress={handleSubmit(onSubmit)} />
                <Button label="cancel" onPress={() => router.navigate("/")} />
            </View>
            </View>
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