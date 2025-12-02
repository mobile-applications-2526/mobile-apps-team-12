import { StyleSheet, Text, View, Image, ActivityIndicator } from "react-native";
import Button from "../../components/Button";
import Header from "../../components/Header";
import { useRouter } from "expo-router";
import { useAuth } from "../../context/authContext";
import { useEffect, useState } from "react";

export default function Homepage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [user]);

  // Add loading state
  if (loading) {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="rgba(0, 28, 5, 1)" />
          <Text>Loading data...</Text>
        </View>
      </View>
    );
  }

  if (user)
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/petfolio-logo.png")}
            style={styles.image}
          />
          <View>
            <Text style={styles.title}>Welcome To Petfolio</Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button
            label="Pet Overview"
            onPress={() => router.navigate("/petOverview")}
          />
          <Button label="Add Pet" onPress={() => router.navigate("/addPet")} />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F1EB",
    alignItems: "center",
    marginBottom: 0,
    maxWidth: "100%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginTop: 50,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 100,
    width: 95,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#3D3D3D",
    margin: 5,
  },
});
