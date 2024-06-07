import { AntDesign, MaterialIcons } from '@expo/vector-icons'
import React from 'react'
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

function SmallRecommendItem({ item }) {
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
    <TouchableOpacity activeOpacity={1} style={styles.container}>
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
          <TouchableOpacity onPress={onAddToCollection}>
            <View style={styles.iconContainer}>
              {/* <Icon style={styles.addIcon} name='plus' /> */}
              <MaterialIcons name='favorite' size={16} color='white' />
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
    backgroundColor: theme.colors.secondary,
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height
      ) / 2,
    width: Dimensions.get('window').width * 0.065,
    height: Dimensions.get('window').width * 0.065,
    // padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    color: 'white',
    fontSize: 16,
  },
})

export default SmallRecommendItem

