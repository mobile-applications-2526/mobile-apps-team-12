import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Reminder } from "../../types";
import { useAuth } from "../../context/authContext";
import ReminderService from "../../services/ReminderService";
import { supabase } from "../../utils/supabase";
import ReminderTable from "../../components/reminder/ReminderTable";
import AddReminder from "../../components/reminder/AddReminder";
import { useRouter } from "expo-router";
import Ionicons from "@react-native-vector-icons/ionicons";

export default function ReminderOverview() {
  const router = useRouter();
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  function clearErrors() {
    setError("");
  }
  async function getReminderData() {
    clearErrors();
    if (!user) {
      setError("Please log in to view your reminders");
      setReminders([]);
      setLoading(false);
      return;
    }
    try {
      const result = await ReminderService.getRemindersByUserId(user.id);
      console.log(result);
      setReminders(result);
    } catch (err) {
      console.error("Failed to fetch reminders", err);
      setReminders([]);
      setError("Failed to load reminders. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getReminderData();
  }, []);

  useEffect(() => {
    if (!authLoading) {
      getReminderData();
    }
  }, [authLoading, user]);

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
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Reminders</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
          testID="add-reminder-button"
          onPress={() => router.navigate("/addReminder")}>
            <Ionicons name="add-outline" size={30} color="rgba(0, 28, 5, 1)" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scroll}>
        {error && <Text style={styles.error}>{error}</Text>}

        {reminders.length === 0 ? (
          <Text style={styles.text}>There are currently no reminders...</Text>
        ) : (
          <ReminderTable reminderData={reminders} />
        )}
      </ScrollView>
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
  scroll: {
    alignItems: "center",
    paddingBottom: 100,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#75b381ff",
    margin: 5,
    padding: 5,
    borderRadius: 5
  },
  text: {
    color: "#3D3D3D",
    margin: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3D3D3D",
    margin: 3,
    alignSelf: "flex-start",
  },
  titleContainer: {
    flexDirection: "row",
    width: 400,
    justifyContent: "space-between"
  },
  error: {
    color: "#d20202ff",
  },
});
