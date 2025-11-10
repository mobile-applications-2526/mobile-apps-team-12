import { useSQLiteContext } from "expo-sqlite";
import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ProfileOverview from "../../components/ProfileOverview";
import { Profile, User } from "../../types";
import ProfileService from "../../services/ProfileService";
import UserService from "../../services/UserService";

export default function Profiles() {
    const db = useSQLiteContext();

    const [user, setUser] = useState<User>(undefined);
    const [profile, setProfile] = useState<Profile>(undefined);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    function clearErrors() {
        setError("");
    }
    async function getProfileByUser() {
        clearErrors()

        try {
            const users = await UserService.getUsers(db);
            const currentUser = users[0];
            setUser(currentUser);

            const result = await ProfileService.getProfileByUserId(db, currentUser.id);
            console.log(result);
            if (result != null) {
                setProfile(result);

            } else {
                setProfile(null);
                setError("Something went wrong with fetching your Profile...")
            }
        } catch (err) {
            console.error("Failed to fetch profile", err);
            setProfile(null);
            setError("Failed to load profile. Please try again.");
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getProfileByUser()
    }, [])

    return (
        <View style={styles.container}>
            <Header />
            <View>
                {!error && profile && <ProfileOverview profileData={profile} />}
                {error && <Text>Error</Text>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F6F1EB",
        alignItems: "stretch",
        marginBottom: 0,
        maxWidth: "100%",
        width: '100%'
    },
});
