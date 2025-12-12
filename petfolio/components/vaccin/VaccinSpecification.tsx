import React, { use, useState } from "react";
import { Vaccin } from "../../types";
import { View, Text, StyleSheet, TouchableOpacity, Modal, Keyboard, TextInput } from "react-native";
import { Table, Rows } from 'react-native-table-component';
import VaccinationService from "../../services/VaccinationService";
import { router } from "expo-router";
import { DatePickerModal, en, registerTranslation } from "react-native-paper-dates";
import Ionicons from "@react-native-vector-icons/ionicons";

type Props = {
    vacData: Vaccin
}

export default function VaccinSpecification({ vacData }: Props) {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [shotDate, setShotDate] = useState(
        vacData.shot_date ? new Date(vacData.shot_date) : null
    );

    const [expireDate, setExpiredate] = useState(
        vacData.expire_date ? new Date(vacData.expire_date) : null
    );

    const [type, setType] = useState(vacData.type);
    const [tempType, setTempType] = useState(type);
    const [showTypeModal, setShowTypeModal] = useState(false);
    const [openShot, setOpenShot] = useState(false);
    const [openExpire, setOpenExpire] = useState(false);

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    const handleDelete = async () => {
        try {
            await VaccinationService.deleteVaccin(vacData.id);
            setShowDeleteModal(false);
            router.back();
        } catch (error) {
            console.error("Failed to delete vaccin:", error);
        }
    }


    const handleType = async () => {
        dismissKeyboard();
        try {
            await VaccinationService.updateVaccin(vacData.id, { type: tempType });
            setType(tempType);
            setShowTypeModal(false);
        } catch (error) {
            console.error("Failed to update vaccin type:", error);
            setType(vacData.type);
        }
    };

    const handleShotDate = async (newDate: Date) => {
        dismissKeyboard();
        if (newDate.getTime() !== (vacData.shot_date ? new Date(vacData.shot_date).getTime() : 0)) {
            try {
                await VaccinationService.updateVaccin(vacData.id, { shot_date: newDate });
                setShotDate(newDate);
            } catch (error) {
                console.error("Failed to update vaccin shot date:", error);
                setShotDate(vacData.shot_date ? new Date(vacData.shot_date) : null);
            }
        }
    };


    const handleExpireDate = async (newDate: Date) => {
        dismissKeyboard();
        if (newDate.getTime() !== (vacData.expire_date ? new Date(vacData.expire_date).getTime() : 0)) {
            try {
                await VaccinationService.updateVaccin(vacData.id, { expire_date: newDate });
                setExpiredate(newDate);
            } catch (error) {
                console.error("Failed to update vaccin expire date:", error);
                setExpiredate(vacData.expire_date ? new Date(vacData.expire_date) : null);
            }
        }
    };



    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Text style={styles.profileName}>{vacData.name}</Text>
                <TouchableOpacity
                    style={styles.amountRow}
                    onPress={() => {
                        setTempType(type);
                        setShowTypeModal(true);
                    }}
                >
                    <Text style={styles.amountLabel}>Type</Text>
                    <View style={styles.amountRight}>
                        <Text style={styles.amountValue}>{type}</Text>
                        <Text style={styles.arrow}>&rsaquo;</Text>
                    </View>
                </TouchableOpacity>

                <Text style={styles.label}>Shot date:</Text>
                <View style={styles.dateContainer}>
                    {shotDate && <Text>{shotDate.toLocaleDateString()}</Text>}
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
                    date={shotDate}
                    onDismiss={() => setOpenShot(false)}
                    onConfirm={({ date }) => {
                        setOpenShot(false);
                        setShotDate(date);
                        handleShotDate(date);
                    }}
                />


                <Text style={styles.label}>Expire date:</Text>
                <View style={styles.dateContainer}>
                    {expireDate && <Text>{expireDate.toLocaleDateString()}</Text>}
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
                    date={expireDate}
                    onDismiss={() => setOpenExpire(false)}
                    onConfirm={({ date }) => {
                        setOpenExpire(false);
                        setExpiredate(date);
                        handleExpireDate(date)
                    }}
                />
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => setShowDeleteModal(true)}
                >
                    <Text style={styles.deleteButtonText}>Delete Vaccin</Text>
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
                        <Text style={styles.modalTitle}>Delete vaccin</Text>
                        <Text style={styles.confirmText}>
                            Are you sure you want to delete {vacData.name}? This action cannot be undone.
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
                visible={showTypeModal}
                transparent={true}
                animationType="fade"
            >
                <TouchableOpacity
                    style={styles.modalOverlay}
                    activeOpacity={1}
                    onPress={() => setShowTypeModal(false)}
                >
                    <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
                        <Text style={styles.modalTitle}>Edit Type</Text>
                        <TextInput
                            style={styles.modalInput}
                            value={tempType}
                            onChangeText={setTempType}
                            placeholder={type}
                            placeholderTextColor="#999"
                            autoFocus
                        />

                        <View style={styles.modalButtons}>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.cancelButton]}
                                onPress={() => setShowTypeModal(false)}
                            >
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.modalButton, styles.saveButton]}
                                onPress={handleType}
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