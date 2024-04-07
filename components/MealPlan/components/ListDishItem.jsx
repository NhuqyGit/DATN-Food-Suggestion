import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntIcon from "react-native-vector-icons/AntDesign.js";

export default function ListDishItem({
  isSelected,
  name,
  time,
  imgUri,
  isAdd = false,
}) {
  const [isPlus, setisPlus] = useState(false);
  return (
    <View
      style={styles.shadowView}
      className="flex flex-row mt-2  h-32 mx-1 bg-slate-50 rounded-md  "
    >
      <Image source={imgUri} className="w-32 h-32 rounded-md " />
      <View
        className={`flex flex-col px-3 justify-between py-3 ${
          isSelected && "bg-gray-200 rounded-r-lg"
        }  `}
      >
        <Text className="text-lg font-semibold">{name}</Text>
        <View className="flex flex-row justify-between items-center w-4/5">
          <View className="w-28 h-9 rounded-full flex flex-row bg-[#454242] px-2 py-1">
            <Ionicons name="time-outline" size={26} color="white" />
            <Text className="text-white text-base font-medium px-1">
              {time}
            </Text>
          </View>
          {isAdd === true ? (
            <View>
              {isPlus ? (
                <TouchableOpacity
                  onPress={() => {
                    setisPlus(false);
                  }}
                >
                  <View className="">
                    <AntIcon name="minuscircle" size={30} color="#40AD53" />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setisPlus(true);
                  }}
                >
                  <View className="">
                    <AntIcon name="pluscircle" size={30} color="#40AD53" />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View>
              <Ionicons name="trash-outline" size={30} color="red" />
            </View>
          )}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  shadowView: {
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
    backgroundColor: "#ffffff",
  },
});
