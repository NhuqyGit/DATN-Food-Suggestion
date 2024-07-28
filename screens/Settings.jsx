import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import {
  ScrollView,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTS } from '../theme/theme'
import SettingItem from '../components/Profile/SettingItem'

function SettingsItem({ item }) {
  return (
    <TouchableOpacity
      onPress={item.action}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingLeft: 12,
      }}
    >
      <MaterialIcons name={item.icon} size={24} color={item.color} />
      <Text
        style={{
          marginLeft: 36,
          ...FONTS.semiBold,
          fontWeight: '600',
          fontSize: 16,
          color: item.color,
        }}
      >
        {item.text}
      </Text>
    </TouchableOpacity>
  )
}

function Settings({ navigation }) {
  const navigateToEditProfile = () => {
    navigation.navigate('EditProfile')
  }

  const navigateToSecurity = () => {}

  const navigateToNotifications = () => {}

  const navigateToPrivacy = () => {}

  const navigateToSubscription = () => {}

  const navigateToSupport = () => {}

  const navigateToTermsAndPolicies = () => {}

  const navigateToFreeSpace = () => {}

  const navigateToDateSaver = () => {}

  const navigateToReportProblem = () => {}

  const addAccount = () => {}

  const logout = () => {}

  const accountItems = [
    {
      icon: 'person-outline',
      text: 'Edit Profile',
      action: navigateToEditProfile,
      color: 'black',
    },
    {
      icon: 'security',
      text: 'Security',
      action: navigateToSecurity,
      color: 'black',
    },
    {
      icon: 'notifications-none',
      text: 'Notifications',
      action: navigateToNotifications,
      color: 'black',
    },
    {
      icon: 'lock-outline',
      text: 'Privacy',
      action: navigateToPrivacy,
      color: 'black',
    },
  ]

  const supportItems = [
    {
      icon: 'credit-card',
      text: 'My Subscription',
      action: navigateToSubscription,
      color: 'black',
    },
    {
      icon: 'help-outline',
      text: 'Help & Support',
      action: navigateToSupport,
      color: 'black',
    },
    {
      icon: 'info-outline',
      text: 'Terms and Policies',
      action: navigateToTermsAndPolicies,
      color: 'black',
    },
  ]

  const actionsItems = [
    {
      icon: 'outlined-flag',
      text: 'Report a problem',
      action: navigateToReportProblem,
      color: 'black',
    },

    { icon: 'logout', text: 'Log out', action: logout, color: 'red' },
  ]

  const listSettingItem = [
    {
      name: 'My Account',
      action: 'my-account',
    },
    {
      name: 'Dietary Preferences',
      action: 'dietary preferences',
    },
    {
      name: 'Terms And Policies',
      action: 'term-and-policies',
    },
    {
      name: 'Help & Support',
      action: 'help-support',
    },
    {
      name: 'Report Problems',
      action: 'report-problems',
    },
    {
      name: 'About Nhuqy',
      action: 'About',
    },
  ]

  const listComponentSettingItem = listSettingItem.map((item, index) => {
    return <SettingItem props={item} key={index.toString()} />
  })

  return (
    // <SafeAreaView
    //   style={{
    //     flex: 1,
    //     backgroundColor: COLORS.white,
    //   }}
    // >
    //   <View
    //     style={{
    //       flexDirection: 'row',
    //       justifyContent: 'center',
    //       backgroundColor: 'orange',
    //       borderBottomLeftRadius: 20,
    //       borderBottomRightRadius: 20,
    //     }}
    //   >
    //     <TouchableOpacity
    //       onPress={() => navigation.goBack()}
    //       style={{
    //         position: 'absolute',
    //         left: 10,
    //         top: 15,
    //       }}
    //     >
    //       <MaterialIcons name='keyboard-arrow-left' size={40} color='white' />
    //     </TouchableOpacity>

    //     <Text style={{ ...FONTS.h1, paddingVertical: 20, color: 'white' }}>
    //       Settings
    //     </Text>
    //   </View>

    //   <ScrollView style={{ marginHorizontal: 12 }}>
    //     {/* Account Settings */}
    //     <View style={{ marginBottom: 12 }}>
    //       <Text style={{ ...FONTS.h4, marginVertical: 10 }}>Account</Text>
    //       <View
    //         style={{
    //           borderRadius: 15,
    //           backgroundColor: COLORS.gray,
    //         }}
    //       >
    //         {accountItems.map((item, index) => {
    //           return <SettingsItem item={item} key={index} />
    //         })}
    //       </View>
    //     </View>

    //     {/* Support and About settings */}

    //     <View style={{ marginBottom: 12 }}>
    //       <Text style={{ ...FONTS.h4, marginVertical: 10 }}>
    //         Support & About{' '}
    //       </Text>
    //       <View
    //         style={{
    //           borderRadius: 15,
    //           backgroundColor: COLORS.gray,
    //         }}
    //       >
    //         {supportItems.map((item, index) => {
    //           return <SettingsItem item={item} key={index} />
    //         })}
    //       </View>
    //     </View>

    //     {/* Actions Settings */}

    //     <View style={{ marginBottom: 15 }}>
    //       <Text style={{ ...FONTS.h4, marginVertical: 10 }}>Actions</Text>
    //       <View
    //         style={{
    //           borderRadius: 12,
    //           backgroundColor: COLORS.gray,
    //         }}
    //       >
    //         {actionsItems.map((item, index) => {
    //           return <SettingsItem item={item} key={index} />
    //         })}
    //       </View>
    //     </View>
    //   </ScrollView>
    // </SafeAreaView>

    <SafeAreaView
      style={{ backgroundColor: 'white' }}
      edges={['right', 'left', 'top']}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name='keyboard-arrow-left' size={28} color='black' />
        </TouchableOpacity>

        <Text style={styles.head}>Settings</Text>

        {listComponentSettingItem}
      </View>
    </SafeAreaView>
  )
}
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
    marginVertical: 10,
    fontWeight: '700',
    color: '#231F20',
  },
})

export default Settings

