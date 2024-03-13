import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const PopularItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: item.image,
        }}
      />
      <Text>{item.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderRadius: 100,
    paddingVertical: 8,
    gap: 16,
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  image: {
    width: 30,
    height: 30,
    objectFit: 'cover',
  },
})

export default PopularItem

