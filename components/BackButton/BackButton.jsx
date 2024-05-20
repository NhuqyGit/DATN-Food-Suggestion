import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <View className="w-[35px] h-[35px] mt-[20px] mb-[15px] flex flex-row justify-center items-center rounded-[50px] bg-[#F3F3F3]">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="keyboard-arrow-left" size={28} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
