import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListRecordScreen from "../../components/FoodSuggestion/ListRecordScreen";
import FoodSuggestionScreen from "./FoodSuggestionScreen";
import RecordDetail from "../../components/FoodSuggestion/RecordDetail";
import { useIsFocused } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { theme } from "../../theme/index";
import { MessageProvider } from "../../components/FoodSuggestion/MessageContext";
import FoodDetailsScreen from "../../components/FoodDetails/FoodDetails";

const Stack = createNativeStackNavigator();

const FoodSuggesionStack = ({
  focusedItem,
  topic,
  handleDeleteTopic,
  handleChangeNameTopic,
  handleAddNewMessage,
  handleChangeRecordActie,
  getTopics,
}) => {
  return (
    <MessageProvider
      topic={topic}
      focusedItem={focusedItem}
      handleAddNewMessage={handleAddNewMessage}
      handleChangeRecordActie={handleChangeRecordActie}
      getTopics={getTopics}
    >
      <SafeAreaView
        style={{ flex: 1, backgroundColor: theme.colors.lightGreen }}
      >
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="FoodSuggestionMain">
            {(props) => (
              <FoodSuggestionScreen
                {...props}
                topic={topic}
                handleDeleteTopic={handleDeleteTopic}
                handleChangeNameTopic={handleChangeNameTopic}
              />
            )}
          </Stack.Screen>

          <Stack.Screen
            options={{
              animation: "slide_from_bottom",
            }}
            name="ListRecords"
            component={ListRecordScreen}
          />
          <Stack.Screen
            options={{
              animation: "slide_from_right",
            }}
            // listeners={{
            //     beforeRemove: () => {
            //         setAllowDrawer(true);
            //     }
            // }}
            name="RecordDetail"
            component={RecordDetail}
          />
           <Stack.Screen name='FoodDetail' component={FoodDetailsScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </MessageProvider>
  );
};

export default FoodSuggesionStack;

const styles = StyleSheet.create({});
