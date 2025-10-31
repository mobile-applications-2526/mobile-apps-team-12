import { StyleSheet, View, Text } from "react-native";
import Header from "../../components/Header";
export default function Register() {
  return (
    <View style={styles.container}>
      <Header />
      <View>
        <Text>Register here</Text>
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
});
