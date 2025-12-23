import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ProfileOverview from "../../components/profile/ProfileOverview";
import { Profile } from "../../types";
import ProfileService from "../../services/ProfileService";
import UserService from "../../services/UserService";
import { useAuth } from "../../context/authContext";

export default function UserProfile() {
  const [profile, setProfile] = useState<Profile>(undefined);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { session } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  function clearErrors() {
    setError("");
  }
  const mapToProfile = (raw: any, userInfo: any): Profile => ({
    id: String(raw.id),
    user_id: String(raw.user_id),
    firstname: userInfo.first_name,
    lastname: userInfo.last_name,
    email: userInfo.email,
    phonenumber: userInfo.phonenumber,
    pictures: raw.pictures,
  });
  async function getProfileByUser() {
      if (!session) {
      setProfile(null);
      setLoading(false);
      return;
    }
    clearErrors();
    if (session) {
    try {
      const result = await ProfileService.getProfileByUserId();
      const userInfo = await UserService.getUserInformationByUserId();
      console.log("userInfo ", userInfo);
      if (result != null && userInfo != null) {
        const mappedProfile = mapToProfile(result, userInfo);
        setProfile(mappedProfile);
      } else {
        setProfile(null);
        setError("Something went wrong with fetching your Profile...");
      }
    } catch (err) {
      console.error("Failed to fetch profile", err);
      setProfile(null);
      setError("Failed to load profile. Please try again.");
    } finally {
      setLoading(false);
    }
  }
}

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };
  useEffect(() => {
    getProfileByUser();
  }, [session, refreshKey]);

  return (
    
    <View style={styles.container}>
      <Header />
      <View>
        {!error && profile && <ProfileOverview profileData={profile} onProfileUpdated={handleRefresh} />}
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
    width: "100%",
  },
});
