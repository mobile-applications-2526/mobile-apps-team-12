import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { Link, router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { Pet } from "../../../types";
import PetService from "../../../services/PetService";
import Header from "../../../components/Header";
import VaccinationsTable from "../../../components/vaccin/VaccinationsTable";
import VaccinationService from "../../../services/VaccinationService";
import Button from "../../../components/Button";
import AddVaccinModal from "../../../components/vaccin/AddVaccinModal";

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

  const handleAddVaccin = async (name: string, type: string, shot_date: Date, expire_date: Date) => {
    if (!petId || !pet) return;

    try {
      await VaccinationService.addVaccinToPet(petId, name, type, shot_date, expire_date);
      await fetchPet();

      setModalVisible(false);
    } catch (error) {
      console.error("Failed to add vaccin", error);
    }
  };

  return (
    <ScrollView>
      <Header />
      <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
        <Text style={styles.backLinkText}>&larr; Back to pet</Text>
      </TouchableOpacity>
      <View>
        {!error && pet && pet.vaccins?.length > 0 && <VaccinationsTable petData={pet} />}
        {error && <Text>Error</Text>}
        {pet && pet.vaccins?.length == 0 && (<><Text style={styles.title}>{pet?.name}'s Vaccins</Text><Text style={styles.centerText}>{pet.name} has no vaccins</Text></>)}
      </View>

      <Button label="Add new vaccination" onPress={() => setModalVisible(true)} />

      <AddVaccinModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddVaccin}
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
