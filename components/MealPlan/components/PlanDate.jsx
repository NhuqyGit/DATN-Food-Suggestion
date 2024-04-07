import { View, Text, StyleSheet } from "react-native";
import React from "react";
import Feather from "react-native-vector-icons/Feather";
import PopOver from "./PopOver";

export default function PlanDate({ date, hidePop = false }) {
  return (
    <View style={styles.container}>
      {/* <View className='w-full flex flex-row'> */}
      <View className="flex flex-1 flex-row items-center justify-between px-3 py-1 bg-[#ECE9E9] rounded-full">
        <View>
          <Feather name="chevron-left" size={28} />
        </View>

        <Text className="text-lg translate-y-[-1px]">{date}</Text>
        <View>
          <Feather name="chevron-right" size={28} />
        </View>
      </View>
      {!hidePop && (
        <View className="flex items-center justify-center bg-[#ECE9E9] rounded-full">
          <PopOver />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    gap: 20,
  },
});
