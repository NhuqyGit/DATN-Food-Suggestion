import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ListDishItem({ name, time, imgUri }) {
  return (
    <View
      style={styles.shadowView}
      className="flex flex-row mt-2 w-11/12 h-32 mx-5 bg-slate-50 rounded-md "
    >
      <Image
        source={{
          uri: "https://media.self.com/photos/57d8952946d0cb351c8c50c9/master/w_1600%2Cc_limit/DELICIOUS-1-POT-Lentil-and-Black-Bean-Chili-Smoky-hearty-PROTEIN-and-fiber-packed-vegan-glutenfree-lentils-chili-healthy-recipe2.jpg",
        }} // Đường dẫn hoặc URI của hình ảnh
        className="w-32 h-32 rounded-md "
      />
      <View className="flex flex-col px-3 justify-between py-3">
        <Text className="text-lg font-semibold">{name}</Text>
        <View className="flex flex-row justify-between">
          <View className="w-28 h-9 rounded-full flex flex-row bg-[#454242] px-2 py-1">
            <Ionicons name="time-outline" size={26} color="white" />
            <Text className="text-white text-base font-medium px-1">
              {time}
            </Text>
          </View>
          <View>
            <Ionicons name="trash-outline" size={30} color="red" />
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  shadowView: {
    shadowColor: "#000000", // Màu của shadow
    shadowOffset: { width: 2, height: 2 }, // Độ lệch theo trục x và y
    shadowOpacity: 0.25, // Độ mờ của shadow (25% opacity)
    shadowRadius: 2, // Bán kính của shadow
    elevation: 4, // Độ nâng của shadow (elevation chỉ hoạt động trên Android)
    backgroundColor: "#ffffff", // Màu nền của View
  },
});
