import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Component } from "react";
import { Image } from "react-native";
import Reccomand from "./Reccomand";
import RenderChat from "./RenderChat";

export class Suggestionchat extends Component {
  render() {
    return (
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        vertical
        className="relative"
      >
        <View className="flex flex-row justify-between items-center h-[48px] border-b border-b-[#FFFFFF54]">
          <TouchableOpacity>
            <Image source={require("../../assets/svgs/chat/tab.svg")} />
          </TouchableOpacity>
          <Text className="text-white text-[18px] font-semibold leading-[21.78px]">
            Food Suggestion
          </Text>
          <TouchableOpacity>
            <Image source={require("../../assets/svgs/chat/dot.svg")} />
          </TouchableOpacity>
        </View>
        <View>
          {/* <Reccomand /> */}
          <RenderChat />
        </View>

        <View className="fixed -bottom-48">
          <View className="flex flex-row justify-end items-center gap-4 ">
            <View className="flex flex-row justify-center items-center  rounded-[10px] bg-[#373739] w-3/5 py-2">
              <TouchableOpacity>
                <Image source={require("../../assets/svgs/chat/dot.svg")} />
              </TouchableOpacity>
              <TextInput
                underlineColorAndroid="transparent"
                placeholder="Create a new record"
                placeholderTextColor="white"
                className="text-white"
                autoCapitalize="none"
              />
            </View>
            <TouchableOpacity>
              <Image source={require("../../assets/svgs/chat/enter.svg")} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    height: "fit-content",
    gap: 16,
    backgroundColor: "#1D1D1F",
  },
});

export default Suggestionchat;
