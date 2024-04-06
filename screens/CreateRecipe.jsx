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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme/index";
import { TabView, SceneMap } from "react-native-tab-view";

const FirstTab = ({ igredientList, createIngredient, deleteIngredient }) => (
  <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
);

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

  function deleteIngredient(index, ingredient) {}
  function createIngredient(ingredient) {}

  const renderScene = ({ route, jumpTo }) => {
    switch (route.key) {
      case "first":
        return (
          <FirstTab
            jumpTo={jumpTo}
            deleteIngredient={deleteIngredient}
            createIngredient={createIngredient}
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
          style={{ color: focused ? theme.colors.primary : "white", fontSize: 16 }}
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
      <TouchableOpacity style={{position:"absolute", bottom: 20, right: 20}}>
        <View style={{backgroundColor: 'red', padding: 10, borderRadius: 45}}></View>
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
});

export default CreateRecipe;
