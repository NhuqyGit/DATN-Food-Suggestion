import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../../BackButton/BackButton";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";

const GiveFeedBack = () => {
  const navigation = useNavigation();
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
        <View className="flex gap-y-4">
          <View>
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
          <View className="flex gap-3">
            <Text className="text-base font-normal text-[#232222b3]">
              * 2. Please explain why
            </Text>
            <View>
              <TextInput
                placeholder="Enter here ..."
                className="border border-solid p-4 border-[#6e6a6a6d]"
              />
            </View>
          </View>
          <View className="flex gap-3">
            <Text className="text-base font-normal text-[#232222b3]">
              * 3. What would persuade you to use it more often?
            </Text>
            <View>
              <TextInput
                placeholder="Enter here ..."
                className="border border-solid p-4 border-[#6e6a6a6d]"
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        className=" rounded-full bg-[#40AD53] w-2/3 h-12 mb-4 mx-auto mt-4 justify-center items-center "
        onPress={() => {
          navigation.navigate("MainMealPlan");
        }}
      >
        <Text className="text-white text-xl font-bold">
          Finish your feedback
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default GiveFeedBack;
