import React from "react";
import { Pet } from "../types";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Table, Rows } from "react-native-table-component";
import { Link, useRouter } from "expo-router";

type Props = {
  petData: Pet;
};

export default function PetOverview({ petData }: Props) {
  // petData.medication.forEach(med => {
  //     medications.push(med.name)
  // })

  // petData.vaccins.forEach(vac => {
  //     vaccins.push(vac.name)
  // })

  const router = useRouter();

  const getCurrentWeight = () => {
    if (!petData.weight || petData.weight.length === 0) return "N/A";

    const sortedWeights = [...petData.weight].sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return `${sortedWeights[0].value} kg`;
  }

  const tableData = [
    ["Birthday", petData.birthdate],
    ["Food", ["Wet food, Kibble"]],
    [
      "Current weight", 
      <TouchableOpacity onPress={() => router.push(`/pet/weights/${petData.id}`)}>
        <View style={styles.rowContent}>
          <Text>{getCurrentWeight()}</Text>
          <Text style={styles.arrow}>&rsaquo;</Text>
        </View>
      </TouchableOpacity>
    ],
    [
      "Medication",
      <TouchableOpacity onPress={() => router.push(`/pet/medications/${petData.id}`)}>
        <Text style={styles.arrow}>&rsaquo;</Text>
      </TouchableOpacity>,
    ],
    [
      "Vaccinations",
      <TouchableOpacity onPress={() => router.push(`/pet/vaccinations/${petData.id}`)}>
        <Text style={styles.arrow}>&rsaquo;</Text>
      </TouchableOpacity>,
    ],
  ];

  return (
    <ScrollView
      contentContainerStyle={{ paddingVertical: 90, paddingHorizontal: 10 }}
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/bengel-pf.png")}
          style={styles.profilePic}
        />
        <View style={styles.profile}>
          <Text style={styles.profileName}>{petData.name}</Text>
          <Text style={styles.petType}>{petData.type}</Text>
          <Table>
            <Rows style={styles.row} data={tableData} />
          </Table>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F1EB",
    alignItems: "center",
    width: "100%",
    marginTop: 50,
  },

  profile: {
    width: "100%",
    backgroundColor: "#E2866E",
    borderRadius: 30,
    alignItems: "stretch",
    padding: 20,
    paddingTop: 80,
    height: 700,
  },
  profilePic: {
    position: "absolute",
    top: -75,
    width: 150,
    height: 150,
    borderRadius: 75,
    zIndex: 2,
  },
  profileName: {
    fontSize: 40,
    textAlign: "center",
  },

  petType: {
    fontSize: 26,
    textAlign: "center",
    marginBottom: 20,
  },

  row: {
    borderTopWidth: 2,
    borderTopColor: "#d56e54ff",
    paddingTop: 20,
    paddingBottom: 20,
  },
  
  rowContent: {  
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
  
  arrow: {
    fontSize: 20,
    textAlign: "right",
    marginRight: 30,
  },
});