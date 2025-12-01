import { Food } from "../types";
import { supabase } from "../utils/supabase";

const addFoodToPet = async (petId: string, name: string, description: string, quantity: string): Promise<Food> => {
    try {
        const {data: petCheck, error: petCheckError} = await supabase
            .from("pets")
            .select("id, owner_id")
            .eq("id", Number(petId))
            .single();

        if (petCheckError) {
            console.error("Pet check failed:", petCheckError);
            throw new Error("Could not verify pet ownership");
        }

        console.log("Pet check passed:", petCheck);

        const { data: food, error: foodError } = await supabase
            .from("food")
            .insert({ name, description, quantity })
            .select()
            .single();

        if (foodError) {
            console.error("Food insert failed:", foodError);
            throw foodError;
        }

        console.log("Food inserted:", food);

        const { error: linkError } = await supabase
            .from("pets_food")
            .insert({
                pet_id: Number(petId),
                food_id: food.id,
            });

        if (linkError) {
            console.error("Linking food to pet failed:", linkError);
            await supabase.from("food").delete().eq("id", food.id);
            throw linkError;
        }

        return {
            id: food.id,
            name: food.name,
            description: food.description,
            quantity: food.quantity,
        };
    } catch (error) {
        console.error("Error in addFoodToPet:", error);
        throw error;
    }
};

const getFoods = async (petId: string) => {
    const { data, error } = await supabase
        .from("pets_food")
        .select("food (*)")
        .eq("pet_id", petId);
    
    if (error) throw error;
    return data.map((item: any) => item.food);
};

const getFoodById = async (foodId: string) => {
    try{
        const {
            data: { user },
            error: userError,
        } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) throw new Error("No user logged in");
        if (!foodId) throw new Error("No food ID given");
        const { data: food, error: foodError } = await supabase
            .from("food")
            .select("*")
            .eq("id", foodId);

        if (foodError) throw foodError;
        return Array.isArray(food) ? food : [];
    } catch (error) {
        console.error(`Error fetching food`, error);
        throw error;
    }
};

const updateFood = async (foodId: string, updates: { name?: string; description?: string; quantity?: string; }) => {
    try{
        const {data, error} = await supabase
            .from("food")
            .update(updates)
            .eq("id", Number(foodId))
            .select()
            .single();
        if (error) throw error;
        return data;
    }catch (error) {
        console.error(`Error updating food`, error);
        throw error;
    }
};

const FoodsService = {
    addFoodToPet,
    getFoods,
    getFoodById,
    updateFood,
};

export default FoodsService;