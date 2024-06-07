import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { theme } from "../../theme/index";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  useGetCollectionsByUserIdQuery,
  useAddDishToCollectionsMutation,
} from "../../slices/collectionSlice";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CollectionScreen = ({ navigation, route }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [userId, setUserId] = useState(null);
  const {dishId} = route.params;
  
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem("user_id");
        if (storedUserId) {
          setUserId(storedUserId);
        }
      } catch (error) {
        console.error("Failed to fetch userId from AsyncStorage:", error);
      }
    };

    fetchUserId();
  }, []);

  const {
    data: optionsCollection,
    error: optionsCollectionError,
    isLoading: optionsCollectionLoading,
    refetch,
  } = useGetCollectionsByUserIdQuery(userId);

  const [addDishToCollections, { isLoading: isAdding }] =
    useAddDishToCollectionsMutation();

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  const handleAddNewCollection = () => {
    navigation.navigate("AddNewCollection");
  };

  const handleCheckboxChange = (collectionId) => {
    const updatedOptions = [...selectedOptions];
    if (updatedOptions.includes(collectionId)) {
      updatedOptions.splice(updatedOptions.indexOf(collectionId), 1);
    } else {
      updatedOptions.push(collectionId);
    }
    setSelectedOptions(updatedOptions);
  };

  const handleDone = async () => {
    try {
      await addDishToCollections({
        userId,
        dishId,
        collectionIds: selectedOptions,
      }).unwrap();
      // console.log("Dish added to collections:", selectedOptions);
      navigation.goBack();
    } catch (error) {
      console.error("Failed to add dish to collections:", error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeBtn}
      >
        <Ionicons name="close-circle-outline" size={30} color="gray" />
      </TouchableOpacity>
      <Text style={styles.title}>Collections</Text>
      <View style={styles.line} />
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddNewCollection}
          >
            <Icon name="plus-circle" size={27} color={theme.colors.secondary} />
            <Text style={[styles.buttonText, styles.text]}>
              Add New Collection
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.line} />
      <ScrollView>
        {optionsCollection?.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.checkboxContainer}
            onPress={() => handleCheckboxChange(option?.id)}
          >
            <View
              style={[
                styles.checkbox,
                selectedOptions.includes(option?.id) && styles.checkedCheckbox,
              ]}
            >
              {selectedOptions.includes(option?.id) && (
                <Icon name="check" size={15} color="white" />
              )}
            </View>
            <Text style={styles.checkboxLabel}>{option?.collectionName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.doneButton} onPress={handleDone} disabled={isAdding}>
          <Text style={styles.buttonText}>{isAdding ? 'Saving...' : 'Done'}</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 20,
    paddingRight: 10,
  },
  closeBtn: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 20,
    paddingTop: 30,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "semibold",
  },
  text: {
    color: "black",
    paddingLeft: 7,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "transparent",
  },
  innerContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: "85%",
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  descriptionInput: {
    marginTop: 0,
  },
  input: {
    borderRadius: 5,
    padding: 15,
    marginVertical: 20,
    backgroundColor: theme.colors.grayBackground,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    marginRight: 5,
    marginLeft: 10,
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.secondary,
    marginBottom: 20,
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    padding: 10,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
  },
  saveButton: {
    backgroundColor: theme.colors.secondary,
    marginVertical: 30,
  },
  cancelButton: {
    backgroundColor: "red",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  closeIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  doneButton: {
    backgroundColor: theme.colors.secondary,
    borderRadius: 10,
    alignItems: "center",
    padding: 12,
    marginVertical: 20,
    width: 150,
    alignSelf: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
    paddingLeft: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: theme.colors.secondary,
  },
  checkboxLabel: {
    fontSize: 16,
  },
});

export default CollectionScreen;
