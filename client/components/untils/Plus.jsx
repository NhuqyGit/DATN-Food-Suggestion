import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AntIcon from "react-native-vector-icons/AntDesign.js";

const Plus = ({ navigation }) => {
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("AddScreen");
        }}
      >
        <View className="pt-2">
          <AntIcon name="pluscircle" size={30} color={"#40AD53"} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Plus;
