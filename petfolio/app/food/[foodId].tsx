import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { Link, router, useLocalSearchParams } from "expo-router";
import { Food } from "../../types";
import FoodService from "../../services/FoodService";
import Header from "../../components/Header";
import FoodSpecification from "../../components/food/FoodSpecification";

export default function FoodSpecificationPage() {
  const [food, setFood] = useState<Food>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { foodId } = useLocalSearchParams<{ foodId: string }>();

  function clearErrors() {
    setError("");
  }

  const mapToFood = (raw: any): Food => ({
    id: raw.id,
    name: raw.name,
    description: raw.description,
    quantity: raw.quantity,
  });

  async function getFood() {
    clearErrors();

    try {
      if (foodId != null) {
        const result = await FoodService.getFoodById(foodId);

        if (result != null) {
          const mappedFood = mapToFood(result[0]);
          setFood(mappedFood);
        } else {
          setFood(null);
          console.log(foodId + "id");
          setError("Something went wrong with fetching food...");
        }

      } else {
        setFood(null);
        console.log("parameter:" + foodId);
        setError("Food not found");
      }
    } catch (error) {
      console.error("Failed to fetch food", error);
      setFood(null);
      setError("Failed to load food. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getFood();
  }, []);

  return (
    <View style={styles.container}>
      <Header />
      <TouchableOpacity onPress={() => router.back()} style={styles.backLink}>
        <Text style={styles.backLinkText}>&larr; Back</Text>
      </TouchableOpacity>
      <View>
        {!error && food && <FoodSpecification foodData={food} />}
        {error && <Text>Error</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F1EB",
    alignItems: "stretch",
    marginBottom: 0,
    maxWidth: "100%",
    width: "100%",
  },
  backLink: {
    marginLeft: 20,
    marginBottom: 10
  },
  backLinkText: {
    textDecorationLine: "underline",
    color: "#043500ff"
  },
});
