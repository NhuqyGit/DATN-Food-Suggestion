import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { MaterialIcons } from '@expo/vector-icons'


function Header() {
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
          return {
              shadowColor: shadowColorIos,
              shadowOffset: { width: xOffset, height: yOffset },
              shadowOpacity,
              shadowRadius,
          }
      } else if (Platform.OS === 'android') {
          return  {
              elevation,
              shadowColor: shadowColorAndroid,
          }
      }
  }

  const boxShadow = generateBoxShadowStyle(0, 2, 'black', 0.1, 4, 4, 'black')


  return (
    <View style={styles.container}>
      <TouchableOpacity style={[boxShadow, styles.searchContainer]}>
        {/* <Icon name='search' size={20} style={styles.searchIcon} /> */}
        <MaterialIcons
          name='search'
          size={22}
          color='#6A6667'
          style={styles.searchIcon}
        />
        <Text style={styles.searchPlaceHolder}> Search...</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.avatarContainer}>
        <Image 
          style={styles.avatarImage}
          source={require('../../assets/images/Profile/avatarTest.jpg')}/>
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
    paddingHorizontal: 23,
    paddingVertical: 5,
  },
  avatarContainer:{
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'blue',
    // borderWidth: 2,
    borderRadius: 200
  },
  avatarImage:{
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
    transform:  [{rotateZ: '90deg'}],
    marginRight: 8,
  },
  searchPlaceHolder:{
    color: '#9e9e9e'
  }
})

export default Header