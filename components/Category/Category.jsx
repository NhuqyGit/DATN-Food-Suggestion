import { View, Text, Image, StyleSheet, TouchableOpacity, Platform} from 'react-native'
import React from 'react'

function Category({ item }) {
  const generateBoxShadowStyle = (
    xOffset,
    yOffset,
    shadowColorIos,
    shadowOpacity,
    shadowRadius,
    elevation,
    shadowColorAndroid,
  ) => {
      if (Platform.OS === 'ios') {
          return {
              shadowColor: shadowColorIos,
              shadowOffset: { width: xOffset, height: yOffset },
              shadowOpacity,
              shadowRadius,
          }
      } else if (Platform.OS === 'android') {
          return  {
              elevation,
              shadowColor: shadowColorAndroid,
          }
      }
  }

  const boxShadow = generateBoxShadowStyle(0, 3, 'black', 0.2, 5, 5, 'black')
  return (
    <TouchableOpacity style={[boxShadow, styles.container]}>
        <Text style={styles.title}>{item.title}</Text>
        <Image
          style={styles.image}
          source={item.image}
        />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    gap: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
    // borderColor: 'red',
    // borderWidth: 1,
    marginHorizontal: 8,
    marginVertical: 20,
    backgroundColor: 'white'
  },
  image: {
    width: 60,
    height: 60,
    // objectFit: 'cover',
  },
  title:{
    fontSize: 16,
    fontWeight: '500'
  }
})

export default Category
