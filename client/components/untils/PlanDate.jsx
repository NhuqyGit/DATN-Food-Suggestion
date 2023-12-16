import { View, Text } from "react-native";
import React from "react";
import FontAweSomeIcon from "react-native-vector-icons/FontAwesome5";
import PopOver from "./PopOver";

export default function PlanDate({ date }) {
  return (
    <View className="w-full flex flex-row ">
      <View className="w-2/3 h-14 flex flex-row justify-between mx-8 px-6 py-3 pb-3 bg-[#ECE9E9] rounded-full">
        <FontAweSomeIcon name="chevron-left" size={30} />
        <Text className="text-lg">{date}</Text>
        <FontAweSomeIcon name="chevron-right" size={30} />
      </View>
      <View className="w-14 h-14 flex items-center justify-center bg-[#ECE9E9] rounded-full">
        <PopOver />
      </View>
    </View>
  );
}
