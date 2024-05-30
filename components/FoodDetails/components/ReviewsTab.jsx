import React, { useEffect, useCallback, useState } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { theme } from "../../../theme/index";
import { renderStarRating } from "./MoreByCreator";
import { useGetUserInfoQuery } from "../../../slices/userInfoSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useGetReviewsByDishIdQuery,
  useDeleteReviewMutation,
} from "../../../slices/reviewSlice";
import { useFocusEffect } from "@react-navigation/native";

function ReviewsTab({ navigation, dishId, dishInfo }) {
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    const fetchUserID = async () => {
      try {
        const storedUserID = await AsyncStorage.getItem("user_id");
        if (storedUserID) {
          setUserID(storedUserID);
        }
      } catch (error) {
        console.error("Failed to fetch userID from AsyncStorage:", error);
      }
    };

    fetchUserID();
  }, []);

  const {
    data: reviews,
    error: reviewError,
    isLoading: reviewLoading,
    refetch,
  } = useGetReviewsByDishIdQuery(dishId);

  useFocusEffect(
    useCallback(() => {
      if (userID) {
        refetch();
      }
    }, [refetch, userID])
  );

  const [deleteReview] = useDeleteReviewMutation();

  const userReview = reviews?.find((review) => review.userId === userID);

  const startAddingReview = () => {
    navigation.push("ReviewScreen", { dishId, dishInfo });
  };

  const handleEditReview = (review) => {
    navigation.navigate("ReviewScreen", { review, dishId, dishInfo });
  };

  const confirmDeleteReview = (id) => {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => handleDeleteReview(id),
        },
      ],
      { cancelable: true }
    );
  };

  const handleDeleteReview = async (id) => {
    try {
      await deleteReview(id).unwrap();
      refetch();
    } catch (error) {
      console.error("Failed to delete review:", error);
    }
  };

  const {
    data: users,
    error: userError,
    isLoading: userLoading,
  } = useGetUserInfoQuery();

  const getUserById = (userId) => {
    return users?.find((user) => user.id === userId);
  };

  if (!userID || reviewLoading || userLoading) return <Text>Loading...</Text>;
  if (reviewError || userError) return <Text>Error</Text>;

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <TouchableOpacity
            style={styles.addReviewButton}
            onPress={
              userReview
                ? () => handleEditReview(userReview)
                : startAddingReview
            }
          >
            <Icon
              name={userReview ? "pencil" : "comment"}
              size={20}
              color={theme.colors.secondary}
              style={{ paddingLeft: 10 }}
            />
            <Text style={styles.addReviewText}>
              {userReview ? "Edit Review" : "Add Review"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line} />
      <ScrollView>
        {reviews?.map((review) => {
          const user = getUserById(review.userId);
          return (
            <View key={review.id} style={styles.component}>
              <View style={styles.reviewContainer}>
                {user?.imgUrl ? (
                  <Image
                    source={{ uri: user.imgUrl }}
                    style={styles.userImage}
                  />
                ) : (
                  <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>
                      {user?.username.substring(0, 2)}
                    </Text>
                  </View>
                )}
                <View style={styles.reviewDetails}>
                  <Text style={styles.userName}>{user?.username}</Text>
                  <View style={styles.ratingContainer}>
                    {renderStarRating(review.rating)}
                    <Text style={styles.ratingText}>{review?.rating}</Text>
                  </View>
                  <Text>{review.content}</Text>
                </View>
              </View>
              {review.userId === userID && (
                <View style={styles.icons}>
                  <TouchableOpacity onPress={() => handleEditReview(review)}>
                    <Icon name="pencil" size={18} color="#000" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => confirmDeleteReview(review.id)}
                  >
                    <Icon name="trash" size={18} color="#000" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  component: {
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#F5F5F5",
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
  icons: {
    paddingRight: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 25,
  },
});

export default ReviewsTab;
