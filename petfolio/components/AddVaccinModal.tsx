import Ionicons from "@react-native-vector-icons/ionicons";
import { useState } from "react";
import { View, Text, StyleSheet, Modal, TextInput, Pressable, TouchableOpacity } from "react-native";
import { DatePickerModal } from "react-native-paper-dates";

type Props = {
    visible: boolean;
    onClose: () => void;
    onSubmit: (name: string, type: string, shot_date: Date, expire_date: Date) => void;
};

export default function AddVaccinModal({ visible, onClose, onSubmit }: Props) {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [shot_date, setShotDate] = useState<Date>();
    const [expire_date, setExpireDate] = useState<Date>();
    const [openShot, setOpenShot] = useState(false);
    const [openExpire, setOpenExpire] = useState(false);


    return (
        <Modal visible={visible} transparent>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Add Medication</Text>

                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        value={name}
                        onChangeText={setName}
                        style={styles.input}
                    />

                    <Text style={styles.label}>Type:</Text>
                    <TextInput
                        value={type}
                        onChangeText={setType}
                        style={styles.input}
                    />

                    <Text style={styles.label}>Shot date:</Text>
                    <View style={styles.dateContainer}>
                        {shot_date && <Text>{shot_date.toLocaleDateString()}</Text>}
                        {!shot_date && (
                            <Text style={styles.dateText}>Select the shot date</Text>
                        )}
                        <TouchableOpacity onPress={() => setOpenShot(true)}>
                            <Ionicons
                                name="calendar-number-outline"
                                size={30}
                                color="rgba(0, 28, 5, 1)"
                            />
                        </TouchableOpacity>
                    </View>

                    <DatePickerModal
                        locale="en"
                        mode="single"
                        visible={openShot}
                        date={shot_date}
                        onDismiss={() => setOpenShot(false)}
                        onConfirm={({ date }) => {
                            setOpenShot(false);
                            setShotDate(date);
                        }}
                    />

                    <Text style={styles.label}>Expire date:</Text>
                    <View style={styles.dateContainer}>
                        {expire_date && <Text>{expire_date.toLocaleDateString()}</Text>}
                        {!expire_date && (
                            <Text style={styles.dateText}>Select the expire date</Text>
                        )}
                        <TouchableOpacity onPress={() => setOpenExpire(true)}>
                            <Ionicons
                                name="calendar-number-outline"
                                size={30}
                                color="rgba(0, 28, 5, 1)"
                            />
                        </TouchableOpacity>
                    </View>

                    <DatePickerModal
                        locale="en"
                        mode="single"
                        visible={openExpire}
                        date={expire_date}
                        onDismiss={() => setOpenExpire(false)}
                        onConfirm={({ date }) => {
                            setOpenExpire(false);
                            setExpireDate(date);
                        }}
                    />



                    <View style={styles.buttonRow}>
                        <Pressable onPress={onClose} style={styles.cancelButton}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </Pressable>

                        <Pressable onPress={() => {
                            onSubmit(name, type, shot_date, expire_date);
                        }}
                            style={styles.addButton}
                        >
                            <Text style={styles.addText}>Add</Text>
                        </Pressable>
                    </View>
                </View>
            </View >
        </Modal>
    )
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