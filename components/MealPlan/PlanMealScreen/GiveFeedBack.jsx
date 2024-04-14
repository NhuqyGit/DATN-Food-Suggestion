import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import BackButton from "../../BackButton/BackButton";
import { useState } from "react";

const GiveFeedBack = () => {
  const [rating, setRating] = useState(null);

  const handleRating = (value) => {
    setRating(value);
    // Do something with the selected rating
  };
  return (
    <View className="flex  gap-y-1 bg-white h-full">
      <View className="pt-[8px] px-5 flex flex-row items-center gap-4 ">
        <View>
          <BackButton />
        </View>
        <View className="pt-1">
          <Text className="text-[18px] font-normal leading-normal text-[#000000]">
            Give feedback
          </Text>
        </View>
      </View>
      <ScrollView className="flex gap-y-3 px-5">
        <View>
          <Text className="font-semibold text-[24px] text-[#3a9693]">
            DATN Meal Planner Customer Satisfaction Survey
          </Text>
        </View>
        <View className="flex gap-y-2">
          <Text className="text-base font-normal text-[#232222b3]">
            * 1. How likely is it that you would recommended the DATN Meal
            Planner to a friend or colleague?
          </Text>
          <View className="flex flex-row justify-between w-full pt-6">
            <Text className="text-base font-normal text-[#232222b3]">
              NOT AT ALL LIKELY
            </Text>
            <Text className="text-base font-normal text-[#232222b3]">
              EXTREMELY LIKELY
            </Text>
          </View>
          <View className={`flex flex-row w-full max-w-full`}>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <TouchableOpacity
                key={value}
                className={`px-[9px] py-2 mr-[9px] border rounded ${
                  rating === value
                    ? "bg-[#3a9693] text-white"
                    : "bg-transparent"
                }`}
                onPress={() => handleRating(value)}
              >
                <Text>{value}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default GiveFeedBack;
