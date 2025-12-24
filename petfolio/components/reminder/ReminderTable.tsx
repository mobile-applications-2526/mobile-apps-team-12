import React, { useEffect, useState } from "react";
import { Pet, Reminder } from "../../types";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Table, Rows } from "react-native-table-component";
import { useRouter } from "expo-router";
import ReminderService from "../../services/ReminderService";
import ImagePicker from "../imagepickers/ImagePickerPets";
import { supabase } from "../../utils/supabase";
import Ionicons from "@react-native-vector-icons/ionicons";

type Props = {
  reminderData: Reminder[];
};

export default function ReminderTable({ reminderData }: Props) {


  return (
    <View style={styles.container}>
      <Text style= {styles.subtitle}>All Reminders:</Text>
    <ScrollView contentContainerStyle = {styles.reminderList}>
    {reminderData.map((reminder) => (
      <View key={reminder.id}>
        <Text>
        {reminder.title}
        </Text>
      </View>
    ))}
    </ScrollView>
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
  reminderList: {
    alignItems: "center",
  },
  reminderCard: {
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
  reminderInfo: {
    flexDirection: "column",
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: "bold",
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