import React, {useState, useEffect} from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import LatestUpdateItem from '../components/LatestUpdateItem';
import NewsUpdateItem from '../components/NewsUpdateItem';
import AdvertisementUpdateItem from '../components/AdvertisementUpdateItem';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { faL } from '@fortawesome/free-solid-svg-icons';

const ShowAllUpdates = ({route}) => {
  const {flag} = route.params || {};
  const [latestUpdateList, setLatestUpdateList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [advertisementList, setAdvertisementList] = useState([]);

  useEffect(() => {
    fetchAndFilterPosts();
  }, []);

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

  const handleEditLatestUpdate = (item) => {
    console.log('handleDeleteLatestUpdate:', item);
  };

  const handleDeleteLatestUpdate = (item) => {
    console.log('handleDeleteLatestUpdate:', item);
  };

  const handleEditLatestNews = item => {
    console.log('handleEditLatestNews:', item);
  };
  const handleDeleteLatestNews = item => {
    console.log('handleDeleteLatestNews:', item);
  };

  const handleEditLatestAdvirtaisement = item => {
    console.log('handleEditLatestAdvirtaisement:', item);
  };
  const handleDeleteLatestAdvertisement = item => {
    console.log('handleDeleteLatestAdvertisement:', item);
  };

  const renderList = () => {
    switch (flag) {
      case 'latest_updates':
        return (
          <ScrollView style={styles.scrollView}>
            {latestUpdateList.map((item, index) => (
              <LatestUpdateItem
                key={index}
                item={item}
                onEdit={handleEditLatestUpdate}
                onDelete={handleDeleteLatestUpdate}
                isAdmin={
                  auth().currentUser &&
                  (auth().currentUser.phoneNumber === '+918790720978' ||
                    auth().currentUser.phoneNumber === '+919052288377' ||
                    auth().currentUser.phoneNumber === '+918853389395')
                }
              />
            ))}
          </ScrollView>
        );
      case 'news':
        return (
          <ScrollView style={styles.scrollView}>
            {newsList.map((item, index) => (
              <NewsUpdateItem key={index} item={item} 
              onEdit={handleEditLatestNews}
              onDelete={handleDeleteLatestNews}
              isAdmin={
                auth().currentUser &&
                (auth().currentUser.phoneNumber === '+918790720978' ||
                  auth().currentUser.phoneNumber === '+919052288377' ||
                  auth().currentUser.phoneNumber === '+918853389395')
              }
            
              />
            ))}
          </ScrollView>
        );
      case 'advertisement':
        return (
          <ScrollView horizontal={false} style={styles.scrollView}>
            {advertisementList.map((item, index) => (
              <AdvertisementUpdateItem key={index} item={item} 
              onEdit={handleEditLatestAdvirtaisement}
              onDelete={handleDeleteLatestAdvertisement}
              isAdmin={
                auth().currentUser &&
                (auth().currentUser.phoneNumber === '+918790720978' ||
                  auth().currentUser.phoneNumber === '+919052288377' ||
                  auth().currentUser.phoneNumber === '+918853389395')
              }
            
              />
            ))}
          </ScrollView>
        );
      default:
        return <Text style={styles.noDataText}>No data available</Text>;
    }
  };

  return <View style={styles.container}>{renderList()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  scrollView: {
    marginBottom: 20,
  },
  noDataText: {
    textAlign: 'center',
    fontSize: 18,
    color: 'grey',
  },
});

export default ShowAllUpdates;
