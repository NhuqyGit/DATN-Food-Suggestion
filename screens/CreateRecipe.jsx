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

const FirstTab = ({
  ingredientList,
  createIngredient,
  deleteIngredient,
  updateIngredient,
}) => {
  const [modalVisible, setModalVisible] = useState("false");
  const [modalType, setModalType] = useState("");
  const [ingredientInput, setIngradientInput] = useState("");
  const [ingredientID, setIngredientID] = useState(0);

  return (
    <View style={{ flex: 1, backgroundColor: "#ff4081" }}>
      <FlatList
        data={ingredientList}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setIngredientID(item.id);
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
                alignContent: "center",
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

const SecondTab = () => (
  <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
);

const ThirdTab = () => <View style={{ flex: 1, backgroundColor: "#3ab700" }} />;

function CreateRecipe() {
  const WIDTH = Dimensions.get("window").width;
  const [activeTab, setActiveTab] = useState(0);
  const [tabs] = useState([
    { key: "first", title: "Ingredients" },
    { key: "second", title: "Instructions" },
    { key: "third", title: "Presentation" },
  ]);
  const [ingredientList, setIngradientList] = useState([]);
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
      case "first":
        return (
          <FirstTab
            jumpTo={jumpTo}
            ingredientList={ingredientList}
            deleteIngredient={deleteIngredient}
            createIngredient={createIngredient}
            updateIngredient={updateIngredient}
          />
        );
      case "second":
        return <SecondTab jumpTo={jumpTo} />;
      case "third":
        return <ThirdTab jumpTo={jumpTo} />;
    }
  };

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      renderLabel={({ route, focused, color }) => (
        <Text
          style={{
            color: focused ? theme.colors.primary : "white",
            fontSize: 16,
          }}
        >
          {route.title}
        </Text>
      )}
      indicatorStyle={{ backgroundColor: theme.colors.primary }}
      style={{ backgroundColor: theme.colors.secondary }}
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
      <TouchableOpacity style={{ position: "absolute", bottom: 20, right: 20 }}>
        <View
          style={{ backgroundColor: "red", padding: 10, borderRadius: 45 }}
        ></View>
      </TouchableOpacity>
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
