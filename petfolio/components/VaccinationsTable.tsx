import React from "react";
import { Pet } from "../types";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Table } from 'react-native-table-component';
import { router } from "expo-router";

type Props = {
    petData: Pet
}

export default function VaccinationsTable({ petData }: Props) {

    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <Text style={styles.profileName}>{petData.name}'s Vaccinations</Text>
                <ScrollView>
                    <Table>
                        {petData && petData.vaccins.map((vac) => (
                            <TouchableOpacity onPress={() => router.navigate(`/vaccination/${vac.id}`)} key={vac.id} style={styles.customRow}>
                                <View style={styles.firstCell}>
                                    <Text>{vac.name}{"\n"}{vac.type}</Text>
                                </View>

                                <View style={styles.secondCell}>
                                    <Text>{vac.shot_date.toString()}</Text>
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
        height: 700
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
        flex: 2
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