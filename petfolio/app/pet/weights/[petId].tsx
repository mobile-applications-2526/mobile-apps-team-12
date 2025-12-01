import { Link, router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { Pet } from "../../../types";
import PetService from "../../../services/PetService";
import { ScrollView, Text, StyleSheet, TouchableOpacity } from "react-native";
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

    useFocusEffect(
        useCallback(() => {
            fetchPet();
        }, [petId])
    );

    const handleAddWeight = async (value: string, date: string) => {
        if (!petId || !pet) return;

        try{
            await WeightsService.addWeightToPet(petId, value, date);

            await fetchPet();

            setModalVisible(false);
        } catch (error) {
            console.error("Failed to add weight", error);
        }
    };

    return (
        <ScrollView>
            <Header />
            <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
                <Text style={styles.backLinkText}>&larr; Back to pets</Text>
            </TouchableOpacity>
            
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
    backLink: { 
        marginLeft: 20, 
        marginBottom: 10 
    },
        backLinkText: {
        textDecorationLine: "underline", 
        color: "#043500ff"
    },});