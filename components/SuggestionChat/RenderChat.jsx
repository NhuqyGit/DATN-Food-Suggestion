import React from "react";
import { Image, Text, View } from "react-native";
import DishRender from "./DishRender";
const listRender = [
  {
    id: "1",
    name: "Recipe 1",
    author: "Chef Huu Nien :)",
    rating: 5,
    image: require("../../assets/monngon.jpg"),
  },
  {
    id: "2",
    name: "Recipe 2",
    author: "Chef Huu Nien :)",
    rating: 3,
    image: require("../../assets/monngon.jpg"),
  },
  {
    id: "3",
    name: "Recipe 3",
    author: "Chef Huu Nien :)",
    rating: 4.5,
    image: require("../../assets/monngon.jpg"),
  },
  {
    id: "4",
    name: "Recipe 4",
    author: "Chef Huu Nien :)",
    rating: 5,
    image: require("../../assets/monngon.jpg"),
  },
  {
    id: "5",
    name: "Recipe 5",
    author: "Chef Huu Nien :)",
    rating: 3,
    image: require("../../assets/monngon.jpg"),
  },
];

const RenderChat = () => {
  return (
    <View>
      <View className="flex flex-row gap-4 ">
        <View className="flex-1">
          <Image source={require("../../assets/svgs/chat/cook.svg")} />
          <View className="w-7 h-7"></View>
        </View>
        <View className="flex-9 gap-4">
          <Text className="text-white font-semibold text-[16px]">duc23ff4</Text>
          <View className="pr-5">
            <Text className="text-white  text-[14px]">
              Contrary to popular belief, Lorem Ipsum is not simply random text.
              It has roots in a piece of classical Latin literature from 45 BC,
              making it over 2000 years old.
            </Text>
          </View>
          <View>
            <DishRender recipes={listRender} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default RenderChat;
