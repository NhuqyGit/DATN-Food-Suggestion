import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { AntDesign } from '@expo/vector-icons'

const HistoryItem = ({ item, isSearch = false }) => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <AntDesign name='clockcircleo' size={24} color='black' />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      {!isSearch && <AntDesign name='closecircleo' size={24} color='red' />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },

  title: {
    fontSize: 20,
  },
})

export default HistoryItem

