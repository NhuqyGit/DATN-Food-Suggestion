import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import RecipeCard from './components/RecipeCard'
import { useNavigation } from '@react-navigation/native'
import ExploreMoreItem from '../ExploreMoreItem/ExploreMoreItem'
import { AsyncStorageService } from '../../utils/AsynStorage'
import { HOST } from '../../config'

const ExploreCategories = ({ route }) => {
  const navigation = useNavigation()
  const category = route.params.category
  const handleBackPress = () => {
    navigation.goBack()
  }

  const [items, setItems] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getItems = async () => {
      try {
        const token = await AsyncStorageService.getAccessToken()
        const response = await fetch(`${HOST}/${category.route}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        const json = await response.json()
        setItems(json)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    getItems()
  }, [category])

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <MaterialIcons name='arrow-back' size={24} color='black' />
        </TouchableOpacity>
        <Text style={styles.cateTitle}>{category?.name}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.section}>
          {items?.map((item) => (
            <ExploreMoreItem key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
  },
  cateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  backButton: {
    padding: 20,
  },
  scrollViewContainer: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    gap: 20,
  },
  section: {
    display: 'flex',
    gap: 20,
    width: '90%',
  },
})

export default ExploreCategories

