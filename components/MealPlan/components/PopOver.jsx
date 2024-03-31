import React, { useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Popover, { Rect } from 'react-native-popover-view'
import Feather from 'react-native-vector-icons/Feather'
import Material from 'react-native-vector-icons/MaterialCommunityIcons'

function PopOver() {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <View className='flex flex-col items-center justify-center'>
      <TouchableOpacity
        onPress={() => {
          setIsVisible(true)
        }}
      >
        <View className='p-[6px] flex items-center justify-center bg-[#ECE9E9] rounded-full'>
          <Feather  name='more-horizontal' size={24} />
        </View>
      </TouchableOpacity>

      <Popover
        isVisible={isVisible}
        onRequestClose={() => setIsVisible(false)}
        from={new Rect(360, 190, 20, 52)}
      >
        <View className=' w-64 h-28 p-4 bg-white rounded-tl-2xl rounded-bl-2xl'>
          <View className='flex flex-row justify-between mt-2'>
            <Text className='text-red-600 text-lg font-semibold'>
              Delete All
            </Text>
            <Feather name='trash-2' size={26} color='red' />
          </View>
          <View className='flex flex-row justify-between mt-3'>
            <Text className='text-lg font-semibold'>Sort by cooking time</Text>
            <Material name='sort-clock-descending-outline' size={26} />
          </View>
        </View>
      </Popover>
    </View>
  )
}

export default PopOver
