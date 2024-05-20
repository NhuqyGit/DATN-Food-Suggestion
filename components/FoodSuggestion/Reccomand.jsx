import React from "react";
import { Image, Text, View } from "react-native";

const Reccomand = () => {
  return (
    <View className="p-5">
      <View className="border border-dashed border-[#5E5E5E] rounded-[10px] h-[150px]">
        <View className="flex gap-2 items-center px-2 py-2">
          <View className="flex flex-row gap-1">
            <View>
              <Image source={require("../../assets/svgs/chat/star.svg")} />
            </View>
            <Text className="text-[16px] text-[#5E5E5E]">
              Please email us with details
            </Text>
          </View>
          <View className="h-[38px] rounded-lg bg-[#373739] w-11/12">
            <Text className="text-center text-white flex-row flex items-center justify-center  py-[10px] w-full">
              Lorem ipsum is simply dummy text
            </Text>
          </View>
          <View className="h-[38px] rounded-lg bg-[#373739] w-11/12">
            <Text className="text-center text-white flex items-center justify-center  py-[10px]">
              It is a long established fact that a reader
            </Text>
          </View>
        </View>
      </View>
      <View className="border border-dashed border-[#5E5E5E] rounded-[10px] h-[150px] mt-4">
        <View className="flex gap-2 items-center px-2 py-2">
          <View className="flex flex-row gap-1">
            <View>
              <Image source={require("../../assets/svgs/chat/star.svg")} />
            </View>
            <Text className="text-[16px] text-[#5E5E5E]">
              Please email us with details
            </Text>
          </View>
          <View className="h-[38px] rounded-lg bg-[#373739] w-11/12 ">
            <Text className="text-center text-white flex-row flex items-center justify-center  py-[10px] w-full">
              Lorem ipsum is simply dummy text
            </Text>
          </View>
          <View className="h-[38px] rounded-lg bg-[#373739] w-11/12 ">
            <Text className="text-center text-white flex items-center justify-center  py-[10px]">
              It is a long established fact that a reader
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Reccomand;
