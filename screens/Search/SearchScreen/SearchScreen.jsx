import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import PopularItem from '../../../components/PopularItem/PopularItem'
import DishItem from '../../../components/DishItem/DishItem'
import { ScrollView } from 'react-native'
import HistoryItem from '../../../components/HistoryItem/HistoryItem'
import SearchResultItem from '../../../components/SearchResultItem/SearchResultItem'
import SearchHeader from '../components/SearchHeader'
import { AntDesign } from '@expo/vector-icons'
import Filter from '../components/Filter/Filter'
import CameraScreen from '../CameraScreen/CameraScreen'
import { AsyncStorageService } from '../../../utils/AsynStorage'
import { HOST } from '../../../config'

const SearchScreen = ({ navigation, route }) => {
  const [isFilter, setIsFilter] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [step, setStep] = useState(1)

  const mockHistory = [
    {
      id: 1,
      title: 'Thịt bò',
    },
    {
      id: 2,
      title: 'Xà lách',
    },
    {
      id: 3,
      title: 'Dưa cải chua',
    },
  ]

  const mockSearchResult = [
    {
      id: 1,
      title: 'Bun bo Hue with new broth, best recipe from around the world',
      author: 'Master Chef :)',
      image: require('../../../assets/images/Home/recommend1.png'),
      ingredients: [
        'Ingredient 1',
        'Ingredient 2',
        'Ingredient 3',
        'Ingredient 4',
        'Ingredient 5',
        'Ingredient 6',
      ],
      reviews: [
        {
          user: 'User1',
          comment:
            'Following the recipe instructions was a breeze, and the end result was truly satisfying. The creamy Alfredo sauce was velvety smooth, perfectly coating each strand of pasta!',
          rating: 1,
        },
        {
          user: 'User2',
          comment:
            'I appreciated the simplicity of the ingredients list. It made it so easy to throw together a delicious meal without needing to make a trip to the store.',
          rating: 4,
        },
        {
          user: 'User1',
          comment:
            'The cooking times for the chicken and pasta were spot on – everything came together perfectly.',
          rating: 5,
        },
        { user: 'User2', comment: 'Amazing recipe!', rating: 4.5 },
        {
          user: 'User1',
          comment:
            'I would recommend adding a squeeze of lemon juice to the sauce to brighten up the flavors.!',
          rating: 2,
        },
        { user: 'User2', comment: 'Amazing recipe!', rating: 3 },
        { user: 'User1', comment: 'Delicious!', rating: 3.4 },
        {
          user: 'User2',
          comment:
            'I loved the creamy texture of the Alfredo sauce, but I felt like it needed a bit more seasoning.!',
          rating: 4,
        },
      ],
      rating: 4,
      totalTime: 40,
      servings: 3,
      calories: 80,
    },
    {
      id: 2,
      title: 'Pho with new broth, best recipe from around the world',
      author: 'Master Chef ;)',
      image: require('../../../assets/images/Home/recommend2.png'),
      ingredients: [
        'Ingredient 1',
        'Ingredient 2',
        'Ingredient 3',
        'Ingredient 4',
        'Ingredient 5',
        'Ingredient 6',
      ],
      reviews: [
        {
          user: 'User1',
          comment:
            "Impeccable service and mouthwatering flavors make this a must-visit spot. From the moment you step in, you're treated to a culinary journey that delights the senses!",
          rating: 3,
        },
        { user: 'User2', comment: 'Amazing recipe!', rating: 4 },
        {
          user: 'User1',
          comment:
            'I would recommend adding a squeeze of lemon juice to the sauce to brighten up the flavors.!',
          rating: 5,
        },
        {
          user: 'User2',
          comment:
            'I loved the creamy texture of the Alfredo sauce, but I felt like it needed a bit more seasoning.',
          rating: 4.5,
        },
        { user: 'User1', comment: 'Delicious!', rating: 2 },
        { user: 'User2', comment: 'Amazing recipe!', rating: 3 },
        {
          user: 'User1',
          comment:
            'I loved the creamy texture of the Alfredo sauce, but I felt like it needed a bit more seasoning.!',
          rating: 3.4,
        },
        { user: 'User2', comment: 'Amazing recipe!', rating: 4 },
      ],
      rating: 4,
      totalTime: 40,
      servings: 3,
      calories: 80,
    },
    {
      id: 3,
      title: 'Bun bo Hue with new broth, best recipe from around the world',
      author: 'Master Chef :)',
      image: require('../../../assets/images/Home/recommend3.png'),
      ingredients: [
        'Ingredient 1',
        'Ingredient 2',
        'Ingredient 3',
        'Ingredient 4',
        'Ingredient 5',
        'Ingredient 6',
      ],
      reviews: [
        { user: 'User1', comment: 'Delicious!', rating: 1 },
        {
          user: 'User2',
          comment:
            'I would recommend adding a squeeze of lemon juice to the sauce to brighten up the flavors.!',
          rating: 4,
        },
        {
          user: 'User1',
          comment:
            'The cooking times for the chicken and pasta were spot on – everything came together perfectly.',
          rating: 5,
        },
        { user: 'User2', comment: 'Amazing recipe!', rating: 4.5 },
        {
          user: 'User1',
          comment:
            'I loved the creamy texture of the Alfredo sauce, but I felt like it needed a bit more seasoning.',
          rating: 2,
        },
        { user: 'User2', comment: 'Amazing recipe!', rating: 3 },
        { user: 'User1', comment: 'Delicious!', rating: 3.4 },
        { user: 'User2', comment: 'Amazing recipe!', rating: 4 },
      ],
      rating: 4,
      totalTime: 40,
      servings: 3,
      calories: 80,
    },
    {
      id: 4,
      title: 'Delicious Dish',
      author: 'Master Chef :)',
      image: require('../../../assets/images/Home/recommend4.png'),
      ingredients: [
        'Ingredient 1',
        'Ingredient 2',
        'Ingredient 3',
        'Ingredient 4',
        'Ingredient 5',
        'Ingredient 6',
      ],
      reviews: [
        {
          user: 'User1',
          comment:
            'I loved the creamy texture of the Alfredo sauce, but I felt like it needed a bit more seasoning.!',
          rating: 1,
        },
        { user: 'User2', comment: 'Amazing recipe!', rating: 4 },
        {
          user: 'User1',
          comment:
            'I would recommend adding a squeeze of lemon juice to the sauce to brighten up the flavors.!',
          rating: 5,
        },
        {
          user: 'User2',
          comment:
            'I loved the creamy texture of the Alfredo sauce, but I felt like it needed a bit more seasoning.',
          rating: 4.5,
        },
        { user: 'User1', comment: 'Delicious!', rating: 2 },
        { user: 'User2', comment: 'Amazing recipe!', rating: 3 },
        { user: 'User1', comment: 'Delicious!', rating: 3.4 },
        { user: 'User2', comment: 'Amazing recipe!', rating: 4 },
      ],
      rating: 4,
      totalTime: 40,
      servings: 3,
      calories: 80,
    },
    {
      id: 5,
      title: 'Delicious Dish',
      author: 'Master Chef :)',
      image: require('../../../assets/monngon.jpg'),
      ingredients: [
        'Ingredient 1',
        'Ingredient 2',
        'Ingredient 3',
        'Ingredient 4',
        'Ingredient 5',
        'Ingredient 6',
      ],
      reviews: [
        { user: 'User1', comment: 'Delicious!', rating: 1 },
        { user: 'User2', comment: 'Amazing recipe!', rating: 4 },
        { user: 'User1', comment: 'Delicious!', rating: 5 },
        { user: 'User2', comment: 'Amazing recipe!', rating: 4.5 },
        { user: 'User1', comment: 'Delicious!', rating: 2 },
        { user: 'User2', comment: 'Amazing recipe!', rating: 3 },
        { user: 'User1', comment: 'Delicious!', rating: 3.4 },
        { user: 'User2', comment: 'Amazing recipe!', rating: 4 },
      ],
      rating: 4,
      totalTime: 40,
      servings: 3,
      calories: 80,
    },
  ]

  const [ingredients, setIngredients] = useState([])
  const [dish, setDish] = useState([])
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(true)
  const [dishBySearchText, setDishBySearchText] = useState([])

  useEffect(() => {
    const getIngredients = async () => {
      try {
        const token = await AsyncStorageService.getAccessToken()
        const response = await fetch(`${HOST}/ingredient`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const json = await response.json()
        setIngredients(json)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    const getAllDish = async () => {
      try {
        const token = await AsyncStorageService.getAccessToken()
        const response = await fetch(`${HOST}/dish`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const json = await response.json()
        setDish(json)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    getAllDish()
    getIngredients()
  }, [])

  useEffect(() => {
    const getDishBySearchText = async () => {
      try {
        const token = await AsyncStorageService.getAccessToken()
        const response = await fetch(`${HOST}/dish/search/${searchText}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const json = await response.json()
        setDishBySearchText(json)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    if (searchText) {
      getDishBySearchText()
    }
  }, [searchText])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.wrapper} scrollEnabled vertical>
        <SearchHeader
          navigation={navigation}
          route={route}
          setVisible={setIsVisible}
          setStep={setStep}
          setSearchText={setSearchText}
          searchText={searchText}
        />

        {step === 1 && (
          <View>
            <View style={styles.popularWrapper}>
              <View style={styles.padding}>
                <Text style={styles.title}>The most common ingredients</Text>
                <View style={styles.popularList}>
                  {ingredients?.map((item) => (
                    <PopularItem key={item.id} item={item} />
                  ))}
                </View>
              </View>
              <View style={styles.popularWrapper}>
                <View style={styles.padding}>
                  <Text style={styles.title}>Latest dish</Text>
                  <View style={styles.dishList}>
                    {dish?.map((item) => (
                      <DishItem key={item.id} item={item} />
                    ))}
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}

        {step === 2 && (
          <View style={styles.popularWrapper}>
            <View style={styles.titleContainer}>
              <Text
                style={styles.titleResult}
              >{`${mockHistory.length}+ RESULT`}</Text>
              <TouchableOpacity
                style={styles.filterContainer}
                onPress={() => {
                  setIsFilter(!isFilter)
                }}
              >
                <Text style={styles.filter}>{'Filter'}</Text>
                <AntDesign
                  style={styles.searchIcon}
                  name={isFilter ? 'up' : 'down'}
                  size={22}
                  color={'#BDBDBD'}
                />
              </TouchableOpacity>
            </View>

            {isFilter && <Filter hasButton />}

            {dishBySearchText?.map((item) => (
              <SearchResultItem key={item.id} item={item} />
            ))}
          </View>
        )}
      </ScrollView>

      <Modal visible={isVisible}>
        <CameraScreen setVisible={setIsVisible} navigation={navigation} />
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  wrapper: {
    flex: 1,
  },

  popularWrapper: {
    // padding: 16,
    gap: 16,
    paddingBottom: 16,
  },

  historyList: {
    flexDirection: 'column',
    gap: 16,
  },

  removeHistoryButton: {
    marginTop: 32,
    textAlign: 'center',
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 2,
    paddingHorizontal: 24,
    paddingVertical: 8,
  },

  popularList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },

  dishList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },

  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#2E2E30',
    paddingHorizontal: 16,
    paddingVertical: 4,
    marginTop: 16,
  },

  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },

  titleResult: {
    fontSize: 20,
    // fontWeight: 'bold',
    color: '#BDBDBD',
  },

  filter: {
    fontSize: 16,
    // fontWeight: 'bold',
    color: '#BDBDBD',
  },

  padding: {
    padding: 16,
  },
})

export default SearchScreen

