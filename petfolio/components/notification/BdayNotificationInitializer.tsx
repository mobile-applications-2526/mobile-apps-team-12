import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import { CalendarTriggerInput } from "expo-notifications";
import PetService from "../../services/PetService";
import { Pet } from "../../types";
import { useAuth } from "../../context/authContext";


// Notifications on IOS don't work yet when silent switch is on!!!!
export default function BdayNotificationInitializer() {
  const [pets, setPets] = useState<Pet[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading } = useAuth();

  function clearErrors() {
    setError("");
  }
  async function getPetsData() {
    clearErrors();
    if (!user) {
      setError("Please log in to view your pets");
      setPets([]);
      setLoading(false);
      return;
    }
    try {
      const result = await PetService.getMyPets();
      setPets(result);
      console.log(result)
    } catch (err) {
      console.error("Failed to fetch pets", err);
      setPets([]);
      setError("Failed to load pets. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    async function init() {
      getPetsData()
      // Ask permission
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        console.log("permission not");
      }


      pets.forEach((pet) => {
        if (!pet.birthdate) return;

        const birthdayDate = new Date(pet.birthdate);
        birthdayDate.setHours(15, 0, 0); // send at 09:00

        Notifications.scheduleNotificationAsync({
          content: {
            title: "🎉 Birthday today!",
            body: `It's ${pet.name}'s birthday today! 🎂`,
          },
          trigger: {
            type: Notifications.SchedulableTriggerInputTypes.CALENDAR,
            month: birthdayDate.getMonth() + 1,
            day: birthdayDate.getDate(),
            hour: birthdayDate.getHours(),
            minute: birthdayDate.getMinutes(),
            repeats: true,
          },
        });
      });
    }

    init();
  }, []);



  return null;
}
