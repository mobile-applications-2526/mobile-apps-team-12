import { useRouter } from "expo-router";
import { StyleSheet, View, Text, ScrollView, Image, ActivityIndicator } from "react-native";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../components/Button";

export default function PetsOverview(){
    const router = useRouter();
    const [pets, setPets] = useState([]);
    const [loading, setLoading] = useState(true);

/*     testdata gezien fetch nog niet werkt
    const pets = [
        {
        id: 1,
        name: "Momo",
        type: "Rabbit",
        image: require("../../assets/momo.jpeg"), 
        },
        {
        id: 2,
        name: "Azula",
        type: "Rabbit",
        image: require("../../assets/azula.jpg"),
        },
    ]; */


    async function fetchPets(){
        try{
            const response = await fetch("http://10.0.2.2:8080/pets");
            if (!response.ok) throw new Error("Failed to fetch pets");
            const data = await response.json();
            setPets(data);
        } catch (error) {
            console.error("Error fetching pets:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchPets();
    }, []);

    const [username, setUsername] = useState("");

    useEffect(() => {
        AsyncStorage.getItem("username").then((value) => {
            if (value) {
                setUsername(value);
            }
        });
    }, []);

/*     voeg dit toe aan login pagina 
    await AsyncStorage.setItem("username", response.username);
    router.push("/pets"); */

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

            <Text style={styles.welcome}>Welcome Back {username || "user"}!</Text>
            <Text style={styles.subtitle}>Pets:</Text>

            <ScrollView contentContainerStyle={styles.petList}>
                {pets.map((pet) => (
                    <View key={pet.id} style={styles.petCard}>
                        <Image
                            source={pet.image ? pet.image : require("../../assets/azula.jpg")}
                            style={styles.petImage}
                        />
                        <View style={styles.petInfo}>
                            <Text style={styles.petName}>{pet.name}</Text>
                            <Text style={styles.petType}>{pet.type}</Text>
                        </View>
                    </View>
                ))}
            </ScrollView>
            <Button label="Add pet" path="/add-pet"/>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F1EB",
    alignItems: "center",
  },
    loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#3D3D3D",
    alignSelf: "flex-start",
    marginLeft: 25,
  },
  subtitle: {
    fontSize: 18,
    color: "#3D3D3D",
    alignSelf: "flex-start",
    marginLeft: 25,
    marginTop: 5,
    marginBottom: 10,
  },
  petList: {
    alignItems: "center",
  },
  petCard: {
    backgroundColor: "#E2866E",
    borderRadius: 15,
    flexDirection: "row",
    alignItems: "center",
    width: 300,
    padding: 10,
    marginBottom: 15,
  },
  petImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 15,
  },
  petInfo: {
    flexDirection: "column",
  },
  petName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3D3D3D",
  },
  petType: {
    fontSize: 14,
    color: "#3D3D3D",
  },
  addButton: {
    backgroundColor: "#507C59",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    marginTop: 10,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
