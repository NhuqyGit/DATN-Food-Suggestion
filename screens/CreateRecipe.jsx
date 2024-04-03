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

function CreateRecipe() {

  
  const FirstTab = () => (
    <View style={{ flex: 1, backgroundColor: "#ff4081" }} />
  );

  const SecondTab = () => (
    <View style={{ flex: 1, backgroundColor: "#673ab7" }} />
  );

  const ThirdTab = () => (
    <View style={{ flex: 1, backgroundColor: "#3ab700" }} />
  );

  const renderScene = SceneMap({
    first: FirstTab,
    second: SecondTab,
    third: ThirdTab,
  });

  const WIDTH = Dimensions.get("window").width;

  const [activeTab, setActiveTab] = useState(0);
  const [tabs] = useState([
    { key: "first", title: "part1" },
    { key: "second", title: "part2" },
    { key: "third", title: "part3" },
  ]);

  return (
    <SafeAreaView style={{ backgroundColor: theme.colors.secondary, flex: 1 }}>
      <TabView
        navigationState={{ activeTab, tabs }}
        renderScene={renderScene}
        onIndexChange={setActiveTab}
        initialLayout={{ width: WIDTH }}
      />
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
