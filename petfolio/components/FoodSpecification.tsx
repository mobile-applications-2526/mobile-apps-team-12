import { View, Text, StyleSheet, Image } from "react-native";
import { Table, Row, Rows } from 'react-native-table-component';
import { Food } from "../types";

type Props = {
    foodData: Food;
}

export default function FoodSpecification({ foodData }: Props) {
    const tableData = [
            ["Amount", foodData.quantity],
            ["Description", foodData.description]
        ];
    
        return (
            <View style={styles.container}>
                <View style={styles.profile}>
                    <Text style={styles.profileName}>{foodData.name}</Text>
                    <Table>
                        <Rows style={styles.row} data={tableData} />
                    </Table>
                </View>
            </View>
        )
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: "#F6F1EB",
            alignItems: "center",
            width: '100%',
        },
    
        profile: {
            width: '100%',
            borderRadius: 30,
            alignItems: 'stretch',
            padding: 20,
            height: 700
        },
        profileName: {
            fontSize: 40,
            textAlign: 'center',
            marginBottom: 20,
            borderBottomWidth: 2,
            borderBottomColor: "#b1b1b1ff",
        },
    
        row: {
            paddingTop: 10,
            paddingBottom: 10
        },
    
    });