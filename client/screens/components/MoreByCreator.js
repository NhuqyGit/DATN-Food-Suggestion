import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const MoreByCreator = ({ author, recipes }) => (
  <View style={styles.container}>
    <Text style={styles.title}>More by {author}</Text>
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => alert(`View details of ${item.name}`)}
          style={styles.recipeItem}
        >
          <Image source={item.image} style={styles.recipeImage} />
          <Text style={styles.recipeName}>{item.name}</Text>
        </TouchableOpacity>
      )}
    />
    <TouchableOpacity
      style={styles.viewAllButton}
      onPress={() => alert(`View all by ${author}`)}
    >
      <Text style={{ color: "green" }}>View All</Text>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  recipeItem: {
    margin: 5,
    alignItems: "center",
  },
  recipeImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  recipeName: {
    marginTop: 5,
  },
  viewAllButton: {
    marginTop: 10,
  },
});

export default MoreByCreator;
