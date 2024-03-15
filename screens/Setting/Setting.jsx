import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import DietaryPreferences from './DietaryPreferences'
import TermsAndPolicies from './TermsAndPolicies'
import HelpAndSupport from './HelpAndSupport'
import ReportProblems from './ReportProblems'
import About from './About'
import MyAccount from './MyAccount'
import GeneralSetting from './GeneralSetting'

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
      <Stack.Screen name='DietaryPreferences' component={DietaryPreferences} />
      <Stack.Screen name='TermsAndPolicies' component={TermsAndPolicies} />
      <Stack.Screen name='HelpAndSuport' component={HelpAndSupport} />
      <Stack.Screen name='ReportProblems' component={ReportProblems} />
      <Stack.Screen name='About' component={About} />
    </Stack.Navigator>
  )
}

export default Setting

const styles = StyleSheet.create({})