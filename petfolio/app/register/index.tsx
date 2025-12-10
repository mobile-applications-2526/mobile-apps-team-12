import { StyleSheet, View } from "react-native";
import Header from "../../components/Header";
import RegisterForm from "../../components/login-register/RegisterForm";
export default function Register() {
  return (
    <View style={styles.container}>
      <Header />
      <RegisterForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F1EB",
    alignItems: "center",
    margin: 0,
    maxWidth: "100%",
  },
});
