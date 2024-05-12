import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Modal,
  TextInput,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { theme } from "../../../theme/index";
import StarRating from "react-native-star-rating";
import { renderStarRating } from "./MoreByCreator";
import { useGetUserInfoQuery } from "../../../slices/userInfoSlice";
function ReviewsTab({ reviews }) {
  const startAddingReview = () => {
    setAddingReview(true);
  };
  const addReview = () => {
    alert(`New Review: ${JSON.stringify(newReview)}`);
    setNewReview({ user: "", rating: 0, comment: "" });
    cancelAddingReview();
  };
  const cancelAddingReview = () => {
    setAddingReview(false);
  };
  const [isAddingReview, setAddingReview] = useState(false);
  const [newReview, setNewReview] = useState({
    user: "",
    rating: 0,
    comment: "",
  });

  const { data: users, error: userError, isLoading: userLoading } = useGetUserInfoQuery();
  useEffect(() => {
    console.log("Users:", users);
  }, [users]);

  const getUserById = (userId) => {
    return users?.find((user) => user.id === userId);
  };
  if(userError) return <Text>Error</Text>;
  if(userLoading) return <Text>Loading</Text>;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <TouchableOpacity
            style={styles.addReviewButton}
            onPress={startAddingReview}
          >
            <Icon
              name="comment"
              size={20}
              color={theme.colors.secondary}
              style={{ paddingLeft: 10 }}
            />
            <Text style={styles.addReviewText}>Add Review</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line} />
      <ScrollView style={styles.reriewList}>
        {reviews?.map((review) => {
          const user = getUserById(review.userId);
          return (
            <View key={review.id} style={styles.reviewContainer}>
              {user.imgUrl ? (
                <Image source={{ uri: user.imgUrl }} style={styles.userImage} />
              ) : (
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatarText}>
                    {user.username.substring(0, 2)}
                  </Text>
                </View>
              )}
              <View style={styles.reviewDetails}>
                <Text style={styles.userName}>{user.username}</Text>
                <View style={styles.ratingContainer}>
                  <View style={styles.ratingContainer}>
                    {renderStarRating(review.rating)}
                  </View>
                  <Text style={styles.ratingText}>{review?.rating}</Text>
                </View>
                <Text>{review.content}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent
        visible={isAddingReview}
        onRequestClose={cancelAddingReview}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.overlay}
            onPress={cancelAddingReview}
          />
          <View style={styles.innerContainer}>
            <TouchableOpacity
              style={styles.closeIcon}
              onPress={cancelAddingReview}
            >
              <Icon name="close" size={20} color="black" />
            </TouchableOpacity>
            <View style={styles.addReviewContainer}>
              <View style={styles.starRating}>
                <StarRating
                  maxStars={5}
                  rating={newReview.rating}
                  starSize={20}
                  fullStarColor="#FF6321"
                  selectedStar={(rating) =>
                    setNewReview({ ...newReview, rating })
                  }
                />
              </View>

              <TextInput
                style={styles.yourReview}
                placeholder="Your Review"
                multiline
                value={newReview.comment}
                onChangeText={(text) =>
                  setNewReview({ ...newReview, comment: text })
                }
              />
              <TouchableOpacity
                style={styles.addButtonReview}
                onPress={addReview}
              >
                <Text style={styles.addButtonText}>Add Review</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
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
    borderWidth: 0.3,
    padding: 20,
    height: 280,
  },
  closeIcon: {
    position: "absolute",
    top: 15,
    right: 20,
  },
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.secondary,
  },
  addButtonText: {
    color: "white",
  },
  addReviewButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  addReviewContainer: {
    padding: 10,
  },
  addButtonReview: {
    backgroundColor: theme.colors.secondary,
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "50%",
    alignSelf: "center",
    marginTop: 10,
    marginTop: 45,
  },
  addReviewText: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  reviewContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  reriewList: {
    padding: 15,
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
  starRating: {
    marginRight: 50,
    marginTop: 20,
  },
  yourReview: {
    marginTop: 25,
  },
});
export default ReviewsTab;
