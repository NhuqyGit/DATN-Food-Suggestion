import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import AntIcon from "react-native-vector-icons/AntDesign.js";

function Plus({ isAdd, toggleBottomSheet }) {
  const [isPlus, setisPlus] = useState(false);
  return (
    <View>
      {isAdd === true ? (
        <View>
          {isPlus ? (
            <TouchableOpacity
              onPress={() => {
                setisPlus(false);
              }}
            >
              <View className="">
                <AntIcon name="minuscircle" size={30} color="#40AD53" />
              </View>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => {
                setisPlus(true);
              }}
            >
              <View className="">
                <AntIcon name="pluscircle" size={30} color="#40AD53" />
              </View>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <TouchableOpacity onPress={toggleBottomSheet}>
          <View>
            <AntIcon name="pluscircle" size={30} color="#40AD53" />
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default Plus;
