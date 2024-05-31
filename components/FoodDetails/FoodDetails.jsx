import React, { useEffect, useState, useCallback } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntIcon from "react-native-vector-icons/AntDesign";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { theme } from "../../theme";
import PopupNotification from "./components/PopupNotification";
import OverviewTab from "../../components/FoodDetails/components/OverviewTab";
import NoteTab from "../../components/FoodDetails/components/NoteTab";
import ReviewsTab from "../../components/FoodDetails/components/ReviewsTab";
import IngredientsTab from "../../components/FoodDetails/components/IngredientsTab";
import SaveModal from "../SaveModal/SaveModal";
import {
  useIsDishInCollectionQuery,
  useAddDishToCollectionsMutation,
} from "../../slices/collectionSlice";
import {
  useIsDishInMealPlanQuery,
  useAddDishToMealPlanMutation,
  useDeleteDishFromMealPlanMutation,
  useGetMealplanIdByUserIdQuery,
} from "../../slices/mealPlanSlice";
import { useFocusEffect } from "@react-navigation/native";

const Tab = createMaterialTopTabNavigator();

function FoodDetailsScreen({ navigation, route }) {
  const { foodDetails } = route.params;
  const [userId, setUserId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [addDishToMealPlan] = useAddDishToMealPlanMutation();
  const [deleteDishFromMealPlan] = useDeleteDishFromMealPlanMutation();
  const [addDishToCollections] = useAddDishToCollectionsMutation();

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("user_id");
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error("Failed to fetch userId from AsyncStorage:", error);
      }
    };

    fetchUserId();
  }, []);

  const {
    data: isDishInCollection,
    isLoading: isCollectionLoading,
    isError: isCollectionError,
    refetch: refetchCollection,
  } = useIsDishInCollectionQuery({ userId, dishId: foodDetails.id });

  const {
    data: mealPlanID,
    isLoading: mealLoading,
    isError: mealError,
  } = useGetMealplanIdByUserIdQuery({ userId });

  const mealID = parseInt(mealPlanID?.mealplanId);

  const {
    data: isDishInMealPlan,
    isLoading: isMealPlanLoading,
    isError: isMealPlanError,
    refetch: refetchMealPlan,
  } = useIsDishInMealPlanQuery({ mealPlanId: mealID, dishId: foodDetails.id });

  console.log(mealPlanID);
  useFocusEffect(
    useCallback(() => {
      refetchCollection();
      refetchMealPlan();
    }, [refetchCollection, refetchMealPlan])
  );

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const handleToggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  console.log(mealID);
  const handleAddToMealPlan = async () => {
    if (!isDishInMealPlan?.isInMealPlan) {
      await addDishToMealPlan({ mealPlanId: mealID, dishId: foodDetails.id });
    } else {
      await deleteDishFromMealPlan({
        dishId: foodDetails.id,
        mealPlanId: mealID,
      });
    }
    refetchMealPlan();
    setModalVisible(false);
  };

  const handleAddToCollection = async () => {
    navigation.navigate("CollectionScreen", { dishId: foodDetails.id });
    refetchCollection();
    setModalVisible(false);
  };

  return (
    <View style={styles.foodDetailsScreen}>
      <View>
        <Image source={{ uri: foodDetails.imageUrl }} style={styles.image} />
        <TouchableOpacity
          onPress={handleNavigateBack}
          style={styles.backButtonContainer}
        >
          <Ionicons name="chevron-back-circle" size={30} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>{foodDetails.dishName}</Text>
          <Text style={styles.author}>By {foodDetails.author}</Text>
        </View>

        {isCollectionLoading ||
        isMealPlanLoading ||
        isCollectionError ||
        isMealPlanError ||
        mealLoading ||
        mealError ? (
          <AntIcon
            name="questioncircle"
            size={40}
            color={theme.colors.secondary}
          />
        ) : (
          <TouchableOpacity
            onPress={handleToggleModal}
            style={styles.saveIconContainer}
          >
            {isDishInCollection?.isInCollection ||
            isDishInMealPlan?.isInMealPlan ? (
              <AntIcon name="minuscircle" size={40} color="gray" />
            ) : (
              <AntIcon
                name="pluscircle"
                size={40}
                color={theme.colors.secondary}
              />
            )}
          </TouchableOpacity>
        )}
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
            {() => (
              <IngredientsTab ingredients={foodDetails.dishToIngredients} />
            )}
          </Tab.Screen>
          <Tab.Screen name="My Notes">
            {() => <NoteTab navigation={navigation} dishId={foodDetails.id} />}
          </Tab.Screen>
          <Tab.Screen name="Reviews">
            {() => (
              <ReviewsTab
                navigation={navigation}
                dishId={foodDetails.id}
                dishInfo={foodDetails.dishName}
              />
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </View>

      <SaveModal
        isVisible={isModalVisible}
        onClose={handleToggleModal}
        addMealPlanBtnText={
          isDishInMealPlan?.isInMealPlan
            ? "Remove from Meal Plan"
            : "Add to Meal Plan"
        }
        collectionButtonText={
          isDishInCollection?.isInCollection
            ? "Update Collections"
            : "Add to Collections"
        }
        onAddToMealPlan={handleAddToMealPlan}
        onAddToCollection={handleAddToCollection}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  foodDetailsScreen: {
    flex: 1,
    backgroundColor: "white",
  },
  backButtonContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 10,
  },
  image: {
    width: "100%",
    height: 300,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  headerTextContainer: {
    flex: 7,
    paddingRight: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 5,
  },
  author: {
    fontSize: 16,
    paddingHorizontal: 5,
  },
  saveIconContainer: {
    flex: 1,
  },
  containerSkeleton: {
    flex: 1,
    padding: 5,
    backgroundColor: "gray",
  },
});

export default FoodDetailsScreen;
