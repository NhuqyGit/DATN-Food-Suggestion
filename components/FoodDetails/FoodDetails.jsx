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
const Tab = createMaterialTopTabNavigator();

//export const { height: sHeight, width: sWidth } = Dimensions.get("screen");
//const ImageHeight = 280;

function FoodDetailsScreen({ navigation, route }) {
  const { foodDetails } = route.params;
  const [isModalVisible, setModalVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [collectionButtonText, setCollectionButtonText] =
    useState("Add to Collection");
  const [addMealPlanBtnText, setAddMealPlanBtnText] =
    useState("Add to Meal Plan");

  const [popupMessage, setPopupMessage] = useState("");
  const togglePopup = () => setShowPopup(!showPopup);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddToMealPlan = () => {
    if (addMealPlanBtnText === "Add to Meal Plan") {
      setAddMealPlanBtnText("Remove from Meal Plan");
      toggleModal();
      setPopupMessage("Recipe added to your Meal Plan");
      togglePopup();
    } else {
      setAddMealPlanBtnText("Add to Meal Plan");
      toggleModal();
      setPopupMessage("Recipe removed from your Meal Plan");
      togglePopup();
    }
  };
  const handleAddToCollection = () => {
    setCollectionButtonText("Update Collections");
    navigation.navigate("CollectionScreen");
  };

  const scrollY = useSharedValue(0);
  const handleScroll = useAnimatedScrollHandler((event) => {
    scrollY.value = event.contentOffset.y;
  });

  // const scrollAnimatedStyles = useAnimatedStyle(() => {
  //   const translateY = interpolate(
  //     scrollY.value,
  //     [0, 320],
  //     [0, -ImageHeight],
  //     Extrapolation.CLAMP
  //   );
  //   return { transform: [{ translateY }] };
  // });

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
          onPress={toggleModal}
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
            {() => <OverviewTab foodDetails={foodDetails} />}
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
      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.overlay} onPress={toggleModal} />
          <View style={styles.innerContainer}>
            <TouchableOpacity style={styles.closeIcon} onPress={toggleModal}>
              <Icon name="close" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleAddToMealPlan}
            >
              <Icon name="file" size={20} color={theme.colors.secondary} />
              <Text style={styles.modalOptionText}>{addMealPlanBtnText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleAddToCollection}
            >
              <AntIcon
                name="addfolder"
                size={20}
                color={theme.colors.secondary}
              />
              <Text style={styles.modalOptionText}>{collectionButtonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {showPopup && (
        <PopupNotification message={popupMessage} onClose={togglePopup} />
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
  tabBarLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  innerContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: 252,
  },
  closeIcon: {
    position: "absolute",
    top: 15,
    right: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 5,
    marginTop: 15,
  },
  modalOptionText: {
    marginLeft: 10,
  },
});

export default FoodDetailsScreen;
