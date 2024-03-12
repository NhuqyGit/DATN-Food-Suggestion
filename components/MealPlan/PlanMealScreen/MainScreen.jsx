import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAweSomeIcon from 'react-native-vector-icons/FontAwesome'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useNavigation } from '@react-navigation/native'
import Today from '../components/TopTabNavigator/Today'
import ThisWeek from '../components/TopTabNavigator/ThisWeek'
import Unschedule from '../components/TopTabNavigator/Unschedule'

const Tab = createMaterialTopTabNavigator()
function MainScreen() {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ paddingHorizontal: 5 }}>
        <View style={{ marginLeft: 'auto', marginTop: 4 }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Instruction')
            }}
          >
            <FontAweSomeIcon name='question-circle-o' size={30} />
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 24, paddingTop: 5, fontWeight: 'bold' }}>
          Meal Planner
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: '#40AD53',
            tabBarInactiveTintColor: 'gray',
            tabBarIndicatorStyle: {
              backgroundColor: '#40AD53',
            },
          }}
        >
          <Tab.Screen name='Today' component={Today} />
          <Tab.Screen name='This week' component={ThisWeek} />
          <Tab.Screen name='Unschedule' component={Unschedule} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  )
}

export default MainScreen
