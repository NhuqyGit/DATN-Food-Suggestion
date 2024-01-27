import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchSreenMain from './SearchSreenMain';
import SearchCam from './SearchCam';
import SearchNormal from './SearchNormal';
const Stack = createNativeStackNavigator();

const Search = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={'SearchScreenMain'}
        component={SearchSreenMain}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={'SearchNormal'}
        component={SearchNormal}
        options={{
          headerShown: false,
          animation: 'fade'
        }}
    
      />

      <Stack.Screen
        name={'SearchCam'}
        component={SearchCam}
        options={{
          headerShown: false,
        }}
      />

      
    </Stack.Navigator>
    
  )
}

export default Search

const styles = StyleSheet.create({
  
  
})