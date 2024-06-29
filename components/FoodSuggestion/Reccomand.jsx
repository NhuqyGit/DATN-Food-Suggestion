import React from "react";
import { Image, Text, View } from "react-native";

const Reccomand = () => {
  return (
    <View className="p-5">
      <View className="border border-dashed border-[#5E5E5E] rounded-[10px] h-[180px]">
        <View className="flex gap-2 items-center px-2 py-2">
          <View className="flex flex-row gap-1 items-center">
            <View>
              <Image style={{width: 24, height: 24}} source={require("../../assets/images/suggestion/stars.png")} />
            </View>
            <Text className="text-[18px] text-[#5E5E5E]">
              You don't know what to eat today
            </Text>
          </View>
          {/* <View className="h-[38px] rounded-lg w-12/12"> */}
            <Text
              // numberOfLines={2}
              // adjustsFontSizeToFit={true}
              style={{width: "98%"}}
              className="text-[14px] text-[#5e5e5e] flex-row flex items-center justify-center px-[5px] py-[5px]">
              1. To start a new record, click the "create new record" button below.
            </Text>
          {/* </View> */}
            <Text
              // numberOfLines={2}
              // adjustsFontSizeToFit={true}
              style={{width: "98%"}}
              className=" text-[14px] text-[#5e5e5e] flex-row flex items-center justify-center px-[5px] py-[5px]">
              2. Enter your information and meal needs.
            </Text>
            <Text
              // numberOfLines={2}
              // adjustsFontSizeToFit={true}
              style={{width: "98%"}}
              className=" text-[14px] text-[#5e5e5e] flex-row flex items-center justify-center px-[5px] py-[5px]">
              3. And send it.
            </Text>
        </View>
      </View>
    </View>
  );
};

export default Reccomand;
