import { Link, router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pet } from "../../../types";
import PetService from "../../../services/PetService";
import { ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
import Header from "../../../components/Header";
import AddFoodModal from "../../../components/AddFoodModal";
import FoodOverview from "../../../components/FoodOverview";
import Button from "../../../components/Button";
import FoodsService from "../../../services/FoodService";


export default function FoodPage() {
    const { petId } = useLocalSearchParams<{ petId: string }>();
    const [pet, setPet ] = useState<Pet | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    const fetchPet = async () => {
            if (!petId) return;
            const result = await PetService.getPetById(petId);
            setPet(result);
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

    return (
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