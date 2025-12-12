import { Link, router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pet } from "../../../types";
import PetService from "../../../services/PetService";
import { ScrollView, Text, StyleSheet, TouchableOpacity, View, ActivityIndicator } from "react-native";
import Header from "../../../components/Header";
import Button from "../../../components/Button";
import AddWeightModel from "../../../components/weight/AddWeightModal";
import WeightOverview from "../../../components/weight/WeightOverview";
import WeightsService from "../../../services/WeightsService";

export default function WeightPage() {
    const { petId } = useLocalSearchParams<{ petId: string }>();
    const [pet, setPet] = useState<Pet | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchPet = async () => {
        if (!petId) return;
        try {
            setLoading(true);
            const result = await PetService.getPetById(petId);
            setPet(result);
        } catch (error) {
            console.error("Failed to fetch pet:", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            if (petId) {
                fetchPet();
            }
        }, [petId])
    );


    const handleAddWeight = async (value: string, date: string) => {
        if (!petId || !pet) return;

        try {
            await WeightsService.addWeightToPet(petId, value, date);

            await fetchPet();

            setModalVisible(false);
        } catch (error) {
            console.error("Failed to add weight", error);
        }
    };

    const handleDeleteWeight = async (weightId: string) => {
        if (!petId) return;

        try {
            await WeightsService.deleteWeight(weightId);
            await fetchPet();
        } catch (error) {
            console.error("Failed to delete weight:", error);
        }
    };


    // Add loading state
    if (loading) {
        return (
            <View style={styles.container}>
                <Header />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="rgba(0, 28, 5, 1)" />
                    <Text>Loading pet data...</Text>
                </View>
            </View>
        );
    }

    // Add null check
    if (!pet) {
        return (
            <View style={styles.container}>
                <Header />
                <View style={styles.loadingContainer}>
                    <Text>Pet not found</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Header />
                <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
                    <Text style={styles.backLinkText}>&larr; Back to pets</Text>
                </TouchableOpacity>

                <Text style={styles.title}>{pet?.name}'s Weights</Text>

                <WeightOverview
                    weights={pet?.weight}
                    onDelete={handleDeleteWeight}
                />

                <Button label="Add new weight" onPress={() => setModalVisible(true)} />

                <AddWeightModel
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSubmit={handleAddWeight}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#F6F1EB" },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: { fontSize: 28, textAlign: "center", marginVertical: 20 },
    backLink: {
        marginLeft: 20,
        marginBottom: 10
    },
    backLinkText: {
        textDecorationLine: "underline",
        color: "#043500ff"
    },
});