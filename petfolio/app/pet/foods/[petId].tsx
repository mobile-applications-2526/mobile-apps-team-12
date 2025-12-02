import { Link, router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pet } from "../../../types";
import PetService from "../../../services/PetService";
import { ScrollView, Text, StyleSheet, TouchableOpacity, View, ActivityIndicator } from "react-native";
import Header from "../../../components/Header";
import AddFoodModal from "../../../components/AddFoodModal";
import FoodOverview from "../../../components/FoodOverview";
import Button from "../../../components/Button";
import FoodsService from "../../../services/FoodService";


export default function FoodPage() {
    const { petId } = useLocalSearchParams<{ petId: string }>();
    const [pet, setPet ] = useState<Pet | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchPet = async () => {
            if (!petId) return;
           try {
            setLoading(true);
            const result = await PetService.getPetById(petId);
            console.log('Fetched pet result:', result);
            setPet(result);
            console.log('SetPet called with:', pet?.name);
        } catch (error) {
            console.error("Failed to fetch pet:", error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchPet();
        }, [petId])
    );

    const handleAddFood = async (name: string, description: string, quantity: string) => {
        if (!petId || !pet) return;

        try{
            await FoodsService.addFoodToPet(petId, name, description, quantity);
            await fetchPet();

            setModalVisible(false);
        } catch (error) {
            console.error("Failed to add food", error);
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
                    <Text style={styles.backLinkText}>&larr; Back to pet</Text>
                </TouchableOpacity>

                <Text style={styles.title}>{pet?.name}'s Foods</Text>

                <FoodOverview foods={pet?.food} />

                <Button label="Add new food" onPress={() => setModalVisible(true)} />

                <AddFoodModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSubmit={handleAddFood}
                />
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        backgroundColor: "#F6F1EB",
        alignItems: "stretch",
        marginBottom: 0,
        maxWidth: "100%",
        width: "100%",
    },
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