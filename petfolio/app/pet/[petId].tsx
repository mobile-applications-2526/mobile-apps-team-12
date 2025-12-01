import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import Header from "../../components/Header";
import { Pet } from "../../types";
import PetOverview from "../../components/PetOverview";
import PetService from "../../services/PetService";
import { Link, router, useFocusEffect, useLocalSearchParams } from "expo-router";

export default function PetShow() {
  // const db = useSQLiteContext();
  const [pet, setPet] = useState<Pet | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { petId } = useLocalSearchParams<{ petId: string }>();

  function clearErrors() {
    setError("");
  }
  const mapToPet = (raw: any): Pet => ({
    id: String(raw.id), // ensure string
    name: raw.name,
    birthdate: raw.birthdate,
    description: raw.description,
    type: raw.type,
    vaccins: raw.vaccins ?? [],
    medication: raw.medication ?? [],
    weight: raw.weight ?? [],
  });
  async function getPetDetails() {
    clearErrors();

    try {
      if (petId != null) {
        const pet = await PetService.getPetById(petId);

        const mappedPet = mapToPet(pet);

        if (pet != null) {
          setPet(mappedPet);
          console.log("mapped pet", mappedPet);
        } else {
          setPet(null);
          console.log(petId + "id");
          setError("Something went wrong with fetching your pet...");
        }
      } else {
        setPet(null);
        console.log("paremeter:" + petId);
        setError("Pet not found");
      }
    } catch (err) {
      console.error("Failed to fetch pet", err);
      setPet(null);
      setError("Failed to load pet. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      getPetDetails();
    }, [petId])
  );

  return (
    <View style={styles.container}>
      <Header />
          <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
                <Text style={styles.backLinkText}>&larr; Back to pets overview</Text>
          </TouchableOpacity>
      <View>
        {!error && pet && <PetOverview petData={pet} />}
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
});
