import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React from 'react';
import HomeScreen from './screens/HomeScreen';
import Profile from './screens/Profile';
import MealPlan from './screens/MealPlan';
import Personalization from './screens/Personalization';
import Icon from 'react-native-vector-icons/FontAwesome';
import Search from './screens/Search';

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
        <Tab.Screen
          name='Home'
          options={{
            // tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => <Icon name='home' size={26} />,
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name='Search'
          options={{
            // tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name='window-restore' size={26} />
            ),
          }}
          component={Search}
        />
        <Tab.Screen
          name='Personalization'
          options={{
            // tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name='window-restore' size={26} />
            ),
          }}
          component={Personalization}
        />
        <Tab.Screen
          name='New'
          options={{
            // tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name='plus-square-o' size={26} />
            ),
          }}
          component={Personalization}
        />
        <Tab.Screen
          name='MealPlan'
          options={{
            // tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <Icon name='calendar-check-o' size={26} />
            ),
          }}
          component={MealPlan}
        />
        <Tab.Screen
          name='Profile'
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => <Icon name='user' size={26} />,
          }}
          component={Profile}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

