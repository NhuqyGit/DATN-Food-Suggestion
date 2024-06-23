import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import React from 'react'

const SettingItem = ({ props, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push(props.action)
      }}
      style={styles.container}
    >
      <Text style={styles.nameSetting}>{props.name}</Text>
      <MaterialIcons name='keyboard-arrow-right' size={28} color='#231F20' />
    </TouchableOpacity>
  )
}

export default SettingItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F3F3',
    paddingVertical: 15,
  },
  nameSetting: {
    textAlign: 'left',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#231F20',
  },
})

