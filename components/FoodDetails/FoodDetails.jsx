import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntIcon from "react-native-vector-icons/AntDesign.js";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { theme } from "../../theme/index";
import PopupNotification from "./components/PopupNotification";
import OverviewTab from "../../components/FoodDetails/components/OverviewTab";
import NoteTab from "../../components/FoodDetails/components/NoteTab";
import ReviewsTab from "../../components/FoodDetails/components/ReviewsTab";
import IngredientsTab from "../../components/FoodDetails/components/IngredientsTab";
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import {
  toggleModal,
  togglePopup,
} from "../../slices/modalSlice";
import SaveModal from "../SaveModal/SaveModal";

const Tab = createMaterialTopTabNavigator();
function FoodDetailsScreen({ navigation, route }) {
  const { foodDetails } = route.params;
  const isModalVisible = useSelector((state) => state.modal.isModalVisible);
  const showPopup = useSelector((state) => state.modal.showPopup);
  const addMealPlanBtnText = useSelector(
    (state) => state.modal.addMealPlanBtnText
  );
  const collectionButtonText = useSelector(
    (state) => state.modal.collectionButtonText
  );
  const popupMessage = useSelector((state) => state.modal.popupMessage);
  const dispatch = useDispatch();
  const scrollY = useSharedValue(0);
  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <Image
          source={foodDetails.image}
          style={{ width: "100%", height: 300 }}
        />
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="chevron-back-circle" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 10,
        }}
      >
        <View style={{ flex: 7, paddingRight: 5 }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              paddingHorizontal: 5,
            }}
          >
            {foodDetails.title}
          </Text>
          <Text
            style={{ fontSize: 16, paddingHorizontal: 5 }}
          >{`By ${foodDetails.author}`}</Text>
        </View>

        <TouchableOpacity
          style={{
            flex: 1,
          }}
          onPress={() => dispatch(toggleModal())}
        >
          {addMealPlanBtnText === "Add to Meal Plan" &&
          collectionButtonText === "Add to Collection" ? (
            <AntIcon
              name="pluscircle"
              size={40}
              color={theme.colors.secondary}
            />
          ) : (
            <AntIcon name="minuscircle" size={40} color="gray" />
          )}
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: theme.colors.secondary,
            tabBarInactiveTintColor: "gray",
            tabBarIndicatorStyle: {
              backgroundColor: theme.colors.secondary,
            },
            tabBarLabelStyle: {
              fontSize: 16,
              fontWeight: "bold",
              width: 400,
              textTransform: "none",
            },
          }}
        >
          <Tab.Screen name="Overview">
            {() => (
              <OverviewTab foodDetails={foodDetails} navigation={navigation} />
            )}
          </Tab.Screen>
          <Tab.Screen name="Ingredients">
            {() => <IngredientsTab foodDetails={foodDetails} />}
          </Tab.Screen>
          <Tab.Screen name="My Notes">
            {() => <NoteTab foodDetails={foodDetails} />}
          </Tab.Screen>
          <Tab.Screen name="Reviews">
            {() => <ReviewsTab foodDetails={foodDetails} />}
          </Tab.Screen>
        </Tab.Navigator>
      </View>
      <SaveModal
        navigation={navigation}
        isModalVisible={isModalVisible}
        addMealPlanBtnText={addMealPlanBtnText}
        collectionButtonText={collectionButtonText}
      />
      {showPopup && (
        <PopupNotification
          message={popupMessage}
          onClose={() => dispatch(togglePopup())}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
  },
});

export default FoodDetailsScreen;
