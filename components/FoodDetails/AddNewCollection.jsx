import React, { useEffect, useState } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";

const AddCollectionScreen = ({ navigation }) => {
  const [newCollectionName, setNewCollectionName] = useState("");
  const [newCollectionDes, setNewCollectionDes] = useState("");
  const [errorTxt, setError] = useState("");
  const [createCollection, { isLoading }] = useCreateCollectionMutation();
  const [userID, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("user_id");
        if (storedUserId) {
          //console.log("User id: ", storedUserId);
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error("Failed to fetch userId from AsyncStorage:", error);
      }
    };

    fetchUserId();
  }, []);

  const idUser = parseInt(userID);
  const handleOk = async () => {
    try {
      if (!idUser) {
        setError("User is not identified. Please try again later.");
        return;
      }

      //console.log("new collection name: ", newCollectionName);

      await createCollection({
        userId: idUser,
        name: newCollectionName,
        description: newCollectionDes,
      }).unwrap();

      setNewCollectionName("");
      setNewCollectionDes("");
      setError("");
      navigation.goBack();
    } catch (error) {
      if (
        error?.data?.message &&
        typeof error.data.message === "string" &&
        error.data.message.includes("Collection already exists")
      ) {
        setError(
          "Collection name already exists.\nPlease choose a different name for your collection."
        );
      } else {
        setError("Failed to create collection. Please try again.");
      }
    }
  };

  const handleCancel = () => {
    setNewCollectionName("");
    setNewCollectionDes("");
    setError("");
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleCancel} style={styles.header}>
        <Ionicons name="close-circle-outline" size={30} color="gray" />
      </TouchableOpacity>
      <Text style={styles.title}>Add collection</Text>
      <View style={styles.subcontainer}>
        {errorTxt ? <Text style={styles.errorText}>{errorTxt}</Text> : null}
        <TextInput
          style={styles.input}
          placeholder="Name your collection"
          value={newCollectionName}
          onChangeText={(text) => {
            setError("");
            setNewCollectionName(text);
          }}
        />
        <TextInput
          style={[styles.input, styles.descriptionInput]}
          placeholder="Add a description (optional)"
          multiline={true}
          numberOfLines={6}
          value={newCollectionDes}
          onChangeText={setNewCollectionDes}
        />
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleOk}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? "Saving..." : "Save"}
          </Text>
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
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
});

export default AddCollectionScreen;
