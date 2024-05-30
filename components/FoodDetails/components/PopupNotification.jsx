import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../../../theme/index";

const PopupNotification = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 1200);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <TouchableOpacity style={styles.container} onPress={onClose}>
      <View style={styles.popup}>
        <Text style={styles.message}>{message}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  popup: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 20,
    marginTop: 80,
    borderRadius: 5,
  },
  message: {
    color: "white",
    fontSize: 18,
  },
});

export default PopupNotification;
