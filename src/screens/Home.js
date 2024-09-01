import React, {useCallback, useEffect, useState} from 'react';
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
  BackHandler,
  ActivityIndicator,
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
import DateFilter from '../components/DateFilter';

const packageData = [
  {label: 'Telugu', value: '1'},
  {label: 'English', value: '2'},
  {label: 'Hindi', value: '3'},
];

const Home = () => {
  const navigation = useNavigation();
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [packageValue, setPackageValue] = useState('2');
  const [search, setSearch] = useState('');
  const [latestUpdateList, setLatestUpdateList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [advertisementList, setAdvertisementList] = useState([]);
  const [filteredLatestUpdateList, setFilteredLatestUpdateList] = useState([]);
  const [filteredNewsList, setFilteredNewsList] = useState([]);
  const [filteredAdvertisementList, setFilteredAdvertisementList] = useState(
    [],
  );
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [packages, setPackages] = useState({});
  const [exitAlertShown, setExitAlertShown] = useState(false);
  const [loading, setLoading] = useState(false);
  useFocusEffect(
    useCallback(() => {
      const handleBackPress = () => {
        if (exitAlertShown) {
          BackHandler.exitApp();
          return false;
        }

        setExitAlertShown(true);
        Alert.alert(
          'Exit App',
          'Press OK to exit or Cancel to stay',
          [
            {
              text: 'OK',
              onPress: () => BackHandler.exitApp(),
            },
            {
              text: 'Cancel',
              onPress: () => setExitAlertShown(false),
            },
          ],
          {cancelable: true},
        );
        setTimeout(() => setExitAlertShown(false), 2000);
        return true;
      };
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }, [exitAlertShown]),
  );

  const setupPostListener = async (
    setLoading,
    setLatestUpdateList,
    setNewsList,
    setAdvertisementList,
    fromDate,
    toDate,
  ) => {
    try {
      setLoading(true);
      const isAdmin = await checkIfAdmin();
      const userPackages = await fetchUserPackages();

      let query;
      const postsCollection = firestore().collection('post');

      if (isAdmin) {
        query = postsCollection.orderBy('timestamp', 'desc');
      } else {
        query = postsCollection
          .where('packages', 'array-contains-any', userPackages)
          .orderBy('timestamp', 'desc');
      }

      // Set up the listener
      const unsubscribe = query.onSnapshot(querySnapshot => {
        const latestUpdates = [];
        const news = [];
        const advertisements = [];

        querySnapshot.forEach(documentSnapshot => {
          const data = documentSnapshot.data();
          const timestamp = data.timestamp.toDate();

          if (data && data.category) {
            const withinDateRange =
              (!fromDate || timestamp >= fromDate) &&
              (!toDate || timestamp <= toDate);

            if (withinDateRange) {
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
            }
          } else {
            console.warn(
              'Document missing required fields:',
              documentSnapshot.id,
            );
          }
        });

        setLoading(false);
        setLatestUpdateList(latestUpdates);
        setNewsList(news);
        setAdvertisementList(advertisements);
      });

      return unsubscribe;
    } catch (error) {
      setLoading(false);
      console.error('Error setting up listener:', error);
      Alert.alert(
        'Error',
        'Failed to set up real-time listener. Please try again.',
      );
    }
  };

  const checkIfAdmin = async () => {
    return (
      (auth().currentUser &&
        auth().currentUser.phoneNumber === '+918790720978') ||
      auth().currentUser.phoneNumber === '+919052288377' ||
      auth().currentUser.phoneNumber === '+918853389395'
    );
  };

  const fetchUserPackages = async () => {
    const phoneNumber = auth().currentUser.phoneNumber;
    try {
      setLoading(true);
      const usersCollection = firestore().collection('users');
      const packageSet = new Set();
      const cleanedPhoneNumber = phoneNumber.replace('+91', '');

      const querySnapshot = await usersCollection
        .where('phoneNumber', '==', cleanedPhoneNumber)
        .get();

      querySnapshot.forEach(doc => {
        const userData = doc.data();
        if (userData.packages) {
          Object.keys(userData.packages).forEach(packageId => {
            packageSet.add(packageId);
          });
        }
      });
      setLoading(false);
      const uniquePackages = Array.from(packageSet);
      console.log('Unique Packages:', uniquePackages);
      return uniquePackages;
    } catch (error) {
      setLoading(false);
      console.error('Error fetching packages:', error);
      Alert.alert('Error', 'Failed to fetch packages. Please try again.');
      return [];
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      let unsubscribe;

      const initializeListener = async () => {
        unsubscribe = await setupPostListener(
          setLoading,
          setLatestUpdateList,
          setNewsList,
          setAdvertisementList,
          fromDate,
          toDate,
        );
      };

      initializeListener();

      return () => {
        if (unsubscribe && typeof unsubscribe === 'function') {
          unsubscribe();
        }
      };
    }, [fromDate, toDate]),
  );

  useEffect(() => {
    const filterDataBySearch = list => {
      return list.filter(item =>
        item.description.toLowerCase().includes(search.toLowerCase()),
      );
    };

    setFilteredLatestUpdateList(filterDataBySearch(latestUpdateList));
    setFilteredNewsList(filterDataBySearch(newsList));
    setFilteredAdvertisementList(filterDataBySearch(advertisementList));
  }, [search, latestUpdateList, newsList, advertisementList]);

  const applyDateFilter = () => {
    const filteredLatest = latestUpdateList.filter(item => {
      const itemDate = item.timestamp.toDate();
      return (
        (!fromDate || itemDate >= fromDate) && (!toDate || itemDate <= toDate)
      );
    });

    const filteredNews = newsList.filter(item => {
      const itemDate = item.timestamp.toDate();
      return (
        (!fromDate || itemDate >= fromDate) && (!toDate || itemDate <= toDate)
      );
    });

    const filteredAdvertisements = advertisementList.filter(item => {
      const itemDate = item.timestamp.toDate();
      return (
        (!fromDate || itemDate >= fromDate) && (!toDate || itemDate <= toDate)
      );
    });

    setFilteredLatestUpdateList(filteredLatest);
    setFilteredNewsList(filteredNews);
    setFilteredAdvertisementList(filteredAdvertisements);
  };

  const handleApplyFilter = (fromDate, toDate) => {
    setFromDate(fromDate);
    setToDate(toDate);
    applyDateFilter();
  };

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
    navigation.navigate('ShowAllUpdates', {flag: 'latest_updates'});
  };

  const handleDeleteLatestUpdate = item => {
    navigation.navigate('ShowAllUpdates', {flag: 'latest_updates'});
  };

  const handleEditLatestNews = item => {
    navigation.navigate('ShowAllUpdates', {flag: 'news'});
  };
  const handleDeleteLatestNews = item => {
    navigation.navigate('ShowAllUpdates', {flag: 'news'});
  };

  const handleEditLatestAdvirtaisement = item => {
    navigation.navigate('ShowAllUpdates', {flag: 'advertisement'});
  };
  const handleDeleteLatestAdvertisement = item => {
    navigation.navigate('ShowAllUpdates', {flag: 'advertisement'});
  };

  const handleSelectLanguage = (index, value) => {
    setSelectedLanguage(value);
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
            onChangeText={setSearch}
            value={search}
          />
        </View>
        <TouchableOpacity style={styles.searchButton}>
          <FontAwesomeIcon icon={faSearch} size={18} color="black" />
        </TouchableOpacity>
        <DateFilter onApplyFilter={handleApplyFilter} />
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
            {filteredLatestUpdateList.map((item, index) => {
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
            {filteredNewsList.map((item, index) => {
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
            {filteredAdvertisementList.map((item, index) => (
              <View key={index} style={styles.itemWrapper}>
                <AdvertisementItem item={item} />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      <View>
        <Text style={{fontSize: 10, color: 'black', fontWeight: '400'}}>
          SELECTED DATE: {startDate}
        </Text>
      </View>

      {auth().currentUser &&
        (auth().currentUser.phoneNumber === '+918790720978' ||
          auth().currentUser.phoneNumber === '+919052288377' ||
          auth().currentUser.phoneNumber === '+918853389395') && (
            <TouchableOpacity
            style={styles.packageButton}
            onPress={() => navigation.navigate('AdminPackageManagement')}
            activeOpacity={0.8}>
            <FontAwesomeIcon icon={faPlus} size={20} color="#fff" />
            <Text style={styles.textData}>Packages</Text>
          </TouchableOpacity>
        )}

      {auth().currentUser &&
        (auth().currentUser.phoneNumber === '+918790720978' ||
          auth().currentUser.phoneNumber === '+919052288377' ||
          auth().currentUser.phoneNumber === '+918853389395') && (
            <TouchableOpacity
            style={styles.postButton}
            onPress={() => navigation.navigate('CreatePost')}
            activeOpacity={0.8}>
            <FontAwesomeIcon icon={faPlus} size={20} color="#fff" />
            <Text style={styles.textData}>Create New Post</Text>
          </TouchableOpacity>
        )}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

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
  scrollContainer: {
    flexDirection: 'row',
  },
  itemWrapper: {
    height: 'auto',
    width: 360,
    marginRight: 8,
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
    flexDirection: 'row',
    position: 'absolute',
    bottom: 32,
    right: 20,
    backgroundColor: 'orange',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  packageButton: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 88, 
    right: 20,
    backgroundColor: 'orange',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  textData: {
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 10,
    color: '#fff',
  },
});

export default Home;
