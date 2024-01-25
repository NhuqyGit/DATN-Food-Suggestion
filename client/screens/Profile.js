import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
  ScrollView,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES } from "../theme/theme";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";

const img = require("../constants/knife-fork.jpg");
const data = [{ id: 0 }, { id: 1 }];

const SavedRecipeLists = () => (
  <View style={{ flex: 1, backgroundColor: "red" }}>
    <View
      style={{
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignItems: "center",
        backgroundColor: "blue",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 5,
      }}
    >
      <Text
        style={{
          ...FONTS.h2,
          color: COLORS.primary,
          alignItems: "center",
          padding: 5,
        }}
      >
        Saved Recipes
      </Text>
      <TouchableOpacity>
        <Text
          style={{
            ...FONTS.h2,
            color: COLORS.primary,
            alignItems: "center",
            padding: 5,
          }}
        >
          Add
        </Text>
      </TouchableOpacity>
    </View>
    {data.map((item, index) => {
      return (
        <TouchableOpacity key={index}>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "gray",
              borderRadius: 5,
              paddingHorizontal: 20,
              marginTop: 5,
              paddingVertical: 5,
            }}
          >
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.primary,
                alignItems: "center",
              }}
            >
              My recipes
            </Text>

            <Image
              source={img}
              style={{ width: 50, height: 50, borderRadius: 45 }}
            />
          </View>
        </TouchableOpacity>
      );
    })}
  </View>
);

const PersonalRecipeList = () => (
  <View style={{ flex: 1, backgroundColor: "red" }}>
    <View
      style={{
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,

        backgroundColor: "blue",
        paddingHorizontal: 5,
      }}
    >
      <Text
        style={{
          ...FONTS.h2,
          color: COLORS.primary,
          alignItems: "center",
          padding: 5,
        }}
      >
        Personal Recipes
      </Text>
    </View>

    <TouchableOpacity>
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "gray",
          borderRadius: 5,
          paddingHorizontal: 20,
          marginTop: 5,
          paddingVertical: 5,
        }}
      >
        <Text
          style={{ ...FONTS.h3, color: COLORS.primary, alignItems: "center" }}
        >
          My recipes
        </Text>

        <Image
          source={img}
          style={{ width: 50, height: 50, borderRadius: 45 }}
        />
      </View>
    </TouchableOpacity>
  </View>
);

const Profile = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <StatusBar backgroundColor={COLORS.gray} />
      <ScrollView>
        <TouchableOpacity>
          <View
            style={{
              position: "absolute",
              right: 25,
              top: 25,
              backgroundColor: "rgba(52, 52, 52, 0.1)",
              padding: 10,
              borderRadius: 999,
            }}
          >
            <MaterialIcons name="settings" size={24} color="gray" />
          </View>
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: "center", marginTop: 30 }}>
          <Image
            source={img}
            resizeMode="contain"
            style={{
              height: 100,
              width: 100,
              borderRadius: 999,
              borderColor: COLORS.primary,
              borderWidth: 0.5,
            }}
          />

          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.primary,
              marginVertical: 8,
              fontWeight: "bold",
            }}
          >
            Melissa Peters
          </Text>
        </View>

        <View style={{ flex: 1, marginHorizontal: 22, marginTop: 20, gap: 10 }}>
          <PersonalRecipeList />
          <SavedRecipeLists />
        </View>
        <View style={{ height: 500 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
