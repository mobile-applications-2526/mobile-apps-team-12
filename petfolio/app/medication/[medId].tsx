import { useSQLiteContext } from "expo-sqlite";
import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Medication } from "../../types";
import PetService from "../../services/PetService";
import { Link, useLocalSearchParams } from "expo-router";
import MedicationsTable from "../../components/MedicationsTable";
import MedicationService from "../../services/MedicationService";
import MedicationSpecification from "../../components/MedicationSpecification";

export default function MedicationShow() {
    const db = useSQLiteContext();
    const [med, setMed] = useState<Medication>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const { medId } = useLocalSearchParams<{ medId: string }>();

    function clearErrors() {
        setError("");
    }
    async function getMed() {
        clearErrors()

        try {
            if (medId != null) {
                const result = await MedicationService.getMedicationById(db, medId);
                console.log(result);
                if (result != null) {
                    setMed(result);

                } else {
                    setMed(null);
                    console.log(medId + "id")
                    setError("Something went wrong with fetching medication...")
                }
            } else {
                setMed(null);
                console.log("paremeter:" + medId)
                setError("Pet not found")
            }

        } catch (err) {
            console.error("Failed to fetch med", err);
            setMed(null);
            setError("Failed to load medication. Please try again.");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getMed()
    }, [])

    return (
        <View style={styles.container}>
            <Header />
            <Link style={styles.backLink} href={`/`}>&larr; Back to home</Link>
            <View>
                {!error && med && <MedicationSpecification medicationData={med} />}
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
    backLink: {
        textDecorationLine: "underline",
        color: "#043500ff",
        marginLeft: 20,
    }
});
