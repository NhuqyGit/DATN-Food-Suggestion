import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import Category from '../Category/Category'

function CategoryList() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await fetch(
          'https://datn-admin-be.onrender.com/categories'
        )
        const json = await response.json()
        setCategories(json)
      } catch (error) {
        console.error(error)
      }
    }

    getCategories()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Good afternoon!</Text>
      <ScrollView
        style={styles.list}
        horizontal // Enable horizontal scrolling
        showsHorizontalScrollIndicator={false} // Hide the horizontal scroll indicator
      >
        {categories?.map((item) => (
          <Category key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    marginTop: 32,
  },

  title: {
    paddingLeft: 20,
    fontSize: 28,
    fontWeight: '700',
    // marginBottom: 15
    color: '#231F20',
  },

  list: {
    paddingLeft: 15,
    flexDirection: 'row',
    alignItem: 'center',
    // backgroundColor: 'red',
  },
})

export default CategoryList

