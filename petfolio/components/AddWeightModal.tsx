import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Pressable,
} from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "@react-native-vector-icons/ionicons";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (value: string, date: string) => void;
};

export default function AddWeightModel({ visible, onClose, onSubmit }: Props) {
  const [weight, setWeight] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  return (
    <Modal visible={visible} transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Add Weight</Text>

          <Text style={styles.label}>Weight (kg):</Text>
          <TextInput
            value={weight}
            onChangeText={setWeight}
            keyboardType="decimal-pad"
            style={styles.input}
          />

          <Text style={styles.label}>Date</Text>
          <View style={styles.input}>
            <RNDateTimePicker
              value={date ? new Date(date) : new Date()}
              onChange={(event, selectedDate) => {
                if (selectedDate) {
                  setDate(selectedDate);
                }
              }}
            ></RNDateTimePicker>

          </View>

          <View style={styles.buttonRow}>
            <Pressable onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                onSubmit(weight, date.toISOString());
              }}
              style={styles.addButton}
            >
              <Text style={styles.addText}>Add</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 15,
  },
  label: {
    marginTop: 10,
    fontSize: 14,
  },
  input: {
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#E2866E",
    padding: 10,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "rgba(0, 28, 5, 1)",
    padding: 10,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },
  cancelText: { color: "white" },
  addText: { color: "white" },
});
