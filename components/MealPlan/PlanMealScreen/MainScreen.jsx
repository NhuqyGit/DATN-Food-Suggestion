import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontAweSomeIcon from 'react-native-vector-icons/FontAwesome'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useNavigation } from '@react-navigation/native'
import { theme } from '../../../theme/index'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntIcon from 'react-native-vector-icons/AntDesign.js'

import Feather from 'react-native-vector-icons/Feather'
import Today from '../components/TopTabNavigator/Today'
import ThisWeek from '../components/TopTabNavigator/ThisWeek'
import Unschedule from '../components/TopTabNavigator/Unschedule'
import BottomSheet from '../../BottomSheet/BottomSheet'

const Tab = createMaterialTopTabNavigator()
function MainScreen() {
  const navigation = useNavigation()
  const [modalVisible, setModalVisible] = useState(false)

  const handleCloseModal = () => {
    setModalVisible(false)
  }
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: 'white' }}
      edges={['right', 'left', 'top']}
    >
      <View style={{ paddingHorizontal: 5 }}>
        <View
          className='w-11 h-11 bg-[#ECE9E9] rounded-full flex items-center justify-center'
          style={{ marginLeft: 'auto', marginTop: 12 }}
        >
          <TouchableOpacity
            onPress={() => {
              //navigation.navigate("Instruction");
              setModalVisible(true)
            }}
          >
            <FontAweSomeIcon name='question-circle-o' size={30} />
          </TouchableOpacity>
        </View>

        <Text
          style={{
            fontSize: 24,
            paddingTop: 5,
            paddingHorizontal: 16,
            fontWeight: 'bold',
            marginBottom: 5,
          }}
        >
          Meal Planner
        </Text>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 6 }}>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: theme.colors.secondary,
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: {
              fontSize: 16,
              fontWeight: '600',
              textTransform: 'none',
            },
            tabBarStyle: {
              backgroundColor: 'white',
            },
            tabBarIndicatorStyle: {
              backgroundColor: theme.colors.secondary,
              marginHorizontal: 5,
            },
            tabBarItemStyle: {
              justifyContent: 'center',
              alignItems: 'center',
              width: 'auto',
            },
          }}
        >
          <Tab.Screen name='Today' component={Today} />
          <Tab.Screen name='This week' component={ThisWeek} />
          <Tab.Screen name='Unschedule' component={Unschedule} />
        </Tab.Navigator>
      </View>

      <BottomSheet closePopUp={handleCloseModal} modalVisible={modalVisible}>
        <View className='h-fit flex flex-col gap-4 ml-2 mr-6 my-2'>
          <View className='flex flex-row items-center  mt-2 mb-2 pb-3 border-b border-b-[#F3F3F3] border-solid'>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false)
                navigation.navigate('Instruction')
              }}
            >
              <View className='flex flex-row items-center'>
                <FontAweSomeIcon
                  name='question-circle-o'
                  size={20}
                  color={theme.colors.secondary}
                />
                <Text className='ml-4 text-base font-semibold'>
                  Meal planner help
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          {/* dss */}

          <View className='flex flex-row items-center  mt-2 mb-2 pb-3 border-b border-b-[#F3F3F3] border-solid'>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false)
                navigation.navigate('GiveFeedback')
              }}
            >
              <View className='flex flex-row items-center'>
                <Feather name='flag' size={24} color={theme.colors.secondary} />
                <Text className='ml-4 text-base font-semibold'>
                  Give feedback
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheet>
    </SafeAreaView>
  )
}

export default MainScreen

