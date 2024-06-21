import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { theme } from '../../theme'
import { selectUserInfo } from '../../slices/userLoginSlice'
import { useSelector } from 'react-redux'
import { AsyncStorageService } from '../../utils/AsynStorage'
import { HOST } from '../../config'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'

function SmallRecommendItem({ item }) {
  const userInfo = useSelector(selectUserInfo)
  const navigation = useNavigation()
  const dishId = item?.id
  const userId = userInfo?.id
  const [isInCollection, setIsInCollection] = useState(false)

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
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            marginTop: 5,
          }}
        >
          <Text style={styles.rating}>{`Rating: ${item?.rating}`}</Text>
          <AntDesign name='star' size={20} color='#FF6321' />
        </View>
        <View style={styles.authorContainer}>
          <Text style={styles.title}>{item?.dishName}</Text>
          <TouchableOpacity
            onPress={
              isInCollection ? onDeleteFromCollection : onAddToCollection
            }
          >
            <View style={styles.iconContainer}>
              <MaterialIcons
                name={isInCollection ? 'favorite' : 'favorite-outline'}
                size={22}
                color={
                  isInCollection ? theme.colors.primary : theme.colors.secondary
                }
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 140,
    height: 140,
    borderRadius: 8,
    marginRight: 16,
  },

  title: {
    color: '#000000',
    fontSize: 13,
    fontWeight: 'bold',
  },
  rating: {
    color: '#FF6321',
    fontSize: 14,
  },
  authorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 110,
    gap: 8,
  },
  author: {
    color: 'white',
    fontSize: 14,
    marginRight: 4,
  },
  iconContainer: {
    // backgroundColor: 'white',
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height
      ) / 2,
    width: Dimensions.get('window').width * 0.065,
    height: Dimensions.get('window').width * 0.065,
    // padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 1, height: 3 },
    // shadowOpacity: 0.3,
    // shadowRadius: 1,
    //elevation: 5,
    marginBottom: 5,
  },
  addIcon: {
    color: 'white',
    fontSize: 16,
  },
})

export default SmallRecommendItem

