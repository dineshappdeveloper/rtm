import React from "react";
import { View, Text, ImageBackground, StyleSheet, TextInput } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMinusCircle, faPlus, faPlusCircle, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faMinus } from "@fortawesome/free-solid-svg-icons/faMinus";
import Button from "./Button";

export default function MedicineSelect({ medicineName }) { // Define the prop here
    return (
        <View style={{ padding: 20, flexDirection: 'row' }}>
            <View style={{
                borderWidth: 1,
                width: '100%',
                height: 'auto',
                paddingHorizontal: 10,
                fontWeight: '700',
                borderRadius: 25,
                borderColor: 'grey',
                marginRight: 10,
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View>
                        <Text style={{ color: '#3E3E3E', fontWeight:'600' }}>{medicineName}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginLeft: 40, alignItems:'center' }}>
                        <FontAwesomeIcon icon={faMinusCircle} size={20} />
                        <Text style={{ marginRight: 10, marginLeft: 10, fontWeight:'900', fontSize: 18 }}>2</Text>
                        <FontAwesomeIcon icon={faPlusCircle} size={20} style={{ fontWeight:'bold' }}/>
                    </View>
                    <Button
                        title={"Add to cart"}
                        textStyle={{
                            fontSize: 12,
                            padding: 5,
                        }}
                        containerStyle={{
                            width: "auto",
                            paddingHorizontal: 10,
                            height: "auto",
                            borderRadius: 20,
                            fontSize: 12,
                            backgroundColor: "#FBD122",
                        }} 
                    />
                </View>
                
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    // You can add your styles here if needed
});
