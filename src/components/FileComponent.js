import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import Video from 'react-native-video';
import FileViewer from 'react-native-file-viewer';
import FastImage from 'react-native-fast-image';
const FileComponent = ({file}) => {
  const renderFileContent = file => {
    const {url, type} = file;

    switch (type) {
      case 'video':
        return (
          <Video source={{uri: url}} style={styles.mediaContent} controls />
        );
      case 'audio':
        return (
          <Video
            source={{uri: url}}
            style={styles.audioContent}
            controls
            audioOnly
          />
        );
      case 'image':
        return <FastImage source={{uri: url}} style={styles.imageContent} />;
      case 'pdf':
      case 'doc':
      case 'docx':
        return (
          <TouchableOpacity onPress={() => FileViewer.open(url)}>
            <Text style={styles.pdfLink}>Open Document</Text>
          </TouchableOpacity>
        );
      default:
        return <Text>Unsupported file type</Text>;
    }
  };

  return <View style={styles.updateItem}>{renderFileContent(file)}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  updateItem: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginTop: 4,
    marginBottom: 4,
  },
  mediaContent: {
    height: 200,
    backgroundColor: '#000',
    marginTop: 10,
  },
  audioContent: {
    height: 50,
    backgroundColor: '#000',
    marginTop: 10,
  },
  imageContent: {
    height: 200,
    resizeMode: 'cover',
    marginTop: 10,
  },
  pdfLink: {
    fontSize: 14,
    color: '#007BFF',
    marginTop: 10,
  },
});

export default App;
