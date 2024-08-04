import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import PersonalReceipeList from './PersonalRecipeList'
import Profile from './Profile'
import ReceipeListScreen from './ReceipeListScreen'
import Setting from './Setting/Setting'
import NewCollection from './NewCollection'
import FoodDetailsScreen from '../components/FoodDetails/FoodDetails'
import ReviewScreen from '../components/FoodDetails/ReviewScreen'
import AddNewNote from '../components/FoodDetails/AddNewNote'
import AddNewCollection from '../components/FoodDetails/AddNewCollection'
import CollectionScreen from '../components/FoodDetails/CollectionScreen'

const Stack = createNativeStackNavigator()
function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='ProfileScreen' component={Profile} />
      <Stack.Screen name='List' component={ReceipeListScreen} />
      <Stack.Screen name='PersonalList' component={PersonalReceipeList} />
      <Stack.Screen name='Settings' component={Setting} />
      <Stack.Screen name='FoodDetail' component={FoodDetailsScreen} />
      <Stack.Screen name='ReviewScreen' component={ReviewScreen} />
      <Stack.Screen name='AddNewNote' component={AddNewNote} />
      <Stack.Screen name='CollectionScreen' component={CollectionScreen} />
      <Stack.Screen name='AddNewCollection' component={AddNewCollection} />
      <Stack.Screen
        options={{
          animation: 'slide_from_bottom',
        }}
        name='NewCollection'
        component={NewCollection}
      />
    </Stack.Navigator>
  )
}

export default ProfileStack

