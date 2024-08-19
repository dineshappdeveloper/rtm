import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const LatestItem = ({item}) => {
  const formatDateTime = timestamp => {
    const date = new Date(
      timestamp.seconds ? timestamp.seconds * 1000 : timestamp,
    );

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
    <View style={{marginTop:8}}>
      <Text style={styles.boxText}>{item.description}</Text>
      <Text style={styles.publishInfo}>
          Published on: {formatDateTime(item.timestamp)}
        </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  boxText: {
    fontSize: 18,
    color: 'black',
    fontWeight: '500',
  },
  publishInfo: {
    fontSize: 12,
    color: 'grey',
    marginTop: 10,
  },
});

export default LatestItem;
