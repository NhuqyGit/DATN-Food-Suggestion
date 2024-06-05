import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

import Feather from "react-native-vector-icons/Feather";
import Material from "react-native-vector-icons/MaterialCommunityIcons";
import BottomSheet from "../../BottomSheet/BottomSheet";
import { AsyncStorageService } from "../../../utils/AsynStorage";
import { HOST } from "../../../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

function PopOver({ setRandom }) {
  const [modalVisible, setModalVisible] = useState(false);
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <View className="flex flex-col items-center justify-center">
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View className="p-[6px] flex items-center justify-center bg-[#ECE9E9] rounded-full">
          <Feather name="more-horizontal" size={24} />
        </View>
      </TouchableOpacity>

      <BottomSheet closePopUp={handleCloseModal} modalVisible={modalVisible}>
        <View className="px-4 pb-3 pt-2 h-[150px]">
          <View>
            <TouchableOpacity
              onPress={async () => {
                const user_id = await AsyncStorage.getItem("user_id");

                const token = await AsyncStorageService.getAccessToken();
                const response = await fetch(
                  `${HOST}/mealplan/user/${user_id}`,
                  {
                    method: "DELETE",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );

                setRandom(Math.random(0, 10) + 1);
                handleCloseModal();
              }}
              className="flex flex-row justify-between mt-2 mb-2 pb-3 border-b border-b-[#F3F3F3] border-solid"
            >
              <Text className="text-red-600 text-lg font-semibold">
                Delete All
              </Text>
              <Feather name="trash-2" size={26} color="red" />
            </TouchableOpacity>
          </View>
          <View className="flex flex-row justify-between mt-3 mb-2 pb-3 border-b border-b-[#F3F3F3] border-solid">
            <Text className="text-lg font-semibold">Sort by cooking time</Text>
            <Material name="sort-clock-descending-outline" size={26} />
          </View>
        </View>
      </BottomSheet>
    </View>
  );
}

export default PopOver;
