import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ReceipeListScreen from './ReceipeListScreen';
import Profile from './Profile';
import Settings from './Settings';
import PersonalReceipeList from './PersonalRecipeList';


const ProfStack = createNativeStackNavigator();
const ProfileStack = () => {
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