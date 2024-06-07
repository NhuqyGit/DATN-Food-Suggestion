import React, { useEffect } from 'react'
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { theme } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { AsyncStorageService } from '../../utils/AsynStorage'
import { HOST } from '../../config'
import { useSelector } from 'react-redux'
import { selectUserInfo } from '../../slices/userLoginSlice'

function RecommendItem({ item }) {
  const navigation = useNavigation()
  const userInfo = useSelector(selectUserInfo)

  const dishId = item?.id
  const userId = userInfo?.id

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
            collectionName: 'All saved dishs',
          }),
        }
      )

      if (response.status === 201) {
        alert('Add to collection successfully')
      } else {
        alert('Add to collection failed')
      }
    } catch (error) {
      console.error(error)
    } finally {
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
      <Image style={styles.image} source={{ uri: item?.imageUrl }} />
      <View style={styles.overlay}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Text style={styles.rating}>{`Rating: ${item.rating}`}</Text>
          <AntDesign name='star' size={20} color='#FF6321' />
        </View>
        <Text style={styles.title}>{item?.dishName}</Text>
        <View style={styles.authorContainer}>
          <Text style={styles.author}>{item.author}</Text>
          <TouchableOpacity onPress={onAddToCollection}>
            <View style={styles.iconContainer}>
              {/* <Icon style={styles.addIcon} name='plus' /> */}
              <MaterialIcons name='favorite' size={30} color='white' />
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
  },
  image: {
    width: 300,
    height: 400,
    borderRadius: 8,
    marginRight: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 20,
    bottom: 0,
    justifyContent: 'flex-end',
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
    // backgroundColor: theme.colors.secondary,
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

export default RecommendItem

