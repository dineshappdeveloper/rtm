import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPhone} from '@fortawesome/free-solid-svg-icons';
import * as Animatable from 'react-native-animatable';
import Button from '../components/Button';
const {width} = Dimensions.get('window');
import auth from '@react-native-firebase/auth';

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [confirmResult, setConfirmResult] = useState(null);
  const [otp, setOtp] = useState('');
  const [resendTimeout, setResendTimeout] = useState(60); // Timeout for resending OTP

  // Function to handle sending OTP
  const handleSendOTP = () => {
    setLoading(true); // Start loading
    if (phoneNumber.length === 10) {
      const fullPhoneNumber = `+91${phoneNumber}`; // Assuming country code is +91 (India)
      auth()
        .signInWithPhoneNumber(fullPhoneNumber)
        .then(confirmResult => {
          setLoading(false); // Stop loading
          setConfirmResult(confirmResult);
          setResendTimeout(60); // Reset timeout for resending OTP
          startResendTimer();
          Alert.alert('OTP Sent!', 'Please check your phone.');
        })
        .catch(error => {
          setLoading(false); // Stop loading
          console.log(error.message);
          Alert.alert('Error', error.message);
        });
    } else {
      setLoading(false); // Stop loading
      Alert.alert(
        'Invalid Number',
        'Please enter a valid 10-digit phone number.',
      );
    }
  };

  // Function to handle confirming OTP
  const handleConfirmOTP = () => {
    setOtp('');
    if (otp.length === 6) {
      setLoading(true); // Start loading
      confirmResult
        .confirm(otp)
        .then(user => {
          setLoading(false); // Stop loading
          Alert.alert('Success!', 'You are now signed in.');
          navigation.navigate('Home');
        })
        .catch(error => {
          setLoading(false); // Stop loading
          Alert.alert('Error', 'Invalid OTP. Please try again.');
        });
    } else {
      setLoading(false); // Stop loading
      Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP.');
    }
  };

  // Function to start the resend timer
  const startResendTimer = () => {
    const intervalId = setInterval(() => {
      setResendTimeout(prevTimeout => {
        if (prevTimeout <= 1) {
          clearInterval(intervalId);
          return 0;
        }
        return prevTimeout - 1;
      });
    }, 1000);
  };

  // Render the component
  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: 'white'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={{flex: 1}}>
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {!confirmResult ? (
            <View
              style={{
                padding: 20,
                flex: 1,
                justifyContent: 'space-between',
                backgroundColor: 'white',
              }}>
              <View style={{marginTop: 50}}>
                <Animatable.View
                  animation="bounceInRight"
                  duration={1500}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}>
                  <Image
                    source={require('../assets/STMfinal.jpg')}
                    style={[styles.logo, styles.shadowEffect]}
                  />
                </Animatable.View>
                <Animatable.Text
                  animation="bounceInLeft"
                  duration={1500}
                  style={styles.title}>
                  Login Here
                </Animatable.Text>

                <View style={styles.inputContainer}>
                  <View style={styles.inputIcon}>
                    <FontAwesomeIcon icon={faPhone} size={20} color="grey" />
                  </View>
                  <TextInput
                    placeholder="Enter Your Registered Mobile Number"
                    placeholderTextColor="grey"
                    style={styles.input}
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                  />
                </View>
                <Button
                  onPress={handleSendOTP}
                  title={'Login'}
                  containerStyle={styles.button}
                />
                <Text
                  style={{
                    fontSize: 14,
                    textAlign: 'center',
                    fontWeight: '900',
                    color: 'black',
                  }}>
                  (OR)
                </Text>
                <Button
                  onPress={() => navigation.navigate('Signup')}
                  title={'Click for New Registration'}
                  containerStyle={styles.buttonOne}
                />
              </View>

              <Animatable.View
                animation="fadeInUp"
                duration={1500}
                delay={500}
                style={styles.servicesContainer}>
                <Image
                  source={require('../assets/servicecard.jpeg')}
                  style={{width: width * 0.9, height: 200, borderRadius: 10}} // Make image width responsive
                  resizeMode="contain"
                />
              </Animatable.View>
            </View>
          ) : (
            <View
              style={{
                padding: 20,
                flex: 1,
                justifyContent: 'space-between',
                backgroundColor: 'white',
              }}>
              <View style={{marginTop: 50}}>
                <Animatable.View
                  animation="bounceInRight"
                  duration={1500}
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}>
                  <Image
                    source={require('../assets/STMfinal.jpg')}
                    style={[styles.logo, styles.shadowEffect]}
                  />
                </Animatable.View>
                <Animatable.Text
                  animation="bounceInLeft"
                  duration={1500}
                  style={styles.title}>
                  Enter OTP
                </Animatable.Text>

                <View style={styles.inputContainer}>
                  <View style={styles.inputIcon}>
                    <FontAwesomeIcon icon={faPhone} size={20} color="grey" />
                  </View>
                  <TextInput
                    placeholderTextColor="grey"
                    style={styles.input}
                    placeholder="OTP"
                    keyboardType="number-pad"
                    value={otp}
                    onChangeText={setOtp}
                  />
                </View>
                <Button
                  onPress={handleConfirmOTP}
                  title={'Verify OTP'}
                  containerStyle={styles.button}
                />
                {resendTimeout > 0 ? (
                  <Text style={styles.resendText}>
                    Resend OTP in {resendTimeout} seconds
                  </Text>
                ) : (
                  <Button
                    onPress={handleSendOTP}
                    title={'Resend OTP'}
                    containerStyle={styles.buttonResend}
                  />
                )}
              </View>

              <Animatable.View
                animation="fadeInUp"
                duration={1500}
                delay={500}
                style={styles.servicesContainer}>
                <Image
                  source={require('../assets/servicecard.jpeg')}
                  style={{width: width * 0.9, height: 200, borderRadius: 10}} // Make image width responsive
                  resizeMode="contain"
                />
              </Animatable.View>
            </View>
          )}
        </ScrollView>
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  logo: {
    width: 100,
    height: 120,
  },
  shadowEffect: {
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // for Android
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 10,
    color: 'black',
  },
  inputContainer: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#E8E8E8',
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 20,
  },
  inputIcon: {
    paddingHorizontal: 20,
  },
  input: {
    color: 'black',
    flex: 1,
    paddingVertical: 10,
  },
  button: {
    width: '100%',
    height: 'auto',
    padding: 10,
    borderRadius: 5,
  },
  buttonOne: {
    width: '100%',
    height: 'auto',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'orange',
  },
  buttonResend: {
    width: '100%',
    height: 'auto',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'red',
  },
  resendText: {
    textAlign: 'center',
    color: 'grey',
    marginTop: 10,
  },
  servicesContainer: {
    alignItems: 'center',
  },
});
