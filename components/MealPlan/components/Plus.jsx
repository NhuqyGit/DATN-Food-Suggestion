import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AntIcon from "react-native-vector-icons/AntDesign.js";

function Plus({ navigation, toggleBottomSheet }) {
  return (
    <View>
      <TouchableOpacity onPress={toggleBottomSheet}>
        <View>
          <AntIcon name="pluscircle" size={30} color="#40AD53" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default Plus;
