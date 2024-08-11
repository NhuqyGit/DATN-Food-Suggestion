import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import { useGetReviewsByDishIdQuery } from "../../slices/reviewSlice";
const DishItem = ({ item }) => {
  const navigation = useNavigation();
  const roundedRating = Math.round(item?.rating * 10) / 10;
  const { data: reviews } = useGetReviewsByDishIdQuery(item?.id);
  const [rating, setRating] = useState(0);
  useEffect(() => {
    if (reviews?.length > 0) {
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const roundedRating = totalRating
        ? (totalRating / reviews.length).toFixed(1)
        : 0;

      if (roundedRating !== rating) {
        setRating(roundedRating);
      }
    }
  }, [reviews, rating]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("FoodDetail", { foodDetails: item });
        }}
      >
        <ImageBackground
          source={{
            uri: item?.imageUrl,
          }}
          style={styles.image}
          imageStyle={{ borderRadius: 10 }}
        >
          <View style={styles.overlay}>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                marginTop: 5,
              }}
            >
              <Text style={styles.rating}>{`Rating: ${rating}`}</Text>
              <AntDesign name="star" size={20} color="#FF6321" />
            </View>
            <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
              {item?.dishName}
            </Text>
            <View style={styles.authorContainer}>
              <Text style={styles.author}>{item.author}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "flex-end",
    height: 200,
    width: "100%",
    padding: 8,
  },
  title: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    flexShrink: 1,
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
  },
  container: {
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    justifyContent: "flex-end",
  },
});

export default DishItem;
