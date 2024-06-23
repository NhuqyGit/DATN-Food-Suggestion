import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '../../../components/Button/Button'
import { MaterialIcons } from '@expo/vector-icons'
import IngredientItem from './IngredientItem'
import IngredientSkeletonItem from './IngredientSkeletonItem'
import { HOST, firebase } from '../../../config'
import { AsyncStorageService } from '../../../utils/AsynStorage'
import { theme } from '../../../theme'
import { useDispatch } from 'react-redux'
import { setIngredientNames, setSearchStep } from '../../../slices/searchSlice'

const ViewImageScreen = ({ navigation, route }) => {
  const { image } = route.params

  const dispatch = useDispatch()

  const [resultS, setResultS] = useState('')
  const [options, setOptions] = useState(resultS?.concepts ?? [])
  const [loading, setLoading] = useState(false)

  const PAT = '4fcfa4434cae441f90b79c9c2384c56e'
  const USER_ID = 'clarifai'
  const APP_ID = 'main'
  const MODEL_ID = 'food-item-recognition'
  const MODEL_VERSION_ID = '1d5fd481e0cf4826aa72ec3ff049e044'

  const fetchIngredientByImage = async (image) => {
    setLoading(true)
    try {
      const token = await AsyncStorageService.getAccessToken()

      const formData = new FormData()
      formData.append('image', {
        uri: image,
        name: 'image.jpg',
        type: 'image/jpg',
      })

      const response = await fetch(`${HOST}/dish/upload-image`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      })

      const json = await response.json()

      return json.imageUrl
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchResult = async (image) => {
    setLoading(true)

    const url = await fetchIngredientByImage(image)

    try {
      const raw = JSON.stringify({
        user_app_id: {
          user_id: USER_ID,
          app_id: APP_ID,
        },
        inputs: [
          {
            data: {
              image: {
                url: url,
              },
            },
          },
        ],
      })

      const requestOptions = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: 'Key ' + PAT,
        },
        body: raw,
      }

      const response = await fetch(
        'https://api.clarifai.com/v2/models/' +
          MODEL_ID +
          '/versions/' +
          MODEL_VERSION_ID +
          '/outputs',
        requestOptions
      )

      const result = await response.json()
      if (result && result.outputs && result.outputs.length > 0) {
        // Accessing data from the first output, modify this based on your actual data structure
        setResultS(result.outputs[0].data)
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const onRemove = (id) => {
    setOptions((prev) => prev.filter((item) => item.id !== id))
  }

  const onEdit = (id, title) => {
    setOptions((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, name: title }
        }
        return item
      })
    )
  }

  const handlePressSearch = () => {
    navigation.navigate('SearchScreen')
    dispatch(setIngredientNames(options?.map((item) => item.name)))
    dispatch(setSearchStep(2))
  }

  useEffect(() => {
    if (image) {
      fetchResult(image)
    }
  }, [image])

  useEffect(() => {
    setOptions(resultS?.concepts ?? [])
  }, [resultS])

  return (
    <SafeAreaView style={styles.container}>
      <Button
        style={styles.button}
        onPress={() => navigation.goBack()}
        childrenIcon={
          <MaterialIcons name='keyboard-arrow-left' size={32} color='#fff' />
        }
      />
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>Confirm your ingredients</Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {loading ? (
            <IngredientSkeletonItem total={5} />
          ) : (
            <>
              {options?.map((item, index) => {
                if (index === options.length - 1) {
                  return (
                    <IngredientItem
                      key={item.id}
                      defaultTitle={item.name}
                      style={styles.borderButton}
                      onRemove={() => onRemove(item.id)}
                      id={item.id}
                      onEdit={onEdit}
                    />
                  )
                }
                return (
                  <IngredientItem
                    key={item.id}
                    defaultTitle={item.name}
                    onRemove={() => onRemove(item.id)}
                    id={item.id}
                    onEdit={onEdit}
                  />
                )
              })}

              {options.length > 0 && (
                <TouchableOpacity
                  onPress={handlePressSearch}
                  style={[
                    styles.signInButtonContainer,
                    {
                      backgroundColor:
                        options.length === 0 || loading
                          ? theme?.colors?.grayBackground
                          : theme.colors.secondary,
                    },
                  ]}
                  disabled={options.length === 0 || loading}
                >
                  <Text style={styles.signButton}>
                    {loading ? (
                      <ActivityIndicator size='small' color='white' />
                    ) : (
                      <Text>Search</Text>
                    )}
                  </Text>
                </TouchableOpacity>
              )}
            </>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default ViewImageScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
    backgroundColor: '#fff',
  },

  image: {
    width: '100%',
    height: '60%',
    position: 'absolute',
    minHeight: '60%',
    zIndex: 1,
  },

  button: {
    zIndex: 2,
    position: 'absolute',
    top: 40,
    left: 10,
  },

  content: {
    marginTop: '90%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingBottom: 46,
    alignItems: 'center',
    width: '100%',
    zIndex: 3,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5E5E5E',
    marginBottom: 16,
  },

  borderButton: {
    borderBottomWidth: 1,
    borderColor: '#BDBDBD',
  },

  signInButtonContainer: {
    marginTop: 20,
    flex: 1,
    backgroundColor: theme.colors.secondary,
    padding: 10,
    width: '50%',
    alignSelf: 'center',
    // paddingHorizontal: 40,
    // width: '100%',
    borderRadius: 10,
  },

  signButton: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#fff',
  },
})

