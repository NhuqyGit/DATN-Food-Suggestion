import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const DishItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: item.image,
        }}
      />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    width: 160,
    height: 100,
    borderRadius: 20,
    resizeMode: 'cover',
  },
  title: {
    position: 'absolute',
    bottom: 10,
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingVertical: 5,
  },
})

export default DishItem

