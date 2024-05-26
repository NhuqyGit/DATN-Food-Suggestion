import React, { useState } from "react";
import {
  Ionicons,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ImageBackground,
  Modal,
  Pressable,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme/index";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { FlatList } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";
import { Platform } from "react-native";

const IngredientsTab = ({
  ingredientList,
  createIngredient,
  deleteIngredient,
  updateIngredient,
}) => {
  const [modalVisible, setModalVisible] = useState("false");
  const [modalType, setModalType] = useState("");
  const [ingredientInput, setIngredientInput] = useState("");
  const [ingredientID, setIngredientID] = useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
      <View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="food-variant"
          size={100}
          color={theme.colors.backgroundColor}
        />
        <Text style={{ color: theme.colors.grayBackground }}>
          Create your ingredient list
        </Text>
      </View>
      <View style={{ width: "90%", flex: 1, marginBottom: 75 }}>
        <View>
          <TouchableOpacity
            style={{ paddingVertical: 10 }}
            onPress={() => {
              setIngredientInput("");
              setModalType("create");
              setModalVisible(true);
            }}
          >
            <View style={{ flexDirection: "row" }}>
              <Ionicons
                name="add-circle-outline"
                size={24}
                color={theme.colors.secondary}
              />
              <Text style={{ color: theme.colors.secondary, fontSize: 16 }}>
                Add ingredients
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{ height: 1, backgroundColor: theme.colors.grayBackground }}
          />
        </View>
        {ingredientList.length > 0 && (
          <View style={{ flex: 1, backgroundColor: "white" }}>
            <FlatList
              data={ingredientList}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                    style={{ paddingTop: 10 }}
                    key={index}
                    onPress={() => {
                      setIngredientID(item.id);
                      setIngredientInput(item.name);
                      setModalType("update");
                      setModalVisible(true);
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingVertical: 15,
                        paddingHorizontal: 25,
                        borderColor: theme.colors.secondary,
                        borderWidth: 0.5,
                        borderRadius: 15,
                      }}
                    >
                      <Text style={{ fontSize: 16 }}>{item.name}</Text>
                      <TouchableOpacity
                        onPress={() => {
                          deleteIngredient(item.id);
                        }}
                      >
                        <AntDesign
                          name="delete"
                          size={24}
                          color={theme.colors.primary}
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        )}
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={[styles.centeredView]}>
            <View style={[styles.modalView, {}]}>
              <Text
                style={{
                  marginTop: -20,
                  paddingBottom: 20,
                  color: theme.colors.secondary,
                  fontWeight: "bold",
                }}
              >
                {modalType == "create"
                  ? "New ingredient"
                  : modalType == "update"
                    ? "Update ingredient"
                    : "Undefined Type"}
              </Text>
              <TextInput
                style={{
                  paddingHorizontal: 15,
                  paddingVertical: 5,
                  borderRadius: 10,
                  borderColor: theme.colors.secondary,
                  borderWidth: 1,
                  width: "120%",
                }}
                value={ingredientInput}
                onChangeText={setIngredientInput}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                  marginBottom: -10,
                  gap: 20,
                }}
              >
                <Pressable
                  style={[styles.button, { backgroundColor: "white" }]}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text
                    style={{
                      color: theme.colors.secondary,
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Cancel
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.button,
                    { backgroundColor: theme.colors.secondary },
                  ]}
                  onPress={() => {
                    if (modalType == "create") {
                      createIngredient(ingredientInput);
                    } else if (modalType == "update") {
                      updateIngredient(ingredientID, ingredientInput);
                    }
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {modalType == "create"
                      ? "Create"
                      : modalType == "update"
                        ? "Update"
                        : "Undefined"}
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};

const OverviewTab = ({
  overviewImage,
  updateOverviewImage,
  overviewTitle,
  updateOverviewTitle,
  overviewURL,
  updateOverviewURL,
}) => {
  const importImage = async () => {
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
    });
    if (!res.canceled) {
      const imguri = res.assets[0].uri;
      console.log(imguri);
      updateOverviewImage(imguri);
    }
  };

  function displayImage() {
    if (overviewImage) {
      return (
        <ImageBackground
          source={{ uri: overviewImage }}
          style={{
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
          imageStyle={{ borderRadius: 25 }}
          resizeMode="cover"
        >
          <Ionicons
            name="images-outline"
            size={24}
            color={theme.colors.secondary}
          />
        </ImageBackground>
      );
    } else {
      <Ionicons
        name="images-outline"
        size={24}
        color={theme.colors.secondary}
      />;
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
        alignItems: "center",
      }}
    >
      <View style={{ width: "90%" }}>
        <View style={{ paddingTop: 20, flexDirection: "row" }}>
          <Ionicons name="text" size={24} color={theme.colors.secondary} />
          <Text
            style={{
              color: theme.colors.secondary,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            Title
          </Text>
        </View>
        <TextInput
          style={{
            borderRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 15,
            borderWidth: 0.5,
            borderColor: theme.colors.secondary,
          }}
          value={overviewTitle}
          onChangeText={(val) => {
            updateOverviewTitle(val);
          }}
        />
        <View style={{ paddingTop: 20, flexDirection: "row" }}>
          <Entypo name="link" size={24} color={theme.colors.secondary} />
          <Text
            style={{
              color: theme.colors.secondary,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            URL
          </Text>
        </View>
        <TextInput
          style={{
            borderRadius: 10,
            paddingVertical: 5,
            paddingHorizontal: 15,
            borderWidth: 0.5,
            borderColor: theme.colors.secondary,
          }}
          value={overviewURL}
          onChangeText={(val) => {
            updateOverviewURL(val);
          }}
        />
        <TouchableOpacity onPress={importImage} style={{ paddingTop: 20 }}>
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 25,
              borderWidth: 3,
              borderStyle: "dashed",
              borderColor: theme.colors.secondary,
              height: Dimensions.get("window").width * 0.9,
            }}
          >
            {displayImage()}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DirectionsTab = ({
  directionsDesc,
  updateDirectionsDesc,
  totalTime,
  updateTotalTime,
}) => (
  <View style={{ flex: 1, backgroundColor: "white", alignItems: "center" }}>
    <View style={{ width: "90%" }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "bold",
          color: theme.colors.secondary,
          paddingTop: 20,
        }}
      >
        Instructions
      </Text>

      <TextInput
        multiline={true}
        numberOfLines={10}
        value={directionsDesc}
        style={{
          borderRadius: 10,
          paddingVertical: 10,
          paddingHorizontal: 15,
          borderWidth: 0.5,
          borderColor: theme.colors.secondary,
          height: 190,
          verticalAlign: "top",
        }}
        onChangeText={updateDirectionsDesc}
      />
      <View style={{ paddingTop: 20, flexDirection: "row" }}>
        <AntDesign name="hourglass" size={24} color={theme.colors.secondary} />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            color: theme.colors.secondary,
          }}
        >
          Total time
        </Text>
      </View>
      <TextInput
        value={totalTime}
        onChangeText={updateTotalTime}
        style={{
          borderRadius: 10,
          paddingVertical: 5,
          paddingHorizontal: 15,
          borderWidth: 0.5,
          borderColor: theme.colors.secondary,
        }}
      />
    </View>
  </View>
);

function CreateRecipe() {
  const navigation = useNavigation();
  const WIDTH = Dimensions.get("window").width;
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "Overview", title: "Overview" },
    { key: "Ingredients", title: "Ingredients" },
    { key: "Directions", title: "Directions" },
  ]);
  const [ingredientList, setIngredientList] = useState([]);
  const [overviewImageUri, setOverviewImageUri] = useState("");
  const [overviewTitle, setOverviewTitle] = useState("");
  const [overviewURL, setOverviewURL] = useState("");
  const [directionsDesc, setDirectionsDesc] = useState("");
  const [totalTime, setTotalTime] = useState("");

  function deleteIngredient(id) {
    setIngredientList(ingredientList.filter((e) => e.id != id));
  }
  function createIngredient(ingredientName) {
    let index = 0;

    if (ingredientList.length > 0) {
      index = ingredientList[ingredientList.length - 1].id + 1;
    }
    setIngredientList([
      ...ingredientList,
      {
        id: index,
        name: ingredientName,
      },
    ]);
  }
  function updateIngredient(id, ingredientName) {
    setIngredientList(
      ingredientList.map((ingredient) => {
        if (ingredient.id == id) {
          ingredient.name = ingredientName;
        }
        return ingredient;
      })
    );
  }

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "Overview":
        return (
          <OverviewTab
            jumpTo={jumpTo}
            overviewImage={overviewImageUri}
            updateOverviewImage={setOverviewImageUri}
            overviewTitle={overviewTitle}
            updateOverviewTitle={setOverviewTitle}
            overviewURL={overviewURL}
            updateOverviewURL={setOverviewURL}
          />
        );
      case "Ingredients":
        return (
          <IngredientsTab
            jumpTo={jumpTo}
            ingredientList={ingredientList}
            deleteIngredient={deleteIngredient}
            createIngredient={createIngredient}
            updateIngredient={updateIngredient}
          />
        );
      case "Directions":
        return (
          <DirectionsTab
            jumpTo={jumpTo}
            directionsDesc={directionsDesc}
            updateDirectionsDesc={setDirectionsDesc}
            totalTime={totalTime}
            updateTotalTime={setTotalTime}
          />
        );
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      renderLabel={({ route, focused, color }) => (
        <Text
          style={{
            color: focused ? theme.colors.secondary : "black",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {route.title}
        </Text>
      )}
      indicatorStyle={{ backgroundColor: theme.colors.secondary }}
      style={{ backgroundColor: "white" }}
    />
  );

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.secondary, flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={-100}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View
          style={{
            padding: 20,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
            Create personal recipe
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <AntDesign name="close" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{ width: WIDTH }}
        />
        <View
          style={{
            position: "absolute",
            bottom: 20,
            left: 0,
            right: 0,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: theme.colors.secondary,
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 45,
            }}
            onPress={() => {
              console.log({
                title: overviewTitle,
                url: overviewURL,
                image: overviewImageUri,
                ingredients: ingredientList,
                directions: directionsDesc,
                totalTime: totalTime,
              });
              navigation.goBack()
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              Save recipe
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
  tabBtn: {
    backgroundColor: "white",
    paddingVertical: 15,
    flex: 1,
  },
  tabText: {
    alignSelf: "center",
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },

  topContainer: {
    flexDirection: "row",
    backgroundColor: theme.colors.secondary,
  },
  bottomContainer: {
    flex: 4,
    alignItems: "center",
    backgroundColor: "white",
  },
  input: { height: 40, margin: 12, borderWidth: 1, padding: 10 },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "70%",
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
});

export default CreateRecipe;
