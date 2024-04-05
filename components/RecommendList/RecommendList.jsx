import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import RecommendItem from "../RecommendItem/RecommendItem";
import { theme } from "../../theme";
import RecommendItemHorizontal from "../RecommendItem/RecommendItemHorizontal";
import SmallRecommendItem from "../RecommendItem/SmallRecommendItem";

function RecommendList() {
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
        { user: "User1", comment: "Following the recipe instructions was a breeze, and the end result was truly satisfying. The creamy Alfredo sauce was velvety smooth, perfectly coating each strand of pasta!", rating: 1 },
        { user: "User2", comment: "I appreciated the simplicity of the ingredients list. It made it so easy to throw together a delicious meal without needing to make a trip to the store.", rating: 4 },
        { user: "User1", comment: "The cooking times for the chicken and pasta were spot on – everything came together perfectly.", rating: 5 },
        { user: "User2", comment: "Amazing recipe!", rating: 4.5 },
        { user: "User1", comment: "I would recommend adding a squeeze of lemon juice to the sauce to brighten up the flavors.!", rating: 2 },
        { user: "User2", comment: "Amazing recipe!", rating: 3 },
        { user: "User1", comment: "Delicious!", rating: 3.4 },
        { user: "User2", comment: "I loved the creamy texture of the Alfredo sauce, but I felt like it needed a bit more seasoning.!", rating: 4 },
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
        { user: "User1", comment: "Impeccable service and mouthwatering flavors make this a must-visit spot. From the moment you step in, you're treated to a culinary journey that delights the senses!", rating: 3 },
        { user: "User2", comment: "Amazing recipe!", rating: 4 },
        { user: "User1", comment: "I would recommend adding a squeeze of lemon juice to the sauce to brighten up the flavors.!", rating: 5 },
        { user: "User2", comment: "I loved the creamy texture of the Alfredo sauce, but I felt like it needed a bit more seasoning.", rating: 4.5 },
        { user: "User1", comment: "Delicious!", rating: 2 },
        { user: "User2", comment: "Amazing recipe!", rating: 3 },
        { user: "User1", comment: "I loved the creamy texture of the Alfredo sauce, but I felt like it needed a bit more seasoning.!", rating: 3.4 },
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
        { user: "User2", comment: "I would recommend adding a squeeze of lemon juice to the sauce to brighten up the flavors.!", rating: 4 },
        { user: "User1", comment: "The cooking times for the chicken and pasta were spot on – everything came together perfectly.", rating: 5 },
        { user: "User2", comment: "Amazing recipe!", rating: 4.5 },
        { user: "User1", comment: "I loved the creamy texture of the Alfredo sauce, but I felt like it needed a bit more seasoning.", rating: 2 },
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
        { user: "User1", comment: "I loved the creamy texture of the Alfredo sauce, but I felt like it needed a bit more seasoning.!", rating: 1 },
        { user: "User2", comment: "Amazing recipe!", rating: 4 },
        { user: "User1", comment: "I would recommend adding a squeeze of lemon juice to the sauce to brighten up the flavors.!", rating: 5 },
        { user: "User2", comment: "I loved the creamy texture of the Alfredo sauce, but I felt like it needed a bit more seasoning.", rating: 4.5 },
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
  return (
    <View style={styles.container}>
      {/* <View style={styles.horizontalPadding}> */}
      <View style={styles.header}>
        <Text style={styles.title}>Yours recommendations</Text>
        <TouchableOpacity>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.listItem}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {mockData?.map((item) => (
          <RecommendItem key={item.id} item={item} />
        ))}
      </ScrollView>
      {/* </View> */}

      {/* <View style={styles.horizontalPadding}>
        <View style={styles.header}>
          <Text style={styles.title}>Yours recommendations</Text>
        </View>
        <ScrollView
          style={styles.listItem}
          vertical
          showsVerticalScrollIndicator={false}>
          {mockData?.map((item) => (
            <RecommendItemHorizontal key={item.id} item={item} />
          ))}
        </ScrollView>
      </View> */}

      <View style={[styles.healthyList, styles.horizontalPadding]}>
        <View style={styles.header}>
          <Text style={styles.title}>Healthy recipes</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.listItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {mockData?.map((item) => (
            <SmallRecommendItem key={item.id} item={item} />
          ))}
        </ScrollView>

        <View style={styles.header}>
          <Text style={styles.title}>Quick recipes</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          style={styles.listItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {mockData?.map((item) => (
            <SmallRecommendItem key={item.id} item={item} />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: 16,
    flexDirection: "column",
  },

  header: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "600",
  },

  viewAll: {
    fontSize: 16,
    color: theme.colors.secondary,
    fontWeight: "500",
  },

  listItem: {
    paddingLeft: 20,
  },

  healthyList: {
    backgroundColor: "#FEFFD3",
    paddingBottom: 32,
    marginTop: 30,
  },
});

export default RecommendList;
