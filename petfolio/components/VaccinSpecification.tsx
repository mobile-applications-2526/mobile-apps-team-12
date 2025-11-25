import React from "react";
import { Vaccin } from "../types";
import { View, Text, StyleSheet } from "react-native";
import { Table, Rows } from 'react-native-table-component';

type Props = {
    vacData: Vaccin
}

export default function VaccinSpecification({ vacData }: Props) {

    const tableData = [
        ["Date", vacData.shot_date],
        ["Type", vacData.type],
        ["Expiration Date", vacData.expire_date]
    ];

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Text style={styles.profileName}>{vacData.name}</Text>
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
        borderBottomWidth: 2,
        borderBottomColor: "#b1b1b1ff",
    },

    row: {
        paddingTop: 10,
        paddingBottom: 10
    },

});