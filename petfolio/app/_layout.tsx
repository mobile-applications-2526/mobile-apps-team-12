import { useRouter, useSegments } from "expo-router";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { supabase } from "../utils/supabase";
import { Stack } from "expo-router";
import { AuthProvider, useAuth } from "../context/authContext";

// Define public routes that don't need authentication
const PUBLIC_ROUTES = ["index", "login", "register"];

function RootLayoutNav() {
  const { session, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    if (loading) return;

    const currentRoute = segments[0] || "index";
    const isPublicRoute = PUBLIC_ROUTES.includes(currentRoute);

    if (!session && !isPublicRoute) {
      // Redirect to index page if not authenticated and not on public route
      router.replace("/");
    } else if (
      session &&
      (currentRoute === "login" || currentRoute === "register")
    ) {
      // Redirect to home if authenticated and on login/register
      router.replace("/homepage"); // or your main route
    }
  }, [session, segments, loading]);

  return <Stack screenOptions={{ headerShown: false }}></Stack>;
}

export default function RootLayout() {
  useEffect(() => {
    // Optional: Test Supabase connection on app start
    const testConnection = async () => {
      const { data, error } = await supabase.from("pets").select("count");
      if (error) {
        console.log("Supabase connection error:", error.message);
      } else {
        console.log("Supabase connected successfully");
      }
    };

    testConnection();
  }, []);

  return (
    <AuthProvider>
      <RootLayoutNav />
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
