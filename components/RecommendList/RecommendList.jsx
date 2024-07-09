import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { HOST } from '../../config'
import { theme } from '../../theme'
import { AsyncStorageService } from '../../utils/AsynStorage'
import RecommendItem from '../RecommendItem/RecommendItem'
import SmallRecommendItem from '../RecommendItem/SmallRecommendItem'
import RecommendLargeSkeleton from '../../screens/Search/ViewImageScreen/RecommendLargeSkeleton'
import RecommendSmallSkeleton from '../../screens/Search/ViewImageScreen/RecommendSmallSkeleton'
import { useNavigation } from '@react-navigation/native'

function RecommendList() {
  const [recommendDishes, setRecommendDishes] = useState(null)
  const [healthyDishes, setHealthyDishes] = useState(null)
  const [quicklyDishes, setQuicklyDishes] = useState(null)

  const COUNT_DIET = 2
  const COUNT_QUICK = 3
  const [loading, setLoading] = useState(true)
  const [loadingHealthy, setLoadingHealthy] = useState(true)
  const [loadingQuickly, setLoadingQuickly] = useState(true)
  const navigation = useNavigation()

  useEffect(() => {
    const getRecommendDishes = async () => {
      setLoading(true)
      try {
        const token = await AsyncStorageService.getAccessToken()
        const response = await fetch(`${HOST}/dish/recommend2?page=1&limit=8`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const json = await response.json()
        setRecommendDishes(json)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    const getHealthyDishes = async () => {
      setLoadingHealthy(true)
      try {
        const token = await AsyncStorageService.getAccessToken()
        const response = await fetch(
          `${HOST}/dish/healthy?dietCount=${COUNT_DIET}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const json = await response.json()
        setHealthyDishes(json)
      } catch (error) {
        console.error(error)
      } finally {
        setLoadingHealthy(false)
      }
    }

    const getQuicklyDishes = async () => {
      setLoadingQuickly(true)
      try {
        const token = await AsyncStorageService.getAccessToken()
        const response = await fetch(
          `${HOST}/dish/quickly?ingredientCount=${COUNT_QUICK}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const json = await response.json()
        setQuicklyDishes(json)
      } catch (error) {
        console.error(error)
      } finally {
        setLoadingQuickly(false)
      }
    }

    getQuicklyDishes()
    getHealthyDishes()
    getRecommendDishes()
  }, [])

  const handleClickViewAll = (item) => {
    navigation.navigate('ViewAllRecommend', { cuisine: item })
  }

  const handleClickViewAll2 = (item) => {
    navigation.navigate('ExploreCuisine', { cuisine: item })
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.horizontalPadding}> */}
      <View style={styles.header}>
        <Text style={styles.title}>Your recommendations</Text>
        <TouchableOpacity
          onPress={() => {
            handleClickViewAll({
              name: 'Your recommendations',
              dishes: recommendDishes,
            })
          }}
        >
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.listItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {loading ? (
          <RecommendLargeSkeleton total={5} />
        ) : (
          <>
            {recommendDishes &&
              recommendDishes.length > 0 &&
              recommendDishes?.map((item) => (
                <RecommendItem key={item.id} item={item} />
              ))}
          </>
        )}
      </ScrollView>

      <View style={[styles.healthyList, styles.horizontalPadding]}>
        <View style={styles.header}>
          <Text style={styles.title}>Healthy recipes</Text>
          <TouchableOpacity
            onPress={() => {
              handleClickViewAll2({
                name: 'Healthy recipes',
                dishes: healthyDishes,
              })
            }}
          >
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.listItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {loadingHealthy ? (
            <RecommendSmallSkeleton total={5} />
          ) : (
            <>
              {healthyDishes &&
                healthyDishes.length > 0 &&
                healthyDishes?.map((item) => (
                  <SmallRecommendItem key={item.id} item={item} />
                ))}
            </>
          )}
        </ScrollView>

        <View style={styles.header}>
          <Text style={styles.title}>Quick recipes</Text>
          <TouchableOpacity
            onPress={() => {
              handleClickViewAll2({
                name: 'Quick recipes',
                dishes: quicklyDishes,
              })
            }}
          >
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.listItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {loadingQuickly ? (
            <RecommendSmallSkeleton total={5} />
          ) : (
            <>
              {quicklyDishes &&
                quicklyDishes.length > 0 &&
                quicklyDishes?.map((item) => (
                  <SmallRecommendItem key={item.id} item={item} />
                ))}
            </>
          )}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 16,
    flexDirection: 'column',
  },

  header: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: '600',
  },

  viewAll: {
    fontSize: 16,
    color: theme.colors.secondary,
    fontWeight: '500',
  },

  listItem: {
    paddingLeft: 20,
    paddingRight: 10,
  },

  healthyList: {
    backgroundColor: '#FEFFD3',
    paddingBottom: 32,
    marginTop: 30,
  },
})

export default RecommendList


