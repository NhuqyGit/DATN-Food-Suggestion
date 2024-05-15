import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntIcon from "react-native-vector-icons/AntDesign.js";

import Feather from "react-native-vector-icons/Feather";
import BottomSheet from "../../BottomSheet/BottomSheet";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../../theme/index";

export default function ListDishItem({
  isSelected,
  name,
  time,
  imgUri,
  isAdd = false,
}) {
  const navigation = useNavigation();
  const [isPlus, setisPlus] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleCloseModal = () => {
    setModalVisible(false);
  };
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
                    <AntIcon name="minuscircle" size={30} color={theme.colors.secondary} />
                  </View>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    setisPlus(true);
                  }}
                >
                  <View className="">
                    <AntIcon name="pluscircle" size={30} color={theme.colors.secondary} />
                  </View>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setModalVisible(true);
              }}
            >
              <View className="p-[6px] flex items-center justify-center bg-[#ECE9E9] rounded-full">
                <Feather name="more-horizontal" size={18} />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <BottomSheet closePopUp={handleCloseModal} modalVisible={modalVisible}>
        <View className="h-fit flex flex-col gap-4 ml-2 mr-6 my-2">
          <View className="flex flex-row items-center  mt-2 mb-2 pb-3 border-b border-b-[#F3F3F3] border-solid">
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
                navigation.navigate("EditSchedule");
              }}
            >
              <View className="flex flex-row items-center">
                <Ionicons name="calendar-sharp" size={24} color={theme.colors.secondary} />
                <Text className="ml-4 text-base font-semibold">
                  Edit schedule
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View className="flex flex-row items-center  mt-2 mb-2 pb-3 border-b border-b-[#F3F3F3] border-solid">
            <Feather name="trash-2" size={24} color="red" />
            <Text className="ml-4 text-base font-semibold">
              Remove from Meal Plan
            </Text>
          </View>
        </View>
      </BottomSheet>
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
