import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux'
import { setIngredientIds, setSearchStep } from '../../slices/searchSlice'

const PopularItem = ({ item }) => {
  const dispatch = useDispatch()
  return (
    <TouchableOpacity
      onPress={() => {
        dispatch(setIngredientIds([item?.id]))
        dispatch(setSearchStep(2))
      }}
      style={{
        width: '48.5%',
      }}
    >
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{
            uri: item?.imageUrl,
          }}
        />
        <Text style={styles.text} numberOfLines={1} ellipsizeMode='tail'>
          {item?.ingredientName}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    borderRadius: 100,
    paddingVertical: 8,
    gap: 8,
    alignItems: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
    width: '100%',
  },
  image: {
    width: 30,
    height: 30,
    borderRadius: 15,
    objectFit: 'cover',
  },
  text: {
    flexShrink: 1,
  },
})

export default PopularItem

