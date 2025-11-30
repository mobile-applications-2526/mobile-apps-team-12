import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Pet } from "../../../types";
import PetService from "../../../services/PetService";
import { ScrollView, Text, StyleSheet } from "react-native";
import Header from "../../../components/Header";
import Button from "../../../components/Button";
import AddWeightModel from "../../../components/AddWeightModal";
import WeightOverview from "../../../components/WeightOverview";
import WeightsService from "../../../services/WeightsService";

export default function WeightPage() {
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

    const handleAddWeight = async (value: string, date: string) => {
        if (!petId || !pet) return;

        try{
            const newWeight = await WeightsService.addWeightToPet(petId, value, date);

            setPet({
                ...pet,
                weight: [newWeight, ...(pet.weight || [])],
            });

            setModalVisible(false);
        } catch (error) {
            console.error("Failed to add weight", error);
        }
    };

    return (
        <ScrollView>
            <Header />
            <Link style={styles.backLink} href={`/petOverview`}>
                &larr; Back to pets
            </Link>
            
            <Text style={styles.title}>{pet?.name}'s Weights</Text>

            <WeightOverview weights={pet?.weight} />

            <Button label="Add new weight" onPress={() => setModalVisible(true)} />

            <AddWeightModel
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onSubmit={handleAddWeight}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F6F1EB" },
  title: { fontSize: 28, textAlign: "center", marginVertical: 20 },
  backLink: { textDecorationLine: "underline", color: "#043500ff", marginLeft: 20, marginBottom: 10 },
});