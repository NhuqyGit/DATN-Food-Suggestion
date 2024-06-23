import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { theme } from '../../theme/index'

const TagForType = ({ props, typeSuggest, handleChangeTypeSuggest }) => {
  return (
    <TouchableOpacity
      onPress={() => handleChangeTypeSuggest(props.value)}
      activeOpacity={1}
      style={[
        styles.container,
        {
          backgroundColor:
            props.value === typeSuggest ? theme.colors.secondary : '#ebebeb',
        },
      ]}
    >
      <Text
        style={{
          color: props.value === typeSuggest ? 'white' : theme.colors.darkGray,
          fontWeight: '500',
        }}
      >
        {props.name}
      </Text>
    </TouchableOpacity>
  )
}

export default TagForType

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 8,
  },
})

