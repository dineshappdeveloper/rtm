import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit, faDeleteLeft } from '@fortawesome/free-solid-svg-icons';

const LatestUpdateItem = ({ item, onEdit, onDelete, isAdmin }) => {
  const renderFileContent = () => {
    if (!item.file || !item.file.type) return null;

    switch (item.file.type) {
      case 'image':
        return <Image source={{ uri: item.file.url }} style={styles.itemImage} />;
      case 'video':
        return <Text style={styles.itemFileType}>Video</Text>;
      case 'audio':
        return <Text style={styles.itemFileType}>Audio</Text>;
      case 'pdf':
        return <Text style={styles.itemFileType}>PDF</Text>;
      case 'doc':
        return <Text style={styles.itemFileType}>DOC</Text>;
      default:
        return <Text style={styles.itemFileType}>Unsupported file type</Text>;
    }
  };

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
      <View style={styles.contentContainer}>
        {renderFileContent()}
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
        <Text style={styles.publishInfo}>
          Published on: {formatDateTime(item.timestamp)}
        </Text>
      </View>

      {isAdmin && (
        <View style={styles.actionsContainer}>
          <TouchableOpacity
            onPress={() => onEdit(item)}
            style={styles.actionButton}
          >
            <FontAwesomeIcon icon={faEdit} size={18} color="white"/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => onDelete(item)}
            style={styles.actionButton}
          >
            <FontAwesomeIcon icon={faDeleteLeft} size={18} color="white" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
    padding: 10,
    marginRight: 10,
    width: 280,
    position: 'relative',
  },
  contentContainer: {
    paddingBottom: 40, // Add space at the bottom for action buttons
  },
  itemTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 10, // Ensure space above title
  },
  itemDescription: {
    fontSize: 12,
    color: 'black',
    marginTop: 5, // Ensure space above description
  },
  itemImage: {
    width: '100%',
    height: 84,
    borderRadius: 5,
    marginVertical: 5,
  },
  itemFileType: {
    fontSize: 12,
    color: 'grey',
    marginVertical: 5, // Space above and below file type
  },
  publishInfo: {
    fontSize: 12,
    color: 'grey',
    marginTop: 5,
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

export default LatestUpdateItem;
