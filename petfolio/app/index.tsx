import { StyleSheet, Text, View, Image } from "react-native";
import Button from "../components/Button";
import Header from "../components/Header";
import { useRouter } from "expo-router";
import TestScreen from "../components/TestNotifs";
import BdayNotificationInitializer from "../components/BdayNotificationInitializer";

export default function Index() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Header />
      <BdayNotificationInitializer />
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/petfolio-logo.png")}
          style={styles.image}
        />
        <View>
          <Text style={styles.title}>Welcome To Petfolio</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          label="Register"
          onPress={() => router.navigate("/register")}
        />
        <Button label="Login" onPress={() => router.navigate("/login")} />
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
