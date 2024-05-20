import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CloseButton from "../../BackButton/CloseButton";
import Feather from "react-native-vector-icons/Feather.js";
import PlanDate from "../components/PlanDate";
import data from "../../../constants/MealPlan";
import moment from "moment";
import Plus from "../components/Plus";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../../theme/index";

const EditSchedule = () => {
  const startDate = moment().startOf("week");
  const endDate = moment().endOf("week");

  const formattedStartDate = startDate.format("MMM Do");
  const formattedEndDate = endDate.format("MMM Do");
  const date = `${formattedStartDate.toLocaleString()}  -  ${formattedEndDate.toLocaleString()}`;
  const navigation = useNavigation();
  return (
    <View className="px-4 py-4 bg-white h-full">
      <View className="flex flex-row justify-end mt-4">
        <CloseButton />
      </View>
      <View>
        <Text className="text-2xl font-semibold">Schedule recipe</Text>
        <Text className="text-sm text-[#5E5E5E] ">
          Choose which day(s) to schedule this recipe for
        </Text>
      </View>

      <View
        style={styles.shadowView}
        className="flex flex-row mt-2 items-center   h-24 bg-slate-50 rounded-md  "
      >
        <Image
          source={require("../../../assets/images/Home/dish-image.jpg")}
          className="w-32 h-24 rounded-md "
        />

        <Text className="text-base ml-3 font-semibold">
          Thịt nai xào rau rừng
        </Text>
      </View>
      <View className="mt-4">
        <PlanDate date={date} hidePop />
      </View>
      <ScrollView>
        {data.map((day, index) => (
          <View key={index}>
            <View className="flex flex-row justify-between py-4 ">
              <View className="flex flex-row ">
                <Plus isAdd={true} />

                <Text className="text-lg pl-6">{day.title}</Text>
              </View>

              <View className="bg-[#ECE9E9] rounded-[12px]  flex flex-row  w-[50px] justify-between  pl-3 pr-1 items-center">
                <Text style={{color: theme.colors.secondary}} className="text-[14px] font-semibold  ">
                  2
                </Text>
                <TouchableOpacity>
                  <Feather name={"chevron-right"} size={18} color={theme.colors.secondary} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={{backgroundColor: theme.colors.secondary}}
        className=" rounded-full w-fit px-10 h-10 mx-auto mt-4 justify-center items-center "
        onPress={() => {
          navigation.navigate("MainMealPlan");
        }}
      >
        <Text className="text-white text-sm font-bold">Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  shadowView: {
    shadowColor: "black",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 4,
    backgroundColor: "#ffffff",
  },
});

export default EditSchedule;
