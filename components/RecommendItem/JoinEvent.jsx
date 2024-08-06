import { MaterialIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { HOST, uploadToFirebase } from '../../config'
import { theme } from '../../theme'
import Ionicons from '@expo/vector-icons/Ionicons'
import {
  useGetAllEventQuery,
  useGetAllIngredientsQuery,
  useUpdateDishToEventMutation,
} from '../../slices/eventSlice'
import { MultiSelect } from 'react-native-element-dropdown'
import AntDesign from '@expo/vector-icons/AntDesign'
import { AsyncStorageService } from '../../utils/AsynStorage'
import Toast from 'react-native-toast-message'

const JoinEvent = ({ navigation, route }) => {
  const { eventId } = route.params
  const [dishName, setDishName] = useState('')
  const [cookingTime, setCookingTime] = useState('')
  const [servings, setServings] = useState('')
  const [calories, setCalories] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [imageUri, setImageUri] = useState('')
  const [uri, setUri] = useState('')
  const [directions, setDirections] = useState('')
  const [loadingUploadImage, setLoadingUploadImage] = useState(false)
  const [loading, setLoading] = useState(false)
  const { refetch } = useGetAllEventQuery()

  const data = []

  const handleNavigateBack = () => {
    navigation.goBack()
  }

  const importImage = async () => {
    setLoadingUploadImage(true)
    try {
      const res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
      })

      if (!res.canceled) {
        const uri = res.assets[0].uri
        const filename = uri.substring(uri.lastIndexOf('/') + 1)
        const uploadRes = await uploadToFirebase(uri, filename)
        setUri(uri)
        setImageUri(uploadRes.downloadURL)
      }
    } catch (e) {
      Alert.alert('Error uploading image')
    } finally {
      setLoadingUploadImage(false)
    }
  }

  const updateDishToEvent = async () => {
    setLoading(true)
    try {
      const token = await AsyncStorageService.getAccessToken()

      const formData = new FormData()

      formData.append('dishName', dishName)
      formData.append('cookingTime', cookingTime)
      formData.append('servings', servings)
      formData.append('calories', calories)
      formData.append('directions', directions)
      formData.append('ingredients[0][ingredientName]', 'Sushi rice')
      formData.append('ingredients[0][mass]', '2 cups')
      formData.append('image', {
        uri: uri,
        name: 'image.jpg',
        type: 'image/jpg',
      })

      const response = await fetch(
        `${HOST}/events/add-dish-to-event/${eventId}`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        }
      )

      const json = await response.json()

      if (json.statusCode === 400) {
        Toast.show({
          type: 'error',
          text1: 'Add dish Error',
          text2: json.message,
          textStyle: { fontSize: 20 },
        })
      } else {
        Toast.show({
          type: 'success',
          text1: 'Add dish success',
          text2: 'Dish added to event successfully',
          textStyle: { fontSize: 20 },
        })
        await refetch()
        handleNavigateBack()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async () => {
    try {
      if (
        !dishName ||
        !cookingTime ||
        !servings ||
        !calories ||
        // !ingredients ||
        !directions ||
        !imageUri
      ) {
        Alert.alert('Please fill in all fields')
        return
      }

      await updateDishToEvent()
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleNavigateBack}
          style={styles.backButton}
        >
          <MaterialIcons name='arrow-back' size={24} color='black' />
        </TouchableOpacity>
        <Text style={styles.cateTitle}>{'Share Your Dish'}</Text>
      </View>

      <View style={styles.wrapper}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Dish name</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter dish name'
            value={dishName}
            onChangeText={setDishName}
          />
        </View>

        <View style={styles.inputContainer}>
          {loadingUploadImage ? (
            <ActivityIndicator size='large' color={theme.colors.secondary} />
          ) : imageUri ? (
            <TouchableOpacity
              style={styles.imageContainer}
              onPress={importImage}
            >
              <Image source={{ uri: imageUri }} style={styles.image} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.uploadButton} onPress={importImage}>
              <Ionicons name='cloud-upload-outline' size={24} color='white' />
              <Text style={styles.buttonText}>Choose an image</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Ingredients</Text>
          <View style={styles.containerDropdown}>
            <MultiSelect
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              search
              data={data}
              labelField='label'
              valueField='value'
              placeholder='Select your ingredients'
              searchPlaceholder='Search...'
              value={ingredients}
              onChange={(item) => {
                setIngredients(item)
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color='#ccc'
                  name='search1'
                  size={20}
                />
              )}
              selectedStyle={styles.selectedStyle}
            />
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Cooking time</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter cooking time (in minutes)'
            keyboardType='numeric'
            value={cookingTime}
            onChangeText={setCookingTime}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Servings</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter number of servings'
            keyboardType='numeric'
            value={servings}
            onChangeText={setServings}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Calories</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter calories per serving'
            keyboardType='numeric'
            value={calories}
            onChangeText={setCalories}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Directions</Text>
          <TextInput
            style={styles.input}
            placeholder='Enter your directions'
            value={directions}
            onChangeText={setDirections}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.submitButton} onPress={onSubmit}>
          {loading ? (
            <ActivityIndicator size='small' color='white' />
          ) : (
            <Text style={styles.buttonText}>Submit</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

export default JoinEvent

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  containerDropdown: { padding: 0 },
  dropdown: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 50,
  },
  placeholderStyle: {
    color: '#ccc',
    fontSize: 14,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    borderRadius: 10,
    borderColor: '#ccc',
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 30,
  },
  wrapper: {
    paddingHorizontal: 10,
    gap: 16,
  },
  footer: {
    marginVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: theme.colors.lightGray,
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 10,
  },
  uploadButton: {
    backgroundColor: theme.colors.darkGray,
    padding: 10,
    borderRadius: 20,
    alignItems: 'center',
    gap: 6,
  },
  submitButton: {
    width: 200,
    backgroundColor: theme.colors.secondary,
    padding: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingLeft: 5,
  },
  backButton: {
    padding: 20,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },
  label: {
    fontWeight: '600',
  },
  buttonText: {
    fontWeight: '600',
    color: '#fff',
  },
  input: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 50,
  },
})

