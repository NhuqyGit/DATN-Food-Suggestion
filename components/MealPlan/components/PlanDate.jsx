import { View, Text } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'
import PopOver from './PopOver'

export default function PlanDate({ date }) {
  return (
    <View className='w-full flex flex-row '>
      <View className='w-2/3 h-14 flex flex-row justify-between mx-8 px-4 py-[14px] pb-3 bg-[#ECE9E9] rounded-full'>
        <View>
          <Feather name='chevron-left' size={28} />
        </View>

        <Text className='text-lg translate-y-[-1px]'>{date}</Text>
        <View>
          <Feather name='chevron-right' size={28} />
        </View>
      </View>
      <View className='w-14 h-14 flex items-center justify-center bg-[#ECE9E9] rounded-full'>
        <PopOver />
      </View>
    </View>
  )
}
