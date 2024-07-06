import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { HOST } from '../../config'
import { selectUserInfo } from '../../slices/userLoginSlice'
import { theme } from '../../theme'
import { AsyncStorageService } from '../../utils/AsynStorage'

function RecommendItem({ item }) {
  const navigation = useNavigation()
  const [isInCollection, setIsInCollection] = useState(false)

  const userInfo = useSelector(selectUserInfo)
  const dishId = item?.id
  const userId = userInfo?.id

  useEffect(() => {
    const checkIfInCollection = async () => {
      try {
        const token = await AsyncStorageService.getAccessToken()
        const response = await fetch(
          `${HOST}/collections/check-in-collection`,
          {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId,
              dishId,
              collectionName: 'All Personal Recipes',
            }),
          }
        )

        if (response.status === 201) {
          const data = await response.json()
          setIsInCollection(data.isInCollection)
        }
      } catch (error) {
        console.error(error)
      }
    }

    checkIfInCollection()
  }, [userId, dishId])

  const onAddToCollection = async () => {
    try {
      const token = await AsyncStorageService.getAccessToken()
      const response = await fetch(
        `${HOST}/collections/addByName/user/${userId}/dish/${dishId}`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            collectionName: 'All Personal Recipes',
          }),
        }
      )

      if (response.status === 201) {
        setIsInCollection(true)
        Toast.show({
          type: 'success',
          text1: 'Collection Added',
          text2: "Recipe was added to 'All Personal Recipes'",
          textStyle: { fontSize: 20 },
        })
      } else {
        Toast.show({
          type: 'error',
          text1: 'Operation Failed',
          text2:
            'An error occurred while updating your collections. Please try again.',
          textStyle: { fontSize: 20 },
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  const onDeleteFromCollection = async () => {
    try {
      const token = await AsyncStorageService.getAccessToken()
      const response = await fetch(
        `${HOST}/collections/removeByName/user/${userId}/dish/${dishId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            collectionName: 'All Personal Recipes',
          }),
        }
      )

      if (response.status === 200) {
        setIsInCollection(false)
        Toast.show({
          type: 'success',
          text1: 'Collection Updated',
          text2: "Recipe was removed from 'All Personal Recipes'",
          textStyle: { fontSize: 20 },
        })
      } else {
        Toast.show({
          type: 'error',
          text1: 'Operation Failed',
          text2:
            'An error occurred while updating your collections. Please try again.',
          textStyle: { fontSize: 20 },
        })
      }
    } catch (error) {
      console.error(error)
    }
  }
  const roundedRating = Math.round(item?.rating * 10) / 10;
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push('FoodDetail', { foodDetails: item })
      }}
      activeOpacity={1}
      style={styles.container}
    >
      <Image
        style={styles.image}
        source={{
          uri: item?.imageUrl,
        }}
      />
      <View style={styles.overlay}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Text style={styles.rating}>{`Rating: ${roundedRating}`}</Text>
          <AntDesign name='star' size={20} color='#FF6321' />
        </View>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>
          {item?.dishName}
        </Text>
        <View style={styles.authorContainer}>
          <Text style={styles.author}>{item?.author}</Text>
          <TouchableOpacity
            onPress={
              isInCollection ? onDeleteFromCollection : onAddToCollection
            }
          >
            <View style={styles.iconContainer}>
              <MaterialIcons
                name={isInCollection ? 'favorite' : 'favorite-outline'}
                size={27}
                color={isInCollection ? theme.colors.primary : 'white'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 8,
    marginRight: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    padding: 24,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    flexShrink: 1,
  },
  rating: {
    color: 'white',
    fontSize: 14,
  },
  authorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    color: 'white',
    fontWeight: '500',
    marginRight: 4,
    textTransform: 'uppercase',
    color: '#9e9e9e',
  },
  iconContainer: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height
      ) / 2,
    width: Dimensions.get('window').width * 0.085,
    height: Dimensions.get('window').width * 0.085,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#fff',
    // shadowColor: '#000',
    // shadowOffset: { width: 1, height: 5 },
    // shadowOpacity: 0.3,
    // shadowRadius: 4,
    // elevation: 5,
  },

  addIcon: {
    color: 'white',
    fontSize: 16,
  },
})

export default RecommendItem

