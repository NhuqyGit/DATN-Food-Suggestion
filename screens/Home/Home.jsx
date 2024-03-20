import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import HomeScreen from './HomeScreen'
import FoodDetailsScreen from '../../components/FoodDetails/FoodDetails'


const Stack = createNativeStackNavigator()
function Home() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen name='FoodDetail' component={FoodDetailsScreen} />
    </Stack.Navigator>
  )
}

export default Home
