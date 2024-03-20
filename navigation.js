import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Home from "./screens/Home/Home";
import Profile from "./screens/Profile";
import MealPlan from "./screens/MealPlan";
import Personalization from "./screens/Personalization";
import FoodDetailsScreen from "./components/FoodDetails/FoodDetails";
import ProfileStack from "./screens/ProfileStack";
import SearchScreen from "./screens/SearchScreen";
import Splash from "./components/Splash/Spash";
import Suggestionchat from "./components/SuggestionChat/Suggestionchat";
import { theme } from './theme/index'
import { MaterialIcons, Feather, FontAwesome, SimpleLineIcons, FontAwesome5, Octicons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator();

const TabArr = [
  {
    route: Home,
    label: "Home",
    activeIcon: "home-sharp", 
    inActiveIcon: "home-outline"
  },
  {
    route: Personalization,
    label: "Per",
    activeIcon: "add-circle-sharp", 
    inActiveIcon: "add-circle-outline"
  },
  {
    route: Suggestionchat,
    label: "Per1",
    activeIcon: "add-circle-sharp", 
    inActiveIcon: "add-circle-outline"
  },
  {
    route: SearchScreen,
    label: "Search",
    activeIcon: "search-outline", 
    inActiveIcon: "search-outline"
  },
  {
    route: MealPlan,
    label: "Meal Plan",
    activeIcon: "calendar-sharp", 
    inActiveIcon: "calendar-outline"
  },
  {
    route: ProfileStack,
    label: "Profile",
    activeIcon: "person-sharp", 
    inActiveIcon: "person-outline"
  },
]


export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {
          TabArr.map((item, index)=>{
            return (
              <Tab.Screen
                key={index.toString()}
                name={item.label}
                options={{
                  tabBarShowLabel: false,
                  tabBarIcon: ({ focused }) => {
                    return(
                      <Ionicons
                        name={item.activeIcon}
                        size={26}
                        color={focused ? theme.colors.secondary : "#9e9e9e"}/>
                    )
                  }
                }}
                component={item.route}
              />
            )
          })
        }
      </Tab.Navigator>
    </NavigationContainer>
  );
}
