import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faList, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function FooterComponent() {
    const navigation = useNavigation();
    const route = useRoute();
    const [activeTab, setActiveTab] = useState(route.name);

    useEffect(() => {
        setActiveTab(route.name);
    }, [route]);

    const handleTabPress = (tabName) => {
        navigation.navigate(tabName);
    };

    return (
        <View style={styles.footerContainer}>
            <TouchableOpacity
                style={styles.footerButton}
                onPress={() => handleTabPress('Home')}
            >
                <FontAwesomeIcon
                    icon={faHome}
                    size={20}
                    color={activeTab === 'Home' ? 'grey' : 'black'}
                />
                <Text style={[styles.iconLabel, activeTab === 'Home' && styles.activeIconLabel]}>
                    Home
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.footerButton}
                onPress={() => handleTabPress('Orders')}
            >
                <FontAwesomeIcon
                    icon={faList}
                    size={20}
                    color={activeTab === 'Orders' ? 'grey' : 'black'}
                />
                <Text style={[styles.iconLabel, activeTab === 'Orders' && styles.activeIconLabel]}>
                    Orders
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.footerButton}
                onPress={() => handleTabPress('Profile')}
            >
                <FontAwesomeIcon
                    icon={faUser}
                    size={20}
                    color={activeTab === 'Profile' ? 'grey' : 'black'}
                />
                <Text style={[styles.iconLabel, activeTab === 'Profile' && styles.activeIconLabel]}>
                    Profile
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 40,
        paddingVertical: 10,
        backgroundColor: '#E8E8E8',
        borderTopWidth: 1,
        borderTopColor: 'lightgrey',
    },
    footerButton: {
        alignItems: 'center',
    },
    iconLabel: {
        color: 'black',
        fontSize: 12,
        marginTop: 5,
        fontWeight: '600',
    },
    activeIconLabel: {
        color: 'grey',
    },
});
