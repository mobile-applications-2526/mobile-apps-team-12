import { useState } from "react";
import { View } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { StyleSheet } from "react-native";
import { Pet } from "../../types";

type Props = {
  pets: Pet[];
};

export default function CalendarView({ pets }: Props) {
  const [selected, setSelected] = useState("");
  const petBirthdays = pets.map((pet) => pet.birthdate.toString());
  const marked = petBirthdays.reduce((acc, date) => {

    acc[date] = { marked: true, dotColor: "#af3f20ff" };
    return acc;
  }, {});

  const combinedMarks = {
    ...marked,
    ...(selected && {
      [selected]: {
        selected: true,
        selectedColor: "#af3f20ff",
      },
    }),
  };

  return (
    <View>
      <Calendar
        style={styles.calendar}
        theme={{
          calendarBackground: "#E07A5F",
        }}
        onDayPress={(day) => {
          setSelected(day.dateString);
        }}
        markedDates={combinedMarks}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 5,
    backgroundColor: "#E07A5F",
    height: 350,
    width: 350,
  },
});
