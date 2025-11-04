import { StyleSheet, Text, View, Image } from "react-native";
import Header from "../../components/Header";
export default function PetOverview() {
  return (
    <View style={styles.container}>
      <Header />
      <View>
        <Text style={styles.text}>This is the pet Overview</Text>
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
  text: {
    color: "#3D3D3D",
    margin: 5,
  },
  image: {
    height: 100,
    width: 95,
  },
});
