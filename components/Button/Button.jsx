import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import React from 'react'

const Button = ({ title, onPress, icon, color, size, childrenIcon }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {childrenIcon ? (
        childrenIcon
      ) : (
        <AntDesign
          name={icon}
          size={size ? size : 28}
          color={color ? color : '#f1f1f1'}
        />
      )}

      <Text style={[styles.text, { color: color ? color : '#f1f1f1' }]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#f1f1f1',
    marginLeft: 10,
  },
})

export default Button

