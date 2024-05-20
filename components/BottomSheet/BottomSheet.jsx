import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";

const BottomSheet = ({ children, closePopUp, modalVisible }) => {
  return (
    <View>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <TouchableWithoutFeedback onPress={closePopUp}>
          <View style={styles.overlay}></View>
        </TouchableWithoutFeedback>

        <View style={styles.bottomSheet}>{children}</View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  bottomSheet: {
    position: "absolute",
    width: "90%",

    bottom: 20,
    left: "5%",
    backgroundColor: "white",
    padding: 5,
    borderRadius: 10,
  },
});

export default BottomSheet;
