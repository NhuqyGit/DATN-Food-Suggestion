import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'

const FilterItem = ({ data }) => {
  const { active, title, hasDelete } = data
  return (
    <TouchableOpacity style={[styles.container, !active && styles.inactive]}>
      <Text style={{ color: active ? 'white' : '#4CAF50' }}>{title}</Text>
      {hasDelete && (
        <AntDesign name='close' size={24} color={active ? 'white' : 'black'} />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
    backgroundColor: '#4CAF50',
    borderRadius: 200,
    color: '#fff',
  },
  inactive: {
    color: '#4CAF50',
    backgroundColor: 'transparent',
    borderColor: '#4CAF50',
  },
})

export default FilterItem

