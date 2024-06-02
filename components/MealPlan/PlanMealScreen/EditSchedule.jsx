import React, { useState } from "react";
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
import moment from "moment";
import Plus from "../components/Plus";
import { useNavigation, useRoute } from "@react-navigation/native";
import { theme } from "../../../theme/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageService } from "../../../utils/AsynStorage";

const EditSchedule = () => {
  const route = useRoute();
  const { id, imgUri, name, day } = route.params;

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [offsetWeek, setOffsetWeek] = useState(0);
  const startDate = moment().startOf("week").add(offsetWeek, "weeks");
  const endDate = moment().endOf("week").add(offsetWeek, "weeks");
  const formattedStartDateYear = startDate.format("YYYY MMM Do");
  const formattedStartDate = startDate.format("MMM Do");
  const formattedEndDate = endDate.format("MMM Do");
  const date = `${formattedStartDate.toLocaleString()}  -  ${formattedEndDate.toLocaleString()}`;
  const navigation = useNavigation();

  const [selectedDay, setSelectedDay] = useState(null);

  const toggleDay = (day) => {
    const dayIndex = daysOfWeek.indexOf(day);
    const selectedDate = startDate.clone().add(dayIndex, "days");
    const selectedDateString = selectedDate.format("YYYY-MM-DD");
    setSelectedDay((prev) =>
      prev === selectedDateString ? null : selectedDateString
    );
  };

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
        className="flex flex-row mt-2 items-center h-24 bg-slate-50 rounded-md"
      >
        <Image source={imgUri} className="w-32 h-24 rounded-md" />
        <Text className="text-base ml-3 font-semibold">{name}</Text>
      </View>
      <View className="mt-4">
        <PlanDate
          date={date}
          hidePop
          setOffsetWeek={setOffsetWeek}
          offsetWeek={offsetWeek}
        />
      </View>
      <ScrollView>
        {daysOfWeek.map((day, index) => {
          const dayIndex = index;
          const selectedDate = startDate.clone().add(dayIndex, "days");
          const selectedDateString = selectedDate.format("YYYY-MM-DD");
          return (
            <View key={index}>
              <View className="flex flex-row justify-between py-4">
                <View className="flex flex-row">
                  <Plus
                    isAdd={true}
                    onToggle={() => toggleDay(day)}
                    isSelected={selectedDay === selectedDateString}
                  />
                  <Text className="text-lg pl-6">{day}</Text>
                </View>
                <View className="bg-[#ECE9E9] rounded-[12px] flex flex-row w-[40px] justify-center p-1 items-center">
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("MainMealPlan");
                    }}
                  >
                    <Feather
                      name={"chevron-right"}
                      size={18}
                      color={theme.colors.secondary}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <TouchableOpacity
        style={{ backgroundColor: theme.colors.secondary }}
        className="rounded-full w-fit px-10 h-10 mx-auto mt-4 justify-center items-center"
        onPress={async () => {
          const user_id = await AsyncStorage.getItem("user_id");
          const token = await AsyncStorageService.getAccessToken();
          const response = await fetch(
            `https://datn-admin-be.onrender.com/mealplan/user/${user_id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const mealplanJson = await response.json();
          const mealplanId = mealplanJson?.mealplanId;
          const mealPlanIdInt = parseInt(mealplanId, 10);
          const dishIdInt = parseInt(id, 10);
          const selectedDayAsDate = selectedDay
            ? moment.utc(selectedDay).toDate()
            : null;

          console.log(mealPlanIdInt, dishIdInt, selectedDayAsDate);

          const res = await fetch(
            `https://datn-admin-be.onrender.com/mealplan/update-plan-date`,
            {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                mealPlanId: mealPlanIdInt,
                dishId: dishIdInt,
                planDate: selectedDayAsDate,
              }),
            }
          );

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
