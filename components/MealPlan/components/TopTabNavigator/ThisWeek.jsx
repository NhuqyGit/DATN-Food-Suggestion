import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import Feather from "react-native-vector-icons/Feather.js";
import AntIcon from "react-native-vector-icons/AntDesign.js";
import moment from "moment";

import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  Easing,
} from "react-native-reanimated";
import data from "../../../../constants/MealPlan";
import PlanDate from "../PlanDate";
import Plus from "../Plus";
import ListDishItem from "../ListDishItem";

function ThisWeek() {
  const navigation = useNavigation();
  const startDate = moment().startOf("week");
  const endDate = moment().endOf("week");

  const formattedStartDate = startDate.format("MMM Do");
  const formattedEndDate = endDate.format("MMM Do");
  const date = `${formattedStartDate.toLocaleString()}  -  ${formattedEndDate.toLocaleString()}`;

  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

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

  useEffect(() => {
    if (openAccordionIndex !== null) {
      translateY.value = 10;
      animateList();
    }
  }, [openAccordionIndex]);
  return (
    <View className="py-4 h-full bg-white">
      <PlanDate date={date} />
      <View className="bg-[#ECE9E9] w-full h-[1] mt-4" />
      <ScrollView>
        {data.map((day, index) => (
          <View key={index}>
            <View className="flex flex-row justify-between py-3 px-3">
              <View className="flex flex-row ">
                <Plus navigation={navigation} name={"Today"} />

                <Text className="text-lg pt-[8] pl-6">{day.title}</Text>
              </View>

              <TouchableOpacity
                onPress={() => toggleAccordion(index)}
                style={{ paddingRight: 10, paddingTop: 10 }}
              >
                <Feather
                  name={
                    openAccordionIndex === index ? "chevron-up" : "chevron-down"
                  }
                  size={30}
                  color="#40AD53"
                />
              </TouchableOpacity>
            </View>
            {openAccordionIndex === index && (
              <Animated.View style={animatedStyle}>
                {day.assets.map((asset, assetIndex) => (
                  <ListDishItem
                    key={assetIndex}
                    name={asset.name}
                    time={asset.time}
                    imgUri={asset.imgUri}
                  />
                ))}
              </Animated.View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default ThisWeek;
