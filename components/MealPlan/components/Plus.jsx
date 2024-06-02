import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import AntIcon from "react-native-vector-icons/AntDesign.js";
import { theme } from "../../../theme/index";

function Plus({ isAdd, toggleBottomSheet, onToggle, isSelected }) {
  return (
    <View>
      {isAdd === true ? (
        <TouchableOpacity onPress={onToggle}>
          <View>
            <AntIcon
              name={isSelected ? "minuscircle" : "pluscircle"}
              size={30}
              color={theme.colors.secondary}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity onPress={toggleBottomSheet}>
          <View>
            <AntIcon
              name="pluscircle"
              size={30}
              color={theme.colors.secondary}
            />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default Plus;
