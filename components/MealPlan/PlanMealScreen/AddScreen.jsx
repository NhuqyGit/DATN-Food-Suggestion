import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListDishItem from "../../MealPlan/components/ListDishItem";
import BackButton from "../../BackButton/BackButton";
import CloseButton from "../../BackButton/CloseButton";
import { theme } from "../../../theme/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageService } from "../../../utils/AsynStorage";
import moment from "moment";
import SearchValueSkeleton from "../../../screens/Search/ViewImageScreen/SearchValueSkeleton";
import IngredientSkeleton from "../../../screens/Search/ViewImageScreen/IngredientSkeleton";
import CuisineSkeleton from "../../../screens/Search/ViewImageScreen/CuisineSkeleton";

function AddScreen() {
  const navigation = useNavigation();
  const [dataCollection, setDataCollection] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleFetchListCollection = async () => {
    setIsLoading(true);
    const user_id = await AsyncStorage.getItem("user_id");
    const token = await AsyncStorageService.getAccessToken();
    const date = await AsyncStorage.getItem("planDate");

    const dateFormat = moment.utc(date, "YYYY-MMMM Do");

    const momentObject = moment(dateFormat);

    const formattedDate = momentObject.format("YYYY-MM-DD");

    const response2 = await fetch(
      `https://datn-admin-be.onrender.com/mealplan/user/${user_id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const mealplanJson = await response2.json();

    const mealplanId = mealplanJson?.mealplanId;

    const dishRes = await fetch(
      `https://datn-admin-be.onrender.com/mealplan/dishes/date?planDate=${formattedDate}&mealPlanId=${mealplanId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const dishIdDish = await dishRes.json();

    const response = await fetch(
      `https://datn-admin-be.onrender.com/collections/user/${user_id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response) {
      const responseJson = await response.json();

      const data = responseJson?.map((item) => {
        const filteredAssets = item.dishes.filter(
          (dishItem) => !dishIdDish.includes(dishItem.id)
        );

        return {
          title: item?.collectionName,
          recipes: item?.dishes?.length || 0,
          img:
            item.dishes.length > 0
              ? item.dishes[0].imageUrl
              : "https://img.freepik.com/free-vector/food-dishes-collection_52683-2957.jpg",
          assets: filteredAssets.map((dishItem) => ({
            dish_id: dishItem?.id,
            name: dishItem.dishName,
            time: `${dishItem.cookingTime}`,
            imgUri: { uri: dishItem.imageUrl },
          })),
        };
      });
      setDataCollection(data);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleFetchListCollection();
    };

    fetchData();
  }, []);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "white" }}>
      <BackButton />

      <Text
        className="mt-4"
        style={{ fontSize: 20, fontWeight: "bold", marginBottom: 8 }}
      >
        Add Saved Recipe
      </Text>
      <Text style={{ fontSize: 16, color: "#999999", marginBottom: 16 }}>
        Browse your collections
      </Text>

      {isLoading ? (
        <View className="flex flex-wrap gap-2 mt-4">
          <CuisineSkeleton total={4} />
        </View>
      ) : (
        <ScrollView>
          {dataCollection?.map((collection, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate("RecipeDetails", {
                  item: collection,
                })
              }
              style={{ marginBottom: 16 }}
            >
              <View
                className="flex flex-row items-center justify-between px-4 py-3 bg-[#F3F4F6] rounded-lg "
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingVertical: 12,
                  paddingHorizontal: 16,
                  backgroundColor: "#F3F4F6",
                  borderRadius: 8,
                  alignItems: "center",
                }}
              >
                <View className="flex flex-col gap-2">
                  <Text
                    style={{ fontSize: 16, fontWeight: "500", color: "black" }}
                  >
                    {collection.title}
                  </Text>
                  <Text style={{ fontSize: 13, color: "#999999" }}>
                    {collection?.assets?.length} RECIPES
                    {/* {collection.img} */}
                  </Text>
                </View>

                <Image
                  source={{ uri: collection.img }}
                  style={{ width: 64, height: 64, borderRadius: 99 }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

function RecipeDetailsScreen({ route }) {
  const navigation = useNavigation();
  const { item } = route.params;
  const [selectedDishes, setSelectedDishes] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const handleSelectDish = (dishId) => {
    setSelectedDishes((prevSelected) => {
      if (prevSelected.includes(dishId)) {
        return prevSelected.filter((id) => id !== dishId);
      } else {
        return [...prevSelected, dishId];
      }
    });
  };

  const handleAddDishes = async () => {
    setIsAdding(true);
    const user_id = await AsyncStorage.getItem("user_id");
    const token = await AsyncStorageService.getAccessToken();
    const date = await AsyncStorage.getItem("planDate");
    const dateFormat = moment.utc(date, "YYYY MMMM Do").toDate();

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

    for (const dish of selectedDishes) {
      const mealPlanIdInt = parseInt(mealplanId, 10);
      const dishIdInt = parseInt(dish, 10);

      const response = await fetch(
        `https://datn-admin-be.onrender.com/mealplan`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            mealPlanId: mealPlanIdInt,
            dishId: dishIdInt,
            planDate: dateFormat,
          }),
        }
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error("Error:", errorResponse);
      }
    }
    setIsAdding(false);
    navigation.navigate("MainMealPlan", { addedDishes: true });
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <View className="flex flex-row justify-end mt-4">
        <CloseButton />
      </View>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 16 }}>
        {item.title}
      </Text>
      <ScrollView>
        <View className="flex items-center justify-center">
          {item?.assets.length === 0 && (
            <Text className="text-base italic">No recipe found</Text>
          )}
        </View>
        {item?.assets?.length > 0 &&
          item.assets?.map((asset, assetIndex) => (
            <ListDishItem
              key={assetIndex}
              id={asset.dish_id}
              name={asset.name}
              time={asset.time}
              imgUri={asset.imgUri}
              isAdd={true}
              isSelected={selectedDishes.includes(asset.dish_id)}
              onSelectItem={handleSelectDish}
            />
          ))}
      </ScrollView>

      {item?.assets?.length > 0 && (
        <TouchableOpacity
          style={{
            backgroundColor:
              selectedDishes.length === 0
                ? theme.colors.secondary + "88"
                : theme.colors.secondary,
          }}
          className=" rounded-full w-2/3 h-12 mx-auto mt-4 justify-center items-center "
          onPress={handleAddDishes}
          disabled={selectedDishes.length === 0 || isAdding}
        >
          <Text className="text-white text-xl font-bold">Add to your plan</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const Stack = createNativeStackNavigator();

function AddStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AddScreens"
    >
      <Stack.Screen name="AddScreens" component={AddScreen} />
      <Stack.Screen name="RecipeDetails" component={RecipeDetailsScreen} />
    </Stack.Navigator>
  );
}

export default AddStack;
