import react, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, TextInput, Pressable } from "react-native";
import { Profile } from "../../types";

type Props = {
    oldProfileData: Profile
    visible: boolean;
    onClose: () => void;
    onSubmit: (firstName: string, lastName:string, email:string, phonenumber:string) => void;
};

export default function EditProfileModal({oldProfileData, visible, onClose, onSubmit }: Props) {
    const [firstName, setFirstName] = useState(oldProfileData.firstname);
    const [lastName, setLastName] = useState(oldProfileData.lastname);
    const [email, setEmail] = useState(oldProfileData.email);
    const [phonenumber, setPhonenumber] = useState(oldProfileData.phonenumber);
    
    return (
        <Modal visible={visible} transparent>
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>Edit User Profile</Text>

                    <Text style={styles.label}>Surname:</Text>
                    <TextInput
                        value={firstName}
                        onChangeText={setFirstName}
                        style={styles.input}
                    />
                    <Text style={styles.label}>Name:</Text>
                    <TextInput
                        value={lastName}
                        onChangeText={setLastName}
                        style={styles.input}
                    />

                    <Text style={styles.label}>Email:</Text>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />

                    <Text style={styles.label}>Phonenumber:</Text>
                    <TextInput
                        value={phonenumber}
                        onChangeText={setPhonenumber}
                        style={styles.input}
                    />

                    <View style={styles.buttonRow}>
                        <Pressable onPress={onClose} style={styles.cancelButton} testID="cancel-profile-button">
                            <Text style={styles.cancelText}>Cancel</Text>
                        </Pressable>

                        <Pressable onPress={() => {
                                onSubmit(firstName, lastName, email, phonenumber);
                            }}
                            style={styles.addButton}
                            testID="edit-profile-button"
                        >
                            <Text style={styles.addText}>Edit Profile</Text>
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