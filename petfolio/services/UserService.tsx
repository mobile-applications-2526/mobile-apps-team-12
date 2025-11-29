import { SQLiteDatabase } from "expo-sqlite";
import { getAllUsers } from "../db/users";
import { supabase } from '../utils/supabase'


const registerUser = async (userData) => {
    try {
    const { data, error } = await supabase.auth.signUp({
      email: userData.email,
      password: userData.password,
    });

    if (error) throw error;
     // 2. Insert additional user information into your User Information table
        const { data: userInfo, error: userInfoError } = await supabase
            .from('User Information')
            .insert({
                id: data.user.id, 
                first_name: userData.firstName,
                last_name: userData.lastName,
                phonenumber: userData.phoneNumber,
                email: userData.email,
                auth_user_id: data.user.id
            });
        
        if (userInfoError) throw userInfoError;
    console.log('User signed up successfully:', data);
    console.log("Succesfully made user Info: ", userInfo)
    return data;
  } catch (error) {
    console.error('Error signing up:', error.message);
    return null;
  }
};

const loginUser = async (userData) => {
    try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: userData.email,
      password: userData.password,
    });

    if (error) throw error;
    console.log('User signed up successfully:', data);
    return data;
  } catch (error) {
    console.error('Error signing up:', error.message);
    return null;
  }
};



const getUsers = async (db: SQLiteDatabase) => {
    try {
        const users = await getAllUsers(db);
        return Array.isArray(users) ? users : [];
    } catch (error) {
        console.error(`Error fetching users`, error);
        throw error;
    }
}

const UserService = { registerUser, getUsers, loginUser }
export default UserService;