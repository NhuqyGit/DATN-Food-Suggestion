import React, { useEffect, useState } from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import CloseButton from '../../BackButton/CloseButton'
import Feather from 'react-native-vector-icons/Feather.js'
import PlanDate from '../components/PlanDate'
import moment from 'moment'
import Plus from '../components/Plus'
import { useNavigation, useRoute } from '@react-navigation/native'
import { theme } from '../../../theme/index'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AsyncStorageService } from '../../../utils/AsynStorage'
import SchedulerService from '../../../local-pushNotification.service'

const EditSchedule = () => {
  const route = useRoute()
  const { id, imgUri, name, day, planDate } = route.params

  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]
  const [scheduleDate, setScheduleDate] = useState([])
  const [offsetWeek, setOffsetWeek] = useState(0)
  const startDate = moment().startOf('week').add(offsetWeek, 'weeks')
  const endDate = moment().endOf('week').add(offsetWeek, 'weeks')

  const formattedStartDate = startDate.format('MMM Do')
  const formattedEndDate = endDate.format('MMM Do')
  const date = `${formattedStartDate.toLocaleString()}  -  ${formattedEndDate.toLocaleString()}`
  const navigation = useNavigation()

  const [selectedDays, setSelectedDays] = useState([])

  const toggleDay = (day) => {
    const dayIndex = daysOfWeek.indexOf(day)
    const selectedDate = startDate.clone().add(dayIndex, 'days')
    const selectedDateString = selectedDate.format('YYYY-MM-DD')

    setSelectedDays((prev) => {
      if (prev?.length > 0 && prev.includes(selectedDateString)) {
        return prev.filter((date) => date !== selectedDateString)
      } else {
        return [...prev, selectedDateString]
      }
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      const user_id = await AsyncStorage.getItem('user_id')
      const token = await AsyncStorageService.getAccessToken()
      const res = await fetch(
        `https://datn-admin-be.onrender.com/mealplan/user/${user_id}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const mealplanJson = await res.json()
      const mealplanId = mealplanJson?.mealplanId
      const mealPlanIdInt = parseInt(mealplanId, 10)
      const dishIdInt = parseInt(id, 10)

      const response = await fetch(
        `https://datn-admin-be.onrender.com/mealplan/dateMealplan/${mealPlanIdInt}/dish/${dishIdInt}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const data = await response.json()

      if (data?.length > 0) {
        const formattedData = data.map((date) =>
          moment(date).format('YYYY-MM-DD')
        )

        setScheduleDate(formattedData)

        setSelectedDays(formattedData)
      }
    }
    fetchData()
  }, [])

  const isDoneDisabled = selectedDays.length === 0

  return (
    <View className='px-4 py-4 bg-white h-full'>
      <View className='flex flex-row justify-end mt-4'>
        <CloseButton />
      </View>
      <View>
        <Text className='text-2xl font-semibold'>Schedule recipe</Text>
        <Text className='text-sm text-[#5E5E5E]'>
          Choose which day(s) to schedule this recipe for
        </Text>
      </View>

      <View
        style={styles.shadowView}
        className='flex flex-row mt-2 items-center h-24 bg-slate-50 rounded-md'
      >
        <Image source={imgUri} className='w-32 h-24 rounded-md' />
        <Text className='text-base ml-3 font-semibold'>{name}</Text>
      </View>
      <View className='mt-4'>
        <PlanDate
          date={date}
          hidePop
          setOffsetWeek={setOffsetWeek}
          offsetWeek={offsetWeek}
        />
      </View>
      <ScrollView>
        {daysOfWeek.map((day, index) => {
          const dayIndex = index
          const selectedDate = startDate.clone().add(dayIndex, 'days')
          const selectedDateString = selectedDate.format('YYYY-MM-DD')

          const isScheduled = scheduleDate.includes(selectedDateString)
          const isSelected = selectedDays.includes(selectedDateString)

          return (
            <View key={index}>
              <View className='flex flex-row justify-between py-4'>
                <View className='flex flex-row'>
                  <Plus
                    isAdd={true}
                    onToggle={() => toggleDay(day)}
                    isSelected={isSelected}
                  />
                  <Text className='text-lg pl-6'>{day}</Text>
                </View>
                <View className='bg-[#ECE9E9] rounded-[12px] flex flex-row w-[40px] justify-center p-1 items-center'>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('MainMealPlan')
                    }}
                  >
                    <Feather
                      name={'chevron-right'}
                      size={18}
                      color={theme.colors.secondary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        })}
      </ScrollView>
      <TouchableOpacity
        style={[
          styles.doneButton,
          {
            backgroundColor: isDoneDisabled
              ? '#d3d3d3'
              : theme.colors.secondary,
          },
        ]}
        className='rounded-full w-fit px-10 h-10 mx-auto mt-4 justify-center items-center'
        onPress={async () => {
          if (isDoneDisabled) return
          const user_id = await AsyncStorage.getItem('user_id')
          const token = await AsyncStorageService.getAccessToken()
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
          const dishIdInt = parseInt(id, 10)
          const date = new Date(planDate)

          const planDates = selectedDays.map(
            (day) =>
              new Date(
                moment
                  .utc(day)
                  .toDate()
                  .setHours(date.getHours(), date.getMinutes(), 0)
              )
          )

          const res = await fetch(
            `https://datn-admin-be.onrender.com/mealplan/update-plan-date`,
            {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                mealPlanId: mealPlanIdInt,
                dishId: dishIdInt,
                planDate: planDates,
              }),
            }
          )
          navigation.navigate('MainMealPlan')
          const mpRes = await res.json()

          //result: { deletedMealplanDishes, newMealplanDishes },
          const deletedMealplanDishes = mpRes.result.deletedMealplanDishes
          // type [id1, id2,...]

          const newMealplanDishes = mpRes.result.newMealplanDishes
          // type [{id, planDate}, {}, ...]

          // cancel deleted schedule: id = id
          for (let mpDishId of deletedMealplanDishes) {
            SchedulerService.cancel(String(mpDishId))
          }

          // add new schedule: id = id, name = name, date = planDate
          for (let mpDish of newMealplanDishes) {
            SchedulerService.schedule({
              id: String(mpDish.id),
              title: 'Mealplan reminder',
              body: "Don't forget your " + name,
              date: new Date(mpDish.planDate),
            })
          }
        }}
        disabled={isDoneDisabled}
      >
        <Text className='text-white text-sm font-bold'>Done</Text>
      </TouchableOpacity>
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
  doneButton: {
    borderRadius: 25,
    width: 'fit-content',
    paddingHorizontal: 40,
    height: 40,
    marginTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default EditSchedule

