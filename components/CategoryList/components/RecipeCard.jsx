import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import {
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { theme } from '../../../theme/index'
import { useSelector } from 'react-redux'
import { selectUserInfo } from '../../../slices/userLoginSlice'
import { AsyncStorageService } from '../../../utils/AsynStorage'
import { HOST } from '../../../config'
import Toast from 'react-native-toast-message'

const RecipeCard = ({ item, callBack }) => {
  const navigation = useNavigation()
  const userInfo = useSelector(selectUserInfo)
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

        callBack()
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
      style={styles.container}
      onPress={() => {
        navigation.push('FoodDetail', { foodDetails: item })
      }}
    >
      <ImageBackground
        source={{
          uri: item?.imageUrl,
        }}
        style={styles.image}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.overlay}>
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
          <Text style={styles.title}>{item?.dishName}</Text>
          <View style={styles.authorContainer}>
            <Text style={styles.author}>{item.author}</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity
                onPress={
                  isInCollection ? onDeleteFromCollection : onAddToCollection
                }
              >
                <View style={styles.iconContainer}>
                  <MaterialIcons
                    name={isInCollection ? 'favorite' : 'favorite-outline'}
                    size={24}
                    color={
                      isInCollection
                        ? theme.colors.primary
                        : theme.colors.secondary
                    }
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
    paddingVertical: 7,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    justifyContent: 'flex-end',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'flex-end',
    height: 200,
    width: '100%',
    padding: 8,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
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
  },
  iconContainer: {
    backgroundColor: '#ffff',
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height
      ) / 2,
    width: Dimensions.get('window').width * 0.075,
    height: Dimensions.get('window').width * 0.075,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    color: 'white',
    fontSize: 16,
  },
})

export default RecipeCard

