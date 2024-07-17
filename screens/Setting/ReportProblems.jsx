import React, { useState } from 'react'
import {
  ActivityIndicator,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import { theme } from '../../theme'
import { AsyncStorageService } from '../../utils/AsynStorage'
import { HOST } from '../../config'
import Toast from 'react-native-toast-message'

const ReportProblems = ({ navigation }) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss()
  }

  const [report, setReport] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleReport = async () => {
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
          content: report,
          type: 'report',
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
          text1: 'Report Successfully',
          text2: 'We will check and fix it soon',
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

            <Text style={styles.head}>Report Problems</Text>

            <TextInput
              placeholder={`Let us know the issue you're encountering.`}
              multiline
              style={styles.input}
              textAlignVertical='top'
              onChangeText={(text) => setReport(text)}
            />

            {error ? (
              <Text style={{ color: 'red', marginVertical: 10 }}>{error}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            onPress={handleReport}
            style={[
              styles.submitButton,
              {
                backgroundColor:
                  !report || isLoading
                    ? theme?.colors?.grayBackground
                    : theme.colors.secondary,
              },
            ]}
            disabled={isLoading || !report}
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

export default ReportProblems

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
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

