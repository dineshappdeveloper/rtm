import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import {responsiveWidth} from 'react-native-responsive-dimensions';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faDeleteLeft,
  faDrumSteelpan,
  faEdit,
  faFilterCircleXmark,
  faSearch,
  faTrash,
  faPlus,
  faSignOutAlt,
  faL,
} from '@fortawesome/free-solid-svg-icons';
import CalendarPicker from 'react-native-calendar-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {Dropdown} from 'react-native-element-dropdown';
import Navigation from '../navigation/AppNavigation';
import AdvertisementItem from '../components/AdvertisementItem';
import NewsUpdateItem from '../components/NewsUpdateItem';
import LatestUpdateItem from '../components/LatestUpdateItem';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import NewsItem from '../components/NewsItem';
import LatestItem from '../components/LatestItem';

const packageData = [
  {label: 'Telugu', value: '1'},
  {label: 'English', value: '2'},
  {label: 'Hindi', value: '3'},
];

const Home = () => {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isCalendarVisible, setCalendarVisibility] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [packageValue, setPackageValue] = useState('2');

  const [latestUpdateList, setLatestUpdateList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [advertisementList, setAdvertisementList] = useState([]);

  const fetchAndFilterPosts = () => {
    firestore()
      .collection('post')
      .orderBy('timestamp', 'desc')
      .get()
      .then(querySnapshot => {
        const latestUpdates = [];
        const news = [];
        const advertisements = [];

        querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data();

          if (data && data.category) {
            // Check if data and data.category exist
            switch (data.category) {
              case 'latest_updates':
                latestUpdates.push(data);
                break;
              case 'news':
                news.push(data);
                break;
              case 'advertisement':
                advertisements.push(data);
                break;
              default:
                console.warn(`Unknown category: ${data.category}`);
                break;
            }
          } else {
            console.warn(
              'Document missing required fields:',
              documentSnapshot.id,
            );
          }
        });

        setLatestUpdateList(latestUpdates);
        setNewsList(news);
        setAdvertisementList(advertisements);

        console.log('Data fetched and categorized successfully');
      })
      .catch(error => {
        console.error('Error fetching posts: ', error);
        Alert.alert('Error', 'Failed to fetch posts. Please try again.');
      });
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchAndFilterPosts();
    }, []),
  );

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        navigation.navigate('SignIn');
      })
      .catch(error => {
        console.error('Error logging out: ', error);
      });
  };
  const handleEditLatestUpdate = () => {
    navigation.navigate('ShowAllUpdates', { flag: 'latest_updates' });

  };

  const handleDeleteLatestUpdate = item => {
    navigation.navigate('ShowAllUpdates', { flag: 'latest_updates' });
  };

  const handleEditLatestNews = item => {
    navigation.navigate('ShowAllUpdates', { flag: 'news' });
  };
  const handleDeleteLatestNews = item => {
    navigation.navigate('ShowAllUpdates', { flag: 'news' });
  };

  const handleEditLatestAdvirtaisement = item => {
    navigation.navigate('ShowAllUpdates', { flag: 'advertisement' });
  };
  const handleDeleteLatestAdvertisement = item => {
    navigation.navigate('ShowAllUpdates', { flag: 'advertisement' });
  };

  const handleSelectLanguage = (index, value) => {
    setSelectedLanguage(value);
  };

  const showCalendar = () => {
    setCalendarVisibility(true);
  };

  const hideCalendar = () => {
    setCalendarVisibility(false);
  };

  const onDateChange = date => {
    setSelectedStartDate(date);
    hideCalendar();
  };

  const renderPackageItem = item => {
    return (
      <View style={{paddingVertical: 10, padding: 10}}>
        <Text style={{fontSize: 16, fontWeight: '500', color: 'black'}}>
          {item.label}
        </Text>
        {item.value === packageValue}
      </View>
    );
  };

  const startDate = selectedStartDate ? selectedStartDate.toString() : '';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <FontAwesomeIcon icon={faSignOutAlt} size={24} color="red" />
        </TouchableOpacity>
        <Text style={styles.updatesText}>Sathwika Trade Media</Text>
        <View style={styles.languageSelector}>
          <Text style={styles.languageText}>Select Language: </Text>
          <Dropdown
            style={styles.dropdown}
            selectedTextStyle={styles.dropdownText}
            data={packageData}
            labelField="label"
            valueField="value"
            value={packageValue}
            onChange={item => {
              setPackageValue(item.value);
            }}
            renderItem={renderPackageItem}
            dropdownPosition="bottom"
          />
        </View>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 10}}>
        <View style={styles.textInputContainerForSearch}>
          <TextInput
            style={styles.textInputForSearch}
            placeholder="Search for information."
            placeholderTextColor="black"
          />
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <FontAwesomeIcon icon={faSearch} size={18} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={showCalendar} style={styles.searchButton}>
          <FontAwesomeIcon icon={faFilterCircleXmark} size={18} color="black" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingLeft: 2,
          paddingRight: 2,
          paddingTop: 8,
          paddingBottom: 8,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 16, fontWeight: '800', color: 'orange'}}>
          Latest Updates
        </Text>
        {auth().currentUser &&
          (auth().currentUser.phoneNumber === '+918790720978' ||
            auth().currentUser.phoneNumber === '+919052288377' ||
            auth().currentUser.phoneNumber === '+918853389395') && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={handleEditLatestUpdate}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'black',
                      marginRight: 10,
                      fontWeight: '500',
                    }}>
                    Edit
                  </Text>
                  <FontAwesomeIcon icon={faEdit} size={12} color="black" />
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleDeleteLatestUpdate}>
                <View style={{flexDirection: 'row'}}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: 'black',
                      marginRight: 10,
                      marginLeft: 10,
                      fontWeight: '500',
                    }}>
                    Delete
                  </Text>
                  <FontAwesomeIcon icon={faTrash} size={12} color="black" />
                </View>
              </TouchableOpacity>
            </View>
          )}
      </View>

      <View style={styles.boxContainer}>
        <View style={[styles.updateBox, styles.box1]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {latestUpdateList.map((item, index) => {
              return <LatestItem key={index} item={item} />;
            })}
          </ScrollView>
        </View>
        <View
          style={{
            paddingLeft: 2,
            paddingRight: 2,
            paddingTop: 8,
            paddingBottom: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, fontWeight: '800', color: 'orange'}}>
            News
          </Text>
          {auth().currentUser &&
            (auth().currentUser.phoneNumber === '+918790720978' ||
              auth().currentUser.phoneNumber === '+919052288377' ||
              auth().currentUser.phoneNumber === '+918853389395') && (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={handleEditLatestNews}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'black',
                        marginRight: 10,
                        fontWeight: '500',
                      }}>
                      Edit
                    </Text>
                    <FontAwesomeIcon icon={faEdit} size={12} color="black" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteLatestNews}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'black',
                        marginRight: 10,
                        marginLeft: 10,
                        fontWeight: '500',
                      }}>
                      Delete
                    </Text>
                    <FontAwesomeIcon icon={faTrash} size={12} color="black" />
                  </View>
                </TouchableOpacity>
              </View>
            )}
        </View>

        <View style={[styles.updateBox, styles.box1]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {newsList.map((item, index) => {
              return <NewsItem key={index} item={item} />;
            })}
          </ScrollView>
        </View>

        <View
          style={{
            paddingLeft: 2,
            paddingRight: 2,
            paddingTop: 8,
            paddingBottom: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 16, fontWeight: '800', color: 'orange'}}>
            Advertisement
          </Text>
          {auth().currentUser &&
            (auth().currentUser.phoneNumber === '+918790720978' ||
              auth().currentUser.phoneNumber === '+919052288377' ||
              auth().currentUser.phoneNumber === '+918853389395') && (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity onPress={handleEditLatestAdvirtaisement}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'black',
                        marginRight: 10,
                        fontWeight: '500',
                      }}>
                      Edit
                    </Text>
                    <FontAwesomeIcon icon={faEdit} size={12} color="black" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDeleteLatestAdvertisement}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: 12,
                        color: 'black',
                        marginRight: 10,
                        marginLeft: 10,
                        fontWeight: '500',
                      }}>
                      Delete
                    </Text>
                    <FontAwesomeIcon icon={faTrash} size={12} color="black" />
                  </View>
                </TouchableOpacity>
              </View>
            )}
        </View>
        <View style={[styles.box, styles.box3]}>
          <ScrollView
            horizontal={true} // Enable horizontal scrolling
            showsHorizontalScrollIndicator={true} // Show horizontal scrollbar
            contentContainerStyle={styles.scrollContainer} // Container style
          >
            {advertisementList.map((item, index) => (
              <View key={index} style={styles.itemWrapper}>
                <AdvertisementItem item={item} />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
      <Modal
        visible={isCalendarVisible}
        transparent={true}
        animationType="slide">
        <View style={styles.calendarContainer}>
          <CalendarPicker onDateChange={onDateChange} />
          <TouchableOpacity onPress={hideCalendar} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      {auth().currentUser &&
        (auth().currentUser.phoneNumber === '+918790720978' ||
          auth().currentUser.phoneNumber === '+919052288377' ||
          auth().currentUser.phoneNumber === '+918853389395') && (
          <TouchableOpacity
            style={styles.postButton}
            onPress={() => navigation.navigate('CreatePost')}>
            <FontAwesomeIcon icon={faPlus} size={24} color="#fff" />
          </TouchableOpacity>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexDirection: 'row',
  },
  itemWrapper: {
    width: 250,
    marginRight: 10,
  },
  scrollViewContainer: {
    flexGrow: 1,
    paddingBottom: 65,
  },
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f6fbff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  updatesText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'orange',
  },
  languageSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  languageText: {
    fontSize: 12,
    fontWeight: '800',
    color: 'black',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 3,
    width: 80,
  },
  dropdownText: {
    fontSize: 14,
    color: 'orange',
    fontWeight: '900',
  },
  boxContainer: {
    flex: 2,
  },
  box: {
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  updateBox: {
    padding: 10,
  },

  box1: {
    borderRadius: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'lightgrey',
    flex: 1,
  },
  box2: {
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
    flex: 2,
  },
  box3: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    backgroundColor: '#fff',
    borderColor: 'lightgrey',
    height: 'auto',
  },
  boxText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  textInputContainerForSearch: {
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#A7A6BA',
    height: 44,
  },
  textInputForSearch: {
    fontSize: 16,
    color: 'black',
  },
  searchButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderWidth: 1,
    borderColor: '#A7A6BA',
    borderRadius: 5,
    marginLeft: 9,
    right: 3,
    height: 44,
  },
  calendarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#A7A6BA',
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'black',
  },
  postButton: {
    position: 'absolute',
    bottom: 50,
    right: 20,
    backgroundColor: 'orange',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
