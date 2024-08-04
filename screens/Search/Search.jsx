import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import SearchScreen from './SearchScreen/SearchScreen'
import CameraScreen from './CameraScreen/CameraScreen'
import ViewImageScreen from './ViewImageScreen/ViewImageScreen'
import FoodDetailsScreen from '../../components/FoodDetails/FoodDetails'
import ReviewScreen from '../../components/FoodDetails/ReviewScreen'
import AddNewNote from '../../components/FoodDetails/AddNewNote'
import AddNewCollection from '../../components/FoodDetails/AddNewCollection'
import CollectionScreen from '../../components/FoodDetails/CollectionScreen'

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
      <Stack.Screen name='ReviewScreen' component={ReviewScreen} />
      <Stack.Screen name='AddNewNote' component={AddNewNote} />
      <Stack.Screen name='AddNewCollection' component={AddNewCollection} />
      <Stack.Screen name='CollectionScreen' component={CollectionScreen} />
    </Stack.Navigator>
  )
}

export default Search

