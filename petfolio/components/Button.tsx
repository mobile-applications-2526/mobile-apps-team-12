import { StyleSheet, View, Pressable, Text } from "react-native";

type Props = {
  label: string;
  onPress: () => void; //callback function
  testID?: string;
};

export default function Button({ label, onPress, testID }: Props) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={onPress} testID={testID || `button-${label}`} >
        <View>
          <Text style={styles.buttonLabel}>{label}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    borderRadius: 10,
    width: "75%",
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#507e62",
    padding: 5
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
