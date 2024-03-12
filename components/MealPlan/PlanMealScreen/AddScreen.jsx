import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import data from '../../../constants/Unschedule.js'
import ListDishItem from '../components/ListDishItem.jsx'
import check from '../../../assets/svgs/check.js'

function AddScreen() {
  const [selectedCards, setSelectedCards] = useState([])
  const toggleCardSelection = (id) => {
    const index = selectedCards.indexOf(id)
    if (index !== -1) {
      const newSelectedCards = [...selectedCards]
      newSelectedCards.splice(index, 1)
      setSelectedCards(newSelectedCards)
    } else {
      setSelectedCards([...selectedCards, id])
    }
  }
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => toggleCardSelection(item.id)}>
      <View>
        <ListDishItem
          name={item.name}
          time={item.time}
          imgUri={item.imgUri}
          isSelected={selectedCards.includes(item.id)}
        />
      </View>
    </TouchableOpacity>
  )
  return (
    <View className='bg-white h-full  '>
      <Text className='text-2xl mt-12 mb-6 ml-6 font-semibold'>
        Meal Planner
      </Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        className=' rounded-full bg-[#40AD53] w-2/3 h-12 mx-auto my-8 justify-center items-center '
        onPress={() => {}}
      >
        <Text className='text-white text-xl font-bold'>Add to your plan</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddScreen
