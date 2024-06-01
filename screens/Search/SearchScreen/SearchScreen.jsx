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
import LatestDishSkeleton from '../ViewImageScreen/LatestDishSkeleton'
import IngredientSkeleton from '../ViewImageScreen/IngredientSkeleton'

const SearchScreen = ({ navigation, route }) => {
  const [isFilter, setIsFilter] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [step, setStep] = useState(1)

  const [ingredients, setIngredients] = useState([])
  const [dish, setDish] = useState([])
  const [searchText, setSearchText] = useState('')
  const [loading, setLoading] = useState(true)
  const [loadingDish, setLoadingDish] = useState(true)
  const [dishBySearchText, setDishBySearchText] = useState([])

  useEffect(() => {
    const getIngredients = async () => {
      setLoading(true)
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
      setLoadingDish(true)
      try {
        const token = await AsyncStorageService.getAccessToken()
        const response = await fetch(`${HOST}/dish/latest?sort=desc&limit=5`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const json = await response.json()
        setDish(json)
      } catch (error) {
        console.error(error)
      } finally {
        setLoadingDish(false)
      }
    }

    getAllDish()
    getIngredients()
  }, [])

  useEffect(() => {
    const getDishBySearchText = async () => {
      try {
        const token = await AsyncStorageService.getAccessToken()
        const response = await fetch(`${HOST}/dish/search?text=${searchText}`, {
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
                {loading ? (
                  <View
                    style={{
                      flexDirection: 'column',
                      flexWrap: 'wrap',
                      gap: 8,
                    }}
                  >
                    <IngredientSkeleton total={2} />
                  </View>
                ) : (
                  <View style={styles.popularList}>
                    {ingredients?.map((item) => (
                      <PopularItem key={item.id} item={item} />
                    ))}
                  </View>
                )}
              </View>
              <View style={styles.popularWrapper}>
                <View style={styles.padding}>
                  <Text style={styles.title}>Latest dish</Text>
                  {loadingDish ? (
                    <View
                      style={{
                        flexDirection: 'column',
                        gap: 8,
                      }}
                    >
                      <LatestDishSkeleton total={5} />
                    </View>
                  ) : (
                    <View style={styles.dishList}>
                      {dish?.map((item) => (
                        <DishItem key={item.id} item={item} />
                      ))}
                    </View>
                  )}
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
              >{`${dishBySearchText?.length} RESULT`}</Text>
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

