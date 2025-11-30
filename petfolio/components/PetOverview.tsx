import React from "react";
import { Pet } from "../types";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { Table, Rows } from "react-native-table-component";
import { Link } from "expo-router";

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

  const tableData = [
    ["Birthday", petData.birthdate],
    ["Current weight", petData.weight[0].value],
    ["Food", ["Wet food, Kibble"]],
    [
      "Medication",
      <Link style={styles.arrow} href={`/pet/medications/${petData.id}`}>
        &rsaquo;
      </Link>,
    ],
    [
      "Vaccincations",
      <Link style={styles.arrow} href={`/pet/vaccinations/${petData.id}`}>
        &rsaquo;
      </Link>,
    ],
        [
      "Weights",
      <Link style={styles.arrow} href={`/pet/weights/${petData.id}`}>
        &rsaquo;
      </Link>,
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
  arrow: {
    fontSize: 20,
    textAlign: "right",
    marginRight: 30,
  },
});
