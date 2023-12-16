import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, ScrollView } from "react-native";
import PlanDate from "../untils/PlanDate";
import data from "../../data/MealPlan.js";
import ListDishItem from "../untils/ListDishItem.jsx";

function Unschedule() {
  const dayInfo = data[1];
  return (
    <View className="py-4 h-full bg-white">
      <PlanDate />
      <View className="bg-[#ECE9E9] w-full h-[1] mt-4"></View>
      <ScrollView>
        <View>
          {dayInfo.assets.map((asset, assetIndex) => (
            <ListDishItem
              key={assetIndex}
              name={asset.name}
              time={asset.time}
              imgUri={asset.imgUri}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default Unschedule;
