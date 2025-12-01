import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Weight } from "../types";

type Props = {
    weights?: Weight[];
};

export default function WeightOverview({ weights = [] }: Props) {
    const sortedWeights = [...weights].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
    
    return (
        <ScrollView>
            {sortedWeights.map((weight) => {
                const date = new Date(weight.date);
                const formatted = date.toLocaleDateString("nl-BE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                });

                return (
                    <View key={weight.id} style={styles.row}>
                        <View style={styles.firstCell}>
                            <Text>{weight.value} kg</Text>
                        </View>

                        <View style={styles.secondCell}>
                            <Text>{formatted}</Text>
                        </View>

                    </View>
                )
            })}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        borderTopWidth: 2,
        borderTopColor: "#b1b1b1ff",
        paddingVertical: 20,
        alignItems: "center",
    },
    firstCell: {
        flex: 1,
    },
    secondCell: {
        flex: 1,
        alignItems: "center",
    },
    thirdCell: {
        flex: 0.3,
        alignItems: "flex-end",
        paddingRight: 20,
    },
});