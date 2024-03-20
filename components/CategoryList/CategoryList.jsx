import React from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import Category from '../Category/Category'

function CategoryList() {
  const mockData = [
    {
      id: 1,
      title: 'Breakfast',
      image: require('../../assets/images/Home/category1.png')
    },
    {
      id: 2,
      title: 'Vegetarian',
      image: require('../../assets/images/Home/category2.png')
    },
    {
      id: 3,
      title: 'Beverage',
      image: require('../../assets/images/Home/category3.png')
    },
    {
      id: 4,
      title: 'Dessert',
      image: require('../../assets/images/Home/category4.png')
    },
  ]

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
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 32,
    paddingLeft: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 30
  },

  list: {
    flexDirection: 'row',
    alignItem: 'center',
    // backgroundColor: 'red',
  },
})

export default CategoryList
