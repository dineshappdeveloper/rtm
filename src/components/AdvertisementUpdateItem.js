import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const AdvertisementUpdateItem = ({ item }) => {
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
    width: 360,
    borderRadius: 5,
    overflow: 'hidden',
    alignContent:'center',
    alignItems:'center',
    backgroundColor: '#fff',
    height: 180, 
    marginBottom:8// Ensure the container height matches the intended image height
  },
  itemImage: {
    width: '100%',
    height: 259, // Set explicit height to match the container
  },
  noImageContainer: {
    width: '100%',
    height: 180, // Match the height of the container
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Optional: Add a background color to make the no image container more visible
  },
  noImageText: {
    fontSize: 14,
    color: '#888', // Optional: Add color to the text for better visibility
  },
});

export default AdvertisementUpdateItem;
