import { View, Text, Button, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAweSomeIcon from "react-native-vector-icons/FontAwesome6";
import BackButton from "../../BackButton/BackButton";
import { useState } from "react";
import { theme } from "../../../theme/index";

function Instruction() {
  const navigation = useNavigation();
  const [openAccordionIndex, setOpenAccordionIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenAccordionIndex(openAccordionIndex === index ? null : index);
  };

  const dataFAQ = [
    {
      index: 1,
      title: "What is meal planner?",
      description:
        "A Meal Planner is a tool designed to simplify the process of organizing your meals for the week or month ahead. It allows users to strategically plan their meals in advance, taking into account factors such as dietary preferences, nutritional requirements, and ingredient availability.",
    },
    {
      index: 2,
      title: "Customizing Your Meal Plans",
      description:
        "Find out how to tailor your meal plans to fit your dietary preferences, nutritional goals, and lifestyle requirements, including options for accommodating allergies, restrictions, and personal taste preferences.",
    },
    {
      index: 3,
      title: "Tips for Successful Meal Planning",
      description:
        "Explore practical tips and strategies for maximizing the effectiveness of your meal planning efforts, including batch cooking, meal prepping, and incorporating seasonal ingredients.",
    },
    {
      index: 4,
      title: "Using the Meal Planner for Special Occasions",
      description:
        "Discover how our Meal Planner can be adapted for special occasions, holidays, and events, including options for hosting guests, creating themed menus, and accommodating larger gatherings.",
    },
    {
      index: 5,
      title: "Benefits of Using a Meal Planner",
      description:
        "Discover the advantages of incorporating a Meal Planner into your routine, such as improved organization, time-saving, healthier eating habits, and reduced stress around meal preparation.",
    },
  ];
  return (
    <View className="flex  gap-y-1 bg-white h-full  ">
      <View className="pt-[8px] px-5 flex flex-row items-center gap-4 ">
        <View>
          <BackButton />
        </View>
        <View className="pt-1">
          <Text className="text-[18px] font-normal leading-normal text-[#000000]">
            Meal Plan Help
          </Text>
        </View>
      </View>
      <ScrollView className="flex gap-y-3 px-5">
        <View className="flex gap-3">
          <View>
            <Text className="text-[24px] text-black font-semibold">
              Meal Planning Made Easy
            </Text>
          </View>
          <View>
            <Text className="text-base font-normal text-[#232222b3] ">
              Get organized with the IntelliTatse Meal Planner - available in
              the app with a paid subscription to IntelliTatse - and say goodbye
              to mid-week dinner dilemmas, last minute trips to the store, and
              wasted food.
            </Text>
          </View>
        </View>
        <View className="flex gap-3">
          <View>
            <MaterialIcons
              name="restaurant-menu"
              size={44}
              color={theme.colors.secondary}
            />
          </View>
          <Text className="text-[22px] font-semibold leading-normal text-[#000000]">
            Create Your Menu
          </Text>
          <View>
            <Text className="text-base font-normal text-[#232222b3] ">
              Pick the recipes you'll cook in the next week - as many or few as
              you like. We'll supply personalized recommendations to keep your
              inspire.
            </Text>
          </View>
        </View>
        <View className="flex gap-3">
          <View>
            <FontAweSomeIcon
              name="bowl-food"
              size={40}
              color={theme.colors.secondary}
            />
          </View>
          <Text className="text-[22px] font-semibold leading-normal text-[#000000]">
            Cook, Review, Recipes!
          </Text>
          <View>
            <Text className="text-base font-normal text-[#232222b3] ">
              Get cooking, then review that recipe for even better
              recommendations. All done? Clear your meal plan and start your
              next culinary adventure!
            </Text>
          </View>
        </View>
        <View className="flex gap-3 ">
          <Text className="text-[22px]  font-semibold leading-normal text-[#000000]">
            Meal Planner Tips & FAQs
          </Text>
          <View className="flex gap-y-1">
            {dataFAQ?.map((item, index) => {
              return (
                <View
                  key={index + 1}
                  className="border-b border-solid border-[#F3F3F3]"
                >
                  <TouchableOpacity onPress={() => toggleAccordion(index + 1)}>
                    <View className="flex flex-row items-center gap-2 py-5">
                      <View className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F3F3F3]">
                        {openAccordionIndex === index + 1 ? (
                          <AntDesign
                            name="minus"
                            size={20}
                            color={theme.colors.secondary}
                          />
                        ) : (
                          <AntDesign
                            name="plus"
                            size={20}
                            color={theme.colors.secondary}
                          />
                        )}
                      </View>
                      <View>
                        <Text className="text-base font-semibold ">
                          {item.title}
                        </Text>
                      </View>
                    </View>
                    {openAccordionIndex === index + 1 && (
                      <Text className="text-base font-normal pb-5 text-[#232222b3] ">
                        {item.description}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

export default Instruction;
