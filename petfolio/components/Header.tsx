import { StyleSheet, View, Image, Pressable } from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { useRouter } from "expo-router";

export default function Header() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.leftButtons}>
        <Pressable
        onPress={() => router.navigate("/")}
        >
        <Image
          source={require("../assets/petfolio-logo.png")}
          style={styles.image}
        />
        </Pressable>
      </View>
      <View style={styles.rightButtons}>
        <Ionicons name="person" size={40} color="rgba(0, 28, 5, 1)" />
        <Ionicons
          name="calendar-clear-outline"
          size={40}
          color="rgba(0, 28, 5, 1)"
        />
        <Ionicons
          name="notifications-outline"
          size={40}
          color="rgba(0, 28, 5, 1)"
        />
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
