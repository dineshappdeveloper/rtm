import React from 'react';
import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';

const AdvertisementUpdateItem = ({item, onEdit, onDelete, isAdmin}) => {
  return (
    <View style={styles.container}>
      {item.file && item.file.url ? (
        <Image
          source={{uri: item.file.url}}
          style={styles.itemImage}
          onError={() => console.log('Error loading image')}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.noImageContainer}>
          <Text style={styles.noImageText}>No Image Available</Text>
        </View>
      )}
      <View
        style={{
          backgroundColor: '#abcd',
          position: 'absolute',
          right: 0,
          bottom: 0,
        }}>
        {isAdmin && (
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              onPress={() => onEdit(item)}
              style={styles.actionButton}>
              <FontAwesomeIcon icon={faEdit} size={18} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onDelete(item)}
              style={styles.actionButton}>
              <FontAwesomeIcon icon={faTrash} size={18} color="white" />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 360,
    borderRadius: 5,
    overflow: 'hidden',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    height: 180,
    marginBottom: 8, // Ensure the container height matches the intended image height
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
  actionsContainer: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 5,
    padding: 5,
    marginLeft: 5,
  },
});

export default AdvertisementUpdateItem;
