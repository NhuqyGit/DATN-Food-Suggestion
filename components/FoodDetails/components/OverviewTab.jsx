import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, View, TouchableOpacity, ScrollView, StyleSheet, Modal } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import { theme } from "../../../theme/index";
import { setCollectionButtonText } from "../../../slices/modalSlice";
import { useGetAllFoodDetailsQuery } from "../../../slices/foodDetailsSlice"
import SmallRecommendItem from "../../RecommendItem/SmallRecommendItem";
import RecommendSmallSkeleton from "../../../screens/Search/ViewImageScreen/RecommendSmallSkeleton";

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

function OverviewTab({ foodDetails, navigation}) {
  const collectionButtonText = useSelector(state => state.modal.collectionButtonText);
  const [isReporting, setReporting] = useState(false);
  const dispatch = useDispatch();
  const [selectedReasons, setSelectedReasons] = useState([]);
  const handleAddToCollection = () => {
    dispatch(setCollectionButtonText("Update Collections"));
    navigation.navigate("CollectionScreen");
  };

  const {
    data: relatedDishs,
    isLoading: relatedLoading,
    isError: relatedError,
  } = useGetAllFoodDetailsQuery()

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

  const startReporting = () => {
    setReporting(true);
  };
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
          {reportReasons?.map((reason, index) => (
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
    <View style={styles.container}>
      {/* <TouchableOpacity
        style={styles.addToCollectionButton}
        onPress={handleAddToCollection}
      >
        <AntIcon
          name="addfolder"
          size={20}
          color={theme.colors.secondary}
        />
        <Text style={styles.collectionButtonText}>
          {collectionButtonText}
        </Text>
      </TouchableOpacity> */}
      {/* <View style={styles.line} /> */}
      <ScrollView style={{marginTop: 5}}>
        <View style={styles.infoItem}>
          <Icon
            name="star"
            size={20}
            color={theme.colors.primary}
            style={styles.icon}
          />
          <Text style={styles.label}>Rating:</Text>
          <Text style={styles.value}>{foodDetails?.rating}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.infoItem}>
          <Ionicons
            name="timer"
            size={20}
            color={theme.colors.primary}
            style={styles.icon}
          />
          <Text style={styles.label}>Total time:</Text>
          <Text style={styles.value}>{foodDetails?.cookingTime}m</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.infoItem}>
          <Ionicons
            name="server"
            size={20}
            color={theme.colors.primary}
            style={styles.icon}
          />
          <Text style={styles.label}>Servings:</Text>
          <Text style={styles.value}>{foodDetails?.servings}</Text>
        </View>
        <View style={styles.line} />
        <View style={styles.infoItem}>
          <Ionicons
            name="flame"
            size={20}
            color={theme.colors.primary}
            style={styles.icon}
          />
          <Text style={styles.label}>Calories per serving:</Text>
          <Text style={styles.value}>{foodDetails?.calories}</Text>
        </View>

        <ScrollView
          style={styles.listItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {relatedLoading ? (
            <RecommendSmallSkeleton total={5} />
          ) : (
            <>
              {relatedDishs?.map((item) => (
                <SmallRecommendItem key={item.id} item={item} />
              ))}
            </>
          )}
        </ScrollView>
        <TouchableOpacity onPress={startReporting}>
          <Text style={styles.reportIssuer}>Report Issuer</Text>
        </TouchableOpacity>
      </ScrollView>
      {renderReportModal()}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 15,
  },
  addToCollectionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
  },
  collectionButtonText: {
    color: theme.colors.secondary,
    fontSize: 16,
    marginLeft: 15,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  label: {
    marginLeft: 5,
    fontSize: 16,
  },
  value: {
    marginLeft: 5,
    fontSize: 16,
    textAlign: "right",
    flex: 3,
    paddingRight: 15,
  },
  icon: {
    marginRight: 10,
  },
  reportIssuer: {
    color: theme.colors.secondary,
    fontSize: 16,
    marginTop: 20,
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
  line: {
      borderBottomWidth: 0.5,
      borderBottomColor: theme.colors.secondary,
    },
    reportIssuer: {
      color: theme.colors.secondary,
      fontSize: 16,
      marginBottom: 90,
      paddingLeft: 10,
    },
    modalContainer: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "transparent",
    },
    overlay: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
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
      backgroundColor: theme.colors.secondary,
      padding: 15,
      width: "40%",
      borderRadius: 5,
      alignItems: "center",
      alignSelf:"center",
      marginTop: 20,
    },
    reportButtonText: {
      color: "white",
      fontSize: 16,
    },
    listItem: {
      marginTop: 10,
      paddingLeft: 5,
    },
  });
export default OverviewTab;
