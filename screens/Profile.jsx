import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useState } from 'react'
import {
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS } from '../theme/theme'

const img = require('../constants/knife-fork.jpg')

const data = [
  { id: 0, name: 'List', date: '12/21/54' },
  { id: 0, name: 'List', date: '12/21/54' },
  { id: 0, name: 'List', date: '12/21/54' },
  { id: 0, name: 'List', date: '12/21/54' },
]

function SavedRecipeLists() {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          borderRadius: 15,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingVertical: 5,
        }}
      >
        <TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'orange',
              alignItems: 'center',
              justifyContent: 'center',
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 45,
            }}
          >
            <Text style={{ color: 'white', fontSize: 17, paddingBottom: 2 }}>
              Sort
            </Text>
            <MaterialIcons
              name='sort-by-alpha'
              size={24}
              color='white'
              style={{ marginLeft: 5 }}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={{ marginRight: 5 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialIcons size={24} name='add-box' color='orange' />
            <Text
              style={{
                fontSize: 17,
                color: 'orange',
                alignItems: 'center',
              }}
            >
              Add
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {data.map((item, index) => {
        return (
          <TouchableOpacity
            key={index}
            style={[
              {
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                borderRadius: 15,
                paddingHorizontal: 20,
                marginTop: 5,
                paddingVertical: 5,
                backgroundColor: 'white',
              },
              styles.boxShadow,
            ]}
            onPress={() => {
              navigation.navigate('List', { id: item.id, name: item.name })
            }}
          >
            <Text
              style={{
                ...FONTS.h3,
                color: COLORS.primary,
                alignItems: 'center',
              }}
            >
              {item.name}
            </Text>

            <Image
              source={img}
              style={{
                width: 50,
                height: 50,
                borderRadius: 45,
                opacity: 0.5,
              }}
            />
          </TouchableOpacity>
        )
      })}
    </View>
  )
}

function PersonalRecipeList() {
  const navigation = useNavigation()
  return (
    <View style={{ flex: 1 }}>
      <TouchableOpacity
        style={[
          {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: 15,
            paddingHorizontal: 20,
            marginTop: 5,
            paddingVertical: 5,
            backgroundColor: 'white',
          },
          styles.boxShadow,
        ]}
        onPress={() => {
          navigation.navigate('PersonalList', { id: 1, name: 'My recipes' })
        }}
      >
        <Text style={{ ...FONTS.h3 }}>My recipes</Text>

        <Image
          source={img}
          style={{
            width: 50,
            height: 50,
            borderRadius: 45,
            opacity: 0.5,
          }}
        />
      </TouchableOpacity>
    </View>
  )
}

function Profile({ navigation }) {
  const [isCreateVisible, setCreateVisible] = useState(false)
  const [isSettingVisible, setSettingVisible] = useState(false)
  const [listName, setListName] = useState('')
  const generateBoxShadowStyle = (
    xOffset,
    yOffset,
    shadowColorIos,
    shadowOpacity,
    shadowRadius,
    elevation,
    shadowColorAndroid,
  ) => {
    if (Platform.OS === 'ios') {
      styles.boxShadow = {
        shadowColor: shadowColorIos,
        shadowOffset: { width: xOffset, height: yOffset },
        shadowOpacity,
        shadowRadius,
      }
    } else if (Platform.OS === 'android') {
      styles.boxShadow = {
        elevation,
        shadowColor: shadowColorAndroid,
      }
    }
  }
  generateBoxShadowStyle(0, 2, '#000', 0.3, 3, 4, '#000')
  const createList = () => {}
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <StatusBar backgroundColor='black' style='light' />

      <ScrollView>
        <View
          style={{
            marginTop: 30,
            alignItems: 'center',
          }}
        >
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Settings')
              // setSettingVisible(true);
            }}
            style={{ position: 'absolute', right: 20, top: 0 }}
          >
            <View
              style={{
                backgroundColor: 'rgba(52, 52, 52, 0.1)',
                padding: 10,
                borderRadius: 999,
              }}
            >
              <MaterialIcons name='settings' size={24} color='gray' />
            </View>
          </TouchableOpacity>
          <Image
            source={img}
            resizeMode='contain'
            style={{
              height: 100,
              width: 100,
              borderRadius: 999,
              borderColor: COLORS.primary,
              borderWidth: 0.5,
            }}
          />

          <Text
            style={{
              ...FONTS.h2,
              color: COLORS.primary,
              marginVertical: 8,
              fontWeight: 'bold',
            }}
          >
            Melissa Peters
          </Text>
        </View>

        <View style={{ flex: 1, marginHorizontal: 22, marginTop: 20, gap: 20 }}>
          <PersonalRecipeList />
          <SavedRecipeLists />
        </View>
        <View style={{ height: 500 }} />
      </ScrollView>

      <Modal animationType='fade' transparent visible={isSettingVisible}>
        <TouchableWithoutFeedback
          onPress={() => {
            setSettingVisible(false)
          }}
        >
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              backgroundColor: 'gray',
              opacity: 0.1,
            }}
          />
        </TouchableWithoutFeedback>
        <View
          style={[
            {
              position: 'absolute',
              right: 50,
              top: 60,
              width: '35%',
              backgroundColor: 'white',
              borderRadius: 20,
            },
            styles.boxShadow,
          ]}
        >
          <TouchableOpacity
            style={{
              justifyContent: 'center',
              padding: 15,
            }}
          >
            <Text style={{ ...FONTS.h3, fontWeight: '500' }}>Edit account</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: 'red',
              justifyContent: 'center',
              padding: 15,
              borderBottomLeftRadius: 20,
              borderBottomRightRadius: 20,
            }}
          >
            <Text style={{ ...FONTS.h3, color: 'white', fontWeight: '500' }}>
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  boxShadow: {},
})

export default Profile
