import React, { useState } from "react";
import { Medication, Profile } from "../types";
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, Keyboard } from "react-native";
import { Table, Row, Rows } from 'react-native-table-component';
import MedicationService from "../services/MedicationService";
import { router } from "expo-router";

type Props = {
    medicationData: Medication
}

export default function MedicationSpecification({ medicationData }: Props) {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [quantity, setQuantity] = useState(medicationData.quantity);
    const [description, setDescription] = useState(medicationData.description);
    const [tempQuantity, setTempQuantity] = useState(quantity);
    const [showQuantityModal, setShowQuantityModal] = useState(false);

    // const tableData = [
    //     ["Amount", medicationData.quantity],
    //     ["Description", medicationData.description]
    // ];

    const handleDelete = async () => {
        try {
            await MedicationService.deleteMedication(medicationData.id);
            setShowDeleteModal(false);
            router.back();
        } catch (error) {
            console.error("Failed to delete medication:", error);
        }
    }

    const handleQuantity = async () => {
        if (quantity !== medicationData.quantity) {
            try {
                await MedicationService.updateMedication(medicationData.id, { quantity });
                setQuantity(tempQuantity);
                setShowQuantityModal(false);
            } catch (error) {
                console.error("Failed to update medication quantity:", error);
            }
        }
    }

    const handleDescription = async () => {
        if (description !== medicationData.description) {
            try {
                await MedicationService.updateMedication(medicationData.id, { description });
            } catch (error) {
                console.error("Failed to update medication description:", error);
                setDescription(medicationData.description);
            }
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Text style={styles.profileName}>{medicationData.name}</Text>
                <TouchableOpacity
                    style={styles.amountRow}
                    onPress={() => {
                        setTempQuantity(quantity);
                        setShowQuantityModal(true);
                    }}
                >
                    <Text style={styles.amountLabel}>Amount</Text>
                    <View style={styles.amountRight}>
                        <Text style={styles.amountValue}>{quantity}</Text>
                        <Text style={styles.arrow}>&rsaquo;</Text>
                    </View>
                </TouchableOpacity>

                <View>
                    <TouchableOpacity
                        style={styles.doneButton}
                        onPress={dismissKeyboard}
                    >
                        <Text style={styles.doneButtonText}>Done</Text>
                    </TouchableOpacity>

                    <TextInput
                        style={styles.descriptionInput}
                        value={description}
                        onChangeText={setDescription}
                        onEndEditing={handleDescription}
                        multiline
                        placeholder={description}
                        placeholderTextColor="#999"
                    />
                </View>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => setShowDeleteModal(true)}
                >
                    <Text style={styles.deleteButtonText}>Delete Medication</Text>
                </TouchableOpacity>
            </View>

            <Modal
                visible={showDeleteModal}
                transparent={true}
                animationType="fade"
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowDeleteModal(false)}
                >
                    <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
                        <Text style={styles.modalTitle}>Delete Medication</Text>
                        <Text style={styles.confirmText}>
                            Are you sure you want to medication {medicationData.name}? This action cannot be undone.
                        </Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setShowDeleteModal(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.deleteModalButton]}
                                onPress={handleDelete}
                            >
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
            <Modal
                visible={showQuantityModal}
                transparent={true}
                animationType="fade"
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowQuantityModal(false)}
                >
                    <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
                        <Text style={styles.modalTitle}>Edit Amount</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={tempQuantity}
                            onChangeText={setTempQuantity}
                            placeholder={quantity}
                            placeholderTextColor="#999"
                            autoFocus
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setShowQuantityModal(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={handleQuantity}
                            >
                                <Text style={styles.saveButtonText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F1EB",
        alignItems: "center",
        width: '100%',
    },

    profile: {
        width: '100%',
        borderRadius: 30,
        alignItems: 'stretch',
        padding: 20,
        height: 700
    },
    profileName: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: "#b1b1b1ff",
    },

    row: {
        paddingTop: 10,
        paddingBottom: 10
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 30,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
        elevation: 3,
    },

    deleteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContent: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        width: '80%',
        maxWidth: 340,
    },

    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },

    confirmText: {
        fontSize: 15,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 22,
    },

    modalInput: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        marginBottom: 20,
    },

    modalButtons: {
        flexDirection: 'row',
        gap: 12,
    },

    modalButton: {
        flex: 1,
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },

    cancelButton: {
        backgroundColor: '#f0f0f0',
    },

    cancelButtonText: {
        color: '#666',
        fontSize: 16,
        fontWeight: '500',
    },
    deleteModalButton: {
        backgroundColor: '#dc3545',
    },

    deleteModalButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },

    amountRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },

    amountLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },

    amountRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    amountValue: {
        fontSize: 16,
        color: '#666',
        marginRight: 8,
    },

    arrow: {
        fontSize: 24,
        color: '#999',
        fontWeight: '300',
    },

    descriptionLabel: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
        marginBottom: 8,
    },

    descriptionInput: {
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        fontSize: 15,
        color: '#333',
        minHeight: 120,
        textAlignVertical: 'top',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    saveButton: {
        backgroundColor: '#7B9B8A',
    },

    saveButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    doneButton: {
        alignSelf: 'flex-end',
        backgroundColor: '#7B9B8A',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 8,
        marginBottom: 8,
    },

    doneButtonText: {
        color: 'white',
        fontWeight: '600',
    },
});