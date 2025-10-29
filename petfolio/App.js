import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import Button from "./components/Button.tsx";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require("./assets/petfolio-logo.png")}
          style={styles.image}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Welcome To</Text>
        <Text style={styles.text}>PetFolio</Text>

      </View>
      <View style = {styles.buttonContainer}>
          <Button label="Register"/>
          <Button label="Login"/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F1EB",
    alignItems: "center",
    marginBottom: 0,
  },
  imageContainer: {
    alignItems: "center",
  },
  textContainer: {
    alignItems: "center",
  },
  buttonContainer:
  {
   margin: 15,
   
  },
  text: {
    color: "#3D3D3D",
   
  },
  image: {
    resizeMode: "center",
    aspectRatio: 1,
  },
});
