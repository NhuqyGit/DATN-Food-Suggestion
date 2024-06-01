import React from "react";
import { Modal, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import AntIcon from "react-native-vector-icons/AntDesign";
import { theme } from "../../theme";

function SaveModal({
  isVisible,
  onClose,
  addMealPlanBtnText,
  collectionButtonText,
  onAddToMealPlan,
  onAddToCollection,
}) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.overlay} onPress={onClose} />
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Icon name="close" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={onAddToMealPlan}
          >
            <Icon name="file" size={20} color={theme.colors.secondary} />
            <Text style={styles.modalOptionText}>{addMealPlanBtnText}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={onAddToCollection}
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
