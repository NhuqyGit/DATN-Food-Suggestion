import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import data from "../../data/Unschedule.js";
import ListDishItem from "../untils/ListDishItem.jsx";
const AddScreen = () => {
  const [selectedCards, setSelectedCards] = useState([]);
  const toggleCardSelection = (id) => {
    const index = selectedCards.indexOf(id);
    if (index !== -1) {
      // Nếu thẻ đã được chọn, hãy loại bỏ nó khỏi mảng selectedCards
      const newSelectedCards = [...selectedCards];
      newSelectedCards.splice(index, 1);
      setSelectedCards(newSelectedCards);
    } else {
      // Nếu thẻ chưa được chọn, hãy thêm nó vào mảng selectedCards
      setSelectedCards([...selectedCards, id]);
    }
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => toggleCardSelection(item.id)}
      className=" flex flex-row -translate-x-2  "
      style={[selectedCards.includes(item.id)]}
    >
      <TouchableOpacity
        className="border rounded  w-6 h-6 mt-16 translate-x-3"
        onPress={() => toggleCardSelection(item.id)}
      >
        {selectedCards.includes(item.id) && (
          <Text className="text-center mr-[1]  text-base font-bold">X</Text>
        )}
      </TouchableOpacity>
      <View>
        <ListDishItem name={item.name} time={item.time} imgUri={item.imgUri} />
      </View>
    </TouchableOpacity>
  );
  return (
    <View className="bg-white h-full  ">
      <Text className="text-2xl mt-12 mb-6 ml-6 font-semibold">
        Meal Planner
      </Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        className=" rounded-full bg-[#40AD53] w-2/3 h-12 mx-auto my-8 justify-center items-center "
        onPress={() => {}}
      >
        <Text className="text-white text-xl font-bold">Add to your plan</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddScreen;
