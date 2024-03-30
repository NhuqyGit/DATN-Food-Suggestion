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
import BottomSheet from "@gorhom/bottom-sheet";
import data from "../../../../constants/MealPlan.js";
import ListDishItem from "../ListDishItem";
import PlanDate from "../PlanDate";
import Plus from "../Plus.jsx";
import BottomSheetComponent from "../../../BottomSheet/BottomSheetComponent.jsx";
import { useNavigation } from "@react-navigation/native";

function Today() {
  const date = moment().format("MMMM Do");
  const navigation = useNavigation();

  const today = moment();
  const dayOfWeekNumber = today.day();
  const dayInfo = data[dayOfWeekNumber];
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  const bottomSheetRef = useRef(null);
  const bottomList = [
    {
      icon: "tag",
      onPress: () => {
        navigation.navigate("AddScreen");
      },
      name: "Add Saved Recipe",
    },
  ];

  const snapPoints = useMemo(() => ["25%", "50%"], []);

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
    bottomSheetRef.current.collapse();
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

          <TouchableOpacity
            onPress={() => toggleAccordion(dayOfWeekNumber)}
            style={{ paddingRight: 10, paddingTop: 10 }}
          >
            <Feather
              name={
                openAccordionIndex === dayOfWeekNumber
                  ? "chevron-up"
                  : "chevron-down"
              }
              size={30}
              color="#40AD53"
            />
          </TouchableOpacity>
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

      <BottomSheet
        index={-1}
        snapPoints={snapPoints}
        handleComponent={() => null}
        ref={bottomSheetRef}
        enablePanDownToClose={true}
        backgroundComponent={() => (
          <Animated.View
            className="bg-[#F3F4F6] rounded-l-[36px] rounded-r-[36x] "
            style={[StyleSheet.absoluteFillObject]}
          />
        )}
      >
        <BottomSheetComponent
          bottomSheetRef={bottomSheetRef}
          bottomList={bottomList}
        />
      </BottomSheet>
    </View>
  );
}

export default Today;
