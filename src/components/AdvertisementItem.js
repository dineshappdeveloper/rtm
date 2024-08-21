import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const AdvertisementItem = ({ item }) => {
  return (
    <View style={styles.container}>
      {item.file && item.file.url ? (
        <Image 
          source={{ uri: item.file.url }} 
          style={styles.itemImage} 
          onError={() => console.log('Error loading image')}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.noImageContainer}>
          <Text style={styles.noImageText}>No Image Available</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', 
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#fff',
    height: 138,
  },
  itemImage: {
    width: '100%',
    height: '100%',
  },
  noImageContainer: {
    width: '100%',
    height: 100, // Match the height of the image container
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  noImageText: {
    fontSize: 14,
  },
});

export default AdvertisementItem;
