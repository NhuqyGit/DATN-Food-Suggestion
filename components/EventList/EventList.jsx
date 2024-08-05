import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import EventItemSkeleton from '../../screens/Search/ViewImageScreen/EventItemSkeleton'
import { useGetAllEventQuery } from '../../slices/eventSlice'
import { theme } from '../../theme'
import EventItem from '../RecommendItem/EventItem'

function EventList() {
  const navigation = useNavigation()
  const { data: events, isLoading: loading } = useGetAllEventQuery()

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

