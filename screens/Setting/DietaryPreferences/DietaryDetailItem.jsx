import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { theme } from '../../../theme'

const DietaryDetailItem = ({ data, isLastItem = false, selected = false }) => {
  const [isActive, setIsActive] = useState(selected)

  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          setIsActive(!isActive)
        }}
        style={[styles.container]}
      >
        {isActive ? (
          <MaterialIcons
            name='check-circle'
            size={24}
            color={theme.colors.secondary}
          />
        ) : (
          <View style={styles.outter}></View>
        )}
        <Text>{data?.title}</Text>
      </TouchableOpacity>
      <View
        style={{
          borderBottomWidth: isLastItem ? 0 : 1,
          borderBottomColor: '#F1f1f1',
        }}
      ></View>
    </View>
  )
}

export default DietaryDetailItem

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 16,
    paddingVertical: 10,
    fontSize: 16,
  },

  outter: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 2,
    marginTop: 2,
    marginBottom: 2,
  },
  inner: {
    height: 15,
    width: 15,
    borderRadius: 10,
  },
})

