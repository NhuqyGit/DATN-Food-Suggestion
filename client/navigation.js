import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React from 'react';
import HomeScreen from './screens/HomeScreen/HomeScreen';
import Profile from './screens/Profile';
import MealPlan from './screens/MealPlan';
import Personalization from './screens/Personalization';
import FoodDetailsScreen from './components/FoodDetails/FoodDetails.jsx';

// const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name='Home' component={HomeScreen} />
        <Stack.Screen name='Profile' component={Profile} />
        <Stack.Screen name='MealPlan' component={MealPlan} />
        <Stack.Screen name='Personalization' component={Personalization} />
      </Stack.Navigator> */}

      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name='Home' component={FoodDetailsScreen} />
        <Tab.Screen name='Profile' component={Profile} />
        <Tab.Screen name='MealPlan' component={MealPlan} />
        <Tab.Screen name='Personalization' component={Personalization} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

