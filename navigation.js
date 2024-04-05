import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import React, { useState } from 'react'
import Home from './screens/Home/Home'
import MealPlan from './screens/MealPlan'
import Personalization from './screens/Personalization'
import ProfileStack from './screens/ProfileStack'
import SearchScreen from './screens/Search/SearchScreen'
import Splash from './components/Splash/Spash'
import FoodSuggestionScreen from './screens/FoodSuggestionScreen'
import { theme } from './theme/index'
import { Ionicons } from '@expo/vector-icons'
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SplashScreen from "./screens/SplashScreen";


const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

const TabArr = [
  {
    route: Home,
    label: 'Home',
    activeIcon: 'home-sharp',
    inActiveIcon: 'home-outline',
    size: 26
  },
  {
    route: SearchScreen,
    label: 'Search',
    activeIcon: 'search-outline',
    inActiveIcon: 'search-outline',
    size: 26
  },
  {
    route: FoodSuggestionScreen,
    label: 'Per1',
    activeIcon: 'add-circle-sharp',
    inActiveIcon: 'add-circle-outline',
    size: 40
  },
  {
    route: MealPlan,
    label: 'Meal Plan',
    activeIcon: 'calendar-sharp',
    inActiveIcon: 'calendar-outline',
    size: 26
  },
  {
    route: ProfileStack,
    label: 'Profile',
    activeIcon: 'person-sharp',
    inActiveIcon: 'person-outline',
    size: 26
  },
]

export default function Navigation() {
  const [isDone, setIsDone] = useState(true)

  return (
    <NavigationContainer>
      {!isDone ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name='SplashScreen' component={SplashScreen} />
          <Stack.Screen name='SignInScreen' component={SignInScreen} />
          <Stack.Screen name='SignUpScreen' component={SignUpScreen} />
          <Stack.Screen name='Personalization'>
            {(props) => <Personalization {...props} setIsDone={setIsDone} />}
          </Stack.Screen>
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {TabArr.map((item, index) => {
            return (
              <Tab.Screen
                key={index.toString()}
                name={item.label}
                options={{
                  tabBarShowLabel: false,
                  tabBarIcon: ({ focused }) => {
                    return (
                      <Ionicons
                        name={item.activeIcon}
                        size={item.size}
                        color={focused ? theme.colors.secondary : '#9e9e9e'}
                      />
                    )
                  },
                }}
                component={item.route}
              />
            )
          })}
        </Tab.Navigator>
      )}
    </NavigationContainer>
  )
}

