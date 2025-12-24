import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Reminder } from "../../types";
import { useAuth } from "../../context/authContext";
import ReminderService from "../../services/ReminderService";
import { supabase } from "../../utils/supabase";
import ReminderTable from "../../components/reminder/ReminderTable";

export default function PetOverview() {
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
      console.log(result)
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
      <View>
        <Text style={styles.title}>View your reminders here</Text>
        {error && <Text style={styles.error}>{error}</Text>}
        {reminders.length === 0 ? (
          <Text style={styles.text}>There are currently no reminders...</Text>
        ) : (
          <ReminderTable reminderData={reminders} />
        )}
      </View>
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3D3D3D",
    margin: 3,
  },
  image: {
    height: 100,
    width: 95,
  },
  error: {
    color: "#d20202ff",
  },
});
