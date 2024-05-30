import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View, ScrollView } from "react-native";
import PlanDate from "../PlanDate";

import ListDishItem from "../ListDishItem.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageService } from "../../../../utils/AsynStorage.js";
import { HOST } from "../../../../config.js";

function Unschedule() {
  const [dataDish, setDataDish] = useState();

  const handleFetchListDish = async () => {
    const user_id = await AsyncStorage.getItem("user_id");
    const token = await AsyncStorageService.getAccessToken();

    const response = await fetch(`${HOST}/mealplan/${user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (response) {
      const responseJson = await response.json();

      const data = responseJson[responseJson.length - 1].dishes?.map(
        (dishItem) => ({
          name: dishItem.dish.dishName,
          time: `${dishItem.dish.cookingTime} mins`,
          imgUri: { uri: dishItem.dish.imageUrl },
        })
      );

      setDataDish(data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await handleFetchListDish();
    };

    fetchData();
  }, []);
  return (
    <View className="py-4 h-full bg-white">
      <View className="bg-[#ECE9E9] w-full h-[1] mt-4" />
      <ScrollView>
        <View className=" px-[10px]">
          {dataDish?.map((asset, assetIndex) => (
            <ListDishItem
              key={assetIndex}
              name={asset.name}
              time={asset.time}
              imgUri={asset.imgUri}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default Unschedule;
