import React from "react";
import { View, Text, ScrollView, StyleSheet,TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import RecipeCard from "./components/RecipeCard";
import { useNavigation } from "@react-navigation/native";

const mockData = [
  {
    id: 1,
    title: "Bun bo Hue with new broth, best recipe from around the world",
    author: "Master Chef :)",
    image: require("../../assets/images/Home/recommend1.png"),
    ingredients: [
      "Ingredient 1",
      "Ingredient 2",
      "Ingredient 3",
      "Ingredient 4",
      "Ingredient 5",
      "Ingredient 6",
    ],
    reviews: [
      {
        user: "User1",
        comment:
          "Following the recipe instructions was a breeze, and the end result was truly satisfying. The creamy Alfredo sauce was velvety smooth, perfectly coating each strand of pasta!",
        rating: 1,
      },
      {
        user: "User2",
        comment:
          "I appreciated the simplicity of the ingredients list. It made it so easy to throw together a delicious meal without needing to make a trip to the store.",
        rating: 4,
      },
      {
        user: "User1",
        comment:
          "The cooking times for the chicken and pasta were spot on – everything came together perfectly.",
        rating: 5,
      },
      { user: "User2", comment: "Amazing recipe!", rating: 4.5 },
      {
        user: "User1",
        comment:
          "I would recommend adding a squeeze of lemon juice to the sauce to brighten up the flavors.!",
        rating: 2,
      },
      { user: "User2", comment: "Amazing recipe!", rating: 3 },
      { user: "User1", comment: "Delicious!", rating: 3.4 },
      {
        user: "User2",
        comment:
          "I loved the creamy texture of the Alfredo sauce, but I felt like it needed a bit more seasoning.!",
        rating: 4,
      },
    ],
    rating: 4,
    totalTime: 40,
    servings: 3,
    calories: 80,
  },
  {
    id: 2,
    title: "Pho with new broth, best recipe from around the world",
    author: "Master Chef ;)",
    image: require("../../assets/images/Home/recommend2.png"),
    ingredients: [
      "Ingredient 1",
      "Ingredient 2",
      "Ingredient 3",
      "Ingredient 4",
      "Ingredient 5",
      "Ingredient 6",
    ],
    reviews: [
      {
        user: "User1",
        comment:
          "Impeccable service and mouthwatering flavors make this a must-visit spot. From the moment you step in, you're treated to a culinary journey that delights the senses!",
        rating: 3,
      },
      { user: "User2", comment: "Amazing recipe!", rating: 4 },
      {
        user: "User1",
        comment:
          "I would recommend adding a squeeze of lemon juice to the sauce to brighten up the flavors.!",
        rating: 5,
      },
      {
        user: "User2",
        comment:
          "I loved the creamy texture of the Alfredo sauce, but I felt like it needed a bit more seasoning.",
        rating: 4.5,
      },
      { user: "User1", comment: "Delicious!", rating: 2 },
      { user: "User2", comment: "Amazing recipe!", rating: 3 },
      {
        user: "User1",
        comment:
          "I loved the creamy texture of the Alfredo sauce, but I felt like it needed a bit more seasoning.!",
        rating: 3.4,
      },
      { user: "User2", comment: "Amazing recipe!", rating: 4 },
    ],
    rating: 4,
    totalTime: 40,
    servings: 3,
    calories: 80,
  },
  {
    id: 3,
    title: "Bun bo Hue with new broth, best recipe from around the world",
    author: "Master Chef :)",
    image: require("../../assets/images/Home/recommend3.png"),
    ingredients: [
      "Ingredient 1",
      "Ingredient 2",
      "Ingredient 3",
      "Ingredient 4",
      "Ingredient 5",
      "Ingredient 6",
    ],
    reviews: [
      { user: "User1", comment: "Delicious!", rating: 1 },
      {
        user: "User2",
        comment:
          "I would recommend adding a squeeze of lemon juice to the sauce to brighten up the flavors.!",
        rating: 4,
      },
      {
        user: "User1",
        comment:
          "The cooking times for the chicken and pasta were spot on – everything came together perfectly.",
        rating: 5,
      },
      { user: "User2", comment: "Amazing recipe!", rating: 4.5 },
      {
        user: "User1",
        comment:
          "I loved the creamy texture of the Alfredo sauce, but I felt like it needed a bit more seasoning.",
        rating: 2,
      },
      { user: "User2", comment: "Amazing recipe!", rating: 3 },
      { user: "User1", comment: "Delicious!", rating: 3.4 },
      { user: "User2", comment: "Amazing recipe!", rating: 4 },
    ],
    rating: 4,
    totalTime: 40,
    servings: 3,
    calories: 80,
  },
  {
    id: 4,
    title: "Delicious Dish",
    author: "Master Chef :)",
    image: require("../../assets/images/Home/recommend4.png"),
    ingredients: [
      "Ingredient 1",
      "Ingredient 2",
      "Ingredient 3",
      "Ingredient 4",
      "Ingredient 5",
      "Ingredient 6",
    ],
    reviews: [
      {
        user: "User1",
        comment:
          "I loved the creamy texture of the Alfredo sauce, but I felt like it needed a bit more seasoning.!",
        rating: 1,
      },
      { user: "User2", comment: "Amazing recipe!", rating: 4 },
      {
        user: "User1",
        comment:
          "I would recommend adding a squeeze of lemon juice to the sauce to brighten up the flavors.!",
        rating: 5,
      },
      {
        user: "User2",
        comment:
          "I loved the creamy texture of the Alfredo sauce, but I felt like it needed a bit more seasoning.",
        rating: 4.5,
      },
      { user: "User1", comment: "Delicious!", rating: 2 },
      { user: "User2", comment: "Amazing recipe!", rating: 3 },
      { user: "User1", comment: "Delicious!", rating: 3.4 },
      { user: "User2", comment: "Amazing recipe!", rating: 4 },
    ],
    rating: 4,
    totalTime: 40,
    servings: 3,
    calories: 80,
  },
  {
    id: 5,
    title: "Delicious Dish",
    author: "Master Chef :)",
    image: require("../../assets/monngon.jpg"),
    ingredients: [
      "Ingredient 1",
      "Ingredient 2",
      "Ingredient 3",
      "Ingredient 4",
      "Ingredient 5",
      "Ingredient 6",
    ],
    reviews: [
      { user: "User1", comment: "Delicious!", rating: 1 },
      { user: "User2", comment: "Amazing recipe!", rating: 4 },
      { user: "User1", comment: "Delicious!", rating: 5 },
      { user: "User2", comment: "Amazing recipe!", rating: 4.5 },
      { user: "User1", comment: "Delicious!", rating: 2 },
      { user: "User2", comment: "Amazing recipe!", rating: 3 },
      { user: "User1", comment: "Delicious!", rating: 3.4 },
      { user: "User2", comment: "Amazing recipe!", rating: 4 },
    ],
    rating: 4,
    totalTime: 40,
    servings: 3,
    calories: 80,
  },
];
const ExploreCategories = ({ route }) => {
  const navigation = useNavigation();
  const catName = route.params.cate;
  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.cateTitle}>{catName}</Text>
      </View>
      
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.section}>
          {mockData?.map((item) => (
            <RecipeCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 30,
      },
      cateTitle: {
        fontSize: 24,
        fontWeight: "bold",
        paddingLeft: 5,
      },
      backButton: {
        padding: 20,
      },
      scrollViewContainer: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 20,
      },
      section: {
        width: "90%",
      },
});

export default ExploreCategories;
