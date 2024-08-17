import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

const AdvertisementItem = ({ item, onEdit, onDelete,isAdmin }) => {
  const formatDateTime = (timestamp) => {
    // Convert the timestamp to milliseconds if it's in seconds
    const date = new Date(timestamp.seconds ? timestamp.seconds * 1000 : timestamp);
  
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
  
    return date.toLocaleDateString(undefined, options);
  };
  return (
    <View style={styles.itemContainer}>
      {/* Render the image only if it exists */}
      {item.file ? (
        <Image source={{ uri: item.file.url }} style={styles.itemImage} />
      ) : (
        <View style={styles.noImageContainer}>
          <Text style={styles.noImageText}>No Image Available</Text>
        </View>
      )}
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDescription}>{item.description}</Text>
      <Text style={styles.publishInfo}>
          Published on: {formatDateTime(item.timestamp)}
        </Text>
      {/* Render the link only if it exists */}
      {item.link && (
        <TouchableOpacity onPress={() => Linking.openURL(item.link)}>
          <Text style={styles.itemLink}>Learn more</Text>
        </TouchableOpacity>
      )}
      {isAdmin&&(
        <View style={styles.actionsContainer}>
        <TouchableOpacity onPress={() => onEdit(item)} style={styles.actionButton}>
          <FontAwesomeIcon icon={faEdit} size={18} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onDelete(item)} style={styles.actionButton}>
          <FontAwesomeIcon icon={faDeleteLeft} size={18} color="red" />
        </TouchableOpacity>
      </View>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 15,
    marginRight: 15,
    width: 280,
    position: 'relative', 
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  itemImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  noImageContainer: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  noImageText: {
    color: '#888',
    fontSize: 14,
  },
  itemLink: {
    fontSize: 14,
    color: 'blue',
    marginBottom: 10,
  },
  itemPublishDate: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  actionsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    right: 10,
    justifyContent: 'flex-end',
  },
  actionButton: {
    marginLeft: 10,
  },
});

export default AdvertisementItem;
