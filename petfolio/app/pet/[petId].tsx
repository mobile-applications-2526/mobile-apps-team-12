import { useSQLiteContext } from "expo-sqlite";
import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Pet } from "../../types";
import PetOverview from "../../components/PetOverview";
import PetService from "../../services/PetService";
import { useLocalSearchParams } from "expo-router";

export default function PetShow() {
    const db = useSQLiteContext();
    const [pet, setPet] = useState<Pet>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const { petId } = useLocalSearchParams<{ petId: string }>();

    function clearErrors() {
        setError("");
    }
    async function getProfileByUser() {
        clearErrors()

        try {
            if (petId != null) {
                const result = await PetService.getPetById(db, petId);
                console.log(result);
                if (result != null) {
                    setPet(result);

                } else {
                    setPet(null);
                    console.log(petId + "id")
                    setError("Something went wrong with fetching your pet...")
                }
            } else {
                setPet(null);
                console.log("paremeter:" + petId)
                setError("Pet not found")
            }

        } catch (err) {
            console.error("Failed to fetch pet", err);
            setPet(null);
            setError("Failed to load pet. Please try again.");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProfileByUser()
    }, [])

    return (
        <View style={styles.container}>
            <Header />
            <View>
                {!error && pet && <PetOverview petData={pet} />}
                {error && <Text>Error</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F1EB",
        alignItems: "stretch",
        marginBottom: 0,
        maxWidth: "100%",
        width: '100%'
    },
});
