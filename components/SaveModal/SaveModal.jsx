import React from "react";
import { Modal, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AntIcon from "react-native-vector-icons/AntDesign.js";
import { theme } from "../../theme";
import { useSelector, useDispatch } from 'react-redux';
import { toggleModal, togglePopup, setAddMealPlanBtnText, setPopupMessage, setCollectionButtonText } from '../../slices/modalSlice';

function SaveModal({
  navigation,
  isModalVisible,
  collectionButtonText,
  addMealPlanBtnText,
}) {
const dispatch = useDispatch();
  const handleAddToMealPlan = () => {
    if (addMealPlanBtnText === "Add to Meal Plan") {
      dispatch(setAddMealPlanBtnText("Remove from Meal Plan"));
      dispatch(toggleModal());
      dispatch(setPopupMessage("Recipe added to your Meal Plan"));
      dispatch(togglePopup());
    } else {
      dispatch(setAddMealPlanBtnText("Add to Meal Plan"));
      dispatch(toggleModal());
      dispatch(setPopupMessage("Recipe removed from your Meal Plan"));
      dispatch(togglePopup());
    }
  };

  const handleAddToCollection = () => {
    dispatch(setCollectionButtonText("Update Collections"));
    navigation.navigate("CollectionScreen");
  };

  return (
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
  );
}

const styles = StyleSheet.create({
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
});

export default SaveModal;
