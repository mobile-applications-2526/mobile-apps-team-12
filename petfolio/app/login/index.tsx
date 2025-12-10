import { StyleSheet, View, Text, TextInput } from "react-native";
import Header from "../../components/Header";
import LoginForm from "../../components/login-register/LoginForm";
import TestScreen from "../../components/notification/TestNotifs";
export default function Login() {
  return (
    <View style={styles.container}>
      <Header />
      <View>
        <LoginForm />
        <TestScreen></TestScreen>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: "#3D3D3D",
    margin: 5,
  },
});