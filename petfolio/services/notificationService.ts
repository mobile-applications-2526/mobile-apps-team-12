import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export async function setUpNotification() {
    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: true,
            shouldSetBadge: false,
            shouldShowBanner: false,
            shouldShowList: false,
        })
    })

    if (Platform.OS ==="android") {
         await Notifications.setNotificationChannelAsync("birthdays", {
      name: "Birthday Reminders",
      importance: Notifications.AndroidImportance.HIGH,
    });
    }

      const { status } = await Notifications.requestPermissionsAsync();
  if (status !== "granted") {
    console.log(status)
    alert("Permission needed to send reminders.");
  }
}