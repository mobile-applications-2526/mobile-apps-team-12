import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Platform,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useForm, Controller } from "react-hook-form";
import { supabase } from "../../utils/supabase";
import ReminderService from "../../services/ReminderService";
import { ReminderRepeatRule } from "../../types";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "@react-native-vector-icons/ionicons";
import Button from "../Button";
import { useRouter } from "expo-router";

type FormValues = {
  title: string;
  description?: string;
  timestamp: Date;
  repeat_rule: ReminderRepeatRule;
};

export default function AddReminder() {
  const router = useRouter();
  const [timestampSelected, setTimestampSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      title: "",
      description: "",
      timestamp: new Date(),
      repeat_rule: ReminderRepeatRule.None,
    },
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true);


      const { data: userData } = await supabase.auth.getUser();
      const userId = userData.user?.id;
      if (!userId) throw new Error("User not logged in");

      const timestampToSave =
      (typeof globalThis.window !== "undefined" && (globalThis.window as any).TEST_TIMESTAMP) ||
      data.timestamp;

      const reminder = await ReminderService.createReminder(
        {
          title: data.title,
          description: data.description,
          timestamp: timestampToSave,
          repeat_rule: data.repeat_rule,
        },
        userId
      );

      // 3️⃣ Schedule notification
      await ReminderService.schedulereminderNotification({
        ...reminder,
        timestamp: new Date(reminder.timestamp),
      });
      router.navigate("/reminders");
    } catch (err: any) {
      console.error(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Reminder</Text>

      {/* Title */}
      <View style={styles.form}>
        <Text style={styles.text}>Title</Text>
        <Controller
          control={control}
          name="title"
          rules={{ required: "Title is required" }}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <>
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder="Reminder title"
                style={styles.input}
              />
              {error && <Text style={styles.error}>{error.message}</Text>}
            </>
          )}
        />

        {/* Description */}
        <Text style={styles.text}>Description</Text>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => (
            <TextInput
              value={value}
              onChangeText={onChange}
              placeholder="Optional description"
              style={styles.input}
            />
          )}
        />

        {/* Timestamp */}
        <Text style={styles.text}>Reminder Time</Text>
        <Controller
          control={control}
          name="timestamp"
          render={({ field: { onChange, value } }) => (
            <View style={styles.dateContainer}>
              {Platform.OS === "web" ? (
                <input
                  data-testid="datetime-picker"
                  type="datetime-local"
                  value={value.toISOString().slice(0, 16)}
                  onChange={(e) => onChange(new Date(e.target.value))}
                  style={{
                    padding: 8,
                    borderRadius: 5,
                    border: "1px solid #ccc",
                    flex: 1,
                  }}
                />
              ) : (
                <>
                  {timestampSelected && !open && (
                    <Text>{value.toLocaleDateString("en-GB")}</Text>
                  )}
                  {!timestampSelected && !open && (
                    <Text style={styles.dateText}>
                      Select the moment of reminder:
                    </Text>
                  )}
                  {open && (
                    <RNDateTimePicker
                      testID="datetime-picker"
                      mode="datetime"
                      value={value ? new Date(value) : new Date()}
                      onChange={(event, selectedDate) => {
                        if (selectedDate) {
                          onChange(selectedDate);
                          setTimestampSelected(true);
                        }
                      }}
                    />
                  )}
                  <TouchableOpacity
                    testID="datetime-picker-open"
                    onPress={() => setOpen(!open)}
                  >
                    <Ionicons
                      name="calendar-number-outline"
                      size={30}
                      color="rgba(0, 28, 5, 1)"
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
          )}
        />

        {/* <Text>Repeating:</Text>
      <Controller
        control={control}
        name="repeat_rule"
        render={({ field: { onChange, value } }) => (
            <RepeatSelect value={value} onChange={onChange}/>


        )}
      /> */}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          testID="save-reminder-button"
          label={loading ? "Saving..." : "Add Reminder"}
          onPress={handleSubmit(onSubmit)}
        />
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
  input: {
    borderColor: "rgb(200, 200, 200)",
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 15,
    margin: 5,
    borderRadius: 5,
  },
  dateContainer: {
    borderColor: "rgb(200, 200, 200)",
    borderWidth: 2,
    paddingVertical: 5,
    margin: 5,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    color: "#3C3C434C",
    margin: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 50,
    marginTop: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft: 20,
    color: "#3D3D3D",
    margin: 3,
    alignSelf: "flex-start",
    flexDirection: "row",
    width: 400,
    justifyContent: "space-between",
  },
  success: {
    color: "#00a00bff",
    marginVertical: 5,
  },
  error: {
    color: "#d20202ff",
  },
  form: {
    width: "90%",
  },
  text: {
    color: "#3D3D3D",
    margin: 5,
  },
});
