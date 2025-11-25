import React from "react";
import { Medication, Profile } from "../types";
import { View, Text, StyleSheet, Image } from "react-native";
import { Table, Row, Rows } from 'react-native-table-component';

type Props = {
    medicationData: Medication
}

export default function MedicationSpecification({ medicationData }: Props) {

    const tableData = [
        ["Amount", medicationData.quantity],
        ["Description", medicationData.description]
    ];

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Text style={styles.profileName}>{medicationData.name}</Text>
                <Table>
                    <Rows style={styles.row} data={tableData} />
                </Table>
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
        height: 700
    },
    profileName: {
        fontSize: 40,
        textAlign: 'center',
        marginBottom: 20,
        borderBottomColor: '#242424ff',

    },

    row: {
        paddingTop: 10,
        paddingBottom: 10
    },

});