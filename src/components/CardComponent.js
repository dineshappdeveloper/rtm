import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// create a component
const CardComponent = ({ orderNumber, status, items, total, type }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.OrderNum}>{orderNumber}</Text>
                <Text style={[styles.OrderNum, styles.OrderNumGray]}>{orderNumber}</Text>
            </View>
            <View style={[styles.OrderStatus, { backgroundColor: type == 1 ? "green" : 'red' }]}>
                <Text style={styles.OrderStatusText}>{status}</Text>
            </View>
            <View style={styles.orderDetails}>
                {items.map((item, index) => (
                    <Text key={index}>{item}</Text>
                ))}
            </View>
            <View style={styles.footerRow}>
                <View>
                    <Text>Total</Text>
                    <Text style={styles.OrderNum}>Rs.{total}</Text>
                </View>
                <TouchableOpacity style={styles.reorderButton}>
                    <Text style={styles.OrderNum}>Reorder</Text>
                </TouchableOpacity>
            </View>
            <View style={{ height: 45, backgroundColor: '#F2F2F2' }}>

            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        height: 'auto', // Adjust height as needed
        width: "95%",
        alignSelf: "center",
        borderRadius: 15,
        shadowColor: "#000",
        elevation: 2,
        overflow: 'hidden',
        backgroundColor: '#fff', // Add a background color to see the boundaries clearly
        marginBottom: 10, // Add some margin between items
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: 'center',
        marginHorizontal: 8,
        paddingHorizontal: 10,
        paddingTop: 5
    },
    OrderNum: {
        color: '#000',
        fontSize: 15,
        fontWeight: '600',
        letterSpacing: 1.5
    },
    OrderNumGray: {
        color: "#9C9C9C",
    },
    OrderStatus: {
        backgroundColor: '#006D04',
        width: "36%",
        padding: 1,
        borderRadius: 15,
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 15,
    },
    OrderStatusText: {
        color: '#fff',
    },
    orderDetails: {
        borderWidth: 1,
        borderColor: "#00FF0A",
        height: 60,
        borderRadius: 15,
        marginTop: 10,
        backgroundColor: "#DBFFDA",
        paddingVertical: 10,
        paddingLeft: 16,
        marginHorizontal: 10
    },
    footerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
        marginHorizontal: 15,
        marginBottom: 10, // Add some margin to avoid bottom overflow
    },
    reorderButton: {
        backgroundColor: '#FBD122',
        height: 35,
        width: '38%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
    },
});

export default CardComponent;
