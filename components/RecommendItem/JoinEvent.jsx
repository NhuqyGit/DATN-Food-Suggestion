import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { uploadToFirebase } from "../../config";
import { theme } from "../../theme";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useUpdateDishToEventMutation } from "../../slices/eventSlice";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const JoinEvent = ({ navigation, route }) => {
  const { eventId } = route.params;
  const [dishName, setDishName] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [servings, setServings] = useState("");
  const [calories, setCalories] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [loadingUploadImage, setLoadingUploadImage] = useState(false);
  const [updateDishToEvent] = useUpdateDishToEventMutation();

  const data = [
    { label: "Item 1", value: "1" },
    { label: "Item 2", value: "2" },
    { label: "Item 3", value: "3" },
    { label: "Item 4", value: "4" },
    { label: "Item 5", value: "5" },
    { label: "Item 6", value: "6" },
    { label: "Item 7", value: "7" },
    { label: "Item 8", value: "8" },
  ];

  console.log("eventId", eventId);

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const importImage = async () => {
    setLoadingUploadImage(true);
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
      });

      if (!res.canceled) {
        const uri = res.assets[0].uri;
        const filename = uri.substring(uri.lastIndexOf("/") + 1);
        const uploadRes = await uploadToFirebase(uri, filename);
        setImageUri(uploadRes.downloadURL);
      }
    } catch (e) {
      Alert.alert("Error uploading image");
    } finally {
      setLoadingUploadImage(false);
    }
  };

  const onSubmit = async () => {
    if (!dishName || !cookingTime || !servings || !calories || !ingredients) {
      Alert.alert("Please fill in all fields");
      return;
    }

    const formData = {
      dishName,
      cookingTime,
      servings,
      calories,
      ingredients,
      imageUri,
    };

    const response = await updateDishToEvent({
      eventId: parseInt(eventId),
      formData,
    });
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleNavigateBack}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.cateTitle}>{"Share Your Dish"}</Text>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Dish name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter dish name"
            value={dishName}
            onChangeText={setDishName}
          />
        </View>

        <View style={styles.inputContainer}>
          {loadingUploadImage ? (
            <ActivityIndicator size="large" color={theme.colors.secondary} />
          ) : imageUri ? (
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={importImage}
            >
              <Image source={{ uri: imageUri }} style={styles.image} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.uploadButton} onPress={importImage}>
              <Ionicons name="cloud-upload-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Choose an image</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cooking time</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter cooking time (in minutes)"
            keyboardType="numeric"
            value={cookingTime}
            onChangeText={setCookingTime}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Servings</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter number of servings"
            keyboardType="numeric"
            value={servings}
            onChangeText={setServings}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Calories</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter calories per serving"
            keyboardType="numeric"
            value={calories}
            onChangeText={setCalories}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ingredients</Text>
          <View style={styles.containerDropdown}>
            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              data={data}
              labelField="label"
              valueField="value"
              placeholder="Select item"
              searchPlaceholder="Search..."
              value={ingredients}
              onChange={(item) => {
                setIngredients(item);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color="black"
                  name="Safety"
                  size={20}
                />
              )}
              selectedStyle={styles.selectedStyle}
            />
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default JoinEvent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  containerDropdown: { padding: 16 },
  dropdown: {
    height: 50,
    backgroundColor: "transparent",
    borderBottomColor: "gray",
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 30,
  },
  wrapper: {
    paddingHorizontal: 10,
    gap: 16,
  },
  footer: {
    marginVertical: 20,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    backgroundColor: theme.colors.lightGray,
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 10,
  },
  uploadButton: {
    backgroundColor: theme.colors.darkGray,
    padding: 10,
    borderRadius: 20,
    alignItems: "center",
    gap: 6,
  },
  submitButton: {
    width: 200,
    backgroundColor: theme.colors.secondary,
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cateTitle: {
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 5,
  },
  backButton: {
    padding: 20,
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  label: {
    fontWeight: "600",
  },
  buttonText: {
    fontWeight: "600",
    color: "#fff",
  },
  input: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    height: 50,
  },
});
