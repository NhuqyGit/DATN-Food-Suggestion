import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { theme } from "../../../theme/index";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native'
const RecipeCard = ({ item }) => {
    const navigation = useNavigation()
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={()=>{
        navigation.push('FoodDetail', { foodDetails: item })
      }}
    >
      <ImageBackground
        source={item.image}
        style={styles.image}
        imageStyle={{ borderRadius: 10 }}
      >
        <View style={styles.overlay}>
          <Text style={styles.rating}>{`Rating: ${item.rating}`}</Text>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.authorContainer}>
            <Text style={styles.author}>{item.author}</Text>
            <View style={styles.iconContainer}>
              <MaterialIcons name="add" size={22} color="white" />
            </View>
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    paddingVertical: 7,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "flex-end",
    height: 200,
    width: "100%",
    padding: 8,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
  rating: {
    color: "white",
    fontSize: 14,
  },
  authorContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  author: {
    color: "white",
    fontWeight: "500",
    marginRight: 4,
    textTransform: "uppercase",
    color: "#9e9e9e",
  },
  iconContainer: {
    backgroundColor: theme.colors.secondary,
    borderRadius:
      Math.round(
        Dimensions.get("window").width + Dimensions.get("window").height
      ) / 2,
    width: Dimensions.get("window").width * 0.075,
    height: Dimensions.get("window").width * 0.075,
    alignItems: "center",
    justifyContent: "center",
  },
  addIcon: {
    color: "white",
    fontSize: 16,
  },
});

export default RecipeCard;
