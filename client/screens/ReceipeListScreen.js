import { View, Text, ScrollView, TouchableOpacity, Modal } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS, FONTS, SIZES } from "../theme/theme";
import { StatusBar } from "expo-status-bar";
import { MenuOption, MenuProvider, MenuTrigger } from "react-native-popup-menu";

const RecipeListItem = ({ item }) => {
  const [isVisible, setVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "gray",
            borderRadius: 5,
            borderTopWidth: 0.5,
            borderColor: "gray",
            paddingHorizontal: 20,
            paddingVertical: 5,
          }}
        >
          <Image
            source={img}
            style={{ width: 50, height: 50, borderRadius: 45 }}
          />

          <Text
            style={{
              ...FONTS.h3,
              color: COLORS.primary,
              alignItems: "center",
            }}
          >
            My recipes
          </Text>
          <Menu>
          <MenuTrigger>
            <MaterialIcons name="more-vert" color="gray" size={24} />
          </MenuTrigger>
          <MenuOption>
            <Text>Close</Text>
          </MenuOption>
        </Menu>
        </View>
        
      </TouchableOpacity>
    </View>
  );
};

const ReceipeListScreen = ({ route, navigation }) => {
  const ListID = route.params;

  // get data
  data = [
    { id: 0, name: "a" },
    { id: 1, name: "b" },
    { id: 2, name: "c" },
    { id: 3, name: "d" },
    { id: 4, name: "e" },
    { id: 5, name: "f" },
  ];

  return (
    <MenuProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
        <StatusBar backgroundColor={COLORS.gray} />
        <View style={{ height: "10%" }}>
          <Text>ReceipeListScreen</Text>
        </View>

        <TouchableOpacity>
          <View
            style={{
              position: "absolute",
              left: 25,
              top: 25,
              backgroundColor: "rgba(52, 52, 52, 0.1)",
              padding: 10,
              borderRadius: 999,
            }}
          >
            <MaterialIcons name="close" size={24} color="gray" />
          </View>
        </TouchableOpacity>
        <ScrollView>
          {data.map((item, index) => {
            return <RecipeListItem key={index} item={item} />;
          })}
        </ScrollView>
      </SafeAreaView>
    </MenuProvider>
  );
};

export default ReceipeListScreen;
