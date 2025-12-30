import React, {  useState } from "react";
import {  Reminder } from "../../types";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import ReminderService from "../../services/ReminderService";
import Ionicons from "@react-native-vector-icons/ionicons";

type Props = {
  reminderData: Reminder[];
};
export default function ReminderTable({ reminderData }: Props) {
  const [reminders, setReminders] = useState(reminderData);

  const handleDelete = async (id: string) => {
  try {
    await ReminderService.deleteReminder(id);
    setReminders(reminders.filter((r) => r.id !== id));
  } catch (error) {
    console.error("Failed to delete reminder:", error);
  }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.reminderList}>
        {reminders.map((reminder) => (
          <View key={reminder.id} style={styles.reminderCard}
          testID="reminder-card">
            <View>
              <Text style={styles.text}>{reminder.title}</Text>
              <View style={styles.reminderTime}>
                <Text style={styles.timeElement} testID="reminder-date">
                  {new Date(reminder.timestamp).toLocaleDateString()}
                </Text>
                <Text style={styles.timeElement} testID="reminder-time">
                  {new Date(reminder.timestamp).toLocaleTimeString()}
                </Text>
              </View>
            </View>

            {/* Delete button */}
            <TouchableOpacity
              testID="delete-reminder-button"
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
