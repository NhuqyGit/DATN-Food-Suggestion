import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import Feather from 'react-native-vector-icons/Feather.js'
import AntIcon from 'react-native-vector-icons/AntDesign.js'
import moment from 'moment'
import { useNavigation } from '@react-navigation/native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from 'react-native-reanimated'
import data from '../../../../constants/MealPlan.js'
import ListDishItem from '../ListDishItem'
import Plus from '../Plus.jsx'
import PlanDate from '../PlanDate'

function Today() {
  const navigation = useNavigation()
  const date = moment().format('MMMM Do')
  const today = moment()
  const dayOfWeekNumber = today.day()
  const dayInfo = data[dayOfWeekNumber]
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null)

  const translateY = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(translateY.value) }],
    }
  })
  const animateList = () => {
    translateY.value = withTiming(0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    })
  }
  const toggleAccordion = (index) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index)
    animateList()
  }
  useEffect(() => {
    if (openAccordionIndex !== null) {
      translateY.value = 10
      animateList()
    }
  }, [openAccordionIndex])

  return (
    <View className='py-4  h-full bg-white'>
      <PlanDate date={date} />
      <View className='bg-[#ECE9E9] w-full h-[1] mt-4' />
      <ScrollView>
        <View className='flex flex-row justify-between py-3 px-3'>
          <View className='flex flex-row '>
            <Plus navigation={navigation} />

            <Text className='text-lg pt-[8] pl-6'>{dayInfo.title}</Text>
          </View>

          <TouchableOpacity
            onPress={() => toggleAccordion(dayOfWeekNumber)}
            style={{ paddingRight: 10, paddingTop: 10 }}
          >
            <Feather
              name={
                openAccordionIndex === dayOfWeekNumber
                  ? 'chevron-up'
                  : 'chevron-down'
              }
              size={30}
              color='#40AD53'
            />
          </TouchableOpacity>
        </View>
        {openAccordionIndex === dayOfWeekNumber && (
          <Animated.View style={animatedStyle}>
            {dayInfo.assets.map((asset, assetIndex) => (
              <ListDishItem
                key={assetIndex}
                name={asset.name}
                time={asset.time}
                imgUri={asset.imgUri}
              />
            ))}
          </Animated.View>
        )}
      </ScrollView>
    </View>
  )
}

export default Today
