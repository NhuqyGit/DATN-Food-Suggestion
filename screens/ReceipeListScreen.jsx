import { MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from "react-native-popup-menu";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../theme/theme";
import { theme } from "../theme/index";

const img = require("../constants/knife-fork.jpg");

function RecipeListItem({ item, removeDish }) {
  return (
    <View>
      <TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 5,
            borderBottomWidth: 0.5,
            borderColor: "gray",
            marginTop: 0.5,
            paddingRight: 20,
            paddingLeft: 0,
            paddingVertical: 5,
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image source={img} style={{ width: 100, height: 80 }} />

            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.primary,
                alignItems: "center",
              }}
            >
              {item.name}
            </Text>
          </View>
          <Menu>
            <MenuTrigger>
              <View
                style={{
                  padding: 5,
                }}
              >
                <MaterialIcons name="more-vert" size={24} color="gray" />
              </View>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption
                onSelect={() => {
                  removeDish(item.id);
                }}
              >
                <Text style={{ color: "red" }}>Remove</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </TouchableOpacity>
    </View>
  );
}

function ReceipeListScreen({ route, navigation }) {
  const collectionId = route.params.id;
  const collectionName = route.params.name;
  const [isClicked, setIsClicked] = useState(false);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchDishes = async () => {
      const token = await AsyncStorageService.getAccessToken();
      try {
        const response = await fetch(`${HOST}/collections/${collectionId}/dishes`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const responseJson = await response.json();

        if (responseJson.error) {
          console.log(responseJson.message);
        } else {
          setDishes(responseJson);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDishes()
  }, []);

  const removeDishFromCollection = async (dishId) => {
    const token = await AsyncStorageService.getAccessToken();
    try {
      const response = await fetch(
        `${HOST}/collections/${collectionId}/removeDish/${dishId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        //remove dish from [dishes]
        setDishes((prev) => {
          return prev.filter((dish) => dish.id != dishId);
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeCollection = async (id) => {
    const token = await AsyncStorageService.getAccessToken();
    try {
      const response = await fetch(`${HOST}/collections/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        navigation.goBack();
      }
    } catch (error) {
      console.error(error);
    }
    setIsClicked(false);
  };

  return (
    <MenuProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "orange",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: "absolute",
              left: 10,
              top: 15,
            }}
          >
            <MaterialIcons name="keyboard-arrow-left" size={40} color="white" />
          </TouchableOpacity>

          <Text style={{ ...FONTS.h1, paddingVertical: 20, color: "white" }}>
            {collectionName}
          </Text>
          <Menu
            style={{
              position: "absolute",
              right: 20,
              top: 20,
            }}
          >
            <MenuTrigger>
              <View
                style={{
                  padding: 5,
                }}
              >
                <MaterialIcons name="more-vert" size={24} color="gray" />
              </View>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption
                onSelect={() => {
                  setIsClicked(true);
                  removeCollection(collectionId);
                }}
                disabled={isClicked}
              >
                <Text style={{ color: "red" }}>Delete</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>

        <ScrollView>
          {dishes?.map((item, index) => {
            return (
              <RecipeListItem
                item={item}
                key={index}
                removeDish={removeDishFromCollection}
              />
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "70%",
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
});

export default ReceipeListScreen;
