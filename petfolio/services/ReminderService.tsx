import { Platform } from "react-native";
import { Reminder, ReminderInput } from "../types";
import { supabase } from "../utils/supabase";
import * as Notifications from "expo-notifications";

const getRemindersByUserId = async (userId: string) => {
  try {
    const { error, data } = await supabase
      .from("reminder")
      .select("*")
      .eq("user_id", userId);

    if (error) {
      console.error("Supabase error with fetching reminders: ", error.message);
      return;
    }

    return data;
  } catch (error) {
    console.error(`Error fetching reminders`, error.message);
    throw error;
  }
};

const createReminder = async (reminder: ReminderInput, userId: string) => {
  const { data, error } = await supabase
    .from("reminder")
    .insert({
      title: reminder.title,
      description: reminder.description,
      timestamp: reminder.timestamp.toISOString(),
      repeat_rule: reminder.repeat_rule,
      user_id: userId,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }
  return data;
};

const schedulereminderNotification = async (reminder: Reminder) => {
  let notificationId = "";
  if (Platform.OS === "ios") {
    notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: reminder.title,
        body: reminder.description,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
        minute: reminder.timestamp.getMinutes(),
        hour: reminder.timestamp.getHours(),
        day: reminder.timestamp.getDate(),
        month: reminder.timestamp.getMonth() + 1,
        repeats: false,
      },
    });
    console.log(notificationId)
  } else {
    notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: reminder.title,
        body: reminder.description,
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: reminder.timestamp,
      },
    });
  }
  await supabase
    .from("reminder")
    .update({ notification_id: notificationId })
    .eq("id", reminder.id);
};

const resyncRemindersForUser = async (userId: string) => {
  const reminders = await getRemindersByUserId(userId);
  if (!reminders) return;


  await Notifications.cancelAllScheduledNotificationsAsync();

  for (const reminder of reminders) {
    const reminderWithDate = {
      ...reminder,
      timestamp: new Date(reminder.timestamp),
    };

    if (reminderWithDate.timestamp > new Date()) {
      await schedulereminderNotification(reminderWithDate);
    }
  }
};

// const getNextTimestamp = (
//   current: Date,
//   repeatType: 'daily' | 'weekly' | 'monthly' | 'yearly'
// ) => {
//   const date = new Date(current);

//   switch (repeatType) {
//     case 'daily':
//       date.setDate(date.getDate() + 1);
//       break;
//     case 'weekly':
//       date.setDate(date.getDate() + 7);
//       break;
//     case 'monthly':
//       date.setMonth(date.getMonth() + 1);
//       break;
//     case 'yearly':
//       date.setFullYear(date.getFullYear() + 1);
//       break;
//   }

//   return date;
// };

// const handleNotificationResponse = async (
//   response: Notifications.NotificationResponse
// ) => {
//   const notificationId = response.notification.request.identifier;

//   // 1️⃣ Fetch reminder by notification_id
//   const { data: reminder, error } = await supabase
//     .from('reminder')
//     .select('*')
//     .eq('notification_id', notificationId)
//     .single();

//   if (error || !reminder) return;

//   // 2️⃣ If not repeating, do nothing
//   if (reminder.repeat_type === 'none') return;

//   // 3️⃣ Calculate next timestamp
//   const nextTimestamp = getNextTimestamp(
//     new Date(reminder.timestamp),
//     reminder.repeat_type
//   );

//   // 4️⃣ Update DB
//   const { data: updatedReminder } = await supabase
//     .from('reminder')
//     .update({ timestamp: nextTimestamp.toISOString() })
//     .eq('id', reminder.id)
//     .select()
//     .single();

//   if (!updatedReminder) return;

//   // 5️⃣ Schedule next notification
//   await schedulereminderNotification({
//     ...updatedReminder,
//     timestamp: new Date(updatedReminder.timestamp),
//   });
// };

const deleteReminder = async (reminderId: string) => {
  try {
    const { data: reminder, error: fetchError } = await supabase
      .from("reminder")
      .select("*")
      .eq("id", reminderId)
      .single();

    if (fetchError) {
      throw fetchError;
    }

    if (reminder?.notification_id) {
      await Notifications.cancelScheduledNotificationAsync(reminder.notification_id);
    }

    const { error: deleteError } = await supabase
      .from("reminder")
      .delete()
      .eq("id", reminderId);

    if (deleteError) {
      throw deleteError;
    }

    console.log(`Reminder ${reminderId} deleted successfully`);
  } catch (error) {
    console.error(`Error deleting reminder ${reminderId}:`, error.message);
    throw error;
  }
};

const ReminderService = { getRemindersByUserId, createReminder, schedulereminderNotification, resyncRemindersForUser, deleteReminder };

export default ReminderService;
