import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import SearchScreen from './SearchScreen/SearchScreen'
import CameraScreen from './CameraScreen/CameraScreen'
import ViewImageScreen from './ViewImageScreen/ViewImageScreen'
import FoodDetailsScreen from '../../components/FoodDetails/FoodDetails'

const Stack = createNativeStackNavigator()

const Search = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='SearchScreen' component={SearchScreen} />
      {/* <Stack.Screen name='CameraScreen' component={CameraScreen} /> */}
      <Stack.Screen name='ViewImageScreen' component={ViewImageScreen} />
      <Stack.Screen name='FoodDetail' component={FoodDetailsScreen} />
    </Stack.Navigator>
  )
}

export default Search

