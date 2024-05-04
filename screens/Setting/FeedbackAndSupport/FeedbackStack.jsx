import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { StyleSheet } from 'react-native'
import FeedbackAndSupport from './FeedbackAndSupport'
import FeedbackScreen from './FeedbackScreen'
import RateOurAppScreen from './RateOurAppScreen'
import LoveSuggestionFoodScreen from './LoveSuggestionFoodScreen'
import FAQStack from './FAQ/FAQStack'

const Stack = createNativeStackNavigator()

const FeedbackStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='FeedbackAndSupport' component={FeedbackAndSupport} />
      <Stack.Screen name='Feedback' component={FeedbackScreen} />
      <Stack.Screen name='RateOurApp' component={RateOurAppScreen} />
      <Stack.Screen
        name='LoveSuggestionFood'
        component={LoveSuggestionFoodScreen}
      />
      <Stack.Screen name='FAQStack' component={FAQStack} />
    </Stack.Navigator>
  )
}

export default FeedbackStack

const styles = StyleSheet.create({})

