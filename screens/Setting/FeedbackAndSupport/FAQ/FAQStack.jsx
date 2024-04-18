import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import FAQScreen from './FAQScreen'
import FAQTopic from './FAQTopic'
import FAQDetails from './FAQDetails'

const Stack = createNativeStackNavigator()

const FAQStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='FAQ' component={FAQScreen} />
      <Stack.Screen name='FAQTopic' component={FAQTopic} />
      <Stack.Screen name='FAQDetails' component={FAQDetails} />
    </Stack.Navigator>
  )
}

export default FAQStack

const styles = StyleSheet.create({})

