import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const AdvertisementItem = ({ item }) => {
  return (
    <View style={styles.container}>
      {item.file ? (
        <Image source={{ uri: item.file.url }} style={styles.itemImage} />
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
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  itemImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 16 / 9, // Maintain aspect ratio
  },
  noImageContainer: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  noImageText: {
    fontSize: 14,
  },
});

export default AdvertisementItem;
