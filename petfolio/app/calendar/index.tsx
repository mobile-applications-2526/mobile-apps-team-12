import { View } from "react-native";
import Header from "../../components/Header";
import { StyleSheet, Text } from "react-native";
import CalendarView from "../../components/calendar/CalendarView";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/authContext";
import { Pet } from "../../types";
import PetService from "../../services/PetService";

export default function CalendarPage() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [error, setError] = useState("")
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);

  function clearErrors() {
    setError("")

  }

  async function getPetsData() {
    clearErrors()
    if (!user) {
      setError("Please login to see your pets and their birthdays")
      setPets([])
      setLoading(false);
      return;
    }
    try {
      const result = await PetService.getMyPets()
      setPets(result);
    }
    catch (error) {
      console.error("Failed to fetch pets", error);
      setPets([]);
      setError("Failed to load pets. Please try again.");
    }
  }

  useEffect(() => {
    getPetsData();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      {error && <Text style={styles.error}>{error}</Text>}
      <CalendarView
        pets={pets}
      ></CalendarView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F1EB",
    alignItems: "center",
    marginBottom: 0,
    maxWidth: "100%",
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
  image: {
    height: 100,
    width: 95,
  },
  error: {
    color: "#d20202ff",
  },
});
