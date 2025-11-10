import { useSQLiteContext } from "expo-sqlite";
import { View } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ProfileOverview from "../../components/ProfileOverview";
import { Profile } from "../../types";
import ProfileService from "../../services/ProfileService";

export default function Profiles() {
    const db = useSQLiteContext();

    const [profile, setProfile] = useState<Profile>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    function clearErrors() {
        setError("");
    }
    async function getProfileByUser() {
        clearErrors()

        try {
            const result = await ProfileService.getProfileByUserId(db, '1');
            console.log(result)
            if (result.length > 0) {
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
        <View>
            <Header />
            <View>
                <ProfileOverview profileData={profile} />
            </View>
        </View>
    );
}
