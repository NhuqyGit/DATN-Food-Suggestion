import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native'
import React, { forwardRef } from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { selectUserInfo } from '../../slices/userLoginSlice'
import { useSelector } from 'react-redux'

function Header(props, ref) {
  const navigation = useNavigation()

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
  const userInfo = useSelector(selectUserInfo)

  return (
    <View ref={ref} style={[styles.container, props.style]}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Search')
        }}
        style={[boxShadow, styles.searchContainer]}
      >
        {/* <Icon name='search' size={20} style={styles.searchIcon} /> */}
        <Ionicons
          style={styles.searchIcon}
          name='search-outline'
          size={22}
          color='#9e9e9e'
        />
        <Text style={styles.searchPlaceHolder}> Search...</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Profile')
        }}
        style={styles.avatarContainer}
      >
        <Image
          style={styles.avatarImage}
          source={
            userInfo?.imgUrl
              ? { uri: userInfo.imgUrl }
              : require('../../assets/images/Profile/user.png')
          }
          // source={require('../../assets/images/Profile/avatarTest.jpg')}
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
    paddingHorizontal: 23,
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
})

export default forwardRef(Header)

