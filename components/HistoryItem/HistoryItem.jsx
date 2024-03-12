import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'

const HistoryItem = ({ item, isSearch = false }) => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Icon name={isSearch ? 'search' : 'clock-o'} size={20} />
        <Text style={styles.title}>{item.title}</Text>
      </View>
      {!isSearch && <Icon name='close' size={20} />}
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

