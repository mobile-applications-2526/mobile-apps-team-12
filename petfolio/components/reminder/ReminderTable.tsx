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
    <ScrollView contentContainerStyle = {styles.reminderList}>
    {reminderData.map((reminder) => (
      <View key={reminder.id} style={styles.reminderCard}>
        <Text style={styles.text}>
        {reminder.title}
        </Text>
        <View style={styles.reminderTime}>
        <Text style= {styles.timeElement}>
          {new Date(reminder.timestamp).toLocaleDateString()}
        </Text>
        <Text style={styles.timeElement}>
          {new Date(reminder.timestamp).toLocaleTimeString()}
        </Text>
        </View>
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
  reminderList: {
    alignItems: "center",
    paddingBottom: 100
  },
  reminderCard: {
    borderTopWidth: 1,
    borderTopColor: "#acadac",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 400,
    padding: 10,
    marginBottom: 15,
  },
  reminderTime: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  timeElement: {
    padding: 10,
    backgroundColor: "#d9d9d9f1",
    marginHorizontal: 5,
    borderRadius: 5,
    color: "#3D3D3D"

  },
  reminderInfo: {
    flexDirection: "column",
  },
  reminderTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3D3D3D",
    marginBottom: 5
  },
    text: {
    color: "#3D3D3D",
    fontWeight: "bold",
    margin: 5,
  },

});