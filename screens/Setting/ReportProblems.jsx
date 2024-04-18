import React from 'react'
import {
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

const ReportProblems = ({ navigation }) => {
  const dismissKeyboard = () => {
    Keyboard.dismiss()
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
            />
          </View>

          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
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
    marginTop: 20,
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

