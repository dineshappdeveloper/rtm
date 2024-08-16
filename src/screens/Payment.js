import React from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faPhone} from '@fortawesome/free-solid-svg-icons';
import * as Animatable from 'react-native-animatable';
import Button from '../components/Button';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function Payment() {
  const navigation = useNavigation();

  const goToHome = () => {
    navigation.navigate('Home');
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'white'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View
        style={{
          paddingVertical: 10,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
          marginLeft: 180,
        }}>
        <Text
          style={{
            fontSize: 16,
            color: 'black',
            marginRight: 10,
            fontWeight: '500',
          }}>
          Edit
        </Text>
        <FontAwesomeIcon icon={faEdit} size={16} color="black" />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/payment.jpeg')}
          style={{width: 250, height: 300, borderRadius: 10}}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 22, fontFamily: '900', color: 'black'}}>
          OR
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 22, fontWeight: '900', color: 'black'}}>
          Phone Pay/ Google Pay/ Paytm
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: '900',
            color: 'blue',
            marginTop: 50,
          }}>
          8797020978
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 50,
        }}>
        <Text style={{fontSize: 14, fontWeight: '900', color: 'black'}}>
          Call For Confirmation : 7799432462
        </Text>
      </View>
      <View
        style={{alignContent: 'center', alignItems: 'center', marginTop: 16}}>
        <TouchableOpacity onPress={goToHome}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '900',
              color: 'red',
              marginTop: 16,
            }}>
            Go To Home
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({});
