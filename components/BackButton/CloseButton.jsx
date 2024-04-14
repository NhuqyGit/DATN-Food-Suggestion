import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import AntIcon from "react-native-vector-icons/AntDesign.js";
import { useNavigation } from "@react-navigation/native";

export default function CloseButton() {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
      >
        <View className="p-3 w-10 h-10 flex items-center justify-center bg-[#ECE9E9] rounded-full">
          <AntIcon name="close" size={16} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
