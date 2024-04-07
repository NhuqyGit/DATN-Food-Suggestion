import React, { useEffect, useState, useRef, useMemo } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Feather from "react-native-vector-icons/Feather.js";
import AntIcon from "react-native-vector-icons/AntDesign.js";
import moment from "moment";

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";

import data from "../../../../constants/MealPlan.js";
import ListDishItem from "../ListDishItem";
import PlanDate from "../PlanDate";
import Plus from "../Plus.jsx";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from "../../../BottomSheet/BottomSheet.jsx";

function Today() {
  const date = moment().format("MMMM Do");
  const navigation = useNavigation();

  const today = moment();
  const dayOfWeekNumber = today.day();
  const dayInfo = data[dayOfWeekNumber];
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const bottomList = [
    {
      icon: "plussquareo",
      onPress: () => {
        navigation.navigate("AddScreen");
        setModalVisible(false);
      },
      name: "Add Saved Recipe",
    },
    {
      icon: "calendar",
      onPress: () => {
        // navigation.navigate("AddScreen");
        // setModalVisible(false);
      },
      name: "Edit schedule",
    },
  ];

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const translateY = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: withSpring(translateY.value) }],
    };
  });
  const animateList = () => {
    translateY.value = withTiming(0, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
  };
  const toggleAccordion = (index) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
    animateList();
  };

  const toggleBottomSheet = () => {
    setModalVisible(true);
  };

  return (
    <View className="py-4  h-full bg-white">
      <PlanDate date={date} />
      <View className="bg-[#ECE9E9] w-full h-[1] mt-4" />
      <ScrollView>
        <View className="flex flex-row justify-between items-center py-3 px-3">
          <View className="flex flex-row items-center ">
            <Plus toggleBottomSheet={toggleBottomSheet} />
            <Text style={{ fontSize: 18, paddingLeft: 10 }}>
              {dayInfo.title}
            </Text>
          </View>

          <View className="bg-[#ECE9E9] rounded-[12px] gap-1 flex flex-row pb-1 px-3  items-center">
            <Text className="text-[#40AD53] text-[18px] font-semibold  ">
              2
            </Text>
            <TouchableOpacity onPress={() => toggleAccordion(dayOfWeekNumber)}>
              <Feather
                name={
                  openAccordionIndex === dayOfWeekNumber
                    ? "chevron-up"
                    : "chevron-down"
                }
                size={24}
                color="#40AD53"
              />
            </TouchableOpacity>
          </View>
        </View>
        {openAccordionIndex === dayOfWeekNumber && (
          <Animated.View style={animatedStyle}>
            {dayInfo.assets.map((asset, assetIndex) => (
              <ListDishItem
                key={assetIndex}
                name={asset.name}
                time={asset.time}
                imgUri={asset.imgUri}
              />
            ))}
          </Animated.View>
        )}
      </ScrollView>
      <BottomSheet closePopUp={handleCloseModal} modalVisible={modalVisible}>
        <View className="h-[150px] flex flex-col gap-4 mx-2 my-2">
          {bottomList?.map((item, index) => {
            return (
              <View
                key={index}
                className=" mb-2 pb-3 border-b border-b-[#F3F3F3] border-solid"
              >
                <TouchableOpacity
                  className=" flex flex-row items-center gap-2"
                  onPress={() => {
                    item?.onPress();
                  }}
                >
                  <AntIcon name={item?.icon} size={24} color="#40AD53" />
                  <Text className="text-base font-semibold">{item?.name}</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      </BottomSheet>
    </View>
  );
}

export default Today;
