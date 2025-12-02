import { useState } from "react";
import { View, Text, StyleSheet, Modal, TextInput, Pressable } from "react-native";

type Props = {
    visible: boolean;
    onClose: () => void;
    onSubmit: (name: string, description: string, quantity: string) => void;
};

export default function AddMedicationModal({ visible, onClose, onSubmit }: Props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");

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

                    <Text style={styles.label}>Description:</Text>
                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        style={styles.input}
                    />

                    <Text style={styles.label}>Quantity:</Text>
                    <TextInput
                        value={quantity}
                        onChangeText={setQuantity}
                        style={styles.input}
                    />

                    <View style={styles.buttonRow}>
                        <Pressable onPress={onClose} style={styles.cancelButton}>
                            <Text style={styles.cancelText}>Cancel</Text>
                        </Pressable>

                        <Pressable onPress={() => {
                            onSubmit(name, description, quantity);
                        }}
                            style={styles.addButton}
                        >
                            <Text style={styles.addText}>Add</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
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
});