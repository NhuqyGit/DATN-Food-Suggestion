import React, { Component, useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Modal, Animated } from "react-native";
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from "@react-navigation/drawer";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FoodSuggestionScreen from "./FoodSuggestion/FoodSuggestionScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons'
import { SIZES } from "../theme/theme";
import FoodDetailsScreen from "../components/FoodDetails/FoodDetails";
import ListRecordScreen from "./FoodSuggestion/ListRecordScreen";

const Stack = createNativeStackNavigator();

const FoodSuggestion = () =>{
// 	const demoData = [
// 		{
// 			id: 1,
// 			name: "Lorem Ipsum",
// 			component: FoodSuggestionScreen,
// 			date: "",
// 			message: []
// 		},
// 		{
// 			id: 2,
// 			name: "A type specimen book",
// 			component: FoodSuggestionScreen,
// 			date: "",
// 			message: []
// 		},
// 		{
// 			id: 3,
// 			name: "Many desktop publishing package",
// 			component: FoodSuggestionScreen,
// 			date: "",
// 			message: []
// 		},
// 		{
// 			id: 4,
// 			name: "There are many variations of passages",
// 			component: FoodSuggestionScreen,
// 			date: "",
// 			message: []
// 		},
// 		{
// 			id: 5,
// 			name: "All the Lorem Ipsum generators",
// 			component: FoodSuggestionScreen,
// 			date: "",
// 			message: []
// 		},
// 		{
// 			id: 6,
// 			name: "Contrary to popular belief",
// 			component: FoodSuggestionScreen,
// 			date: "",
// 			message: []
// 		},
// 		{
// 			id: 7,
// 			name: "Always free from repetition",
// 			component: FoodSuggestionScreen,
// 			date: "",
// 			message: []
// 		},
// 	]

// 	const demoData1 = {
// 		"Today": [
// 			{
// 				id: 1,
// 				name: "Lorem Ipsum",
// 				component: FoodSuggestionScreen,
// 				date: "",
// 				message: []
// 			},
// 			{
// 				id: 2,
// 				name: "A type specimen book",
// 				component: FoodSuggestionScreen,
// 				date: "",
// 				message: []
// 			},
// 		],
// 		"Yesterday": [
// 			{
// 				id: 3,
// 				name: "Many desktop publishing package",
// 				component: FoodSuggestionScreen,
// 				date: "",
// 				message: []
// 			},
// 			{
// 				id: 4,
// 				name: "There are many variations of passages",
// 				component: FoodSuggestionScreen,
// 				date: "",
// 				message: []
// 			},
// 			{
// 				id: 5,
// 				name: "All the Lorem Ipsum generators",
// 				component: FoodSuggestionScreen,
// 				date: "",
// 				message: []
// 			},
// 		],
// 		"Previous 7 Days": [
// 			{
// 				id: 6,
// 				name: "Contrary to popular belief",
// 				component: FoodSuggestionScreen,
// 				date: "",
// 				message: []
// 			},
// 			{
// 				id: 7,
// 				name: "Always free from repetition",
// 				component: FoodSuggestionScreen,
// 				date: "",
// 				message: []
// 			},
// 		],
// 	}

// 	const listScreen = demoData.map((screen, index)=>{
// 		return(
// 			<Drawer.Screen key={index.toString()} name={screen.name} component={screen.component}/>
// 		)
// 	})

// 	// const listScreen1 = Object.keys(demoData1).flatMap(key => {
// 	// 	return (
// 	// 		<>
// 	// 			<Text>{key}</Text>
// 	// 			{demoData1[key].map((screen, index) => (
// 	// 				<Drawer.Screen
// 	// 					key={`${key}_${index}`}
// 	// 					name={screen.name}
// 	// 					component={screen.component}
// 	// 				/>
// 	// 			))}
// 	// 		</>
// 	// 	)	
// 	// });

	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='A' component={FoodSuggestionScreen} />
			<Stack.Screen
				options={{
					animation: 'slide_from_bottom',
				}}
				name='B' component={ListRecordScreen} />
		</Stack.Navigator>
	)
};

export default FoodSuggestion;
