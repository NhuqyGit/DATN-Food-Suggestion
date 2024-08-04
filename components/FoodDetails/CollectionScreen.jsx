import React, { useEffect, useState, useCallback } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { theme } from '../../theme/index'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {
  useGetCollectionsByUserIdQuery,
  useGetCollectionsByDishIdQuery,
  useUpdateDishCollectionsMutation,
} from '../../slices/collectionSlice'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CollectionScreen = ({ navigation, route }) => {
  const [selectedOptions, setSelectedOptions] = useState([])
  const [userId, setUserId] = useState(null)
  const { dishId } = route.params

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('user_id')
        if (storedUserId) {
          setUserId(storedUserId)
        }
      } catch (error) {
        console.error('Failed to fetch userId from AsyncStorage:', error)
      }
    }

    fetchUserId()
  }, [])

  const {
    data: optionsCollection,
    error: optionsCollectionError,
    isLoading: optionsCollectionLoading,
    refetch: refetchUserCollections,
  } = useGetCollectionsByUserIdQuery(userId)

  const { data: collectionsWithDish, refetch: refetchCollectionsWithDish } =
    useGetCollectionsByDishIdQuery(dishId)

  const [updateDishCollections, { isLoading: isUpdating }] =
    useUpdateDishCollectionsMutation()

  useFocusEffect(
    useCallback(() => {
      refetchUserCollections()
      refetchCollectionsWithDish()
    }, [refetchUserCollections, refetchCollectionsWithDish])
  )

  useEffect(() => {
    if (collectionsWithDish) {
      const initialSelectedOptions = collectionsWithDish?.map(
        (collection) => collection.id
      )
      setSelectedOptions(initialSelectedOptions)
    }
  }, [collectionsWithDish])

  const handleAddNewCollection = () => {
    navigation.navigate('AddNewCollection')
  }

  const handleCheckboxChange = (collectionId) => {
    setSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions?.includes(collectionId)
        ? prevSelectedOptions?.filter((id) => id !== collectionId)
        : [...prevSelectedOptions, collectionId]
    )
  }

  const handleDone = async () => {
    try {
      await updateDishCollections({
        userId,
        dishId,
        collectionIds: selectedOptions,
      }).unwrap()
      navigation.goBack()
    } catch (error) {
      console.error('Failed to update dish collections:', error)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeBtn}
      >
        <Ionicons name='close-circle-outline' size={30} color='gray' />
      </TouchableOpacity>
      <Text style={styles.title}>Collections</Text>
      <View style={styles.line} />
      <View style={styles.row}>
        <View style={styles.rowItem}>
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddNewCollection}
          >
            <Icon name='plus-circle' size={27} color={theme.colors.secondary} />
            <Text style={[styles.buttonText, styles.text]}>
              Add New Collection
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.line} />
      <ScrollView>
        {optionsCollection?.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.checkboxContainer}
            onPress={() => handleCheckboxChange(option?.id)}
            disabled={optionsCollectionLoading || optionsCollectionError}
          >
            <View
              style={[
                styles.checkbox,
                selectedOptions?.includes(option?.id) && styles.checkedCheckbox,
              ]}
            >
              {selectedOptions?.includes(option?.id) && (
                <Icon name='check' size={15} color='white' />
              )}
            </View>
            <Text style={styles.checkboxLabel}>{option?.collectionName}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.doneButton}
        onPress={handleDone}
        disabled={isUpdating}
      >
        <Text style={styles.buttonText}>{isUpdating ? 'Saving' : 'Done'}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 10,
  },
  closeBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    paddingTop: 30,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'semibold',
  },
  text: {
    color: 'black',
    paddingLeft: 7,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.secondary,
    marginBottom: 20,
    paddingBottom: 20,
  },
  doneButton: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 25,
    width: 200,
    marginVertical: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    paddingLeft: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: theme.colors.secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedCheckbox: {
    backgroundColor: theme.colors.secondary,
  },
  checkboxLabel: {
    fontSize: 16,
  },
})

export default CollectionScreen

