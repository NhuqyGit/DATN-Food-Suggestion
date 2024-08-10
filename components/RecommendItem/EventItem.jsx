import { useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import React from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

function EventItem({ item, refetch }) {
  const navigation = useNavigation()

  const endDate = dayjs(item.endTime)
  const now = dayjs()

  const isOngoing = endDate.isAfter(now)

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push('EventDetail', {
          eventId: item.id,
        })
      }}
      activeOpacity={1}
      style={styles.container}
    >
      <Image style={styles.image} source={{ uri: item?.imageUrl }} />
      <View style={styles.overlay}>
        <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>
          {item?.eventName}
        </Text>
        <View style={styles.authorContainer}>
          <Text style={styles.author} numberOfLines={1} ellipsizeMode='tail'>
            {item.reward}
          </Text>
          <Text style={styles.status}>{isOngoing ? 'Ongoing' : 'Ended'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 8,
    marginRight: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 16,
    bottom: 0,
    justifyContent: 'flex-end',
    padding: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
    flexShrink: 1,
  },
  rating: {
    color: 'white',
    fontSize: 14,
  },
  authorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  author: {
    color: 'white',
    fontWeight: '600',
    marginRight: 4,
    textTransform: 'uppercase',
    flexShrink: 1,
  },

  status: {
    color: 'white',
    fontWeight: '600',
    marginRight: 4,
  },
  iconContainer: {
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height
      ) / 2,
    width: Dimensions.get('window').width * 0.085,
    height: Dimensions.get('window').width * 0.085,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    color: 'white',
    fontSize: 16,
  },
})

export default EventItem

