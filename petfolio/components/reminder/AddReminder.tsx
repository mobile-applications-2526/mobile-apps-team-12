import { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Notifications from 'expo-notifications';
import { supabase } from '../../utils/supabase';



export default function AddReminder() {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [timestamp, setTimestamp] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleAddReminder() {
    if (!title.trim()) {
      Alert.alert('Title is required');
      return;
    }

    try {
      setLoading(true);

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) throw new Error('Not authenticated');

      // 1️⃣ Save reminder in DB
      const reminder = createReminder(
        { title, body, timestamp },
        user.id
      );

      // 2️⃣ Schedule notification
      const notificationId =
        await Notifications.scheduleNotificationAsync({
          content: {
            title: reminder.title,
            body: reminder.body ?? '',
          },
          trigger: new Date(reminder.timestamp),
        });

      // 3️⃣ Store notification ID
      await supabase
        .from('reminders')
        .update({ notification_id: notificationId })
        .eq('id', reminder.id);

      Alert.alert('Reminder created 🎉');

      // Reset form
      setTitle('');
      setBody('');
      setTimestamp(new Date());
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={{ padding: 16 }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>
        Add Reminder
      </Text>

      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginTop: 12,
          borderRadius: 6,
        }}
      />

      <TextInput
        placeholder="Optional description"
        value={body}
        onChangeText={setBody}
        multiline
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginTop: 12,
          borderRadius: 6,
        }}
      />

      <View style={{ marginTop: 12 }}>
        <Button
          title={`Reminder time: ${timestamp.toLocaleString()}`}
          onPress={() => setShowPicker(true)}
        />
      </View>

      {showPicker && (
        <DateTimePicker
          value={timestamp}
          mode="datetime"
          onChange={(_, date) => {
            setShowPicker(false);
            if (date) setTimestamp(date);
          }}
        />
      )}

      <View style={{ marginTop: 20 }}>
        <Button
          title={loading ? 'Saving...' : 'Add Reminder'}
          onPress={handleAddReminder}
          disabled={loading}
        />
      </View>
    </View>
  );
}
function createReminder(arg0: { title: string; body: string; timestamp: Date; }, id: string) {
    throw new Error('Function not implemented.');
}

