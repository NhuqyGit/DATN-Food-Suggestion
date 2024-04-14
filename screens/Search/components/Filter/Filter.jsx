import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import FilterItem from './FilterItem'
import { AntDesign } from '@expo/vector-icons'

const Filter = ({ hasButton = false }) => {
  const mockData = [
    {
      title: 'Chanh',
      active: true,
    },
    {
      title: 'Thịt bò',
      active: true,
    },
    {
      title: 'Dâu',
      active: true,
    },
    {
      title: 'Thịt heo',
      active: true,
    },
    {
      title: 'Táo',
      active: true,
    },
    {
      title: 'Ớt hiểm',
      active: true,
    },
    {
      title: 'Cà chua',
      active: true,
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

  const mockData2 = [
    {
      title: '< 5 phút',
      active: true,
    },
    {
      title: '< 10 phút',
      active: true,
    },
    {
      title: '< 15 phút',
      active: true,
    },
    {
      title: '< 30 phút',
      active: true,
    },
    {
      title: '< 45 phút',
      active: true,
    },
    {
      title: '< 1 giờ',
      active: true,
    },
    {
      title: '< 2 giờ',
      active: true,
    },
  ]
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
            {mockData2.map((item, index) => (
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

