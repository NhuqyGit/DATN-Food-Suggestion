import React from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import Category from '../Category/Category';

const CategoryList = () => {
  const mockData = [
    {
      id: 1,
      title: 'Category 1',
    },
    {
      id: 2,
      title: 'Category 2',
    },
    {
      id: 3,
      title: 'Category 3',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Good afternoon!</Text>
      <ScrollView
        style={styles.list}
        horizontal // Enable horizontal scrolling
        showsHorizontalScrollIndicator={false} // Hide the horizontal scroll indicator
      >
        {mockData?.map((item) => (
          <Category key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 32,
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  list: {
    flexDirection: 'row',
  },
});

export default CategoryList;

