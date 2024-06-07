import React from "react";
import { Text, View, ScrollView, StyleSheet } from "react-native";

function DirectionTab({ directions }) {
    let directionsArray = [];
  
    try {
      if (typeof directions === 'string') {
        directionsArray = JSON.parse(
          directions.replace(/,\s(?=\d+\.)/g, "\n").split("\n")
        );
      } else if (Array.isArray(directions)) {
        directionsArray = directions;
      } else {
        throw new Error('Invalid directions format');
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
      <ScrollView style={styles.container}>
        {directionsArray?.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.stepNumber}>{`${index + 1}.`}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </ScrollView>
    );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "white",
    padding: 16,
  },
  noDirectionsText: {
    fontSize: 16,
    color: 'gray',
  },
});

export default DirectionTab;
