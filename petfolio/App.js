import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Image
        source={require("./assets/petfolio-logo.png")}
        style={styles.image}
      />
      <Text>Welcome To</Text>
      <Text>PetFolio</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F1EB",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#3D3D3D",
  },
  image: {
    width: 100,
    height: 100,
  },
});
