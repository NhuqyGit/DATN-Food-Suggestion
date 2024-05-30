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

function RecommendList() {
  const [dish, setDish] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
  }, [])

  return (
    <View style={styles.container}>
      {/* <View style={styles.horizontalPadding}> */}
      <View style={styles.header}>
        <Text style={styles.title}>Yours recommendations</Text>
        <TouchableOpacity>
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
            {dish?.map((item) => (
              <RecommendItem key={item.id} item={item} />
            ))}
          </>
        )}
      </ScrollView>

      <View style={[styles.healthyList, styles.horizontalPadding]}>
        <View style={styles.header}>
          <Text style={styles.title}>Healthy recipes</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.listItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {loading ? (
            <RecommendSmallSkeleton total={5} />
          ) : (
            <>
              {dish?.map((item) => (
                <SmallRecommendItem key={item.id} item={item} />
              ))}
            </>
          )}
        </ScrollView>

        <View style={styles.header}>
          <Text style={styles.title}>Quick recipes</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.listItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {loading ? (
            <RecommendSmallSkeleton total={5} />
          ) : (
            <>
              {dish?.map((item) => (
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
  },

  healthyList: {
    backgroundColor: '#FEFFD3',
    paddingBottom: 32,
    marginTop: 30,
  },
})

export default RecommendList

