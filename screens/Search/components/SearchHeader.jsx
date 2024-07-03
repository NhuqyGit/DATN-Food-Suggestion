import { Entypo, Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Button from '../../../components/Button/Button'
import {
  setCookingTime,
  setIngredientIds,
  setIngredientNames,
} from '../../../slices/searchSlice'
import { useDispatch } from 'react-redux'

function SearchHeader({
  setVisible,
  setSearchText,
  getDishBySearchText,
  setStep,
  step,
}) {
  // const [search, setSearch] = useState('')
  const [text, setText] = useState('')
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
  const dispatch = useDispatch()

  useEffect(() => {
    if (!text) {
      setSearchText('')
    }
  }, [text])

  return (
    <View style={styles.container}>
      <View style={[boxShadow, styles.searchContainer]}>
        {step === 2 && (
          <TouchableOpacity
            onPress={() => {
              setStep(1)
              setText('')
              dispatch(setIngredientIds([]))
              dispatch(setIngredientNames([]))
              dispatch(setCookingTime(null))
            }}
          >
            <Ionicons
              style={styles.searchIcon}
              name='arrow-back-outline'
              size={22}
              color='#9e9e9e'
            />
          </TouchableOpacity>
        )}

        <TextInput
          value={text}
          onChangeText={(text) => {
            setText(text)
          }}
          style={styles.input}
          placeholder='Search'
        />
        <TouchableOpacity
          onPress={() => {
            setStep(2)
            setSearchText(text)
            getDishBySearchText(text)
          }}
          disable={!text}
        >
          <Ionicons
            style={styles.searchIcon}
            name='search-outline'
            size={22}
            color='#9e9e9e'
          />
        </TouchableOpacity>
      </View>

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
    borderRadius: 25,
    // borderColor: 'red',
    // borderWidth: 1,
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  searchIcon: {
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

