import React, { useCallback, useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import ListDishItem from "../ListDishItem.jsx";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageService } from "../../../../utils/AsynStorage.js";
import { HOST } from "../../../../config.js";
import { useFocusEffect } from "@react-navigation/native";

function Unschedule() {
  const [dataDish, setDataDish] = useState([]);
  const [random, setRandom] = useState(0);

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

      const unscheduledDishes = responseJson[
        responseJson.length - 1
      ].dishes?.map((dishItem) => ({
        dish_id: dishItem?.dish?.id,
        name: dishItem.dish.dishName,
        time: `${dishItem.dish.cookingTime} mins`,
        imgUri: { uri: dishItem.dish.imageUrl },
      }));

      setDataDish(unscheduledDishes || []);
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await handleFetchListDish();
      };

      fetchData();
    }, [random])
  );

  return (
    <View className="py-4 h-full bg-white">
      <ScrollView>
        <View className=" px-[10px]">
          {dataDish?.map((asset, assetIndex) => (
            <ListDishItem
              id={asset.dish_id}
              key={assetIndex}
              name={asset.name}
              time={asset.time}
              imgUri={asset.imgUri}
              setRandom={setRandom}
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export default Unschedule;
