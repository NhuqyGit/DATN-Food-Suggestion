import React, { useState } from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { theme } from '../../../theme'

const DietaryDetailItem = ({ data, dataId, isLastItem = false, selected = false, handleChangePersonalize }) => {
  const [isActive, setIsActive] = useState(selected)

  const handleChange = () => {
    setIsActive(!isActive)
    handleChangePersonalize(dataId, data?.id)
  }
  return (
    <View>
      <TouchableOpacity
        onPress={handleChange}
        style={[styles.container, {gap: isActive ? 14 : 16}]}
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
        <Text>{data?.name}</Text>
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

