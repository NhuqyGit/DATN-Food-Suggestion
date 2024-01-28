import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';

const Category = ({ item }) => {
  return (
    <TouchableOpacity>
      <View style={styles.container}>
        <Text>{item.title}</Text>
        <Image
          style={styles.image}
          source={require('../../assets/categoryImage.png')}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderRadius: 20,
    paddingVertical: 8,
    gap: 8,
    alignItems: 'center',
  },
  image: {
    width: 40,
    height: 40,
    objectFit: 'cover',
  },
});

export default Category;

