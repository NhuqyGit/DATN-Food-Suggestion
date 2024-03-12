import { View, Text, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Feather from 'react-native-vector-icons/Feather'
import AntIcon from 'react-native-vector-icons/AntDesign.js'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAweSomeIcon from 'react-native-vector-icons/FontAwesome'

function Instruction() {
  const navigation = useNavigation()
  return (
    <View className='flex items-center pr-[10px]  '>
      <View className='pt-[80px]'>
        <Text className='text-[24px] font-bold leading-normal text-[#000000]'>
          Meal Planner Instruction
        </Text>
      </View>
      <View className='flex gap-8 w-full pr-[19px] mt-[40px]'>
        <View className='flex flex-row items-center justify-start w-full   '>
          <View className='flex flex-row gap-6 w-1/2'>
            <Text className='text-[10px] font-semibold leading-normal text-[#40AD53] '>
              Today
            </Text>
            <Text className='text-[10px] font-semibold leading-normal '>
              This week
            </Text>
            <Text className='text-[10px] font-semibold leading-normal '>
              Unschedule
            </Text>
          </View>
          <View className='ml-12'>
            <Text className='text-[15px] text-black font-semibold leading-[21px]'>
              View dishes by date
            </Text>
          </View>
        </View>
        <View className='flex flex-row justify-start items-center w-full '>
          <View className=' h-9 flex flex-row justify-between items-center px-1 bg-[#ECE9E9] rounded-full w-1/2'>
            <View>
              <Feather name='chevron-left' size={20} />
            </View>

            <Text className='text-[14px]'>September 17</Text>
            <View>
              <Feather name='chevron-right' size={20} />
            </View>
          </View>
          <View className='ml-6'>
            <Text className='text-[15px] text-black font-semibold leading-[21px]'>
              Date
            </Text>
          </View>
        </View>

        <View className='flex flex-row justify-start items-center w-full '>
          <View className='flex flex-row w-1/2'>
            <AntIcon name='pluscircle' size={24} color='#40AD53' />
            <Text className='ml-4'>Sunday</Text>
          </View>
          <View className='ml-6'>
            <Text className='text-[15px] text-black font-semibold leading-[21px]'>
              Add dishes to this day
            </Text>
          </View>
        </View>
        <View className='flex flex-row justify-start items-center w-full '>
          <View className='w-1/2'>
            <View className='w-3/5 rounded-full flex flex-row bg-[#454242] px-2 py-1'>
              <Ionicons name='time-outline' size={20} color='white' />
              <Text className='text-white  font-medium px-1'>25 mins</Text>
            </View>
          </View>
          <View className='ml-6'>
            <Text className='text-[15px] text-black font-semibold leading-[21px]'>
              Dish cooking time
            </Text>
          </View>
        </View>
      </View>
      <View className='mt-[80px] '>
        <View className='w-[235px] rounded-[24px] bg-[#FF6321] flex items-center justify-center py-2 '>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MainMealPlan')
            }}
          >
            <Text className='text-[#FFFFFF] font-bold text-[15px] leading-normal'>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Instruction
