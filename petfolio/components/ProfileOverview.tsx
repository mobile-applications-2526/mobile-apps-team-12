import React from "react";
import { Profile } from "../types";
import { View, Text, StyleSheet, Image } from "react-native";
import { Table, Row, Rows } from 'react-native-table-component';

type Props = {
    profileData: Profile
}

export default function ProfileOverview({ profileData }: Props) {

    const tableData = [
        ['Email', profileData.user_id.email],
        ['Phone Number', profileData.user_id.phonenumber]
    ];

    return (
        <View style={styles.container}>
            <Image
                source={require("../assets/bengel-pf.png")}
                style={styles.profilePic}
            />
            <View style={styles.profile}>
                <Text style={styles.profileName}>{profileData.user_id.firstname}</Text>
                <Table>
                    <Rows rowStyle={styles.row} data={tableData} />
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
        marginTop: 50,
    },

    profile: {
        width: '100%',
        backgroundColor: '#E2866E',
        borderRadius: 15,
        alignItems: 'stretch',
        padding: 16,
        paddingTop: 80,
        height: 700
    },
    profilePic: {
        position: 'absolute',
        top: -60,
        width: 120,
        height: 120,
        borderRadius: 60,
        zIndex: 2
    },
    profileName: {
        fontSize: 36,
        textAlign: 'center',
        marginBottom: 20
    },

    row: {
        backgroundColor: '#cf6044ff',
        borderBottomWidth: 1
    }

});