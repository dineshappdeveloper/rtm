import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faCheck,
  faChevronCircleDown,
  faPhone,
  faShop,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import * as Animatable from 'react-native-animatable';
import Button from '../components/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Modal from 'react-native-modal';
const {width} = Dimensions.get('window');
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const packageData = [
  {label: 'Bullion rates', value: '1'},
  {label: 'Agri rates', value: '2'},
  {label: 'MCX tips', value: '3'},
  {label: 'NCDX tips', value: '4'},
];

const durationData = {
  1: [
    {label: 'One year', value: 'one_year'},
    {label: 'Two years', value: 'two_years'},
    {label: 'Three years', value: 'three_years'},
    {label: 'Four years', value: 'four_years'},
    {label: 'Five years', value: 'five_years'},
    {label: 'Life time', value: 'lifetime'},
  ],
  2: [
    {label: 'Six months', value: 'six_months'},
    {label: 'One year', value: 'one_year'},
    {label: 'Two years', value: 'two_years'},
    {label: 'Three years', value: 'three_years'},
    {label: 'Four years', value: 'four_years'},
    {label: 'Five years', value: 'five_years'},
    {label: 'Ten years', value: 'ten_years'},
    {label: 'Life time', value: 'lifetime'},
  ],
  3: [
    {label: 'One month', value: 'one_month'},
    {label: 'Three months', value: 'three_months'},
    {label: 'Six months', value: 'six_months'},
    {label: 'One year', value: 'one_year'},
  ],
  4: [
    {label: 'One month', value: 'one_month'},
    {label: 'Three months', value: 'three_months'},
    {label: 'Six months', value: 'six_months'},
    {label: 'One year', value: 'one_year'},
  ],
};

export default function Signup() {
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const [confirmResult, setConfirmResult] = useState(null);
  const [otp, setOtp] = useState('');
  const [resendTimeout, setResendTimeout] = useState(60); // Timeout for resending OTP

  const [surname, setSurname] = useState('');
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [shopName, setShopName] = useState('');
  const [villageCity, setVillageCity] = useState('');
  const [street, setStreet] = useState('');
  const [mandal, setMandal] = useState('');
  const [district, setDistrict] = useState('');
  const [state, setState] = useState('');

  const [packageValue, setPackageValue] = useState(null);
  const [durationValue, setDurationValue] = useState(null);
  const [isPackageDropdownVisible, setPackageDropdownVisible] = useState(false);
  const [isDurationDropdownVisible, setDurationDropdownVisible] =
    useState(false);

  const validateFields = () => {
    if (
      !surname ||
      !name ||
      !phoneNumber ||
      !shopName ||
      !villageCity ||
      !street ||
      !mandal ||
      !district ||
      !state
    ) {
      Alert.alert('Error', 'Please fill in all fields.');
      return false;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      Alert.alert('Error', 'Please enter a valid 10-digit mobile number.');
      return false;
    }

    if (!packageValue) {
      Alert.alert('Error', 'Please select a package.');
      return false;
    }

    if (!durationValue) {
      Alert.alert('Error', 'Please select a duration.');
      return false;
    }

    return true;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      setLoading(true); // Start loading
      if (phoneNumber.length === 10) {
        const fullPhoneNumber = `+91${phoneNumber}`; // Assuming country code is +91 (India)
        auth()
          .signInWithPhoneNumber(fullPhoneNumber)
          .then(confirmResult => {
            setLoading(false); // Stop loading
            setConfirmResult(confirmResult);
            setResendTimeout(60);
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
    }
  };

  const handleConfirmOTP = () => {
    console.log(otp);

    if (otp.length !== 6) {
      Alert.alert('Invalid OTP', 'Please enter a valid 6-digit OTP.');
      return;
    }

    setLoading(true); // Start loading

    confirmResult
      .confirm(otp)
      .then(userCredential => {
        const user = userCredential.user;

        // Save data to Firestore
        firestore()
          .collection('users')
          .doc(user.uid) // Using the user's unique ID
          .set({
            surname: surname,
            name: name,
            phoneNumber: phoneNumber,
            shopName: shopName,
            address: {
              villageCity: villageCity,
              street: street,
              mandal: mandal,
              district: district,
              state: state,
            },
            packageValue: packageValue,
            durationValue: durationValue,
            userid: user.uid,
          })
          .then(() => {
            setLoading(false); // Stop loading
            console.log('User data added to Firestore!');
            Alert.alert('Success!', 'You are now signed in.');
            navigation.navigate('Payment');
          })
          .catch(error => {
            setLoading(false); // Stop loading
            console.error('Error adding user data to Firestore: ', error);
            Alert.alert('Error', 'Failed to save data. Please try again.');
          });
      })
      .catch(error => {
        setLoading(false); // Stop loading
        console.error('Error confirming OTP: ', error);
        Alert.alert('Error', 'Invalid OTP. Please try again.');
      });
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

  const renderPackageItem = item => (
    <TouchableOpacity
      key={item.value}
      style={styles.item}
      onPress={() => {
        setPackageValue(item.value);
        setDurationValue(null); // reset duration value
        setPackageDropdownVisible(false);
      }}>
      <Text style={styles.textItem}>{item.label}</Text>
      {item.value === packageValue && (
        <FontAwesomeIcon
          icon={faCheck}
          style={styles.icon}
          color="black"
          size={20}
        />
      )}
    </TouchableOpacity>
  );

  const renderDurationItem = item => (
    <TouchableOpacity
      key={item.value}
      style={styles.item}
      onPress={() => {
        setDurationValue(item.value);
        setDurationDropdownVisible(false);
      }}>
      <Text style={styles.textItem}>{item.label}</Text>
      {item.value === durationValue && (
        <FontAwesomeIcon
          icon={faCheck}
          style={styles.icon}
          color="black"
          size={20}
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={{flex: 1}}>
      <KeyboardAwareScrollView
        style={{flex: 1, backgroundColor: '#f6fbff'}}
        contentContainerStyle={{flexGrow: 1, padding: 20}}
        extraScrollHeight={150}>
        {!confirmResult ? (
          <>
            <Animatable.Text
              animation="bounceInLeft"
              duration={1500}
              style={styles.title}>
              Register Here
            </Animatable.Text>
            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <FontAwesomeIcon icon={faUser} size={20} color="grey" />
              </View>
              <TextInput
                placeholder="Enter Your Surname"
                placeholderTextColor="grey"
                style={styles.input}
                onChangeText={setSurname}
                value={surname}
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <FontAwesomeIcon icon={faUser} size={20} color="grey" />
              </View>
              <TextInput
                placeholder="Enter Your Name"
                placeholderTextColor="grey"
                style={styles.input}
                onChangeText={setName}
                value={name}
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <FontAwesomeIcon icon={faPhone} size={20} color="grey" />
              </View>
              <TextInput
                placeholder="Enter Your Mobile Number"
                placeholderTextColor="grey"
                style={styles.input}
                onChangeText={setPhoneNumber}
                value={phoneNumber}
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={styles.inputIcon}>
                <FontAwesomeIcon icon={faShop} size={20} color="grey" />
              </View>
              <TextInput
                placeholder="Enter Your Shop Name"
                placeholderTextColor="grey"
                style={styles.input}
                onChangeText={setShopName}
                value={shopName}
              />
            </View>
            <Text style={{fontSize: 18, fontWeight: '600', color: 'black'}}>
              Enter your Address:
            </Text>
            <View style={styles.inputContainerAddress}>
              <View>
                <TextInput
                  placeholder="Village/City"
                  placeholderTextColor="grey"
                  style={styles.input}
                  onChangeText={setVillageCity}
                  value={villageCity}
                />
                <View
                  style={{
                    width: 300,
                    borderBottomWidth: 1,
                    borderBottomColor: 'grey',
                  }}
                />
                <TextInput
                  placeholder="Street"
                  placeholderTextColor="grey"
                  style={styles.input}
                  onChangeText={setStreet}
                  value={street}
                />
                <View
                  style={{
                    width: 300,
                    borderBottomWidth: 1,
                    borderBottomColor: 'grey',
                  }}
                />
                <TextInput
                  placeholder="Mandal"
                  placeholderTextColor="grey"
                  style={styles.input}
                  onChangeText={setMandal}
                  value={mandal}
                />
                <View
                  style={{
                    width: 300,
                    borderBottomWidth: 1,
                    borderBottomColor: 'grey',
                  }}
                />
                <TextInput
                  placeholder="District"
                  placeholderTextColor="grey"
                  style={styles.input}
                  onChangeText={setDistrict}
                  value={district}
                />
                <View
                  style={{
                    width: 300,
                    borderBottomWidth: 1,
                    borderBottomColor: 'grey',
                  }}
                />
                <TextInput
                  placeholder="State"
                  placeholderTextColor="grey"
                  style={styles.input}
                  onChangeText={setState}
                  value={state}
                />
              </View>
            </View>
            <View style={{paddingVertical: 10}}>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setPackageDropdownVisible(true)}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.selectedTextStyle}>
                    {packageData.find(item => item.value === packageValue)
                      ?.label || 'Select package'}
                  </Text>
                  <FontAwesomeIcon
                    icon={faChevronCircleDown}
                    style={styles.icon}
                    color="black"
                    size={20}
                  />
                </View>
              </TouchableOpacity>
            </View>
            {packageValue && (
              <View style={{paddingVertical: 10}}>
                <TouchableOpacity
                  style={styles.dropdown}
                  onPress={() => setDurationDropdownVisible(true)}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                    <Text style={styles.selectedTextStyle}>
                      {durationData[packageValue].find(
                        item => item.value === durationValue,
                      )?.label || 'Select duration'}
                    </Text>
                    <FontAwesomeIcon
                      icon={faChevronCircleDown}
                      style={styles.icon}
                      color="black"
                      size={20}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )}
            <Modal
              isVisible={isPackageDropdownVisible}
              onBackdropPress={() => setPackageDropdownVisible(false)}
              style={{margin: 0, justifyContent: 'flex-end'}}>
              <View style={styles.modalContent}>
                {packageData.map(renderPackageItem)}
              </View>
            </Modal>
            <Modal
              isVisible={isDurationDropdownVisible}
              onBackdropPress={() => setDurationDropdownVisible(false)}
              style={{margin: 0, justifyContent: 'flex-end'}}>
              <View style={styles.modalContent}>
                {durationData[packageValue]?.map(renderDurationItem)}
              </View>
            </Modal>
            <Button
              onPress={handleSubmit}
              title={'Submit'}
              containerStyle={styles.button}
            />
          </>
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
                  onPress={handleSubmit}
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
                style={{width: width * 0.8, height: 200, borderRadius: 10}} // Make image width responsive
                resizeMode="contain"
              />
            </Animatable.View>
          </View>
        )}
      </KeyboardAwareScrollView>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
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
    color: 'black',
  },
  inputContainer: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'grey',
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  inputContainerAddress: {
    paddingHorizontal: 10,
    marginTop: 10,
    width: '100%',
    height: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: 'grey',
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 10,
  },
  inputIcon: {
    paddingHorizontal: 20,
  },
  input: {
    color: 'black',
    flex: 1,
  },
  button: {
    width: '100%',
    height: 'auto',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20, // Adjust margin as needed
  },
  dropdown: {
    height: 50,
    backgroundColor: 'white',
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'grey',
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    justifyContent: 'center',
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    color: 'black',
    fontWeight: '500',
    flex: 1,
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'black',
    fontWeight: '600',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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
