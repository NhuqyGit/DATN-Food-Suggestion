import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Button from '../../../components/Button/Button'
import { Feather } from '@expo/vector-icons'

const IngredientItem = ({ defaultTitle, id, style, onRemove, onEdit }) => {
  const [isEdit, setIsEdit] = useState(false)
  const [title, setTitle] = useState(defaultTitle)

  return (
    <View style={[styles.container, style]}>
      {isEdit ? (
        <TextInput
          defaultValue={title}
          onChangeText={(text) => setTitle(text)}
          onFocus={() => {
            scrollViewRef.current.scrollToEnd({ animated: true })
          }}
        />
      ) : (
        <Text>{title}</Text>
      )}
      <View style={styles.groupButton}>
        {isEdit ? (
          <Button
            color={'#000'}
            icon={'check'}
            onPress={() => {
              onEdit(id, title)
              setIsEdit(!isEdit)
            }}
          />
        ) : (
          <Button
            childrenIcon={
              <Feather
                name='edit-2'
                size={24}
                color='black'
                onPress={() => {
                  setIsEdit(!isEdit)
                }}
              />
            }
          />
        )}

        <Button icon={'close'} onPress={onRemove} color={'black'} />
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

