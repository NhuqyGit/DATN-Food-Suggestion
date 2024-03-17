import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import PersonalReceipeList from './PersonalRecipeList'
import Profile from './Profile'
import ReceipeListScreen from './ReceipeListScreen'
import Settings from './Settings'

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
      <Stack.Screen name='Settings' component={Settings} />
    </Stack.Navigator>
  )
}

export default ProfileStack
