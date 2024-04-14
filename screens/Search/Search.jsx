import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import SearchScreen from './SearchScreen/SearchScreen'
import CameraScreen from './CameraScreen/CameraScreen'
import ViewImageScreen from './ViewImageScreen/ViewImageScreen'

const Stack = createNativeStackNavigator()

const Search = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='SearchScreen' component={SearchScreen} />
      <Stack.Screen name='CameraScreen' component={CameraScreen} />
      <Stack.Screen name='ViewImageScreen' component={ViewImageScreen} />
    </Stack.Navigator>
  )
}

export default Search

