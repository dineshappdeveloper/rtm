import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const GroupFolder = ({packages}) => {
  const navigation = useNavigation();

  const handleFolderPress = folder => {
    navigation.navigate('FolderScreen', {folder});
  };

  return (
    <View style={styles.container}>
      {packages
        .filter(folder => folder.value !== '0') // Filter out the item with value '0'
        .map(folder => (
          <TouchableOpacity
            key={folder.id}
            style={styles.folderContainer}
            onPress={() => handleFolderPress(folder)}>
            <Image
              source={require('../assets/folders.jpg')}
              style={styles.icon}
            />
            <Text style={styles.text}>{folder.name}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
  },
  folderContainer: {
    alignItems: 'center',
    marginBottom: 20,
    width: '45%',
  },
  icon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: 'black',
    fontWeight: '500',
    textAlign: 'center',
  },
});

export default GroupFolder;
