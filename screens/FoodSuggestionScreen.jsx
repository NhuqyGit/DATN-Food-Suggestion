import React, { Component, useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { createDrawerNavigator, DrawerItemList, DrawerItem, } from "@react-navigation/drawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons'
import FoodSuggesionStack from "./FoodSuggestion/FoodSuggesionStack";
import { useNavigation, useRoute } from "@react-navigation/native";
import { theme } from "../theme/index";
import { HOST } from "../config";
import { AsyncStorageService } from "../utils/AsynStorage";

const Drawer = createDrawerNavigator();
const FoodSuggestion = () =>{
	const navigation = useNavigation()
	const [listTopic, setListTopic] = useState([
		{
			id: 1,
			name: "Lorem Ipsum",
			date: "",
			message: []
		},
		{
			id: 2,
			name: "A type specimen book",
			date: "",
			message: []
		},
		{
			id: 3,
			name: "Many desktop publishing package",
			date: "",
			message: []
		},
		{
			id: 4,
			name: "There are many variations of passages",
			date: "",
			message: []
		},
		{
			id: 5,
			name: "All the Lorem Ipsum generators",
			date: "",
			message: []
		},
		{
			id: 6,
			name: "Contrary to popular belief",
			date: "",
			message: []
		},
		{
			id: 7,
			name: "Always free from repetition",
			date: "",
			message: []
		},
		{
			id: 8,
			name: "Always free from epetition",
			date: "",
			message: []
		},
		{
			id: 9,
			name: "Always fre from repetition",
			date: "",
			message: []
		},
		{
			id: 10,
			name: "Always free from repetiion",
			date: "",
			message: []
		},
		{
			id: 11,
			name: "Always ee from repetiion",
			date: "",
			message: []
		},
		{
			id: 12,
			name: "Always free from repetiio",
			date: "",
			message: []
		},
		{
			id: 13,
			name: "Always free fromrepetiion",
			date: "",
			message: []
		},
		{
			id: 14,
			name: "lways free from rwersepetiion",
			date: "",
			message: []
		},
		{
			id: 15,
			name: "lways free fr666om repetiion",
			date: "",
			message: []
		},
		{
			id: 16,
			name: "lways fre234e from repetiion",
			date: "",
			message: []
		},
	])

	const [topicFilter, setTopicFilter] = useState(null)
	const [loading, setLoading] = useState(true);

	const demoData1 = {
		"Today": [
			{
				id: 1,
				name: "Lorem Ipsum",
				date: "",
				message: []
			},
			{
				id: 2,
				name: "A type specimen book",
				date: "",
				message: []
			},
		],
		"Yesterday": [
			{
				id: 3,
				name: "Many desktop publishing package",
				date: "",
				message: []
			},
			{
				id: 4,
				name: "There are many variations of passages",
				date: "",
				message: []
			},
			{
				id: 5,
				name: "All the Lorem Ipsum generators",
				date: "",
				message: []
			},
		],
		"Previous 7 Days": [
			{
				id: 6,
				name: "Contrary to popular belief",
				date: "",
				message: []
			},
			{
				id: 7,
				name: "Always free from repetition",
				date: "",
				message: []
			},
		],
	}
	
	const [focusedItem, setFocusedItem] = useState(null);

	useEffect(() => {
		const getTopics = async () => {
		  try {
			const token = await AsyncStorageService.getAccessToken();
			const userId = await AsyncStorageService.getUserId();
			const headers = {
			  Authorization: `Bearer ${token}`,
			};
	
			const [dateFilterResponse, topicsResponse] = await Promise.all([
			  fetch(`${HOST}/topics/user/${userId}/date-filter`, { headers }),
			  fetch(`${HOST}/topics/user/${userId}`, { headers }),
			]);
	
			if (!dateFilterResponse.ok) {
			  throw new Error('Failed to fetch date filter data');
			}
			if (!topicsResponse.ok) {
			  throw new Error('Failed to fetch topics data');
			}
	
			const dateFilterData = await dateFilterResponse.json();
			const topicsData = await topicsResponse.json();
	
			setTopicFilter(dateFilterData);
			setListTopic(topicsData);
			setFocusedItem(topicsData[0].id);
		} catch (error) {
			console.error('Error fetching data:', error);
		} finally {
			setLoading(false);
		}
		};
	
		getTopics();
	}, []);

	const handlePress = (item) => {
		const label = item.title + item.id.toString()
		navigation.navigate(label);
		setFocusedItem(item.id);
	};
	const deleteTopic = (id)=>{
		console.log("hello", id)
		const updateListTopic = listTopic.filter(topic => topic.id !== id)
		setListTopic(updateListTopic)
	}

	const listScreen = listTopic ? listTopic.map((topic, index)=>{	
		return(
			<Drawer.Screen
				key={index.toString()}
				name={topic.title + topic.id.toString()}
			>
				{(props) => <FoodSuggesionStack {...props} focusedItem={focusedItem} topic={topic} deleteTopic={deleteTopic}/>}
			</Drawer.Screen>
		)
	}) : null


	const listScreen1 = topicFilter ? Object.keys(topicFilter).flatMap(key => {
		return (
			<View key={key}>
				{topicFilter[key]?.length > 0 ? 
					<>
						<Text style={{color: "#6e6e6e", paddingHorizontal: 16, marginTop: 20, fontSize: 13}}>{key}</Text>
						{topicFilter[key]?.map((item, index) => (
							<DrawerItem
								key={`${key}_${index.toString()}`}
								label={item.title}
								onPress={() => handlePress(item)}
								focused={focusedItem === item.id}
								activeBackgroundColor={'rgba(196, 224, 227, 0.4)'}
								labelStyle={{fontWeight: 'bold', fontSize: 15, color: theme.colors.dark}}
							/>
						))}
					</>
				: null}
			</View>
		)
	}) : null
	
	if (loading) {
        return (
            <View style={styles.loadingOverlay}>
				<ActivityIndicator size="large" color={"black"} />
			</View>
        );
    }

	return (
		<Drawer.Navigator
			drawerContent={(props)=>{
				return (
					<SafeAreaView style={{flex: 1}}>
						<View style={{justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10}}>
							<TouchableOpacity
								style={{
									width: '100%',
									flexDirection: 'row',
									alignItems: 'center',
									padding: 5,
									// backgroundColor: 'red',
									borderRadius: 8
								}}
							>
							<Image source={require('../assets/favicon.png')} style={{width: 35, height: 35, marginRight: 10}}/>
							<Text style={{fontWeight: 'bold'}}>New suggestion</Text>
							</TouchableOpacity>
						</View>

						<ScrollView>
							{/* <DrawerItemList {...props} /> */}

							{/* {
								listTopic.map((item, index)=>{
									return(
										<DrawerItem
											key={index.toString()}
											label={item.name}
											onPress={() => handlePress(item.name)}
											focused={focusedItem === item.name}
											activeBackgroundColor='#d9d9d9'
											activeTintColor={theme.colors.dark}
										/>
									)
								})
							} */}

							{listScreen1}
						</ScrollView>
					</SafeAreaView>
				)}
			}

			screenOptions={{
				drawerType: 'slide',
				swipeEnabled: false,
				headerShown: false,
				headerTintColor: 'black',
				headerTitle: 'Food Suggestion',
				drawerActiveBackgroundColor: '#d9d9d9',
				drawerActiveTintColor: 'black', 

				// headerRight: () => (
				// 	<TouchableOpacity onPress={() => console.log('Custom Icon Pressed')}>
				// 		<Ionicons name="ellipsis-horizontal" size={24} color="black" style={{marginRight: 15}} />
				// 	</TouchableOpacity>
				// ),

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

const styles = StyleSheet.create({
    loadingOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',  // Màu nền tối mờ
    },
});

export default FoodSuggestion;
