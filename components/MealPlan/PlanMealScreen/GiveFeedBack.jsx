import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BackButton from "../../BackButton/BackButton";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../../theme/index";
import { AsyncStorageService } from "../../../utils/AsynStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const GiveFeedBack = () => {
  const navigation = useNavigation();
  const [rating, setRating] = useState(null);
  const [reason, setReason] = useState("");
  const [persuasion, setPersuasion] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    if (rating !== null && reason.trim() !== "" && persuasion.trim() !== "") {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [rating, reason, persuasion]);

  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    const feedbackData = {
      rating,
      reason,
      persuasion,
    };

    const user_id = await AsyncStorage.getItem("user_id");
    const token = await AsyncStorageService.getAccessToken();
    const response = await fetch(
      `https://datn-admin-be.onrender.com/feedbacks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          likePoint: Number(rating),
          reason: reason,
          description: persuasion,
          userid: Number(user_id),
        }),
      }
    );
    if (response) {
      Toast.show({
        type: "success",
        text1: "Feedback Submitted",
        text2: "Thank you for your feedback!",
        textStyle: { fontSize: 20 },
      });

      navigation.navigate("MainMealPlan");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      className="mb-3"
    >
      <View className="flex gap-y-1 bg-white h-full">
        <View className="pt-[8px] px-5 flex flex-row items-center gap-4 ">
          <View>
            <BackButton />
          </View>
          <View className="pt-1">
            <Text className="text-[18px] font-normal leading-normal text-[#000000]">
              Give feedback
            </Text>
          </View>
        </View>
        <ScrollView className="flex gap-y-3 px-5">
          <View>
            <Text className="font-semibold text-[24px] text-[#3a9693]">
              IntelliTaste Meal Planner Customer Satisfaction Survey
            </Text>
          </View>
          <View className="flex gap-y-4">
            <View>
              <Text className="text-base font-normal text-[#232222b3]">
                * 1. How likely is it that you would recommended the
                IntelliTaste Meal Planner to a friend or colleague?
              </Text>
              <View className="flex flex-row justify-between w-full pt-3">
                <Text className="text-base font-normal text-[#232222b3]">
                  NOT AT ALL LIKELY
                </Text>
                <Text className="text-base font-normal text-[#232222b3]">
                  EXTREMELY LIKELY
                </Text>
              </View>
              <View className={`flex flex-row w-full max-w-full`}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <TouchableOpacity
                    key={value}
                    className={`px-[9px] py-2 mr-[9px] border border-[#6e6a6a6d] rounded ${
                      rating === value
                        ? "bg-[#3a9693] text-white"
                        : "bg-transparent"
                    }`}
                    onPress={() => handleRating(value)}
                  >
                    <Text>{value}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View className="flex gap-3">
              <Text className="text-base font-normal text-[#232222b3]">
                * 2. Please explain why
              </Text>
              <View>
                <TextInput
                  placeholder="Enter here ..."
                  className="border border-solid p-4 border-[#6e6a6a6d]"
                  value={reason}
                  onChangeText={setReason}
                />
              </View>
            </View>
            <View className="flex gap-3">
              <Text className="text-base font-normal text-[#232222b3]">
                * 3. What would persuade you to use it more often?
              </Text>
              <View>
                <TextInput
                  placeholder="Enter here ..."
                  className="border border-solid p-4 border-[#6e6a6a6d]"
                  value={persuasion}
                  onChangeText={setPersuasion}
                />
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={{
            backgroundColor: isButtonDisabled
              ? theme.colors.secondary + "88"
              : theme.colors.secondary,
          }}
          className="rounded-full w-2/3 h-12 mb-4 mx-auto mt-8 justify-center items-center"
          onPress={handleSubmit}
          disabled={isButtonDisabled}
        >
          <Text className="text-white text-xl font-bold">
            Finish your feedback
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default GiveFeedBack;
