import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { Rating } from "react-native-ratings";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../theme";
import { useCreateReviewMutation } from "../../slices/reviewSlice";
import { useGetUserInfoQuery } from "../../slices/userInfoSlice";

const ReviewScreen = ({ route }) => {
  const navigation = useNavigation();
  const { dishId, userId, dishInfo } = route.params || {};

  const [createReview, { isLoading }] = useCreateReviewMutation();
  const {
    data: users,
    error: userError,
    isLoading: userLoading,
  } = useGetUserInfoQuery();
  const [rating, setRating] = useState(1);
  const [reviewContent, setReview] = useState("");
  const [errorRating, setErrorRating] = useState("");

  const handleCancel = () => {
    navigation.goBack();
  };
  const handleSubmit = async () => {
    try {
      if (reviewContent === "") {
        setErrorRating("* Review required");
      } else {
        setErrorRating("");
        await createReview({
          dishId: parseInt(dishId),
          userId: parseInt(userId),
          content: reviewContent,
          rating: parseInt(rating),
        }).unwrap();
        console.log("Review added:", rating);
        setRating(1);
        setReview("");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Failed to add review:", error);
    }
  };

  useEffect(() => {
    console.log("dishInfo1: ", reviewContent);
  }, [dishInfo]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.dishInfo}>{dishInfo}</Text>
          <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
            <Ionicons name="close-circle-outline" size={30} color="gray" />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>Leave a Review</Text>

        <View style={styles.divider} />
        <View style={styles.userInfo}>
          <Image
            style={styles.avatar}
            source={{ uri: "https://www.example.com/avatar.png" }}
          />
          <View style={styles.userText}>
            <Text style={styles.userName}>HN</Text>
            <Text style={styles.posting}>Posting publicly</Text>
          </View>
        </View>
        <View style={styles.divider} />
        <Rating
          onFinishRating={setRating}
          ratingColor={theme.colors.primary}
          style={styles.rating}
          startingValue={rating}
          imageSize={30}
        />

        <TextInput
          style={styles.input}
          placeholder="Leave your feedback and share your culinary tips!"
          multiline
          numberOfLines={4}
          onChangeText={setReview}
          value={reviewContent}
        />
        {!!errorRating && <Text style={{ color: "red" }}>{errorRating}</Text>}
      </View>

      <TouchableOpacity
        style={styles.submitButton}
        onPress={handleSubmit}
        disabled={isLoading}
      >
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 50,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  dishInfo: {
    fontSize: 18,
    fontWeight: "semibold",
    flex: 1,
  },
  closeButton: {
    marginLeft: 8,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  userText: {
    marginLeft: 10,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  posting: {
    fontSize: 14,
    color: "grey",
  },
  subtitle: {
    fontSize: 22,
    marginBottom: 16,
    fontWeight: "bold",
  },
  rating: {
    marginVertical: 16,
    alignItems: "flex-start",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    textAlignVertical: "top",
  },
  submitButton: {
    backgroundColor: theme.colors.secondary,
    padding: 12,
    borderRadius: 10,
    width: "40%",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  divider: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginVertical: 16,
  },
});

export default ReviewScreen;
