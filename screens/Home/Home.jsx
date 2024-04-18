import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import HomeScreen from './HomeScreen'
import FoodDetailsScreen from '../../components/FoodDetails/FoodDetails'
import CollectionScreen from '../../components/FoodDetails/CollectionScreen'
import ExploreCategories from '../../components/CategoryList/ExploreCategories'
import AddNewCollection from '../../components/FoodDetails/AddNewCollection'
const Stack = createNativeStackNavigator()
function Home() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen name='ExploreCategories' component={ExploreCategories} />
      <Stack.Screen name='FoodDetail' component={FoodDetailsScreen} />
      <Stack.Screen name="CollectionScreen" component={CollectionScreen} />
      <Stack.Screen name="AddNewCollection" component={AddNewCollection} />
    </Stack.Navigator>
  )
}

export default Home
