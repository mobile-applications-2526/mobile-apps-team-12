import { useSQLiteContext } from "expo-sqlite";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Pet } from "../../../types";
import PetService from "../../../services/PetService";
import Header from "../../../components/Header";
import MedicationsTable from "../../../components/MedicationsTable";

export default function MedicationShow() {
  const [pet, setPet] = useState<Pet>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { petId } = useLocalSearchParams<{ petId: string }>();

  function clearErrors() {
    setError("");
  }
  async function getPet() {
    clearErrors();

    try {
      if (petId != null) {
        const result = await PetService.getPetById(petId);
        console.log(result);
        if (result != null) {
          setPet(result);
        } else {
          setPet(null);
          console.log(petId + "id");
          setError("Something went wrong with fetching your pet...");
          console.log(error);
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

  useEffect(() => {
    getPet();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
        <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
            <Text style={styles.backLinkText}>&larr; Back to pet</Text>
        </TouchableOpacity>
      <View>
        {!error && pet && <MedicationsTable petData={pet} />}
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
