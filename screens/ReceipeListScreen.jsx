import { MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS } from '../theme/theme'
import { theme } from '../theme/index'
import { AsyncStorageService } from '../utils/AsynStorage'
import { HOST } from '../config'
import { useNavigation } from '@react-navigation/native'
import RecipeCard from '../components/CategoryList/components/RecipeCard'
import Toast from 'react-native-toast-message'

const img = require('../constants/knife-fork.jpg')

function RecipeListItem({ item, removeDish }) {
  const navigation = useNavigation()

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.push('FoodDetail_prof', { foodDetails: item })
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 5,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
            marginTop: 0.5,
            paddingRight: 20,
            paddingLeft: 0,
            paddingVertical: 5,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              source={{ uri: item.imageUrl }}
              style={{ width: 100, height: 80, borderRadius: 10 }}
            />

            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.primary,
                alignItems: 'center',
                paddingLeft: 5,
              }}
            >
              {item.dishName}
            </Text>
          </View>
          <Menu>
            <MenuTrigger>
              <View
                style={{
                  padding: 5,
                }}
              >
                <MaterialIcons name='more-vert' size={24} color='gray' />
              </View>
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionWrapper: { paddingVertical: 10 },
                optionsContainer: { marginTop: 30 },
              }}
            >
              <MenuOption
                onSelect={() => {
                  removeDish(item.id)
                }}
              >
                <Text style={{ color: 'red' }}>Remove</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </TouchableOpacity>
    </View>
  )
}

function ReceipeListScreen({ route, navigation }) {
  const collectionId = route.params.id
  const collectionName = route.params.name
  const isProtected = route.params.isProtected
  const [isClicked, setIsClicked] = useState(false)
  const [dishes, setDishes] = useState([])

  useEffect(() => {
    const fetchDishes = async () => {
      const token = await AsyncStorageService.getAccessToken()
      try {
        const response = await fetch(
          `${HOST}/collections/${collectionId}/dishes`,
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
          setDishes(responseJson)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchDishes()
  }, [])

  const removeCollection = async (id) => {
    const token = await AsyncStorageService.getAccessToken()
    try {
      const response = await fetch(`${HOST}/collections/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })

      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Collection Removed',
          text2: 'All dishes in this collection are removed',
          textStyle: { fontSize: 20 },
        })
        navigation.goBack()
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Collection Remove Failed',
        text2:
          'An error occurred while updating your collections. Please try again.',
        textStyle: { fontSize: 20 },
      })
      console.error(error)
    }
    setIsClicked(false)
  }

  const onBack = () => {
    navigation.goBack()
  }

  return (
    <MenuProvider>
      <View style={styles.container}>
        <View>
          <View style={styles.header}>
            <View style={styles.leftHeader}>
              <TouchableOpacity onPress={onBack} style={styles.backButton}>
                <MaterialIcons name='arrow-back' size={24} color='black' />
              </TouchableOpacity>
              <Text style={styles.cateTitle}>{collectionName}</Text>
            </View>

            {!isProtected && (
              <TouchableOpacity
                onPress={() => removeCollection(collectionId)}
                style={[styles.backButton]}
              >
                <MaterialIcons name='delete-outline' size={24} color='red' />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollViewContainer}
        >
          <View style={styles.section}>
            {dishes?.map((item) => (
              <RecipeCard key={item.id} item={item} callBack={onBack} />
            ))}
          </View>
        </ScrollView>
      </View>
    </MenuProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
    justifyContent: 'space-between',
  },

  leftHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  backButton: {
    padding: 20,
  },

  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    gap: 20,
  },
  section: {
    display: 'flex',
    gap: 20,
    width: '90%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '70%',
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
})

export default ReceipeListScreen

