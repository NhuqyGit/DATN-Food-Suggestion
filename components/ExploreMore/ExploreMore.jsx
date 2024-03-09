import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import ExploreMoreItem from '../ExploreMoreItem/ExploreMoreItem'

function ExploreMore() {
  const mockData = [
    {
      id: 1,
      title: 'Breakfast',
      image: require('../../assets/recommendImage.jpg'),
    },
    {
      id: 2,
      title: 'Vegetarian',
      image: require('../../assets/recommendImage.jpg'),
    },
    {
      id: 3,
      title: 'Beverage',
      image: require('../../assets/recommendImage.jpg'),
    },
    {
      id: 4,
      title: 'Dessert',
      image: require('../../assets/recommendImage.jpg'),
    },
    {
      id: 5,
      title: 'Trending',
      image: require('../../assets/recommendImage.jpg'),
    },
  ]
  return (
    <View style={styles.container}>
      <Text style={styles.title}>ExploreMore</Text>
      {mockData?.map((item) => (
        <ExploreMoreItem key={item.id} item={item} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
})

export default ExploreMore
