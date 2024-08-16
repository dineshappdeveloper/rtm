import React from "react";
import { View, Text, ImageBackground, StyleSheet, TouchableHighlight, Dimensions } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get('window');

export default function HeaderComponent() {
    const navigation = useNavigation();
    return (
        <View style={styles.headerContainer}>
            <ImageBackground
                style={styles.logo}
                source={require("../assets/logo.png")}
            />
            <Text style={styles.welcomeText}>Welcome, Akhil Sankineni</Text>
            <TouchableHighlight style={styles.cartButton} underlayColor="lightgrey" onPress={() => navigation.navigate("CartProduct")}>
                <FontAwesomeIcon icon={faShoppingCart} size={30} color={"grey"} />
            </TouchableHighlight>
        </View>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#E8E8E8',
        paddingHorizontal: width * 0.05, // 5% of screen width
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
    },
    logo: {
        height: 50,
        width: 45,
    },
    welcomeText: {
        fontSize: 14,
        fontWeight: '500',
        flex: 1,
        textAlign: 'center',
    },
    cartButton: {
        padding: 15,
        width: 60,
        height: 60,
        borderRadius: 30,
        marginLeft: width * 0.05, // 5% of screen width
    },
});
