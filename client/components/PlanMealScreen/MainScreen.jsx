import { View, Text, Dimensions } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAweSomeIcon from "react-native-vector-icons/FontAwesome";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import Today from "../TopTabNavigator/Today";
import ThisWeek from "../TopTabNavigator/ThisWeek";
import Unschedule from "../TopTabNavigator/Unschedule";
const Tab = createMaterialTopTabNavigator();
const MainScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-5">
        <View className="ml-auto mt-4">
          <FontAweSomeIcon name="question-circle-o" size={30} />
        </View>

        <Text className="text-3xl pt-5 font-semibold">Meal Planner</Text>
      </View>
      <View className="flex-1 ">
        <Tab.Navigator
          tabBarOptions={{
            activeTintColor: "#40AD53", // Màu sắc của tab khi nó đang được chọn
            inactiveTintColor: "gray", // Màu sắc của tab khi nó không được chọn
            indicatorStyle: {
              backgroundColor: "#40AD53",
            }, // Màu sắc của thanh chạy qua
          }}
        >
          <Tab.Screen name="Today" component={Today} />
          <Tab.Screen name="This week" component={ThisWeek} />
          <Tab.Screen name="Unschedule" component={Unschedule} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
};

export default MainScreen;
