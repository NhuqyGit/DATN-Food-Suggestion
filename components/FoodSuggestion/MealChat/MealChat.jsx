import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useNavigation } from '@react-navigation/native'
import { theme } from '../../../theme/index'
import Appetizer from './Appetizer'
import MainDishes from './MainDishes'
import Desserts from './Desserts'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DishMessage from '../DishMessage'

const Tab = createMaterialTopTabNavigator()

const MealChat = ({response}) => {
  const [selectedTab, setSelectedTab] = useState('khaiVi');

  const convertKeyToDisplayName = (key) => {
		switch (key) {
		  case "khaiVi":
			return "Khai Vị";
		  case "monChinh":
			return "Món Chính";
		  case "trangMieng":
			return "Tráng Miệng";
		  default:
			return key;
		}
	};

  const responseChat = response && (
    typeof response === 'object' ? response : JSON.parse(response))
	// const listDishMessage = props.response && (typeof props.response === 'object' ? 
	// 	Object.entries(props.response).flatMap(([key, value]) => (
	// 	<Animatable.View key={key} animation="fadeIn" delay={props.isSend ? 0 : 300}>
	// 		<Text style={styles.sectionTitle}>
	// 			{convertKeyToDisplayName(key)}
	// 		</Text>
	// 		{value.map((item, index) => (
	// 			<Animatable.View key={`${key}_${index}`} animation="fadeIn" delay={props.isSend ? 0 : 300 * (index + 1)}>
	// 				<DishMessage item={item} />
	// 			</Animatable.View>
	// 		))}
	// 	</Animatable.View>
	// 	)) : 
	// 	Object.entries(JSON.parse(props.response)).flatMap(([key, value]) => (
	// 	<Animatable.View key={key} animation="fadeIn" delay={props.isSend ? 0 : 300}>
	// 		<Text style={styles.sectionTitle}>
	// 			{convertKeyToDisplayName(key)}
	// 		</Text>
	// 		{value.map((item, index) => (
	// 			<Animatable.View key={`${key}_${index}`} animation="fadeIn" delay={props.isSend ? 0 : 300 * (index + 1)}>
	// 				<DishMessage item={item} />
	// 			</Animatable.View>
	// 		))}
	// 	</Animatable.View>
	// 	))
	// );
  // console.log("type1: ", typeof response)
  // console.log("type2: ", typeof responseChat)
  // console.log(responseChat)
  return (
    <View style={{}}>
      <View style={styles.buttonContainer}>
        {Object.keys(responseChat).map((key, index) => (
          <TouchableOpacity 
            style={[styles.button, {borderTopLeftRadius: index === 0 ? 8 : 0, backgroundColor: selectedTab === key ? theme.colors.dark : null}]}
            key={key}
            onPress={() => setSelectedTab(key)}>
            <Text style={styles.buttonText}>{convertKeyToDisplayName(key)}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={{ flex: 1 }}>
        {responseChat[selectedTab].length === 0 ? (
          <Text>No items available</Text>
        ) : (
          responseChat[selectedTab].map((item, index) => (
            <DishMessage key={index.toString()} item={item} />
          ))
        )}
      </View> 
    </View>
  )
}

export default MealChat

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#5e5e5e",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
})