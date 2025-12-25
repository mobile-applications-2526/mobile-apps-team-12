import { StyleSheet,  View } from "react-native";
import Header from "../../components/Header";
import AddReminder from "../../components/reminder/AddReminder";

export default function AddReminderPage() {
  return (
    <View style={styles.container}>
      <Header />
        <AddReminder />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F1EB",
    marginBottom: 0,
    maxWidth: "100%",
  },

});
