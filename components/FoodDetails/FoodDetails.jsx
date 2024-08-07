import React, { useEffect, useState, useCallback } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { theme } from '../../theme'
import PopupNotification from './components/PopupNotification'
import OverviewTab from '../../components/FoodDetails/components/OverviewTab'
import NoteTab from '../../components/FoodDetails/components/NoteTab'
import ReviewsTab from '../../components/FoodDetails/components/ReviewsTab'
import IngredientsTab from '../../components/FoodDetails/components/IngredientsTab'
import DirectionTab from './components/DirectionTab'
import SaveModal from '../SaveModal/SaveModal'
import {
  useIsDishInCollectionQuery,
  useAddDishToCollectionsMutation,
} from '../../slices/collectionSlice'
import {
  useIsDishInMealPlanQuery,
  useAddDishToMealPlanMutation,
  useDeleteDishFromMealPlanMutation,
  useGetMealplanIdByUserIdQuery,
  useDeleteAllDishFromMealPlanMutation,
} from '../../slices/mealPlanSlice'
import Toast from 'react-native-toast-message'

import { useFocusEffect } from '@react-navigation/native'
import BottomSheet from '../BottomSheet/BottomSheet'
import { useGetReviewsByDishIdQuery } from '../../slices/reviewSlice'

const Tab = createMaterialTopTabNavigator()

function FoodDetailsScreen({ navigation, route }) {
  const { foodDetails } = route.params
  const [userId, setUserId] = useState(null)
  //const [isModalVisible, setModalVisible] = useState(false)
  const [addDishToMealPlan] = useAddDishToMealPlanMutation()
  const [deleteDishFromMealPlan] = useDeleteDishFromMealPlanMutation()
  const [deleteAllDishFromMealPlan] = useDeleteAllDishFromMealPlanMutation()
  const [addDishToCollections] = useAddDishToCollectionsMutation()
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user_id')
        if (storedUserId) {
          setUserId(storedUserId)
        }
      } catch (error) {
        console.error('Failed to fetch userId from AsyncStorage:', error)
      }
    }

    fetchUserId()
  }, [])

  const {
    data: isDishInCollection,
    isLoading: isCollectionLoading,
    isError: isCollectionError,
    refetch: refetchCollection,
  } = useIsDishInCollectionQuery({ userId, dishId: foodDetails.id })

  const {
    data: mealPlanID,
    isLoading: mealLoading,
    isError: mealError,
  } = useGetMealplanIdByUserIdQuery({ userId })

  const mealID = parseInt(mealPlanID?.mealplanId)

  const {
    data: isDishInMealPlan,
    isLoading: isMealPlanLoading,
    isError: isMealPlanError,
    refetch: refetchMealPlan,
  } = useIsDishInMealPlanQuery({ mealPlanId: mealID, dishId: foodDetails.id })

  //(mealPlanID);
  useFocusEffect(
    useCallback(() => {
      refetchCollection()
      refetchMealPlan()
    }, [refetchCollection, refetchMealPlan])
  )

  const handleNavigateBack = () => {
    navigation.goBack()
  }

  const handleToggleModal = () => {
    setModalVisible(!modalVisible)
  }

  const handleAddToMealPlan = async () => {
    try {
      let response

      if (!isDishInMealPlan?.isInMealPlan) {
        response = await addDishToMealPlan({
          mealPlanId: mealID,
          dishId: foodDetails.id,
        })
        if (response) {
          Toast.show({
            type: 'success',
            text1: 'Mealplan Added',
            text2: 'This tasty meal has been added to your meal plan',
            textStyle: { fontSize: 20 },
          })
        }
      } else {
        response = await deleteAllDishFromMealPlan({
          dishId: foodDetails.id,
          mealPlanId: mealID,
        })

        if (response) {
          Toast.show({
            type: 'success',
            text1: 'Mealplan Removed',
            text2: 'This meal has been removed from your meal plan',
            textStyle: { fontSize: 20 },
          })
        }
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Operation Failed',
        text2:
          'An error occurred while updating your meal plan. Please try again.',
        textStyle: { fontSize: 20 },
      })
    } finally {
      refetchMealPlan()
      setModalVisible(false)
    }
  }

  const handleAddToCollection = async () => {
    navigation.navigate('CollectionScreen', { dishId: foodDetails.id })
    refetchCollection()
    setModalVisible(false)
  }
  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const bottomList = [
    {
      icon: 'addfile',
      onPress: () => {
        handleAddToMealPlan()
        setModalVisible(false)
      },
      name: isDishInMealPlan?.isInMealPlan
        ? 'Remove from Meal Plan'
        : 'Add to Meal Plan',
    },
    {
      icon: 'addfolder',
      onPress: () => {
        handleAddToCollection()
        setModalVisible(false)
      },
      name: isDishInCollection?.isInCollection
        ? 'Update Collections'
        : 'Add to Collections',
    },
  ]

  const {
    data: reviews,
    error: reviewError,
    isLoading: reviewLoading,
    refetch,
  } = useGetReviewsByDishIdQuery(foodDetails.id)

  return (
    <View style={styles.foodDetailsScreen}>
      <View>
        <Image source={{ uri: foodDetails.imageUrl }} style={styles.image} />
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
          <Text style={styles.title}>{foodDetails?.dishName}</Text>
          <Text style={styles.author}>By {foodDetails?.author}</Text>
        </View>

        {isCollectionLoading ||
        isMealPlanLoading ||
        isCollectionError ||
        isMealPlanError ||
        mealLoading ||
        mealError ? (
          <AntIcon
            name='pluscircle'
            size={40}
            color={theme.colors.secondary}
            style={styles.saveIconContainer}
          />
        ) : (
          <TouchableOpacity
            onPress={handleToggleModal}
            style={styles.saveIconContainer}
          >
            {isDishInCollection?.isInCollection ||
            isDishInMealPlan?.isInMealPlan ? (
              <AntIcon name='minuscircle' size={40} color='gray' />
            ) : (
              <AntIcon
                name='pluscircle'
                size={40}
                color={theme.colors.secondary}
              />
            )}
          </TouchableOpacity>
        )}
      </View>

      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: theme.colors.secondary,
            tabBarInactiveTintColor: 'gray',
            tabBarIndicatorStyle: {
              backgroundColor: theme.colors.secondary,
            },
            //lazy: true,
            tabBarLabelStyle: {
              fontSize: 17,
              fontWeight: 'bold',
              //width: 0,
              textTransform: 'none',
            },
            tabBarItemStyle: { width: 130 },
            tabBarScrollEnabled: true,
          }}
        >
          <Tab.Screen name='Overview'>
            {() => (
              <OverviewTab
                reviews={reviewLoading ? [] : reviews}
                foodDetails={foodDetails}
                navigation={navigation}
              />
            )}
          </Tab.Screen>
          <Tab.Screen
            name='Ingredients'
            // options={{
            //   tabBarLabel: ({ focused }) => {
            //     return (
            //       <View>
            //         <Text style={{ color: focused ? "red" : "gray" }}>
            //           Ingredients
            //         </Text>
            //         <Text>2 Items</Text>
            //       </View>
            //     );
            //   },
            // }}
          >
            {() => (
              <IngredientsTab ingredients={foodDetails?.dishToIngredients} />
            )}
          </Tab.Screen>
          <Tab.Screen name='Directions'>
            {() => (
              <DirectionTab
                directions={foodDetails?.directions}
                youtubeId={foodDetails?.youtubeId}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name='My Notes'>
            {() => <NoteTab navigation={navigation} dishId={foodDetails.id} />}
          </Tab.Screen>
          <Tab.Screen name='Reviews'>
            {() => (
              <ReviewsTab
                navigation={navigation}
                dishId={foodDetails.id}
                dishInfo={foodDetails?.dishName}
                reviews={reviews}
                reviewError={reviewError}
                reviewLoading={reviewLoading}
                refetch={refetch}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </View>

      <BottomSheet closePopUp={handleCloseModal} modalVisible={modalVisible}>
        <View className='h-[150px] flex flex-col gap-4 mx-2 my-2'>
          {bottomList?.map((item, index) => (
            <View
              key={index}
              className='mb-2 pb-3 border-b border-b-[#F3F3F3] border-solid'
            >
              <TouchableOpacity
                className='flex flex-row items-center gap-2'
                onPress={item.onPress}
              >
                <AntIcon
                  name={item.icon}
                  size={20}
                  color={theme.colors.secondary}
                />
                <Text className='text-base font-semibold'>{item.name}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  foodDetailsScreen: {
    flex: 1,
    backgroundColor: 'white',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 40,
    left: 10,
    zIndex: 10,
  },
  image: {
    width: '100%',
    height: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
  },
  headerTextContainer: {
    flex: 7,
    paddingRight: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 5,
  },
  author: {
    fontSize: 16,
    paddingHorizontal: 5,
  },
  saveIconContainer: {
    flex: 1,
  },
  containerSkeleton: {
    flex: 1,
    padding: 5,
    backgroundColor: 'gray',
  },
})

export default FoodDetailsScreen

