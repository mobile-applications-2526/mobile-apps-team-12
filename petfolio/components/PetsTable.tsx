import {Pet} from "../types";
import React from "react";
import {View, Text, StyleSheet, FlatList, Animated} from "react-native";
type Props = {
    pets: Pet[]
}

export default function PetsTable({pets}: Props){
        const columns = [
        { key: "name", label: "Name", flex: 4 },
        { key: "birthdate", label: "Birthdate", flex: 3 },
        { key: "description", label: "Description", flex: 5 },]
        
        const renderHeader = () => (
        <View style={[styles.row, styles.headerRow]}>
        {columns.map((col) => (
            <Text key={col.key} style={[styles.cell, { flex: col.flex, fontWeight: "700" }]}>
            {col.label}
            </Text>
        ))}
        </View>
        );
        const renderItem = ({ item, index }: { item: Pet; index: number }) => {
            return (
            <Animated.View style={[ styles.row, { backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff" },]}
    >
      <Text style={[styles.cell, { flex: columns[0].flex }]}>{item.name}</Text>
      <Text style={[styles.cell, { flex: columns[1].flex }]}>{item.birthdate ?? "-"}</Text>
      <Text
        style={[styles.cell, { flex: columns[2].flex }]}
        numberOfLines={2} > {item.description ?? "-"}</Text>
    </Animated.View>
            );
        };
        return (
        <View style={styles.container}>
              <FlatList
                data={pets}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                ListHeaderComponent={renderHeader}
                stickyHeaderIndices={[0]}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                />
        </View>)
    }
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#f9f9f9",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: "center",
  },
  headerRow: {
    backgroundColor: "#f3f3f3",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerText: {
    fontWeight: "700",
    fontSize: 14,
    color: "#444",
  },
  cell: {
    paddingHorizontal: 6,
    color: "#333",
    fontSize: 14,
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
  },
});
