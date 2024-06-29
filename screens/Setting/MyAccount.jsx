import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import MyAccountSetting from '../../components/Profile/MyAccountSetting'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo, setUserInfo } from '../../slices/userLoginSlice'
import { AsyncStorageService } from '../../utils/AsynStorage'

const MyAccount = ({ navigation }) => {
  const userInfo = useSelector(selectUserInfo)
  const dispatch = useDispatch()

  const logout = async () => {
    AsyncStorageService.clearToken()
    dispatch(setUserInfo(null))
  }

  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name='keyboard-arrow-left' size={28} color='#231F20' />
        </TouchableOpacity>

        <Text style={styles.head}>My Account</Text>

        <View style={styles.sectionProfile}>
          <View style={styles.sectionProfileLeft}>
            <View>
              <Image
                style={styles.avatarImage}
                source={
                  userInfo?.imgUrl
                    ? { uri: userInfo.imgUrl }
                    : require('../../assets/images/Profile/avatarTest.jpg')
                }
              />
            </View>

            <View style={styles.info}>
              <Text style={styles.name}>{userInfo?.username}</Text>
              <Text style={styles.email}>{userInfo?.email}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.sectionProfileRight}>
            <MaterialIcons name='edit' size={16} color='#231F20' />
          </TouchableOpacity>
        </View>

        {/* <MyAccountSetting name='Receive Nhuqy notifications' />
        <MyAccountSetting name='Measurement System' /> */}

        <TouchableOpacity
          onPress={() => navigation.navigate('ChangeInformation')}
        >
          <View style={styles.accountSettingContainer}>
            <Text style={styles.nameSetting}>Change Information</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('ChangePassword')}>
          <View style={styles.accountSettingContainer}>
            <Text style={styles.nameSetting}>Change Password</Text>
          </View>
        </TouchableOpacity>

        {/* <Text style={styles.notice}>
            Deleting your account may make your saved recipes, collections, and personalization preferences
            permanently inaccessible to you and reduce the functionality of connected appliances.Deletions
            will be performed in accordance with our Privacy Notice and applicable laws or regulations. Keep
            in mind that some of your personal data may be retained where necessary to comply with legal or regulatory
            obligations or for other reasons as explained in our Privacy Notice.
          </Text> */}

        <TouchableOpacity
          style={styles.deleteAccount}
          onPress={() => {
            logout()
          }}
        >
          <MaterialIcons name='logout' size={24} color='red' />
          <Text
            style={{
              fontWeight: '500',
              marginLeft: 5,
              color: '#231F20',
            }}
          >
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default MyAccount

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  btnBack: {
    width: 35,
    height: 35,
    marginTop: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#F3F3F3',
  },
  head: {
    textAlign: 'left',
    fontSize: 24,
    marginTop: 10,
    marginBottom: 25,
    fontWeight: '700',
    color: '#231F20',
  },
  sectionProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#ecf5f4',
    padding: 15,
    borderRadius: 5,
  },
  sectionProfileLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionProfileRight: {
    height: '100%',
  },
  accountSettingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F3F3',
    paddingVertical: 12,
  },
  info: {
    marginLeft: 15,
  },
  name: {
    fontSize: 14,
    fontWeight: '500',
    color: '#231F20',
  },
  email: {
    fontSize: 11,
    fontWeight: '300',
    color: '#231F20',
  },
  avatarImage: {
    width: 45,
    height: 45,
    borderRadius: 200,
  },
  notice: {
    marginVertical: 12,
    color: '#9e9e9e',
    fontSize: 10,
  },
  deleteAccount: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
})

