import React, { useState } from "react";
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import DirectionVideoModal from "./DirectionVideoModal";
import { theme } from "../../../theme";
import Ionicons from "@expo/vector-icons/Ionicons";

function DirectionTab({ directions, youtubeId }) {
  let directionsArray = [];

  const [openModal, setOpenModal] = useState(false);

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  try {
    if (typeof directions === "string") {
      directionsArray = JSON.parse(
        directions.replace(/,\s(?=\d+\.)/g, "\n").split("\n")
      );
    } else if (Array.isArray(directions)) {
      directionsArray = directions;
    } else {
      throw new Error("Invalid directions format");
    }
  } catch (error) {
    directionsArray = [];
  }
  if (!directionsArray || directionsArray?.length === 0) {
    return (
      <View style={styles.noDirectionsContainer}>
        <Text style={styles.noDirectionsText}>No directions available</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "flex-start",
        }}
      >
        <TouchableOpacity
          style={[
            styles.button,
            styles.buttonOpen,
            !youtubeId && styles.buttonDisabled,
          ]}
          onPress={toggleModal}
          disabled={!youtubeId}
        >
          <Ionicons
            name={youtubeId ? "videocam" : "videocam-off"}
            size={20}
            color="white"
          />

          <Text
            style={{
              color: "white",
              fontWeight: 600,
            }}
          >
            {youtubeId ? "Cooking Guide Video" : "No Video"}
          </Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.wrapper} showsVerticalScrollIndicator={false}>
        {directionsArray?.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.stepNumber}>{`${index + 1}.`}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}

        <DirectionVideoModal
          youtubeId={youtubeId}
          open={openModal}
          setOpen={setOpenModal}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  wrapper: {
    flex: 1,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  buttonOpen: {
    backgroundColor: theme.colors.secondary,
  },
  buttonDisabled: {
    backgroundColor: theme.colors.darkGray,
  },
  stepContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginRight: 8,
  },
  stepText: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    flexWrap: "wrap",
  },
  noDirectionsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
  },
  noDirectionsText: {
    fontSize: 16,
    color: "gray",
  },
});

export default DirectionTab;
