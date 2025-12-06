import { StyleSheet, View, Image, Pressable } from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";
import { supabase } from "../utils/supabase";

export default function Header() {
  const router = useRouter();

  async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw new Error("Something went wrong when loggin out.", error);
  }
}
  return (
    <View style={styles.container}>
      <View style={styles.leftButtons}>
        <Pressable
          onPress={() => router.navigate("/homepage")}
        >
          <Image
            source={require("../assets/petfolio-logo.png")}
            style={styles.image}
          />
        </Pressable>
      </View>
      <View style={styles.rightButtons}>

        <Pressable
          onPress={() => router.navigate("/profile")}
        ><Ionicons name="person" size={40} color="rgba(0, 28, 5, 1)" /></Pressable>
        <Pressable
        onPress={() => router.navigate("/calendar")}>
        <Ionicons
          name="calendar-clear-outline"
          size={40}
          color="rgba(0, 28, 5, 1)"
        /></Pressable>
        <Ionicons
          name="notifications-outline"
          size={40}
          color="rgba(0, 28, 5, 1)"
        />
        <Pressable>
          <Ionicons  onPress={() => logout()}
          name="exit-outline"
          size={42}
          color="rgba(0, 28, 5, 1)"
        /></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 60,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: "rgba(128, 128, 128, 1)",
    borderBottomWidth: 2,
  },
  rightButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
    marginHorizontal: 20,
    marginBottom: 10,
  },
  leftButtons: {
    flex: 1,
    justifyContent: "flex-start",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  image: {
    height: 50,
    width: 45,
    padding: 0,
  },
});
