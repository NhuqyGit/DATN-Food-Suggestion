import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainMealPlan from "../components/PlanMealScreen/MainScreen";

import AddScreen from "../components/PlanMealScreen/AddScreen";

const Stack = createNativeStackNavigator();

const MealPlan = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="MainMealPlan"
  >
    <Stack.Screen name="MainMealPlan" component={MainMealPlan} />
    <Stack.Screen name="AddScreen" component={AddScreen} />
  </Stack.Navigator>
);

export default MealPlan;
