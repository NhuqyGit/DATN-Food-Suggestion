import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Alert,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Button from '../../../components/Button/Button'
import { MaterialIcons } from '@expo/vector-icons'
import IngredientItem from './IngredientItem'
import { MotiView } from 'moti'
import { Skeleton } from 'moti/skeleton'
import IngredientSkeletonItem from './IngredientSkeletonItem'
import { firebase } from '../../../config'

const ViewImageScreen = ({ navigation, route }) => {
  const { image } = route.params

  const [resultS, setResultS] = useState('')
  const [options, setOptions] = useState(resultS?.concepts ?? [])
  const [loading, setLoading] = useState(false)

  const PAT = '4fcfa4434cae441f90b79c9c2384c56e'
  const USER_ID = 'clarifai'
  const APP_ID = 'main'
  const MODEL_ID = 'food-item-recognition'
  const MODEL_VERSION_ID = '1d5fd481e0cf4826aa72ec3ff049e044'

  const fetchResult = async (image) => {
    setLoading(true)

    const response = await fetch(image)
    const blob = await response.blob()

    const ref = firebase
      .storage()
      .ref()
      .child('images/' + new Date().toISOString())
    const snapshot = await ref.put(blob)
    const url = await snapshot.ref.getDownloadURL()

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
        console.log('No data found in the response')
      }
    } catch (error) {
      console.log('error', error)
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
          return { ...item, title: title }
        }
        return item
      })
    )
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
        <Text style={styles.title}>XÁC NHẬN NGUYÊN LIỆU CỦA BẠN</Text>
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
    height: '70%',
    position: 'absolute',
    minHeight: '70%',
    zIndex: 1,
  },

  button: {
    zIndex: 2,
    position: 'absolute',
    top: 20,
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
})

