import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Button from '../../../components/Button/Button'
import { Feather } from '@expo/vector-icons'

const IngredientItem = ({ title, style }) => {
  return (
    <View style={[styles.container, style]}>
      <Text>{title}</Text>
      <View style={styles.groupButton}>
        <Button
          childrenIcon={<Feather name='edit-2' size={24} color='black' />}
        />
        <Button icon={'close'} onPress={() => {}} color={'black'} />
      </View>
    </View>
  )
}

export default IngredientItem

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    paddingLeft: 10,
    borderColor: '#BDBDBD',
  },

  groupButton: {
    flexDirection: 'row',
  },
})

