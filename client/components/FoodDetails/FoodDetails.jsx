import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import MoreByCreator from "./components/MoreByCreator/MoreByCreator";
import { renderStarRating } from "./components/MoreByCreator/MoreByCreator";

const foodDetails = {
  name: "Delicious Dish",
  author: "Chef John Doe",
  image: require("../../assets/icon.png"),
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
};

const moreByThisCreator = [
  {
    id: "1",
    name: "Recipe 1",
    author: "Chef John Doe",
    rating: 5,
    image: require("../../assets/icon.png"),
  },
  {
    id: "2",
    name: "Recipe 2",
    author: "Chef John Doe",
    rating: 3,
    image: require("../../assets/icon.png"),
  },
  {
    id: "3",
    name: "Recipe 3",
    author: "Chef John Doe",
    rating: 4.5,
    image: require("../../assets/icon.png"),
  },
  {
    id: "4",
    name: "Recipe 4",
    author: "Chef John Doe",
    rating: 5,
    image: require("../../assets/icon.png"),
  },
  {
    id: "5",
    name: "Recipe 5",
    author: "Chef John Doe",
    rating: 3,
    image: require("../../assets/icon.png"),
  },
];

const FoodDetailsScreen = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };
  
  const renderOverviewTab = () => (
    <View style={styles.containter}>
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <Icon name="star" size={20} color="gold" style={styles.icon} />
          <Text style={{ fontWeight: "semibold" }}>Rating:</Text>
          <Text style={styles.value}>{foodDetails.rating}</Text>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <Icon name="clock-o" size={20} color="black" style={styles.icon} />
          <Text style={{ fontWeight: "semibold" }}>Total time:</Text>
          <Text style={styles.value}>{foodDetails.totalTime} mins</Text>
        </View>
      </View>
      <View style={styles.line} />
      <MoreByCreator author={foodDetails.author} recipes={moreByThisCreator} />
    </View>
  );

  const renderIngredientsTab = () => (
    <ScrollView style={styles.containter}>
      {foodDetails.ingredients.map((ingredient, index) => (
        <View>
          <View key={index} style={styles.ingredientRow}>
            <TouchableOpacity
              style={styles.addButton}
              onPress={() => alert(`Add ${ingredient} to shopping list!`)}
            >
              <Icon name="plus" size={20} color="white" />
            </TouchableOpacity>
            <Text style={styles.ingredientText}>{ingredient}</Text>
          </View>
          <View style={styles.line} />
        </View>
      ))}
    </ScrollView>
  );

  const renderReviewsTab = () => (
    <View>
      <TouchableOpacity
        style={styles.addReviewButton}
        onPress={() => alert("Add new review!")}
      >
        <Icon name="comment" size={20} color="green" />
        <Text style={styles.addReviewText}>Add Review</Text>
      </TouchableOpacity>
      <View style={styles.line} />
      <ScrollView style={styles.containter}>
        {foodDetails.reviews.map((review, index) => (
          <View key={index} style={styles.reviewContainer}>
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>{review.user[0]}</Text>
            </View>

            <View style={styles.reviewDetails}>
              <Text style={styles.userName}>{review.user}</Text>
              <View style={styles.ratingContainer}>
                <View style={styles.ratingContainer}>
                  {renderStarRating(review.rating)}
                </View>
                <Text style={styles.ratingText}>{review.rating}</Text>
              </View>
              <Text>{review.comment}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={foodDetails.image}
        style={{ width: "100%", height: 300 }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          margin: 10,
        }}
      >
        <View>
          <Text style={{ fontSize: 24, fontWeight: "bold" }}>
            {foodDetails.name}
          </Text>
          <Text style={{ fontSize: 16 }}>{`By ${foodDetails.author}`}</Text>
        </View>

        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20,
            backgroundColor: "green",
          }}
          onPress={() => alert("Food added to planning!")}
        >
          <Icon name="plus" size={20} color="white" />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-around",
          borderBottomColor: "gray",
          borderBottomWidth: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => handleTabPress("overview")}
          style={{
            padding: 10,
            borderBottomColor: "green",
            borderBottomWidth: selectedTab === "overview" ? 2 : 0,
          }}
        >
          <Text>Overview</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTabPress("ingredients")}
          style={{
            padding: 10,
            borderBottomColor: "green",
            borderBottomWidth: selectedTab === "ingredients" ? 2 : 0,
          }}
        >
          <View>
            <Text>Ingredients</Text>
            <Text style={{ fontSize: 12 }}>
              {foodDetails.ingredients.length} Items
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTabPress("reviews")}
          style={{
            padding: 10,
            borderBottomColor: "green",
            borderBottomWidth: selectedTab === "reviews" ? 2 : 0,
          }}
        >
          <View>
            <Text>Reviews</Text>
            <Text style={{ fontSize: 12 }}>
              {foodDetails.reviews.length} Items
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1, marginTop: 20 }}>
        {selectedTab === "overview" && renderOverviewTab()}
        {selectedTab === "ingredients" && renderIngredientsTab()}
        {selectedTab === "reviews" && renderReviewsTab()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containter: {
    marginLeft: 10,
    marginRight: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ratingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
  },
  value: {
    marginLeft: 5,
  },
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: "green",
    marginBottom: 20,
    paddingBottom: 20,
  },
  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "green",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  ingredientText: {
    fontSize: 16,
  },
  addReviewButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
  },
  addReviewText: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "semibold",
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  avatarContainer: {
    backgroundColor: "lightgray",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
  },
  reviewDetails: {
    flex: 1,
  },
  userName: {
    fontWeight: "bold",
    marginBottom: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 1,
  },
  ratingText: {
    marginLeft: 5,
  },
});
export default FoodDetailsScreen;
