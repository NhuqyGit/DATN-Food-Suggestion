import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HOST } from '../../config'
import { AsyncStorageService } from '../../utils/AsynStorage'
import ExploreMoreItem from '../ExploreMoreItem/ExploreMoreItem'

function ExploreMore() {
  const [categories, setCategories] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getCategories = async () => {
      try {
        const token = await AsyncStorageService.getAccessToken()
        const response = await fetch(`${HOST}/categories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore More</Text>
      {categories?.map((item) => (
        <ExploreMoreItem key={item.id} item={item} />
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 32,
    gap: 16,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
})

export default ExploreMore

