import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useNavigation } from '@react-navigation/native'
import { theme } from '../../../theme/index'
import Appetizer from './Appetizer'
import MainDishes from './MainDishes'
import Desserts from './Desserts'

const Tab = createMaterialTopTabNavigator()

const MealChat = () => {
  return (
    <View style={{paddingHorizontal: 6, backgroundColor: 'red'}}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: theme.colors.secondary,
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: {
              fontSize: 13,
              fontWeight: '600',
              textTransform: 'none',
            },
            tabBarStyle: {
              backgroundColor: 'white',
            },
            tabBarIndicatorStyle: {
              backgroundColor: theme.colors.secondary,
              marginHorizontal: 5,
            },
            tabBarItemStyle: {
              justifyContent: 'center',
              alignItems: 'center',
              width: 'auto',
            },
          }}
        >
          <Tab.Screen name='Appetizer' component={Appetizer} />
          <Tab.Screen name='MainDishes' component={MainDishes} />
          <Tab.Screen name='Desserts' component={Desserts} />
        </Tab.Navigator>
      </View>
  )
}

export default MealChat

const styles = StyleSheet.create({})