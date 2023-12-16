import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import PlanDate from "../untils/PlanDate";
import Feather from "react-native-vector-icons/Feather.js";
import AntIcon from "react-native-vector-icons/AntDesign.js";
import moment from "moment";
import data from "../../data/MealPlan.js";
import ListDishItem from "../untils/ListDishItem";
import Plus from "../untils/Plus.jsx";
import { useNavigation } from "@react-navigation/native";
function Today() {
  const navigation = useNavigation();
  const date = moment().format("MMMM Do");
  const today = moment();
  const dayOfWeekNumber = today.day();
  const dayInfo = data[dayOfWeekNumber];
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  return (
    <View className="py-4  h-full bg-white">
      <PlanDate date={date} />
      <View className="bg-[#ECE9E9] w-full h-[1] mt-4"></View>
      <ScrollView>
        <View className="flex flex-row justify-between py-3 px-3">
          <View className="flex flex-row ">
            <Plus navigation={navigation} />

            <Text className="text-lg pt-[8] pl-6">{dayInfo.title}</Text>
          </View>

          <TouchableOpacity
            onPress={() => toggleAccordion(dayOfWeekNumber)}
            style={{ padding: 10 }}
          >
            <Feather
              name={
                openAccordionIndex === dayOfWeekNumber
                  ? "chevron-up"
                  : "chevron-down"
              }
              size={30}
              color={"#40AD53"}
            />
          </TouchableOpacity>
        </View>
        {openAccordionIndex === dayOfWeekNumber && (
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
        )}
      </ScrollView>
    </View>
  );
}

export default Today;
