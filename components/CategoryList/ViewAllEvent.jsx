import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native'
import EventViewItemSkeleton from '../../screens/Search/ViewImageScreen/EventViewItemSkeleton'
import { useGetAllEventQuery } from '../../slices/eventSlice'
import EventCard from '../RecommendItem/EventCard'

const ViewAllEvent = ({ route }) => {
  const navigation = useNavigation()
  const eventData = route.params.eventData
  // const [items, setItems] = useState([])
  // const [loading, setLoading] = useState(false)
  const { data: events, isLoading: loading } = useGetAllEventQuery()
  const [page, setPage] = useState(1)
  const limit = 8

  const windowHeight = useWindowDimensions().height

  // const fetchItems = async () => {
  //   setLoading(true)
  //   try {
  //     const token = await AsyncStorageService.getAccessToken()
  //     const response = await fetch(`${HOST}/events`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     if (!response.ok) {
  //       throw new Error('Failed to fetch data')
  //     }
  //     const data = await response.json()
  //     setItems((prevItems) => [...prevItems, ...data])
  //     setPage((prevPage) => prevPage + 1)
  //   } catch (error) {
  //     console.error('Error fetching data:', error)
  //   } finally {
  //     setLoading(false)
  //   }
  // }

  const handleBackPress = () => {
    navigation.goBack()
  }

  const handleEndReached = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }) => {
    const paddingToBottom = windowHeight * 0.5
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    )
  }

  const handleScroll = ({ nativeEvent }) => {
    if (handleEndReached(nativeEvent) && !loading) {
      // fetchItems()
    }
  }

  // useEffect(() => {
  //   fetchItems()
  // }, [])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <MaterialIcons name='arrow-back' size={24} color='black' />
        </TouchableOpacity>
        <Text style={styles.cateTitle}>{eventData?.name}</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollViewContainer}
        // onScroll={handleScroll}
        scrollEventThrottle={400}
      >
        <View style={styles.section}>
          {false ? (
            <EventViewItemSkeleton total={2} />
          ) : (
            <>
              {events.map((item) => (
                <EventCard key={item.id} item={item} />
              ))}
            </>
          )}
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
    paddingHorizontal: 10,
    display: 'flex',
    gap: 20,
    width: '100%',
  },
  activityIndicator: {
    margin: 30,
  },
})

export default ViewAllEvent

