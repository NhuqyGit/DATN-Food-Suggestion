import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import FoodSuggestionScreen from "./FoodSuggestion/FoodSuggestionScreen";

const Drawer = createDrawerNavigator();
export class FoodSuggestion extends Component {
  render() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="A" component={FoodSuggestionScreen}/>
        <Drawer.Screen name="B" component={FoodSuggestionScreen}/>
      </Drawer.Navigator>
    );
  }
}

export default FoodSuggestion;
