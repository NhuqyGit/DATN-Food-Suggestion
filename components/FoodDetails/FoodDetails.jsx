import React, { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import StarRating from "react-native-star-rating";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntIcon from "react-native-vector-icons/AntDesign.js";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MoreByCreator, {
  renderStarRating,
} from "./components/MoreByCreator";
import { theme } from "../../theme/index";
import PopupNotification from "./components/PopupNotification";

// const foodDetails = {
//   name: "Delicious Dish",
//   author: "Master Chef :)",
//   image: require("../../assets/monngon.jpg"),
//   ingredients: [
//     "Ingredient 1",
//     "Ingredient 2",
//     "Ingredient 3",
//     "Ingredient 4",
//     "Ingredient 5",
//     "Ingredient 6",
//   ],
//   reviews: [
//     { user: "User1", comment: "Delicious!", rating: 1 },
//     { user: "User2", comment: "Amazing recipe!", rating: 4 },
//     { user: "User1", comment: "Delicious!", rating: 5 },
//     { user: "User2", comment: "Amazing recipe!", rating: 4.5 },
//     { user: "User1", comment: "Delicious!", rating: 2 },
//     { user: "User2", comment: "Amazing recipe!", rating: 3 },
//     { user: "User1", comment: "Delicious!", rating: 3.4 },
//     { user: "User2", comment: "Amazing recipe!", rating: 4 },
//   ],
//   rating: 4,
//   totalTime: 40,
//   servings: 3,
//   calories: 80,
// };

const reportReasons = [
  "Inappropriate Content",
  "Spam",
  "Harassment",
  "False Information",
  "Bad Content",
  "Wordy",
  "False Image",
  "I don't like it",
  "Others",
];

const moreByThisCreator = [
  {
    id: "1",
    title: "Recipe 1",
    author: "Chef Huu Nien :)",
    rating: 5,
    image: require("../../assets/monngon.jpg"),
  },
  {
    id: "2",
    title: "Recipe 2",
    author: "Chef Huu Nien :)",
    rating: 3,
    image: require("../../assets/monngon.jpg"),
  },
  {
    id: "3",
    title: "Recipe 3",
    author: "Chef Huu Nien :)",
    rating: 4.5,
    image: require("../../assets/monngon.jpg"),
  },
  {
    id: "4",
    title: "Recipe 4",
    author: "Chef Huu Nien :)",
    rating: 5,
    image: require("../../assets/monngon.jpg"),
  },
  {
    id: "5",
    title: "Recipe 5",
    author: "Chef Huu Nien :)",
    rating: 3,
    image: require("../../assets/monngon.jpg"),
  },
];

function FoodDetailsScreen({ navigation , route }) {
  const { foodDetails } = route.params;
  const [selectedTab, setSelectedTab] = useState("overview");

  const [isModalVisible, setModalVisible] = useState(false);
  const [collectionButtonText, setCollectionButtonText] =
    useState("Add to Collection");
  const [addMealPlanBtnText, setAddMealPlanBtnText] =
    useState("Add to Meal Plan");
  const [isAddingReview, setAddingReview] = useState(false);
  const [newReview, setNewReview] = useState({
    user: "",
    rating: 0,
    comment: "",
  });
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [isReporting, setReporting] = useState(false);
  const [isAddingNewCollection, setIsAddingNewCollection] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const togglePopup = () => setShowPopup(!showPopup);
  const startReporting = () => {
    setReporting(true);
  };

  const cancelReporting = () => {
    setReporting(false);
    setSelectedReasons([]);
  };

  const toggleReason = (reason) => {
    if (selectedReasons.includes(reason)) {
      setSelectedReasons(selectedReasons.filter((r) => r !== reason));
    } else {
      setSelectedReasons([...selectedReasons, reason]);
    }
  };

  const handleReportSubmission = () => {
    alert(`Report Issued for Reasons: ${selectedReasons.join(", ")}`);
    cancelReporting();
  };

  const startAddingReview = () => {
    setAddingReview(true);
  };

  const cancelAddingReview = () => {
    setAddingReview(false);
  };

  const addReview = () => {
    alert(`New Review: ${JSON.stringify(newReview)}`);
    setNewReview({ user: "", rating: 0, comment: "" });
    cancelAddingReview();
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleAddToMealPlan = () => {
    if (addMealPlanBtnText === "Add to Meal Plan") {
      setAddMealPlanBtnText("Remove from Meal Plan");
      toggleModal();
      setPopupMessage("Recipe added to your Meal Plan");
      togglePopup();
    } else {
      setAddMealPlanBtnText("Add to Meal Plan");
      toggleModal();
       setPopupMessage("Recipe removed from your Meal Plan");
      togglePopup();
    }
  };

  const handleAddNewCollection = () => {
    setIsAddingNewCollection(true);
  };

  const handleAddToCollection = () => {
    setCollectionButtonText("Update Collections");
    navigation.navigate("CollectionScreen");
  };
  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  const renderOverviewTab = () => (
    <View>
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <TouchableOpacity
            style={styles.addCollecBtn}
            onPress={handleAddToCollection}
          >
            <AntIcon
              name="addfolder"
              size={20}
              color={theme.colors.secondary}
              style={styles.iconAdd}
            />
            <Text style={[styles.buttonText, styles.text]}>
              {collectionButtonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line} />
      <ScrollView style={styles.containter}>
        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Icon
              name="star"
              size={20}
              color={theme.colors.primary}
              style={styles.icon}
            />
            <Text style={styles.labelItem}>Rating:</Text>
            <Text style={styles.value}>{foodDetails.rating}</Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Ionicons
              name="timer"
              size={20}
              color={theme.colors.primary}
              style={styles.icon}
            />
            <Text style={{ fontWeight: "semibold" }}>Total time:</Text>
            <Text style={styles.value}>{foodDetails.totalTime}m</Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Ionicons
              name="server"
              size={20}
              color={theme.colors.primary}
              style={styles.icon}
            />
            <Text style={{ fontWeight: "semibold" }}>Servings:</Text>
            <Text style={styles.value}>{foodDetails.servings}</Text>
          </View>
        </View>
        <View style={styles.line} />
        <View style={styles.row}>
          <View style={styles.rowItem}>
            <Ionicons
              name="flame"
              size={20}
              color={theme.colors.primary}
              style={styles.icon}
            />
            <Text style={{ fontWeight: "semibold" }}>
              Calories per serving:
            </Text>
            <Text style={styles.value}>{foodDetails.calories}</Text>
          </View>
        </View>
        <View style={styles.line} />
        <MoreByCreator
          author={foodDetails.author}
          recipes={moreByThisCreator}
        />
        <TouchableOpacity onPress={startReporting}>
          <Text style={styles.reportIssuer}>Report Issuer</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  const renderMyNoteTab = () => (
    <View>
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <TouchableOpacity
            style={styles.addCollecBtn}
            onPress={handleAddNewCollection}
          >
            <SimpleLineIcons
              name="note"
              size={20}
              color={theme.colors.secondary}
              style={styles.iconAdd}
            />
            <Text style={[styles.buttonText, styles.text]}>Add Note</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.line} />
      {renderInitNote()}
    </View>
  );

  const renderInitNote = () => {
    return (
      <View style={styles.containerInitNote}>
        <Image
          source={require("../../assets/images/FoodDetails/notesInit.png")}
          style={styles.imageNote}
        />
        <Text style={{ textAlign: "center", fontWeight: "bold", marginTop: 5 }}>
          Jot it down
        </Text>
        <Text style={{ textAlign: "center", color: "gray", marginTop: 10 }}>
          Got an idea, reminder, or some inspiration?
        </Text>
        <Text style={{ textAlign: "center", color: "gray" }}>
          {" "}
          Save a private note here for next time.
        </Text>
      </View>
    );
  };
  const renderIngredientsTab = () => (
    <ScrollView
      style={{ paddingVertical: 20, paddingHorizontal: 15, marginBottom: 20 }}
    >
      {foodDetails.ingredients.map((ingredient, index) => (
        <View key={index.toString()}>
          <TouchableOpacity
            onPress={() => alert(`Add ${ingredient} to shopping list!`)}
          >
            <View style={styles.row}>
              <View key={index} style={styles.rowItem}>
                <Icon
                  name="cutlery"
                  size={20}
                  color={theme.colors.secondary}
                  style={{ paddingHorizontal: 10 }}
                />
                <Text style={styles.ingredientText}>{ingredient}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.line} />
        </View>
      ))}
    </ScrollView>
  );

  const renderReviewsTab = () => (
    <View>
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

  const renderReportModal = () => (
    <Modal
      animationType="slide"
      transparent
      visible={isReporting}
      onRequestClose={cancelReporting}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.overlay} onPress={cancelReporting} />
        <View style={styles.innerReportContainer}>
          <TouchableOpacity style={styles.closeIcon} onPress={cancelReporting}>
            <Icon name="close" size={20} color="black" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Select Reasons for Report</Text>
          {reportReasons.map((reason, index) => (
            <TouchableOpacity
              key={index}
              style={styles.reasonOptionContainer}
              onPress={() => toggleReason(reason)}
            >
              {selectedReasons.includes(reason) ? (
                <Icon
                  name="check-square-o"
                  size={20}
                  color={theme.colors.secondary}
                />
              ) : (
                <Icon
                  name="square-o"
                  size={20}
                  color={theme.colors.secondary}
                />
              )}
              <Text style={styles.reasonOptionText}>{reason}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity
            style={styles.reportButton}
            onPress={handleReportSubmission}
          >
            <Text style={styles.reportButtonText}>Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
        <View style={{flex: 7, paddingRight: 5}}>
          <Text
            style={{ fontSize: 24, fontWeight: "bold", paddingHorizontal: 10 }}
          >
            {foodDetails.title}
          </Text>
          <Text
            style={{ fontSize: 16, paddingHorizontal: 10 }}
          >{`By ${foodDetails.author}`}</Text>
        </View>

        <TouchableOpacity
          style={{
            flex: 1,
          }}
          onPress={toggleModal}
        >
          {(addMealPlanBtnText === "Add to Meal Plan" && collectionButtonText === "Add to Collection") ? (
          <AntIcon name="pluscircle" size={40} color={theme.colors.secondary} />
        ) : (
          <AntIcon name="minuscircle" size={40} color="gray"/>
        )}
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
            borderBottomColor: theme.colors.secondary,
            borderBottomWidth: selectedTab === "overview" ? 2 : 0,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              color:
                selectedTab === "overview" ? theme.colors.secondary : "black",
            }}
          >
            Overview
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTabPress("ingredients")}
          style={{
            padding: 10,
            borderBottomColor: theme.colors.secondary,
            borderBottomWidth: selectedTab === "ingredients" ? 2 : 0,
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                color:
                  selectedTab === "ingredients"
                    ? theme.colors.secondary
                    : "black",
              }}
            >
              Ingredients
            </Text>
            <Text style={{ fontSize: 12 }}>
              {foodDetails.ingredients.length} Items
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTabPress("notes")}
          style={{
            padding: 10,
            borderBottomColor: theme.colors.secondary,
            borderBottomWidth: selectedTab === "notes" ? 2 : 0,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              color: selectedTab === "notes" ? theme.colors.secondary : "black",
            }}
          >
            My Notes
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTabPress("reviews")}
          style={{
            padding: 10,
            borderBottomColor: theme.colors.secondary,
            borderBottomWidth: selectedTab === "reviews" ? 2 : 0,
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                color:
                  selectedTab === "reviews" ? theme.colors.secondary : "black",
              }}
            >
              Reviews
            </Text>
            <Text style={{ fontSize: 12 }}>
              {foodDetails.reviews.length} Items
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={{ flex: 1 }}>
        {selectedTab === "overview" && renderOverviewTab()}
        {selectedTab === "ingredients" && renderIngredientsTab()}
        {selectedTab === "reviews" && renderReviewsTab()}
        {selectedTab === "notes" && renderMyNoteTab()}
      </View>

      <Modal
        animationType="slide"
        transparent
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.overlay} onPress={toggleModal} />
          <View style={styles.innerContainer}>
            <TouchableOpacity style={styles.closeIcon} onPress={toggleModal}>
              <Icon name="close" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleAddToMealPlan}
            >
              <Icon name="file" size={20} color={theme.colors.secondary} />
              <Text style={styles.modalOptionText}>{addMealPlanBtnText}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalOption}
              onPress={handleAddToCollection}
            >
              <AntIcon
                name="addfolder"
                size={20}
                color={theme.colors.secondary}
              />
              <Text style={styles.modalOptionText}>{collectionButtonText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {showPopup && (
        <PopupNotification message={popupMessage} onClose={togglePopup} />
      )}
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
      {renderReportModal()}
    </View>
  );
}

const styles = StyleSheet.create({
  containter: {
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
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
    paddingVertical: 14,
  },
  addCollecBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  icon: {
    marginHorizontal: 10,
  },
  iconAdd: {
    marginLeft: 10,
  },
  containerInitNote: {
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  imageNote: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  labelItem: {
    fontWeight: "semibold",
    flex: 1,
  },
  value: {
    textAlign: "right",
    flex: 3,
    paddingRight: 15,
  },
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.secondary,
  },
  ingredientRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  addButton: {
    paddingHorizontal: 10,
  },
  ingredientText: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 16,
  },
  addReviewButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
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
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  innerContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: 252,
  },
  innerReportContainer: {
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    height: 500,
  },
  closeIcon: {
    position: "absolute",
    top: 15,
    right: 20,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    padding: 5,
    marginTop: 15,
  },
  modalOptionText: {
    marginLeft: 10,
  },

  addReviewContainer: {
    padding: 10,
  },
  addButtonReview: {
    backgroundColor: theme.colors.secondary,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
    marginTop: 45,
  },
  addButtonText: {
    color: "white",
  },

  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  cancelButtonText: {
    color: "white",
  },
  starRating: {
    marginRight: 50,
    marginTop: 20,
  },
  yourReview: {
    marginTop: 25,
  },

  reportIssuer: {
    color: theme.colors.secondary,
    fontSize: 16,
    marginBottom: 90,
    paddingLeft: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
  },
  reasonOptionContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  reasonOptionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  reportButton: {
    backgroundColor: "#FF6321",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  reportButtonText: {
    color: "white",
    fontSize: 16,
  },
  buttonText: {
    marginLeft: 10,
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },
  text: {
    color: "black",
    paddingLeft: 10,
  },
});
export default FoodDetailsScreen;
