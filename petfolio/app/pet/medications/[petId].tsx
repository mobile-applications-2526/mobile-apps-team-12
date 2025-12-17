import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Pet } from "../../../types";
import PetService from "../../../services/PetService";
import Header from "../../../components/Header";
import MedicationsTable from "../../../components/medication/MedicationsTable";
import AddMedicationModal from "../../../components/medication/AddMedicationModal";
import MedicationService from "../../../services/MedicationService";
import Button from "../../../components/Button";

export default function MedicationShow() {
  const [pet, setPet] = useState<Pet>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { petId } = useLocalSearchParams<{ petId: string }>();
  const [modalVisible, setModalVisible] = useState(false);

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

  const handleAddMedication = async (name: string, description: string, quantity: string) => {
    if (!petId || !pet) return;

    try {
      await MedicationService.addMedicationToPet(petId, name, description, quantity);
      await fetchPet();

      setModalVisible(false);
    } catch (error) {
      console.error("Failed to add medication", error);
    }
  };

  return (
    <ScrollView>
      <Header />
      <TouchableOpacity onPress={() => router.back()} style={styles.backLink} testID="back-button">
        <Text style={styles.backLinkText}>&larr; Back to pet</Text>
      </TouchableOpacity>


      {!error && pet && pet.medication?.length > 0 && <MedicationsTable petData={pet} />}
      {error && <Text>Error</Text>}
      {pet && pet.medication?.length == 0 && (<><Text style={styles.title}>{pet?.name}'s Mecidation</Text><Text style={styles.centerText}>{pet.name} has no medication</Text></>)}


      <Button label="Add new medication" onPress={() => setModalVisible(true)} />

      <AddMedicationModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddMedication}
      />
    </ScrollView>
  );
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
  backLink: {
    marginLeft: 20,
    marginBottom: 10
  },
  backLinkText: {
    textDecorationLine: "underline",
    color: "#043500ff"
  },
  centerText: {
    alignItems: "center",
    textAlign: "center"
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginVertical: 20
  },
});
