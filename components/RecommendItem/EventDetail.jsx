import React from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { theme } from '../../theme'
import RecommendItem from './RecommendItem'

const EventDetail = ({ navigation, route }) => {
  const { eventDetails } = route.params

  const handleNavigateBack = () => {
    navigation.goBack()
  }

  const onPressJoinEvent = () => {
    navigation.push('JoinEvent', { eventId: eventDetails?.id })
  }

  return (
    <ScrollView
      style={styles.foodDetailsScreen}
      showsVerticalScrollIndicator={false}
    >
      <View>
        <Image
          source={{ uri: eventDetails.imageUrl ?? '' }}
          style={styles.image}
        />
        <TouchableOpacity
          onPress={handleNavigateBack}
          style={styles.backButtonContainer}
        >
          <Ionicons
            name='chevron-back-circle'
            size={32}
            color={theme.colors.grayBackground}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <View style={styles.titleWrapper}>
            <Text style={styles.title}>{eventDetails?.eventName}</Text>
            <View style={styles.footer}>
              <TouchableOpacity
                onPress={onPressJoinEvent}
                style={[styles.button, styles.buttonOpen]}
              >
                <Text style={styles.buttonText}>Join Now</Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.author}>{eventDetails?.reward}</Text>
          <Text
            style={styles.author}
          >{`${eventDetails?.startTime} ~ ${eventDetails?.endTime}`}</Text>
        </View>
      </View>

      <View style={styles.wrapper}>
        <Text style={styles.subTitle}>Newest Submissions</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.listItem}
        >
          {eventDetails?.dishes?.map((item) => {
            return <RecommendItem key={item.id} item={item} />
          })}
        </ScrollView>
      </View>
    </ScrollView>
  )
}

export default EventDetail

const styles = StyleSheet.create({
  foodDetailsScreen: {
    flex: 1,
    backgroundColor: 'white',
  },
  wrapper: {
    flex: 1,
    padding: 10,
    paddingBottom: 20,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  backButtonContainer: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 10,
  },
  image: {
    width: '100%',
    height: 200,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  header: {
    margin: 10,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.secondary,
    marginBottom: 5,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: theme.colors.secondary,
  },
  author: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.grayText,
    marginBottom: 5,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonOpen: {
    backgroundColor: theme.colors.secondary,
  },
  buttonText: {
    fontWeight: 'bold',
    color: '#FFF',
  },
  footer: {
    alignItems: 'flex-end',
  },
})

