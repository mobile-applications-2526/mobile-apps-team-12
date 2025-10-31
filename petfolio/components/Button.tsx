import { StyleSheet, View, Pressable, Text } from "react-native";
import { useRouter } from "expo-router";

type Props = {
  label: string;
  path: string;
};

export default function Button({ label, path }: Props) {
  const router = useRouter();
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={() => router.navigate(path)}>
        <View>
          <Text style={styles.buttonLabel}>{label}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 10,
    width: "75%",
    height: "30%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#3D3D3D",
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
