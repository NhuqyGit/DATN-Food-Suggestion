import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import FilterItem from './FilterItem'
import { AntDesign } from '@expo/vector-icons'

const Filter = ({ hasButton = false }) => {
  const mockData = [
    {
      title: 'Chanh',
      active: false,
    },
    {
      title: 'Thịt bò',
      active: false,
    },
    {
      title: 'Dâu',
      active: false,
    },
    {
      title: 'Thịt heo',
      active: false,
    },
    {
      title: 'Táo',
      active: false,
    },
    {
      title: 'Ớt hiểm',
      active: false,
    },
    {
      title: 'Cà chua',
      active: false,
    },
    {
      title: 'Bột cà ri',
      active: false,
    },
    {
      title: 'Rau húng',
      active: false,
    },
  ]

  const cookingTimeOptions = [
    {
      title: '< 5 phút',
      active: false,
      value: 300,
    },
    {
      title: '< 10 phút',
      active: false,
      value: 600,
    },
    {
      title: '< 15 phút',
      active: false,
      value: 900,
    },
    {
      title: '< 30 phút',
      active: false,
      value: 1800,
    },
    {
      title: '< 45 phút',
      active: false,
      value: 2700,
    },
    {
      title: '< 1 giờ',
      active: false,
      value: 3600,
    },
    {
      title: '< 2 giờ',
      active: false,
      value: 7200,
    },
  ]

  const [cookingTimes, setCookingTimes] = useState(cookingTimeOptions)

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Nguyên liệu bạn có</Text>
        <View style={styles.wrapper}>
          <View style={styles.list}>
            {mockData.map((item, index) => (
              <FilterItem key={index} data={item} />
            ))}
          </View>
          {hasButton && (
            <TouchableOpacity style={styles.buttonWrapper}>
              <AntDesign name='plus' size={24} color='#4CAF50' />
              <Text style={styles.addButton}>Thêm nguyên liệu</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View>
        <Text style={styles.title}>Thời gian nấu, ít hơn:</Text>
        <View style={styles.wrapper}>
          <View style={styles.list}>
            {cookingTimes.map((item, index) => (
              <FilterItem key={index} data={item} />
            ))}
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#373739',
    paddingVertical: 32,
    gap: 16,
    position: 'absolute',
    zIndex: 100,
    top: 48,
    height: '100%',
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
    marginLeft: 16,
  },

  wrapper: {
    backgroundColor: '#2E2E30',
  },

  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
  },

  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  addButton: {
    color: '#fff',
  },
})

export default Filter

