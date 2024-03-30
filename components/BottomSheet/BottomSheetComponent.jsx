import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import AntIcon from "react-native-vector-icons/AntDesign.js";

const BottomSheetComponent = ({ bottomSheetRef, bottomList }) => {
  return (
    <View className="flex flex-col gap-4 p-4">
      {bottomList?.map((item, index) => {
        return (
          <View key={index} className="p-2">
            <TouchableOpacity
              className=" flex flex-row items-center gap-2"
              onPress={() => {
                item?.onPress();
                bottomSheetRef.current.expand();
              }}
            >
              <AntIcon name={item?.icon} size={30} color="#40AD53" />
              <Text className="text-base font-semibold">{item?.name}</Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default BottomSheetComponent;
