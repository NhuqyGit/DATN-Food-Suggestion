import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { HOST } from '../../config'
import EventItemSkeleton from '../../screens/Search/ViewImageScreen/EventItemSkeleton'
import { theme } from '../../theme'
import { AsyncStorageService } from '../../utils/AsynStorage'
import EventItem from '../RecommendItem/EventItem'

function EventList() {
  const [events, setEvents] = useState(null)

  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()

  useEffect(() => {
    const getAllEvents = async () => {
      setLoading(true)
      try {
        const token = await AsyncStorageService.getAccessToken()
        const response = await fetch(`${HOST}/events`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const json = await response.json()
        setEvents(json)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    getAllEvents()
  }, [])

  const handleClickViewAll = (item) => {
    navigation.navigate('ViewAllEvent', { eventData: item })
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Highlighted Events</Text>
        <TouchableOpacity
          onPress={() => {
            handleClickViewAll({
              name: 'Highlighted Events',
              events: events,
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
          <EventItemSkeleton total={2} />
        ) : (
          <>
            {events &&
              events.length > 0 &&
              events?.map((item) => <EventItem key={item.id} item={item} />)}
          </>
        )}
      </ScrollView>
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
export default EventList

