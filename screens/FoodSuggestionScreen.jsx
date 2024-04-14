import React, { Component, useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Modal, Animated } from "react-native";
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from "@react-navigation/drawer";
import FoodSuggestionScreen from "./FoodSuggestion/FoodSuggestionScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons'

const Drawer =  createDrawerNavigator();

const FoodSuggestion = () =>{
	const demoData = [
		{
			id: 1,
			name: "Lorem Ipsum",
			component: FoodSuggestionScreen,
			date: "",
			message: []
		},
		{
			id: 2,
			name: "A type specimen book",
			component: FoodSuggestionScreen,
			date: "",
			message: []
		},
		{
			id: 3,
			name: "Many desktop publishing package",
			component: FoodSuggestionScreen,
			date: "",
			message: []
		},
		{
			id: 4,
			name: "There are many variations of passages",
			component: FoodSuggestionScreen,
			date: "",
			message: []
		},
		{
			id: 5,
			name: "All the Lorem Ipsum generators",
			component: FoodSuggestionScreen,
			date: "",
			message: []
		},
		{
			id: 6,
			name: "Contrary to popular belief",
			component: FoodSuggestionScreen,
			date: "",
			message: []
		},
		{
			id: 7,
			name: "Always free from repetition",
			component: FoodSuggestionScreen,
			date: "",
			message: []
		},
		{
			id: 8,
			name: "Always free from epetition",
			component: FoodSuggestionScreen,
			date: "",
			message: []
		},
		{
			id: 9,
			name: "Always fre from repetition",
			component: FoodSuggestionScreen,
			date: "",
			message: []
		},
		{
			id: 10,
			name: "Always free from repetiion",
			component: FoodSuggestionScreen,
			date: "",
			message: []
		},
		{
			id: 11,
			name: "Always ee from repetiion",
			component: FoodSuggestionScreen,
			date: "",
			message: []
		},
		{
			id: 12,
			name: "Always free from repetiio",
			component: FoodSuggestionScreen,
			date: "",
			message: []
		},
		{
			id: 13,
			name: "Always free fromrepetiion",
			component: FoodSuggestionScreen,
			date: "",
			message: []
		},
		{
			id: 14,
			name: "lways free from repetiion",
			component: FoodSuggestionScreen,
			date: "",
			message: []
		},
	]

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

	const listScreen = demoData.map((screen, index)=>{
		return(
			<Drawer.Screen
				key={index.toString()}
				name={screen.name}
			>
				{(props) => <FoodSuggestionScreen {...props} name={screen.name} />}
			</Drawer.Screen>
		)
	})

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
		<Drawer.Navigator
			drawerContent={(props)=>{
				return (
					<SafeAreaView style={{flex: 1}}>
						<View style={{justifyContent: 'center', alignItems: 'center', padding: 10}}>
							<TouchableOpacity
								style={{
									width: '100%',
									flexDirection: 'row',
									alignItems: 'center',
									padding: 5,
									borderRadius: 8
								}}
							>
							<Image source={require('../assets/favicon.png')} style={{width: 35, height: 35, marginRight: 10}}/>
							<Text style={{fontWeight: 'bold'}}>New suggestion</Text>
							</TouchableOpacity>
						</View>

						<ScrollView>
							<DrawerItemList {...props} />
						</ScrollView>
					</SafeAreaView>
				)}
			}
			screenOptions={{
				headerTintColor: 'black',
				headerTitle: 'Food Suggestion',
				drawerActiveBackgroundColor: '#d9d9d9',
				drawerActiveTintColor: 'black', 

				headerRight: () => (
					<TouchableOpacity onPress={() => console.log('Custom Icon Pressed')}>
						<Ionicons name="ellipsis-horizontal" size={24} color="black" style={{marginRight: 15}} />
					</TouchableOpacity>
				),

				headerStyle: {
					borderBottomWidth: 1, // Độ dày của border bottom
					borderBottomColor: '#d9d9d9', // Màu của border bottom
				}
			}}

		>
			{listScreen}
			{/* {listScreen1} */}
		</Drawer.Navigator>
	);
}

export default FoodSuggestion;
