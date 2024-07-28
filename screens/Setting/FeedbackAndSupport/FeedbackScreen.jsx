import React, { useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { theme } from '../../../theme'
import { AsyncStorageService } from '../../../utils/AsynStorage'
import { HOST } from '../../../config'
import Toast from 'react-native-toast-message'

const FeedbackScreen = ({ navigation }) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }
  const [feedback, setFeedback] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleFeedback = async () => {
    try {
      setIsLoading(true)

      const token = await AsyncStorageService.getAccessToken()

      const response = await fetch(`${HOST}/feedback-apps`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: feedback,
          type: 'feedback',
        }),
      })

      const responseJson = await response.json()

      if (responseJson.error) {
        setError(
          Array.isArray(responseJson.message)
            ? responseJson.message.join('\n')
            : responseJson.message
        )
      } else {
        Toast.show({
          type: 'success',
          text1: 'Feedback Successfully',
          text2: 'Thank you for your feedback',
          textStyle: { fontSize: 20 },
        })
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}
      edges={['right', 'left', 'top']}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <View>
            <TouchableOpacity
              style={styles.btnBack}
              onPress={() => navigation.goBack()}
            >
              <MaterialIcons
                name='keyboard-arrow-left'
                size={28}
                color='black'
              />
            </TouchableOpacity>

            <Text style={styles.head}>Submit Feedback</Text>

            <TextInput
              placeholder={`Tell us what's on your mind?`}
              multiline
              style={styles.input}
              textAlignVertical='top'
              onChangeText={(text) => setFeedback(text)}
            />

            {error ? (
              <Text style={{ color: 'red', marginVertical: 10 }}>{error}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            onPress={handleFeedback}
            style={[
              styles.submitButton,
              {
                backgroundColor:
                  !feedback || isLoading
                    ? theme?.colors?.grayBackground
                    : theme.colors.secondary,
              },
            ]}
            disabled={isLoading || !feedback}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? (
                <ActivityIndicator size='small' color='white' />
              ) : (
                <Text>Submit</Text>
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default FeedbackScreen

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  btnBack: {
    width: 35,
    height: 35,
    marginTop: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#F3F3F3',
  },
  head: {
    textAlign: 'left',
    fontSize: 24,
    marginVertical: 10,
    fontWeight: '700',
    color: '#231F20',
    marginBottom: 32,
  },

  input: {
    height: 200,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    fontSize: 16,
    padding: 10,
    paddingTop: 10,
  },

  submitButton: {
    marginVertical: 20,
    backgroundColor: theme.colors.secondary,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

