import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import PersonalReceipeList from './PersonalRecipeList'
import Profile from './Profile'
import ReceipeListScreen from './ReceipeListScreen'
import Settings from './Settings'

const ProfStack = createNativeStackNavigator()
function ProfileStack() {
  return (
    <ProfStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <ProfStack.Screen name='ProfileScreen' component={Profile} />
      <ProfStack.Screen name='List' component={ReceipeListScreen} />
      <ProfStack.Screen name='PersonalList' component={PersonalReceipeList} />
      <ProfStack.Screen name='Settings' component={Settings} />
    </ProfStack.Navigator>
  )
}

export default ProfileStack
