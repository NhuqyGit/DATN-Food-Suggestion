import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const ExploreMoreItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{item?.title}</Text>
      <Image style={styles.image} source={item?.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    borderColor: '#e0e0e0',
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },

  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000000',
  },

  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
});

export default ExploreMoreItem;

