import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Text } from 'react-native'
import Category from '../Category/Category'
import { AsyncStorageService } from '../../utils/AsynStorage'

function CategoryList() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getCategories = async () => {
      try {
        const token = await AsyncStorageService.getAccessToken()
        const response = await fetch(
          'https://datn-admin-be.onrender.com/categories',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        const json = await response.json()
        setCategories(json)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    getCategories()
  }, [])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Good afternoon!</Text>
      <ScrollView
        style={styles.list}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {categories.map((item) => (
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
    color: '#231F20',
  },
  list: {
    paddingLeft: 15,
    flexDirection: 'row',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
  },
})

export default CategoryList

