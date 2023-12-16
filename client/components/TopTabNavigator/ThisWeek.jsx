import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import Feather from "react-native-vector-icons/Feather.js";
import AntIcon from "react-native-vector-icons/AntDesign.js";
import PlanDate from "../untils/PlanDate";
import moment from "moment";
import ListDishItem from "../untils/ListDishItem";
import data from "../../data/MealPlan.js";
import Plus from "../untils/Plus.jsx";
import { useNavigation } from "@react-navigation/native";
function ThisWeek() {
  const navigation = useNavigation();
  const startDate = moment().startOf("week");
  const endDate = moment().endOf("week");

  const formattedStartDate = startDate.format("MMM Do");
  const formattedEndDate = endDate.format("MMM Do");
  const date =
    formattedStartDate.toLocaleString() +
    "  -  " +
    formattedEndDate.toLocaleString();

  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };
  return (
    <View className="py-4 h-full bg-white">
      <PlanDate date={date} />
      <View className="bg-[#ECE9E9] w-full h-[1] mt-4"></View>
      <ScrollView>
        {data.map((day, index) => (
          <View key={index}>
            <View className="flex flex-row justify-between py-3 px-3">
              <View className="flex flex-row ">
                <Plus navigation={navigation} />

                <Text className="text-lg pt-[8] pl-6">{day.title}</Text>
              </View>

              <TouchableOpacity
                onPress={() => toggleAccordion(index)}
                style={{ padding: 10 }}
              >
                <Feather
                  name={
                    openAccordionIndex === index ? "chevron-up" : "chevron-down"
                  }
                  size={30}
                  color={"#40AD53"}
                />
              </TouchableOpacity>
            </View>
            {openAccordionIndex === index && (
              <View>
                {day.assets.map((asset, assetIndex) => (
                  <ListDishItem
                    key={assetIndex}
                    name={asset.name}
                    time={asset.time}
                    imgUri={asset.imgUri}
                  />
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

export default ThisWeek;
