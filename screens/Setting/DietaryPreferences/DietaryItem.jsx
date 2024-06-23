import { MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { theme } from '../../../theme'
import DietaryDetailItem from './DietaryDetailItem'

const DietaryItem = ({ data, handleChangePersonalize }) => {
  const [isActive, setIsActive] = useState(false)

  const totalSelected = data?.items.filter((item) => item.selected).length

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{data?.title}</Text>
        <TouchableOpacity
          style={styles.totalTag}
          onPress={() => setIsActive(!isActive)}
        >
          <Text style={styles.tagTitle}>{totalSelected}</Text>
          {isActive ? (
            <MaterialIcons
              name='keyboard-arrow-down'
              size={22}
              color={theme.colors.secondary}
            />
          ) : (
            <MaterialIcons
              name='keyboard-arrow-right'
              size={22}
              color={theme.colors.secondary}
            />
          )}
        </TouchableOpacity>
      </View>

      {isActive && (
        <View>
          {data?.items.map((item, index) => {
            return (
              <DietaryDetailItem
                key={item.id}
                data={item}
                dataId={data.id}
                isLastItem={index === data?.items?.length - 1}
                selected={item?.selected}
                handleChangePersonalize={handleChangePersonalize}
              />
            )
          })}
        </View>
      )}
    </View>
  )
}

export default DietaryItem

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    paddingVertical: 20,
    justifyContent: 'space-between',
    borderTopColor: '#F1F1F1',
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  totalTag: {
    borderRadius: 20,
    paddingVertical: 3,
    paddingLeft: 15,
    paddingRight: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.lightGreen,
  },

  tagTitle: {
    fontWeight: 'bold',
    color: theme.colors.secondary,
  },
})

