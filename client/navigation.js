import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import React from "react";
import HomeScreen from "./screens/HomeScreen";
import Profile from "./screens/Profile";
import MealPlan from "./screens/MealPlan";
import Personalization from "./screens/Personalization";
import FoodDetailsScreen from "./components/FoodDetails/FoodDetails";

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home" component={FoodDetailsScreen} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="MealPlan" component={MealPlan} />
        <Tab.Screen name="Personalization" component={Personalization} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
