import { Reminder, ReminderInput } from "../types";
import { supabase } from "../utils/supabase";
import * as Notifications from 'expo-notifications';

const getRemindersByUserId = async (userId: string) => {
    try {
        const {error, data} = await supabase
        .from("reminder")
        .select("*")
        .eq("user_id", userId)

        if (error) {
            console.error("Supabase error with fetching reminders: ", error.message);
            return;
        }

        return data;
    } catch (error) {
        console.error(`Error fetching reminders`, error.message);
        throw error
    }
};

const createReminder = async (reminder: ReminderInput ,userId: string)  => {
    const {data,error} =await supabase
    .from('reminders')
    .insert({
        title: reminder.title,
        description: reminder.description,
        timestamp: reminder.timestamp.toISOString(),
        repeat_type: 'none',
        user_id: userId
    })
    .select()
    .single();

    if (error) {
        throw error;
    }
    return data;
}

const schedulereminderNotification= async (reminder: Reminder) => {
    await Notifications.scheduleNotificationAsync({
    content: {
      title: reminder.title,
      body: reminder.description,
    },
    trigger: new Date(reminder.timestamp),
  });
}



const ReminderService = { getRemindersByUserId, createReminder }

export default ReminderService