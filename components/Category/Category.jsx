import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import ExploreCategories from '../CategoryList/ExploreCategories'

function Category({ item }) {
  const navigation = useNavigation()
  const generateBoxShadowStyle = (
    xOffset,
    yOffset,
    shadowColorIos,
    shadowOpacity,
    shadowRadius,
    elevation,
    shadowColorAndroid
  ) => {
    if (Platform.OS === 'ios') {
      return {
        shadowColor: shadowColorIos,
        shadowOffset: { width: xOffset, height: yOffset },
        shadowOpacity,
        shadowRadius,
      }
    } else if (Platform.OS === 'android') {
      return {
        elevation,
        shadowColor: shadowColorAndroid,
      }
    }
  }
  const handlePress = (item) => {
    navigation.navigate('ExploreCategories', { category: item })
  }

  const boxShadow = generateBoxShadowStyle(0, 3, 'black', 0.2, 5, 5, 'black')
  return (
    <TouchableOpacity
      style={[boxShadow, styles.container]}
      onPress={() => handlePress(item)}
    >
      <Text style={styles.title}>{item.name}</Text>
      <Image
        style={styles.image}
        source={{
          uri: item.imgUrl,
        }}
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
    marginHorizontal: 5,
    marginVertical: 10,
    backgroundColor: 'white',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    objectFit: 'cover',
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
  },
})

export default Category

