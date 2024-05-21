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
import {
  useCreateReviewMutation,
  useUpdateReviewMutation,
} from "../../slices/reviewSlice";
import { useGetUserByIdQuery } from "../../slices/userInfoSlice";

const ReviewScreen = ({ route }) => {
  const navigation = useNavigation();
  const { dishId, userId, dishInfo, review } = route.params || {};

  const [createReview, { isLoading: isCreating }] = useCreateReviewMutation();
  const [updateReview, { isLoading: isUpdating }] = useUpdateReviewMutation();
  const [rating, setRating] = useState(review ? review.rating : 1);
  const [reviewContent, setReview] = useState(review ? review.content : "");
  const [errorRating, setErrorRating] = useState("");
  const {
    data: userInf,
    error: userErr,
    isLoading: userLoading,
  } = useGetUserByIdQuery(userId);
  const handleCancel = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    try {
      if (reviewContent === "") {
        setErrorRating("* Review required");
      } else {
        setErrorRating("");
        if (review) {
          await updateReview({
            id: review.id,
            dishId: parseInt(dishId),
            userId: parseInt(userId),
            content: reviewContent,
            rating: parseInt(rating),
          }).unwrap();
        } else {
          await createReview({
            dishId: parseInt(dishId),
            userId: parseInt(userId),
            content: reviewContent,
            rating: parseInt(rating),
          }).unwrap();
        }
        setRating(1);
        setReview("");
        navigation.goBack();
      }
    } catch (error) {
      console.error("Failed to submit review:", error);
    }
  };

  useEffect(() => {
    console.log("dishInfo1: ", userInf);
  });
  if (userErr) return <Text>Get user err</Text>;
  if (userLoading) return <Text>Loading current user</Text>;
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.dishInfo}>{dishInfo}</Text>
          <TouchableOpacity onPress={handleCancel} style={styles.closeButton}>
            <Ionicons name="close-circle-outline" size={30} color="gray" />
          </TouchableOpacity>
        </View>
        <Text style={styles.subtitle}>
          {review ? "Edit Review" : "Leave a review"}
        </Text>

        <View style={styles.divider} />
        <View style={styles.userInfo}>
          {userInf?.imgUrl ? (
            <Image source={{ uri: userInf.imgUrl }} style={styles.userImage} />
          ) : (
            <View style={styles.avatarContainer}>
              <Text style={styles.avatarText}>
                {userInf?.username.substring(0, 2)}
              </Text>
            </View>
          )}
          <View style={styles.userText}>
            <Text style={styles.userName}>{userInf.username}</Text>
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
        disabled={isCreating || isUpdating}
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
  avatarContainer: {
    backgroundColor: "lightgray",
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  avatarText: {
    fontSize: 16,
  },
});

export default ReviewScreen;
