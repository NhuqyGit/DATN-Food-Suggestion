import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const DishItem = ({ item }) => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('FoodDetail', { foodDetails: item })
        }}
        style={styles.container}
      >
        <Image
          style={styles.image}
          source={{
            uri: item.imageUrl,
          }}
        />
        <Text style={styles.title}>{item.dishName}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
  },
  image: {
    width: '100%',
    height: 200,
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

