import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import TermsAndPolicies from './TermsAndPolicies'
import ReportProblems from './ReportProblems'
import About from './About'
import MyAccount from './MyAccount'
import GeneralSetting from './GeneralSetting'
import DietaryPreferences from './DietaryPreferences/DietaryPreferences'
import FeedbackStack from './FeedbackAndSupport/FeedbackStack'
import ChangePassword from './ChangePassword'

const Stack = createNativeStackNavigator()

const Setting = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='GeneralSetting' component={GeneralSetting} />
      <Stack.Screen name='MyAccount' component={MyAccount} />
      <Stack.Screen name='ChangePassword' component={ChangePassword} />
      <Stack.Screen name='DietaryPreferences' component={DietaryPreferences} />
      <Stack.Screen name='TermsAndPolicies' component={TermsAndPolicies} />
      <Stack.Screen name='FeedbackStack' component={FeedbackStack} />
      <Stack.Screen name='ReportProblems' component={ReportProblems} />
      <Stack.Screen name='About' component={About} />
    </Stack.Navigator>
  )
}

export default Setting

const styles = StyleSheet.create({})

