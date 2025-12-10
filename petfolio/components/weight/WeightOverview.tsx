import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from "react-native";
import { Weight } from "../../types";
import React, { useState } from "react";

type Props = {
    weights?: Weight[];
    onDelete?: (weightId: string) => void;
};

export default function WeightOverview({ weights = [], onDelete }: Props) {
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedWeight, setSelectedWeight] = useState<Weight | null>(null);

    const sortedWeights = [...weights].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    const handleDeletePress = (weight: Weight) => {
        setSelectedWeight(weight);
        setDeleteModalVisible(true);
    };

    const confirmDelete = () => {
        if (selectedWeight && onDelete) {
            onDelete(selectedWeight.id);
        }
        setDeleteModalVisible(false);
        setSelectedWeight(null);
    };

    return (
        <>
            <ScrollView contentContainerStyle={{ paddingBottom: 90, paddingHorizontal: 10 }}>
                {sortedWeights.map((weight) => {
                    const date = new Date(weight.date);
                    const formatted = date.toLocaleDateString("nl-BE", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    });

                    return (
                        <View key={weight.id} style={styles.row}>
                            <View style={styles.firstCell}>
                                <Text>{weight.value} kg</Text>
                            </View>

                            <View style={styles.secondCell}>
                                <Text>{formatted}</Text>
                            </View>

                            <View style={styles.thirdCell}>
                                <TouchableOpacity
                                    onPress={() => handleDeletePress(weight)}
                                    style={styles.deleteButton}
                                >
                                    <Text style={styles.trashIcon}>🗑️</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
            <Modal
                visible={deleteModalVisible}
                transparent={true}
                animationType="fade"
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setDeleteModalVisible(false)}
                >
                    <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
                        <Text style={styles.modalTitle}>Delete Weight</Text>
                        <Text style={styles.confirmText}>
                            Are you sure you want to delete this weight entry?
                        </Text>

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setDeleteModalVisible(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.deleteButtonModal]}
                                onPress={confirmDelete}
                                testID="delete-weight-button"
                            >
                                <Text style={styles.deleteButtonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        borderTopWidth: 2,
        borderTopColor: "#b1b1b1ff",
        paddingVertical: 20,
        alignItems: "center",
    },
    firstCell: {
        flex: 1,
    },
    secondCell: {
        flex: 1,
        alignItems: "center",
    },
    thirdCell: {
        flex: 0.3,
        alignItems: "flex-end",
        paddingRight: 20,
    },
    deleteButton: {
        padding: 8,
    },
    trashIcon: {
        fontSize: 20,
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
    deleteButtonModal: {
        backgroundColor: '#dc3545',
    },
    deleteButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});