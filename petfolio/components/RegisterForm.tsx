import React, { useEffect, useCallback, useState } from 'react';
import { StyleSheet, View, Text, TextInput} from "react-native";
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from "expo-router";
import Button from "./Button";
import { ScrollView } from 'react-native';
export default function RegisterForm() {    
    const router = useRouter();
    const { control, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch('password'); //watch password for validation
    const [isRegistered, setIsRegistered] = useState(false);
    const onSubmit = useCallback((data) => {
        console.log(data);
        setIsRegistered(true);
    }, [])


    return (
        <ScrollView contentContainerStyle={{ paddingVertical: 90, paddingHorizontal: 10 }}>
            <View>
                <Text style={styles.title}>Register here</Text>
                {isRegistered && <Text style={styles.success}>Registration succesfull!</Text>}
                <Text>First Name*</Text>
                <Controller
                        control={control}
                        name="firstName"
                        rules={{ required: {value: true, message: "This field is required"}, minLength: {value: 2, message: "First Name needs at least 2 characters"} }}
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
                    <Text>Last Name*</Text>
                    <Controller
                        control={control}
                        name="lastName"
                        rules={{ required: {value: true, message: "This field is required"}, minLength: {value: 2, message: "Last Name needs at least 2 characters"} }}
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
                    <Text>Phonenumber*</Text>
                    <Controller
                        control={control}
                        name="phonenumber"
                        rules={{ required: {value: true, message: "This field is required"}, pattern: 
                            {value: /^(((\+|0)[ ]?(?:\(0\)[ ]?)?)|0){1}(4(60|[789]\d)\/?(\s?\d{2}\.?){2}(\s?\d{2})|(\d\/?\s?\d{3}|\d{2}\/?\s?\d{2})(\.?\s?\d{2}){2})$/, // valid phonenumber: 0475458823
                                message: "Please enter a valid phonenumber"} }}
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
                        rules={{ required: {value: true, message: "This field is required"},minLength: {value: 8, message: "Password needs at least 8 characters"},
                    pattern: {value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                message: "Password needs at least one lowercase and uppercase character, number and special character"} }}
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
                    <Text>Confirm Password*</Text>
                    <Controller
                        control={control}
                        name="confirmPassword"
                        rules={{ required: {value: true, message: "This field is required"} , validate: (value) => value === password || "Passwords do not match"}}
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