import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View, StyleSheet } from "react-native";
import { SQLiteProvider } from 'expo-sqlite';
import { migrateDbIfNeeded } from '../db/database';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
    <SQLiteProvider databaseName="petfolioLocalDb.db" onInit={migrateDbIfNeeded}>
      {/* Your providers and navigation */}
            <StatusBar style="auto" />
      <View style={styles.container}>
        <Slot />
      </View>
    </SQLiteProvider>
    </SafeAreaProvider>
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
