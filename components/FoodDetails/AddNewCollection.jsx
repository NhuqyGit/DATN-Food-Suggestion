import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { theme } from "../../theme/index";
import { useCreateCollectionMutation } from "../../slices/collectionSlice";

const AddCollectionScreen = ({ navigation }) => {
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDes, setNewCollectionDes] = useState("");
  const [createCollection, { isLoading }] = useCreateCollectionMutation();

  const handleOk = async () => {
    try {
      await createCollection({ collectionName: newCollectionName, collectionDcrpt: newCollectionDes }).unwrap();
      console.log("Collection added:", newCollectionName);
      setNewCollectionName("");
      setNewCollectionDes("");
      navigation.goBack();
    } catch (error) {
      console.error("Failed to create collection:", error);
    }
  };

  const handleCancel = () => {
    setNewCollectionDes("");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.header}
      >
        <Ionicons name="close-circle-outline" size={30} color="gray" />
      </TouchableOpacity>
      <Text style={styles.title}>Add collection</Text>
      <View style={styles.subcontainer}>
        <TextInput
          style={styles.input}
          placeholder="Name your collection"
          value={newCollectionName}
          onChangeText={setNewCollectionName}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Add a description (optional)"
          multiline={true}
          numberOfLines={6}
          value={newCollectionDes}
          onChangeText={setNewCollectionDes}
        />
        <TouchableOpacity style={styles.saveButton} onPress={handleOk} disabled={isLoading}>
          <Text style={styles.buttonText}>{isLoading ? 'Saving...' : 'Save'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginVertical: 30,
  },
  subcontainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
    backgroundColor: "#F5F5F5",
    width: "100%",
  },
  descriptionInput: {
    height: 150,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  cancelButton: {
    backgroundColor: "gray",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 24,
    width: "40%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AddCollectionScreen;
