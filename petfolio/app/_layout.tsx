import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React, {useEffect} from "react";
import { View, StyleSheet } from "react-native";
import { SQLiteProvider } from 'expo-sqlite';
import { migrateDbIfNeeded } from '../db/database';
import { supabase } from '../utils/supabase';
import { Stack } from 'expo-router';
import { AuthProvider } from '../context/authContext';


export default function RootLayout() {
  useEffect(() => {
    // Optional: Test Supabase connection on app start
    const testConnection = async () => {
      const { data, error } = await supabase.from('pets').select('count');
      if (error) {
        console.log('Supabase connection error:', error.message);
      } else {
        console.log('Supabase connected successfully');
      }
    };
    
    testConnection();
  }, []);

  return (
    // <SafeAreaProvider>
      
    // {/* <SQLiteProvider databaseName="petfolioLocalDb.db" onInit={migrateDbIfNeeded}>
    //   {/* Your providers and navigation */}
    //         {/* <StatusBar style="auto" /> */}
    //   <View style={styles.container}>
    //     <Slot />
    //   </View>
    // {/* </SQLiteProvider> */}
    // </SafeAreaProvider>
    <AuthProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        {/* other screens */}
      </Stack>
    </AuthProvider>
    
       
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F1EB",
    alignItems: "center",
    marginBottom: 0,
    maxWidth: "100%",
  },
});
