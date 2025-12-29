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
  Alert,
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
  const [reminders, setReminders] = useState(reminderData);

  const handleDelete = async (id: string) => {
    Alert.alert(
      "Delete Reminder",
      "Are you sure you want to delete this reminder?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await ReminderService.deleteReminder(id);
              setReminders(reminders.filter((r) => r.id !== id));
            } catch (error) {
              console.error("Failed to delete reminder:", error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.reminderList}>
        {reminders.map((reminder) => (
          <View key={reminder.id} style={styles.reminderCard}>
            <View>
              <Text style={styles.text}>{reminder.title}</Text>
              <View style={styles.reminderTime}>
                <Text style={styles.timeElement}>
                  {new Date(reminder.timestamp).toLocaleDateString()}
                </Text>
                <Text style={styles.timeElement}>
                  {new Date(reminder.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            </View>

            {/* Delete button */}
            <TouchableOpacity
              onPress={() => handleDelete(reminder.id)}
              style={styles.deleteButton}
            >
              <Ionicons name="trash" size={24} color="#af3f20" />
            </TouchableOpacity>
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
    paddingBottom: 100,
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
    justifyContent: "space-between",
  },
  timeElement: {
    padding: 10,
    backgroundColor: "#d9d9d9f1",
    marginHorizontal: 5,
    borderRadius: 5,
    color: "#3D3D3D",
  },
  text: {
    color: "#3D3D3D",
    fontWeight: "bold",
    margin: 5,
  },
  deleteButton: {
    padding: 5,
  },
});