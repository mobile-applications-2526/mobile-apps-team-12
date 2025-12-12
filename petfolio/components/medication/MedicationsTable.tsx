import React from "react";
import { Pet } from "../../types";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Table, Row } from 'react-native-table-component';
import { Link, router } from "expo-router";

type Props = {
    petData: Pet
}

export default function MedicationsTable({ petData }: Props) {

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Text style={styles.profileName}>{petData.name}'s Medication</Text>
                <ScrollView contentContainerStyle={{ paddingBottom: 90, paddingHorizontal: 10 }}>
                    <Table>
                        {petData && petData.medication.map((med) => (
                            <TouchableOpacity onPress={() => router.navigate(`/medication/${med.id}`)} key={med.id} style={styles.customRow}>
                                <View style={styles.firstCell}>
                                    <Text>{med.name}{"\n"}{med.description}</Text>
                                </View>

                                <View style={styles.secondCell}>
                                    <Text>{med.quantity}</Text>
                                </View>

                                <View style={styles.thirdCell}>
                                    <Text>&rsaquo;</Text>
                                </View>
                            </TouchableOpacity >
                        ))}

                    </Table>
                </ScrollView>
            </View>
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
    },
    profileName: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 20
    },

    row: {
        borderTopWidth: 2,
        borderTopColor: '#b1b1b1ff',
        paddingTop: 20,
        paddingBottom: 20,
    },
    arrow: {
        fontSize: 20,
        textAlign: "right",
    },
    customRow: {
        flexDirection: "row",
        borderTopWidth: 2,
        borderTopColor: "#b1b1b1ff",
        paddingVertical: 20,
        alignItems: "center"
    },
    firstCell: {
        flex: 2,
        paddingLeft: 20
    },
    secondCell: {
        flex: 1,
        alignItems: "center"
    },
    thirdCell: {
        flex: 0.5,
        alignItems: "flex-end",
        paddingRight: 20
    },


});