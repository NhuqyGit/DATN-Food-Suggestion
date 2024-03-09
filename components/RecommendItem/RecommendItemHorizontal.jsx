import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';

const RecommendItemHorizontal = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={item?.image} />
      <View style={styles.content}>
        <Text style={styles.author}>{item.author}</Text>
        <Text style={styles.title}>{item.title}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 20,
    paddingVertical: 8,
    gap: 16,
    alignItems: 'flex-start',
    borderTopWidth: 1,
    borderTopColor: '#E1E1E1',
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },

  content: {
    paddingVertical: 0,
  },

  title: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 16,
  },

  author: {
    color: '#5E5E5E',
    fontSize: 14,
  },
});

export default RecommendItemHorizontal;

