import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainMealPlan from "../components/MealPlan/PlanMealScreen/MainScreen";

import AddScreen from "../components/MealPlan/PlanMealScreen/AddScreen";
import Instruction from "../components/MealPlan/PlanMealScreen/Instruction";
const Stack = createNativeStackNavigator();

const MealPlan = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName="MainMealPlan"
  >
    <Stack.Screen name="MainMealPlan" component={MainMealPlan} />
    <Stack.Screen name="AddScreen" component={AddScreen} />
    <Stack.Screen name="Instruction" component={Instruction} />
  </Stack.Navigator>
);

export default MealPlan;
