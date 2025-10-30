import { StyleSheet, View, Pressable, Text } from 'react-native';

type Props = {
  label: string;
};

export default function Button({ label }: Props) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={() => alert('You pressed a button.')}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 10,
    width: '75%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row",
    backgroundColor: "#3D3D3D",
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 16,
  },
});