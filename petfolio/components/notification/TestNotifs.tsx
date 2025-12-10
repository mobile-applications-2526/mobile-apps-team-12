import * as Notifications from "expo-notifications";
import { Button, View } from "react-native";

export default function TestScreen() {
  async function testBirthdayNotification() {
    // ask permission (iOS is strict)
    // const { status } = await Notifications.requestPermissionsAsync();
    // if (status !== "granted") {
    //   alert("Permission not granted!");
    //   return;
    // }

    // schedule a test calendar notification for *1 minute from now*
    const now = new Date();
    const triggerTime = new Date(now.getTime() + 60 * 1000); // +1 min

    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🎉 TEST BIRTHDAY",
        body: "If you see this, calendar notifications WORK!",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        minute: triggerTime.getMinutes(),
        hour: triggerTime.getHours(),
        day: triggerTime.getDate(),
        month: triggerTime.getMonth() + 1,
        repeats: false,
      },
    });

    alert("Notification scheduled for 1 minute from now!");
  }

  return (
    <View style={{ marginTop: 100 }}>
      <Button title="TEST BIRTHDAY NOTIFICATION" onPress={testBirthdayNotification} />
    </View>
  );
}
