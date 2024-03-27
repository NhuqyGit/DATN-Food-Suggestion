import React from "react";
import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { dataAdd } from "../../../constants/Addscreen";
import ListDishItem from "../../MealPlan/components/ListDishItem";

function AddScreen() {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "white" }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}>
        Add Saved Recipe
      </Text>
      <Text style={{ fontSize: 16, color: "#999999", marginBottom: 16 }}>
        Browse your collections
      </Text>

      <ScrollView>
        {dataAdd.map((day, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate("RecipeDetails", { item: day })}
            style={{ marginBottom: 16 }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingVertical: 12,
                paddingHorizontal: 16,
                backgroundColor: "#F3F4F6",
                borderRadius: 8,
              }}
            >
              <View>
                <Text
                  style={{ fontSize: 16, fontWeight: "bold", color: "black" }}
                >
                  {day.title}
                </Text>
                <Text style={{ fontSize: 14, color: "#999999" }}>
                  {day.recipes} RECIPES
                </Text>
              </View>
              <Image
                source={day.img}
                style={{ width: 64, height: 64, borderRadius: 32 }}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

function RecipeDetailsScreen({ route }) {
  const navigation = useNavigation();
  const { item } = route.params;

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
        {item.title}
      </Text>
      <ScrollView>
        {item.assets.map((asset, assetIndex) => (
          <ListDishItem
            key={assetIndex}
            name={asset.name}
            time={asset.time}
            imgUri={asset.imgUri}
            isAdd={true}
          />
        ))}
      </ScrollView>
      <TouchableOpacity
        className=" rounded-full bg-[#40AD53] w-2/3 h-12 mx-auto my-8 justify-center items-center "
        onPress={() => {
          navigation.navigate("MainMealPlan");
        }}
      >
        <Text className="text-white text-xl font-bold">Add to your plan</Text>
      </TouchableOpacity>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function AddStack() {
  return (
    <Stack.Navigator initialRouteName="AddScreen">
      <Stack.Screen name="AddScreen" component={AddScreen} />
      <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
    </Stack.Navigator>
  );
}

export default AddStack;
