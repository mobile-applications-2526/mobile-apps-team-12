import React from "react";
import { Profile } from "../types";
import { View, Text } from "react-native";

type Props = {
    profileData: Profile
}

export default function ProfileOverview({ profileData }: Props) {
    return (
        <View>
            <Text>{profileData.userId.firstName}</Text>
            <Text>{profileData.userId.email}</Text>
            <Text>{profileData.userId.phonenumber}</Text>
        </View>
    )
}