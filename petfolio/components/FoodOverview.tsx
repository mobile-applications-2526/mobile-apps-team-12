import React from "react";
import { Food, Pet } from "../types";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Table, Row } from 'react-native-table-component';
import { router } from "expo-router";

type Props = {
    foods?: Food[]
}

export default function FoodOverview({ foods }: Props) {

    return (
                <ScrollView contentContainerStyle={{ paddingBottom: 90, paddingHorizontal: 10 }}>
                    <Table>
                        {foods && foods.map((food) => (
                            <TouchableOpacity onPress={() => router.navigate(`/food/${food.id}`)} key={food.id} style={styles.customRow}>
                                <View style={styles.firstCell}>
                                    <Text>{food.name}{"\n"}{food.description}</Text>
                                </View>

                                <View style={styles.secondCell}>
                                    <Text>{food.quantity}</Text>
                                </View>

                                <View style={styles.thirdCell}>
                                    <Text>&rsaquo;</Text>
                                </View>
                            </TouchableOpacity >
                        ))}

                    </Table>
                </ScrollView>
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