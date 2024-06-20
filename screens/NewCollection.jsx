import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { theme } from '../theme/index'
import { useSelector } from 'react-redux'
import { selectUserInfo } from '../slices/userLoginSlice'
import { AsyncStorageService } from '../utils/AsynStorage'
import { HOST } from '../config'

const NewCollection = () => {
  const userInfo = useSelector(selectUserInfo)

  const [name, setName] = useState('')
  const [desc, setDesc] = useState('')
  const [clicked, setClicked] = useState(false)

  const navigation = useNavigation()

  const handleCreate = async () => {
    setClicked(true)
    const token = await AsyncStorageService.getAccessToken()
    try {
      const response = await fetch(`${HOST}/collections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: userInfo?.id,
          name,
          description: desc,
        }),
      })

      const responseJson = await response.json()

      if (responseJson.error) {
        console.log(responseJson.message)
      } else {
        navigation.goBack()
      }
    } catch (error) {
      console.error(error)
    } finally {
      setClicked(false)
    }
  }

  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }
  return (
    <SafeAreaView style={{ backgroundColor: 'white' }}>
      <StatusBar backgroundColor='black' barStyle='dark-content' />
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.btnBack}
          >
            <Ionicons name='close' size={22} color='black' />
          </TouchableOpacity>

          <Text style={styles.title}>Add Collection</Text>

          <View style={styles.formCollection}>
            <View style={styles.input}>
              <TextInput
                placeholder='Name your collection'
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={[styles.input, { height: '40%', paddingTop: 10 }]}>
              <TextInput
                style={{ height: '100%' }}
                editable
                multiline
                numberOfLines={4}
                placeholder='Add a description (optional)'
                value={desc}
                onChangeText={setDesc}
              />
            </View>
          </View>

          <View style={styles.btnSaveContainer}>
            <TouchableOpacity
              style={[
                styles.btnSave,
                {
                  backgroundColor: clicked
                    ? theme.colors.darkGray
                    : theme.colors.secondary,
                },
              ]}
              onPress={handleCreate}
              disabled={clicked}
            >
              <Text style={styles.btnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default NewCollection

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    // position: 'relative'
  },
  btnBack: {
    width: 35,
    height: 35,
    alignSelf: 'flex-end',
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#F3F3F3',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
  },
  input: {
    borderRadius: 5,
    marginTop: 25,
    padding: 15,
    backgroundColor: '#F3F3F3',
  },
  btnSaveContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSave: {
    backgroundColor: theme.colors.secondary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    width: '30%',
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
})

