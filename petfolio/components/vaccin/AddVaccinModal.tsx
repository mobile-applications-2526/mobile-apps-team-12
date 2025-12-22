import RNDateTimePicker from "@react-native-community/datetimepicker";
import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (
    name: string,
    type: string,
    shot_date: Date,
    expire_date: Date
  ) => void;
};

export default function AddVaccinModal({ visible, onClose, onSubmit }: Props) {
  const [shotOpen, setShotOpen] = useState(false);
  const [expireOpen, setExpireOpen] = useState(false);
  const [shotDateSelected, setShotdateSelected] = useState(false);
  const [expireDateSelected, setExpireDateSelected] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [shot_date, setShotDate] = useState<Date>(new Date());
  const [expire_date, setExpireDate] = useState<Date>(new Date());

  return (
    <Modal visible={visible} transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Add Vaccin</Text>

          <Text style={styles.label}>Name:</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} />

          <Text style={styles.label}>Type:</Text>
          <TextInput value={type} onChangeText={setType} style={styles.input} />

          <Text style={styles.label}>Shot date:</Text>
          <View style={styles.dateContainer} testID="shot_date">
            {shotDateSelected && (
              <Text>{shot_date.toLocaleDateString("en-GB")}</Text>
            )}
            {!shotDateSelected && !shotOpen &&(
              <Text style={styles.dateText}>Select the date of injection</Text>
            )}
            {shotOpen && (
              <RNDateTimePicker
                testID="shotDate"
                value={shot_date}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    setShotDate(selectedDate);
                    setShotdateSelected(true);
                    setShotOpen(false);
                  }
                }}
              />
            )}
            <TouchableOpacity onPress={() => {
              if (shotOpen){
                setShotOpen(false);
              }
              else {
                setShotOpen(true);
              }
              }}>
              <Ionicons
                name="calendar-number-outline"
                size={30}
                color="rgba(0, 28, 5, 1)"
              />
            </TouchableOpacity>
            
          </View>

          <Text style={styles.label}>Expire date:</Text>
          <View style={styles.dateContainer} testID="expire_date">
            {expireDateSelected && (
              <Text>{expire_date.toLocaleDateString("en-GB")}</Text>
            )}
            {!expireDateSelected && !expireOpen &&(
              <Text style={styles.dateText}>Select the expiration date</Text>
            )}
            {expireOpen && (
              <RNDateTimePicker
                testID="expireDate"
                value={expire_date}
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    setExpireDate(selectedDate);
                    setExpireDateSelected(true);
                    setExpireOpen(false);
                  }
                }}
              />
            )}
            <TouchableOpacity onPress={() => {
              if (expireOpen){
                setExpireOpen(false);
              }
              else {
                setExpireOpen(true);
              }
              }}>
              <Ionicons
                name="calendar-number-outline"
                size={30}
                color="rgba(0, 28, 5, 1)"
              />
            </TouchableOpacity>
            
          </View>

          <View style={styles.buttonRow}>
            <Pressable
              testID="cancel-vaccin-button"
              onPress={onClose}
              style={styles.cancelButton}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                onSubmit(name, type, shot_date, expire_date);
              }}
              style={styles.addButton}
              testID="add-vaccin-button"
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
    backgroundColor: "#507e62",
    padding: 10,
    borderRadius: 10,
    width: "45%",
    alignItems: "center",
  },
  cancelText: { color: "white" },
  addText: { color: "white" },
  dateContainer: {
    borderColor: "rgb(200, 200, 200)",
    borderWidth: 2,
    paddingVertical: 5,
    paddingHorizontal: 10,
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
});
