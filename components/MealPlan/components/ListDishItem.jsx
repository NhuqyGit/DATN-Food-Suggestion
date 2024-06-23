import React, { useState, useEffect } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntIcon from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import BottomSheet from '../../BottomSheet/BottomSheet'
import { useNavigation } from '@react-navigation/native'
import { theme } from '../../../theme/index'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AsyncStorageService } from '../../../utils/AsynStorage'
import { HOST } from '../../../config'
import moment from 'moment'
import Toast from 'react-native-toast-message'

export default function ListDishItem({
  id,
  isSelected,
  day,
  setRandom,
  name,
  time,
  imgUri,
  isAdd = false,
  onSelectItem,
  formattedPlanDate,
}) {
  const navigation = useNavigation()
  const [isPlus, setisPlus] = useState(isSelected)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    setisPlus(isSelected)
  }, [isSelected])

  const handleCloseModal = () => {
    setModalVisible(false)
  }

  const handlePressPlus = () => {
    setisPlus(!isPlus)
    onSelectItem(id)
  }
  const dateFormat =
    formattedPlanDate !== undefined
      ? moment.utc(formattedPlanDate, 'YYYY MMMM Do').toDate()
      : undefined

  const [mealPlanIdInt, setMealPlanIdInt] = useState()

  const [user_id, setUserId] = useState()
  const [token, setToken] = useState()
  const dishIdInt = parseInt(id, 10)

  useEffect(() => {
    const fetchData = async () => {
      const user_id = await AsyncStorage.getItem('user_id')
      setUserId(user_id)
      const token = await AsyncStorageService.getAccessToken()
      setToken(token)
      const response = await fetch(
        `https://datn-admin-be.onrender.com/mealplan/user/${user_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const mealplanJson = await response.json()
      const mealplanId = mealplanJson?.mealplanId
      const mealPlanIdInt = parseInt(mealplanId, 10)
      setMealPlanIdInt(mealPlanIdInt)
    }
    fetchData()
  }, [])
  return (
    <View style={styles.shadowView} className='mt-2'>
      <TouchableOpacity
        onPress={async () => {
          const response = await fetch(`${HOST}/dish/${id}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          })
          const item = await response.json()

          navigation.navigate('FoodDetail', { foodDetails: item })
        }}
        className='flex flex-row h-32 bg-slate-50 rounded-md'
      >
        <Image source={imgUri} className='w-32 h-32 rounded-md' />
        <View
          className={`flex flex-col rounded-md px-3 justify-between py-3 ${isPlus && 'bg-gray-200 rounded-r-lg'}`}
        >
          <Text className='text-base font-semibold flex flex-wrap max-w-[200px]'>
            {name}
          </Text>
          <View className='flex flex-row justify-between items-center w-4/5'>
            <View className='h-9 rounded-full flex flex-row bg-[#454242] px-2 py-1'>
              <Ionicons name='time-outline' size={26} color='white' />
              <Text className='text-white text-base font-medium px-1'>
                {Number(time) < 3600
                  ? `${Math.floor(Number(time) / 60)} mins`
                  : `${Math.floor(Number(time) / 3600)}h ${Math.floor((Number(time) % 3600) / 60)}m`}
              </Text>
            </View>
            {isAdd ? (
              <TouchableOpacity onPress={handlePressPlus}>
                <AntIcon
                  name={isPlus ? 'minuscircle' : 'pluscircle'}
                  size={30}
                  color={!isPlus ? theme.colors.secondary : 'gray'}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View className='p-[6px] flex items-center justify-center bg-[#ECE9E9] rounded-full'>
                  <Feather name='more-horizontal' size={18} />
                </View>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>

      <BottomSheet closePopUp={handleCloseModal} modalVisible={modalVisible}>
        <View className='h-fit flex flex-col gap-4 ml-2 mr-6 my-2'>
          <View className='flex flex-row items-center mt-2 mb-2 pb-3 border-b border-b-[#F3F3F3] border-solid'>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false)
                navigation.navigate('EditSchedule', {
                  id,
                  imgUri,
                  name: name,
                  day,
                })
              }}
            >
              <View className='flex flex-row items-center'>
                <Ionicons
                  name='calendar-sharp'
                  size={24}
                  color={theme.colors.secondary}
                />
                <Text className='ml-4 text-base font-semibold'>
                  Edit schedule
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View className=' '>
            <TouchableOpacity
              className='flex flex-row items-center mt-2 mb-2 pb-3 border-b border-b-[#F3F3F3] border-solid'
              onPress={async () => {
                const res = await fetch(
                  `https://datn-admin-be.onrender.com/mealplan`,
                  {
                    method: 'DELETE',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                      mealPlanId: mealPlanIdInt,
                      dishId: dishIdInt,
                      planDate: dateFormat,
                    }),
                  }
                )
                setRandom(Math.random(0, 10) + 1)

                handleCloseModal()
              }}
            >
              <Feather name='trash-2' size={24} color='red' />
              <Text className='ml-4 text-base font-semibold'>
                Remove from Meal Plan
              </Text>
            </TouchableOpacity>
          </View>
          <View className='flex flex-row items-center mt-2 mb-2 pb-3 border-b border-b-[#F3F3F3] border-solid'>
            <TouchableOpacity
              onPress={async () => {
                const momentObject = moment(dateFormat)
                const newDate = momentObject.add(7, 'days').toDate()

                const formattedDate = momentObject.format('YYYY-MM-DD')

                const dishRes = await fetch(
                  `https://datn-admin-be.onrender.com/mealplan/dishes/date?planDate=${formattedDate}&mealPlanId=${mealPlanIdInt}`,
                  {
                    method: 'GET',
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  }
                )

                const dishIdDish = await dishRes.json()

                const dishIdInt = parseInt(id, 10)

                if (!dishIdDish.includes(dishIdInt)) {
                  const response = await fetch(
                    `https://datn-admin-be.onrender.com/mealplan`,
                    {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                      },
                      body: JSON.stringify({
                        mealPlanId: mealPlanIdInt,
                        dishId: dishIdInt,
                        planDate: newDate,
                      }),
                    }
                  )

                  Toast.show({
                    type: 'success',
                    text1: 'Recipe Added',
                    text2: 'Recipe was added to next week',
                    textStyle: { fontSize: 20 },
                  })
                } else {
                  Toast.show({
                    type: 'error',
                    text1: 'Exist Recipe',
                    text2: 'Recipe was existed next week',
                    textStyle: { fontSize: 20 },
                  })
                }

                setModalVisible(false)
              }}
            >
              <View className='flex flex-row items-center'>
                <Feather
                  name='repeat'
                  size={24}
                  color={theme.colors.secondary}
                />
                <Text className='ml-4 text-base font-semibold'>
                  Repeat next week
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </View>
  )
}

const styles = StyleSheet.create({
  shadowView: {
    shadowColor: 'black',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
    backgroundColor: '#ffffff',
  },
})

