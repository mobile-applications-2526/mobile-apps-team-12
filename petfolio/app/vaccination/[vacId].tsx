import { useSQLiteContext } from "expo-sqlite";
import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { Medication, Vaccin } from "../../types";
import PetService from "../../services/PetService";
import { Link, useLocalSearchParams } from "expo-router";
import MedicationsTable from "../../components/MedicationsTable";
import MedicationService from "../../services/MedicationService";
import MedicationSpecification from "../../components/MedicationSpecification";
import VaccinSpecification from "../../components/VaccinSpecification";
import VaccinationService from "../../services/VaccinationService";

export default function VaccinationShow() {
    const db = useSQLiteContext();
    const [vac, setVac] = useState<Vaccin>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const { vacId } = useLocalSearchParams<{ vacId: string }>();

    function clearErrors() {
        setError("");
    }
    async function getVac() {
        clearErrors()

        try {
            if (vacId != null) {
                const result = await VaccinationService.getVaccinById(db, vacId);
                console.log(result);
                if (result != null) {
                    setVac(result);

                } else {
                    setVac(null);
                    console.log(vacId + "id")
                    setError("Something went wrong with fetching vaccination...")
                }
            } else {
                setVac(null);
                console.log("paremeter:" + vacId)
                setError("Pet not found")
            }

        } catch (err) {
            console.error("Failed to fetch vaccination", err);
            setVac(null);
            setError("Failed to load vaccination. Please try again.");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getVac()
    }, [])

    return (
        <View style={styles.container}>
            <Header />
            <Link style={styles.backLink} href={`/`}>&larr; Back to home</Link>
            <View>
                {!error && vac && <VaccinSpecification vacData={vac} />}
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
