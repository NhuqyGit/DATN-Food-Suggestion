import { MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from 'react-native-popup-menu'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS } from '../theme/theme'

const img = require('../constants/knife-fork.jpg')

function RecipeListItem({ item }) {
  const [isVisible, setVisible] = useState(false)

  return (
    <View>
      <TouchableOpacity>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: 'white',
            borderRadius: 5,
            borderBottomWidth: 0.5,
            borderColor: 'gray',
            marginTop: 0.5,
            paddingRight: 20,
            paddingLeft: 0,
            paddingVertical: 5,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={img} style={{ width: 100, height: 80 }} />

            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.primary,
                alignItems: 'center',
              }}
            >
              {item.name}
            </Text>
          </View>
          <Menu>
            <MenuTrigger>
              <View
                style={{
                  padding: 5,
                }}
              >
                <MaterialIcons name='more-vert' size={24} color='gray' />
              </View>
            </MenuTrigger>
            <MenuOptions>
              <MenuOption onSelect={() => alert(`Save`)} text='Save' />
              <MenuOption onSelect={() => alert(`Delete`)}>
                <Text style={{ color: 'red' }}>{item.name}</Text>
              </MenuOption>
              <MenuOption
                onSelect={() => alert(`Not called`)}
                disabled
                text='Disabled'
              />
            </MenuOptions>
          </Menu>
        </View>
      </TouchableOpacity>
    </View>
  )
}

function PersonalReceipeList({ route, navigation }) {
  const ListID = route.params.id
  const listName = route.params.name

  // get data
  data = [
    { id: 0, name: 'a', date: '12/54/8' },
    { id: 1, name: 'b', date: '12/54/8' },
    { id: 2, name: 'c', date: '12/54/8' },
    { id: 3, name: 'd', date: '12/54/8' },
    { id: 4, name: 'e', date: '12/54/8' },
    { id: 5, name: 'f', date: '12/54/8' },
    { id: 6, name: 'a', date: '12/54/8' },
    { id: 7, name: 'b', date: '12/54/8' },
    { id: 8, name: 'c', date: '12/54/8' },
    { id: 9, name: 'd', date: '12/54/8' },
    { id: 10, name: 'e', date: '12/54/8' },
    { id: 11, name: 'f', date: '12/54/8' },
    { id: 12, name: 'a', date: '12/54/8' },
    { id: 13, name: 'b', date: '12/54/8' },
    { id: 14, name: 'c', date: '12/54/8' },
    { id: 15, name: 'd', date: '12/54/8' },
    { id: 16, name: 'e', date: '12/54/8' },
    { id: 17, name: 'f', date: '12/54/8' },
  ]

  return (
    <MenuProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            backgroundColor: 'orange',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: 'absolute',
              left: 10,
              top: 15,
            }}
          >
            <MaterialIcons name='keyboard-arrow-left' size={40} color='white' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              position: 'absolute',
              right: 20,
              top: 20,
            }}
          >
            <MaterialIcons name='add' size={35} color='white' />
          </TouchableOpacity>
          <Text style={{ ...FONTS.h1, paddingVertical: 20, color: 'white' }}>
            {listName}
          </Text>
        </View>

        <ScrollView>
          {data.map((item, index) => {
            return <RecipeListItem item={item} key={index} />
          })}
        </ScrollView>
      </SafeAreaView>
    </MenuProvider>
  )
}

export default PersonalReceipeList
