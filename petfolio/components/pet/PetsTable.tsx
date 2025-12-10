import { Pet } from "../../types";
import React from "react";
import { useRouter } from "expo-router";
import { StyleSheet, View, Text, ScrollView, Image, ActivityIndicator, TouchableOpacity } from "react-native";
import Button from "../../components/Button";

type Props = {
  petData: Pet[]
}

export default function PetsTable({ petData }: Props) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Pets:</Text>

      <ScrollView contentContainerStyle={styles.petList}>
        {petData.map((pet) => (
          <View key={pet.id} style={styles.petCard} >
            <TouchableOpacity onPress={() => router.navigate(`/pet/${pet.id}`)}>
              {/* <Image
                            source={pet.image ? pet.image : require("../assets/azula.jpg")}
                            style={styles.petImage}
                        /> */}
              <View style={styles.petInfo}>
                <Text style={styles.petName}>{pet.name}</Text>
                <Text style={styles.petName}>{pet.birthdate.toString()}</Text>
                <Text style={styles.petType}>{pet.description}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
      <Button label="Add pet" onPress={() => router.navigate("/addPet")} />
    </View>
  );

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F1EB",
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