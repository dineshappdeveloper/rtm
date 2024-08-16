import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function WelcomeBottom({ onPress, id }) {
    return (
        <View style={styles.container}>
            <View style={styles.ButtomWrap}>
                <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={[styles.dot, { backgroundColor: id == 1 ? '#fff' : "#34A2E6" }]} />
                    <View style={[styles.dot, { backgroundColor: id == 2 ? '#fff' : "#34A2E6" }]} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={onPress}
                >
                    <Text style={{ color: "#000000" }}>Next</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        justifyContent: 'flex-end'
    },
    ButtomWrap: {
        backgroundColor: "#DBFFDA",
        height: 60,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#34A2E6',
        margin: 5,
    },
});
