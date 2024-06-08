import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import MainMealPlan from "../components/MealPlan/PlanMealScreen/MainScreen";

import AddScreen from "../components/MealPlan/PlanMealScreen/AddScreen";
import Instruction from "../components/MealPlan/PlanMealScreen/Instruction";
import EditSchedule from "../components/MealPlan/PlanMealScreen/EditSchedule";
import GiveFeedBack from "../components/MealPlan/PlanMealScreen/GiveFeedBack";
import FoodDetailsScreen from "../components/FoodDetails/FoodDetails";

const Stack = createNativeStackNavigator();

function MealPlan() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MainMealPlan"
    >
      <Stack.Screen name="MainMealPlan" component={MainMealPlan} />
      <Stack.Screen name="AddScreen" component={AddScreen} />
      <Stack.Screen name="Instruction" component={Instruction} />
      <Stack.Screen name="GiveFeedback" component={GiveFeedBack} />
      <Stack.Screen name="EditSchedule" component={EditSchedule} />
      <Stack.Screen name="FoodDetail" component={FoodDetailsScreen} />
    </Stack.Navigator>
  );
}

export default MealPlan;
