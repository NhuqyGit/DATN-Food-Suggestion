import { Skeleton } from 'moti/skeleton'
import React, { useEffect } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  useGetEventByIdQuery,
  useGetEventRankingsQuery,
  useGetMyRankingByEventIdQuery,
} from '../../slices/eventSlice'
import { theme } from '../../theme'
import EventRanking from './EventRanking'
import RecommendItem from './RecommendItem'
import { Dimensions } from 'react-native'

const { width } = Dimensions.get('window')

const EventDetail = ({ navigation, route }) => {
  const { eventId } = route.params

  const {
    data: eventDetails,
    isLoading,
    isError,
    refetch,
  } = useGetEventByIdQuery(eventId)

  const {
    data: myRanking,
    isLoading: isLoadingRanking,
    isError: isErrorRanking,
    refetch: refetchRanking,
  } = useGetMyRankingByEventIdQuery(eventId)

  const {
    data: eventRankings,
    isLoading: isLoadingEventRankings,
    isError: isErrorEventRankings,
    refetch: refetchEventRankings,
  } = useGetEventRankingsQuery(eventId)

  if (isError || isErrorRanking || isErrorEventRankings) {
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Something went wrong. Please try again.',
      textStyle: { fontSize: 20 },
    })
    navigation.goBack()
  }

  const handleNavigateBack = () => {
    navigation.goBack()
  }

  const refetchData = () => {
    refetch()
    refetchRanking()
    refetchEventRankings()
  }

  const onPressJoinEvent = () => {
    navigation.push('JoinEvent', {
      eventId: eventDetails?.id,
      refetch: refetchData,
    })
  }

  useEffect(() => {
    if (!eventId) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Event ID is missing.',
        textStyle: { fontSize: 20 },
      })
      navigation.goBack()
    }
  }, [eventId])

  const isDisabled = !!myRanking?.filteredCollectionsCount;
  return (
    <ScrollView
      style={styles.foodDetailsScreen}
      showsVerticalScrollIndicator={false}
    >
      <View>
        {isLoading || isLoadingRanking || isLoadingEventRankings ? (
          <>
            <Skeleton
              show
              height={200}
              width={'100%'}
              style={styles.image}
              colorMode='light'
              transition={{
                type: 'timing',
                duration: 4000,
              }}
              backgroundColor='#D4D4D4'
            />
          </>
        ) : (
          <>
            <Image
              source={{ uri: eventDetails?.imageUrl ?? '' }}
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
          </>
        )}
      </View>

      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <View style={styles.titleWrapper}>
            {isLoading || isLoadingRanking || isLoadingEventRankings ? (
              <>
                <Skeleton
                  show
                  height={30}
                  width={100}
                  colorMode='light'
                  transition={{
                    type: 'timing',
                    duration: 4000,
                  }}
                  backgroundColor='#D4D4D4'
                />

                <Skeleton
                  show
                  height={30}
                  width={100}
                  colorMode='light'
                  transition={{
                    type: 'timing',
                    duration: 4000,
                  }}
                  backgroundColor='#D4D4D4'
                />
              </>
            ) : (
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 8,
                }}
              >
                <Text
                  style={[
                    styles.title,
                    {
                      maxWidth: myRanking?.filteredCollectionsCount
                        ? width - 130
                        : width - 110,
                    },
                  ]}
                >
                  {eventDetails?.eventName ?? ''}
                </Text>
                <View style={styles.footer}>
                  <TouchableOpacity
                    onPress={onPressJoinEvent}
                    style={[
                      styles.button,
                      styles.buttonOpen,
                      {
                        width: myRanking?.filteredCollectionsCount ? 130 : 110,
                      },
                    ]}
                    disabled={isDisabled}
                  >
                    <Text style={styles.buttonText}>
                      {myRanking
                        ? `Your Rank: ${myRanking?.filteredCollectionsCount}`
                        : 'Join Now'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          {isLoading || isLoadingRanking || isLoadingEventRankings ? (
            <View
              style={{
                gap: 6,
              }}
            >
              <Skeleton
                show
                height={30}
                width={100}
                colorMode='light'
                transition={{
                  type: 'timing',
                  duration: 4000,
                }}
                backgroundColor='#D4D4D4'
              />

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 16,
                }}
              >
                <Skeleton
                  show
                  height={30}
                  width={100}
                  colorMode='light'
                  transition={{
                    type: 'timing',
                    duration: 4000,
                  }}
                  backgroundColor='#D4D4D4'
                />
                <Text>~</Text>
                <Skeleton
                  show
                  height={30}
                  width={100}
                  colorMode='light'
                  transition={{
                    type: 'timing',
                    duration: 4000,
                  }}
                  backgroundColor='#D4D4D4'
                />
              </View>
            </View>
          ) : (
            <>
              <Text style={styles.author}>
                {`${eventDetails?.reward}` ?? ''}
              </Text>
              <Text
                style={styles.author}
              >{`${eventDetails?.startTime ?? ''} ~ ${eventDetails?.endTime ?? ''}`}</Text>
              <Text>{eventDetails?.description ?? ''}</Text>
            </>
          )}
        </View>
      </View>

      {isLoading || isLoadingRanking || isLoadingEventRankings ? (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 16,
            padding: 16,
          }}
        >
          <Skeleton
            show
            height={100}
            width={100}
            colorMode='light'
            transition={{
              type: 'timing',
              duration: 4000,
            }}
            backgroundColor='#D4D4D4'
          />
          <Skeleton
            show
            height={100}
            width={100}
            colorMode='light'
            transition={{
              type: 'timing',
              duration: 4000,
            }}
            backgroundColor='#D4D4D4'
          />
          <Skeleton
            show
            height={100}
            width={100}
            colorMode='light'
            transition={{
              type: 'timing',
              duration: 4000,
            }}
            backgroundColor='#D4D4D4'
          />
        </View>
      ) : (
        <EventRanking eventRankings={eventRankings ?? []} />
      )}

      <View style={styles.wrapper}>
        <Text style={styles.subTitle}>Newest Submissions</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.listItem}
        >
          {isLoading || isLoadingRanking || isLoadingEventRankings ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 16,
                paddingHorizontal: 0,
              }}
            >
              <Skeleton
                show
                height={400}
                width={300}
                colorMode='light'
                transition={{
                  type: 'timing',
                  duration: 4000,
                }}
                backgroundColor='#D4D4D4'
              />
              <Skeleton
                show
                height={400}
                width={300}
                colorMode='light'
                transition={{
                  type: 'timing',
                  duration: 4000,
                }}
                backgroundColor='#D4D4D4'
              />
            </View>
          ) : (
            <>
              {eventDetails?.dishes.length > 0 ? (
                <>
                  {eventDetails?.dishes?.map((item) => {
                    return <RecommendItem key={item.id} item={item} />
                  })}
                </>
              ) : (
                <Text>No dish submissions yet.</Text>
              )}
            </>
          )}
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
    paddingHorizontal: 10,
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

