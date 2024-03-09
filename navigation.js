import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React from 'react';
import HomeScreen from './screens/HomeScreen';
import Profile from './screens/Profile';
import MealPlan from './screens/MealPlan';
import Personalization from './screens/Personalization';
import FoodDetailsScreen from './components/FoodDetails/FoodDetails';
import Icon from 'react-native-vector-icons/FontAwesome';
import ProfileStack from './screens/ProfileStack';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
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
          component={ProfileStack}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

