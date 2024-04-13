import React, { useState } from "react";
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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme/index";
import { TabView, SceneMap } from "react-native-tab-view";
import { FlatList } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

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
    <View style={{ flex: 1, backgroundColor: "white" }}>
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
        <Text> Create your own</Text>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => {
            setIngredientInput("");
            setModalType("create");
            setModalVisible(true);
          }}
        >
          <View>
            <Text>Add ingredients</Text>
          </View>
        </TouchableOpacity>
      </View>
      {ingredientList && (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <FlatList
            data={ingredientList}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
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
                    }}
                  >
                    <Text>{item.name}</Text>
                    <TouchableOpacity
                      onPress={() => {
                        deleteIngredient(item.id);
                      }}
                    >
                      <Text> button</Text>
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
        visible={createVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
        style
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              {modalType == "create"
                ? "New ingredient"
                : modalType == "update"
                  ? "Update ingredient"
                  : "Undefined Type"}
            </Text>
            <TextInput
              style={styles.input}
              value={ingredientInput}
              onChangeText={setIngradientInput}
            />
            <View
              style={{
                flexDirection: "row-reverse",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pressable
                style={[styles.button]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text
                  style={[styles.textStyle, { color: theme.colors.secondary }]}
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
                <Text style={styles.textStyle}>
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
      aspect: [3, 4],
    });
    if (!res.canceled) {
      const imguri = res.assets[0].uri;
      updateOverviewImage(imguri);
    }
  };

  function displayImage() {
    if (overviewImage) {
      return (
        <ImageBackground
          source={{ uri: overviewImage }}
          style={{ justifyContent: "center", alignItems: "center" }}
          resizeMode="cover"
        >
          <Text>icon</Text>
        </ImageBackground>
      );
    } else {
      <Text>icon</Text>;
    }
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#673ab7" }}>
      <TouchableOpacity onPress={importImage}>
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 1,
            borderStyle: "dashed",
            borderColor: theme.colors.secondary,
          }}
        >
          {displayImage()}
        </View>
      </TouchableOpacity>
      <Text>Title</Text>
      <TextInput
        value={overviewTitle}
        onChangeText={(val) => {
          updateOverviewTitle(val);
        }}
      />
      <Text>URL</Text>
      <TextInput
        value={overviewURL}
        onChangeText={(val) => {
          updateOverviewURL(val);
        }}
      />
    </View>
  );
};

const DirectionsTab = ({
  directionsDesc,
  updateDirectionsDesc,
  totalTime,
  updateTotalTime,
}) => (
  <View style={{ flex: 1, backgroundColor: "white" }}>
    <TextInput
      multiline={true}
      numberOfLines={6}
      value={directionsDesc}
      onChangeText={updateDirectionsDesc}
    />
    <Text>Total time</Text>
    <TextInput value={totalTime} onChangeText={updateTotalTime} />
  </View>
);

function CreateRecipe() {
  const WIDTH = Dimensions.get("window").width;
  const [activeTab, setActiveTab] = useState(0);
  const [tabs] = useState([
    { key: "Overview", title: "Overview" },
    { key: "Ingredients", title: "Ingredients" },
    { key: "Durections", title: "Durections" },
  ]);
  const [ingredientList, setIngradientList] = useState([]);
  const [overviewImageUri, setOverviewImageUri] = useState("");
  const [overviewTitle, setOverviewTitle] = useState("");
  const [overviewURL, setOverviewURL] = useState("");
  const [directionsDesc, setDirectionsDesc] = useState("");
  const [totalTime, setTotalTime] = useState("");

  function deleteIngredient(id) {
    setIngradientList(ingredientList.filter((e) => e.id == id));
  }
  function createIngredient(ingredientName) {
    setIngradientList([
      ...ingredientList,
      { id: ingredientList.slice(-1).id + 1, name: ingredientName },
    ]);
  }
  function updateIngredient(id, ingredientName) {
    setIngradientList(
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
      <TabView
        navigationState={{ activeTab, tabs }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setActiveTab}
        initialLayout={{ width: WIDTH }}
      />
      <View
        style={{
          position: "absolute",
          bottom: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          style={{
            backgroundColor: theme.colors.secondary,
            padding: 10,
            borderRadius: 45,
          }}
        >
          <Text style={{ color: "white" }}>Save recipe</Text>{" "}
        </TouchableOpacity>
      </View>
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
    margin: 20,
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
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default CreateRecipe;
