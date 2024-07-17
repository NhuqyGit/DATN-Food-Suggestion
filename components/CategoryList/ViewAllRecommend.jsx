import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useState, useEffect } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  useWindowDimensions,
} from 'react-native'
import RecipeCard from './components/RecipeCard'
import { AsyncStorageService } from '../../utils/AsynStorage'
import { HOST } from '../../config'
import LatestDishSkeleton from '../../screens/Search/ViewImageScreen/LatestDishSkeleton'
const CustomLoadingIndicator = () => (
    <View style={styles.customLoading}>
      <MaterialIcons name="hourglass-empty" size={36} color="#4CAF50" />
      <Text style={styles.loadingText}>Loading...</Text>
    </View>
  )

const ViewAllRecommend = ({ route }) => {
  const navigation = useNavigation()
  const cuisine = route.params.cuisine
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const limit = 8

  const windowHeight = useWindowDimensions().height

  useEffect(() => {
    fetchItems()
  }, [])

  const fetchItems = async () => {
    setLoading(true)
    try {
      const token = await AsyncStorageService.getAccessToken()
      const response = await fetch(`${HOST}/dish/recommend2?page=${page}&limit=${limit}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error('Failed to fetch data')
      }
      const data = await response.json()
      setItems((prevItems) => [...prevItems, ...data])
      setPage((prevPage) => prevPage + 1)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleBackPress = () => {
    navigation.goBack()
  }

  const handleEndReached = ({ layoutMeasurement, contentOffset, contentSize }) => {
    const paddingToBottom = windowHeight * 0.5
    return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom
  }

  const handleScroll = ({ nativeEvent }) => {
    if (handleEndReached(nativeEvent) && !loading) {
      fetchItems()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <MaterialIcons name='arrow-back' size={24} color='black' />
        </TouchableOpacity>
        <Text style={styles.cateTitle}>{cuisine?.name}</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
        onScroll={handleScroll}
        scrollEventThrottle={400}
      >
        <View style={styles.section}>
          {items.map((item, index) => (
            <RecipeCard key={`recommend-${item.id}-${index}`} item={item} navigateLocation="FoodDetail" />
          ))}
          {/* {loading && <ActivityIndicator size="large" color="#0000ff" style={styles.activityIndicator} />} */}
          {loading && <LatestDishSkeleton total={1} />}
        </View>
      </ScrollView>
    </View>
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
  activityIndicator: {
    margin: 30,
  },
})

export default ViewAllRecommend
