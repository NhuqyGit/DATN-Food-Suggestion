import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Ionicons, Entypo } from '@expo/vector-icons'
import Button from '../../../components/Button/Button'

function SearchHeader({
  setStep,
  navigation,
  route,
  setVisible,
  setSearchText,
  searchText,
}) {
  // const [search, setSearch] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const generateBoxShadowStyle = (
    xOffset,
    yOffset,
    shadowColorIos,
    shadowOpacity,
    shadowRadius,
    elevation,
    shadowColorAndroid
  ) => {
    if (Platform.OS === 'ios') {
      return {
        shadowColor: shadowColorIos,
        shadowOffset: { width: xOffset, height: yOffset },
        shadowOpacity,
        shadowRadius,
      }
    } else if (Platform.OS === 'android') {
      return {
        elevation,
        shadowColor: shadowColorAndroid,
      }
    }
  }

  const boxShadow = generateBoxShadowStyle(0, 2, 'black', 0.1, 4, 4, 'black')

  useEffect(() => {
    if (searchText.length > 0) {
      setStep(2)
    } else if (searchText.length === 0 && !isFocused) {
      setStep(1)
    }
  }, [searchText, isFocused])

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[boxShadow, styles.searchContainer]}>
        {/* <Icon name='search' size={20} style={styles.searchIcon} /> */}
        <Ionicons
          style={styles.searchIcon}
          name='search-outline'
          size={22}
          color='#9e9e9e'
        />
        <TextInput
          value={searchText}
          onFocus={() => {
            setIsFocused(true)
          }}
          onBlur={() => {
            setIsFocused(false)
          }}
          onChangeText={(text) => {
            setSearchText(text)
          }}
          style={styles.input}
          placeholder='Search'
        />
      </TouchableOpacity>

      <TouchableOpacity style={styles.avatarContainer}>
        <Button
          childrenIcon={<Entypo name='camera' size={24} color='black' />}
          onPress={() => {
            // navigation.navigate('CameraScreen')
            setVisible(true)
          }}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingHorizontal: 16,
    paddingRight: 6,
    paddingVertical: 5,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    // borderWidth: 2,
    borderRadius: 200,
  },
  avatarImage: {
    width: 35,
    height: 35,
    borderRadius: 200,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    // borderColor: 'red',
    // borderWidth: 1,
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchIcon: {
    transform: [{ rotateZ: '90deg' }],
    marginRight: 8,
  },
  searchPlaceHolder: {
    color: '#9e9e9e',
  },
  input: {
    flex: 1,
  },
})

export default SearchHeader

