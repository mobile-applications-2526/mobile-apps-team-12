import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pet } from "../../../types";
import PetService from "../../../services/PetService";
import { ScrollView, Text, StyleSheet } from "react-native";
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

    useEffect(() => {
        fetchPet();
    }, [petId]);

    const handleAddFood = async (name: string, description: string, quantity: string) => {
        if (!petId || !pet) return;

        try{
            const newFood = await FoodsService.addFoodToPet(petId, name, description, quantity);

            setPet({
                ...pet,
                food: [newFood, ...(pet.food || [])],
            });

            setModalVisible(false);
        } catch (error) {
            console.error("Failed to add food", error);
        }
    };

    return (
        <ScrollView>
            <Header />
            <Link style={styles.backLink} href={`/petOverview`}>
                &larr; Back to pets
            </Link>

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
  container: { flex: 1, backgroundColor: "#F6F1EB" },
  title: { fontSize: 28, textAlign: "center", marginVertical: 20 },
  backLink: { textDecorationLine: "underline", color: "#043500ff", marginLeft: 20, marginBottom: 10 },
});