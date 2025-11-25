import { StyleSheet, View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import React, {useState, useEffect} from "react";
import Header from "../../components/Header";
import PetService from "../../services/PetService";
import PetsTable from "../../components/PetsTable";
import {Pet} from "../../types"
import { useSQLiteContext } from 'expo-sqlite';
import { useAuth } from "../../context/authContext";
import { useRouter } from "expo-router";

export default function PetOverview() {
  // const db = useSQLiteContext(); // get DB from provider
  const [pets, setPets] = useState<Pet[]>([]);
  const [error, setError] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  function clearErrors() {
    setError("");
  }
  async function getPetsData() {
    clearErrors()
      if (!user) {
      setError("Please log in to view your pets");
      setPets([]);
      setLoading(false);
      return;
    }
     try {
      const result = await PetService.getMyPets();
      setPets(result);
    } catch (err) {
      console.error("Failed to fetch pets", err);
      setPets([]);
      setError("Failed to load pets. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getPetsData()
  }, [])

  useEffect(() => {
    if (!authLoading) {
      getPetsData();
    }
  }, [authLoading, user]);
  // Redirect to login if not authenticated
  if (!user) {
    router.replace('/login');
    return null;
  }

  if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#507C59" />
        </View>
      );
      }

  return (
    <View style={styles.container}>
      <Header />
      <View>
        <Text style={styles.title}>This is the pet Overview</Text>
        {error && <Text style={styles.error}>{error}</Text>}
              {pets.length === 0 ? (
          <Text style={styles.text}>There are currently no pets...</Text>
          ) : (<PetsTable petData={pets}/>)}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F1EB",
    alignItems: "center",
    marginBottom: 0,
    maxWidth: "100%",
  },
    loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 50,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#3D3D3D",
    margin: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#3D3D3D",
    margin: 3,
  },
  image: {
    height: 100,
    width: 95,
  },
  error: {
        color:  "#d20202ff",
    },
});
