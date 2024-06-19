import { MaterialIcons } from '@expo/vector-icons'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import {
  Alert,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS } from '../theme/theme'
import * as ImagePicker from 'expo-image-picker'

import { AsyncStorageService } from '../utils/AsynStorage'
import { selectUserInfo, setUserInfo } from '../slices/userLoginSlice'
import { useSelector, useDispatch } from 'react-redux'
import { HOST, uploadToFirebase } from '../config'
import { Ionicons } from '@expo/vector-icons'

import Collection from '../components/Profile/Collection'
import SortPopUp from '../components/Profile/SortPopUp'

function Profile({ navigation }) {
  const userInfo = useSelector(selectUserInfo)
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false)
  const isFocused = useIsFocused()
  const [collections, setCollections] = useState([])

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  useEffect(() => {
    if (isFocused) {
      const fetchCollections = async () => {
        const token = await AsyncStorageService.getAccessToken()
        try {
          const response = await fetch(
            `${HOST}/collections/user/${userInfo?.id}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          )

          const responseJson = await response.json()

          if (responseJson.error) {
            console.log(responseJson.message)
          } else {
            setCollections(responseJson)
          }
        } catch (error) {
          console.error(error)
        }
      }
      fetchCollections()
    }
  }, [isFocused])

  const data = [
    {
      nameCollection: 'All Personal Recipes',
      num: 5,
      imgCol: require('../assets/images/Profile/avatarDefault.png'),
    },
    {
      nameCollection: 'Breakfasts',
      num: 2,
      imgCol: require('../assets/images/Profile/avatarDefault.png'),
    },
    {
      nameCollection: 'Desserts',
      num: 3,
      imgCol: require('../assets/images/Profile/avatarDefault.png'),
    },
  ]

  const updateProfileImage = async (newImgUrl) => {
    const token = await AsyncStorageService.getAccessToken()
    try {
      const response = await fetch(`${HOST}/users/${userInfo?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          imgUrl: newImgUrl,
        }),
      })

      const responseJson = await response.json()

      if (responseJson.error) {
        console.log(responseJson.message)
      } else {
        dispatch(setUserInfo({ ...userInfo, imgUrl: newImgUrl }))
      }
    } catch (error) {
      console.error(error)
    }
  }

  const listCollection = collections?.map((col, index) => {
    return (
      <Collection props={col} navigation={navigation} key={index.toString()} />
    )
  })

  const importImage = async () => {
    try {
      let res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
      })
      if (!res.canceled) {
        const uri = res.assets[0].uri
        const filename = uri.substring(uri.lastIndexOf('/') + 1)
        //console.log(uri)
        const uploadRes = await uploadToFirebase(uri, filename)
        updateProfileImage(uploadRes.downloadURL)
        // replace user state url
      }
    } catch (e) {
      Alert.alert('Error uploading image')
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Settings')
          }}
          style={{ alignItems: 'flex-end' }}
        >
          <View style={styles.btnSetting}>
            <MaterialIcons name='settings' size={24} color='black' />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.avatar} onPress={importImage}>
          <Image
            style={styles.avatarImage}
            source={
              userInfo?.imgUrl
                ? { uri: userInfo.imgUrl }
                : require('../assets/images/Profile/user.png')
            }
          />
          <Ionicons
            style={styles.cameraIcon}
            name='camera-outline'
            size={24}
            color='black'
          />
        </TouchableOpacity>

        <Text style={styles.userName}>{`@${userInfo?.username}`}</Text>

        <View style={styles.collectionHeader}>
          <TouchableOpacity
            onPress={() => navigation.push('NewCollection')}
            style={styles.btnAddColl}
          >
            <MaterialIcons name='playlist-add' size={28} color='#3a9693' />
            <Text style={[styles.titleCollection]}>New Collection</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.btnSort}
          >
            <Text style={styles.titleFilter}>Sort</Text>
            <MaterialIcons
              name='keyboard-arrow-down'
              style={{ marginLeft: 5 }}
              size={24}
              color='#2d6d64'
            />
          </TouchableOpacity>
        </View>

        <ScrollView style={{ paddingTop: 10 }}>
          <View style={styles.listCollection}>
            {/* <Collection /> */}
            {listCollection}
          </View>
        </ScrollView>
        <SortPopUp closePopUp={handleCloseModal} modalVisible={modalVisible} />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  btnSetting: {
    width: 35,
    height: 35,
    marginTop: 20,
    marginRight: 20,
    marginBottom: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#F3F3F3',
  },
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cameraIcon: {
    position: 'absolute',
    top: '70%',
    left: '55%',
  },
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 200,
  },
  userName: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 24,
    fontWeight: '700',
    color: '#231F20',
  },
  userDescription: {
    textAlign: 'center',
    marginTop: 15,
    fontSize: 13,
    color: '#231F20',
  },
  collectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    marginVertical: 30,
  },
  btnAddColl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnSort: {
    backgroundColor: '#ecf5f4',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  titleCollection: {
    fontSize: 14,
    fontWeight: '700',
    color: '#231F20',
    marginLeft: 5,
  },
  titleFilter: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2d6d64',
  },
  listCollection: {
    paddingHorizontal: 25,
  },
})

export default Profile

