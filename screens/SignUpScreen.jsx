import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from '../theme/index'
import { useNavigation } from '@react-navigation/native'

function SignUpScreen() {
  const navigation = useNavigation()
  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Let’s get started!</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>What is your email address?</Text>
          <TextInput style={styles.input} placeholder='Enter your email' />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Create a password</Text>
          <TextInput
            style={styles.input}
            type='password'
            placeholder='Enter your password'
          />
        </View>
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar} />
          <View style={styles.progressBar} />
          <View style={styles.progressBar} />
        </View>

        <View style={styles.warningContainer}>
          <View style={styles.warningItem}>
            <View style={styles.warningIcon} />
            <Text style={styles.warningItem}>
              Must contain at least 8 characters
            </Text>
          </View>
          <View style={styles.warningItem}>
            <View style={styles.warningIcon} />
            <Text style={styles.warningItem}>One number</Text>
          </View>
          <View style={styles.warningItem}>
            <View
              style={{
                ...styles.warningIcon,
                backgroundColor: theme.colors.grayBackground,
              }}
            />

            <Text style={styles.warningItem}>One special character</Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignInScreen')}
          style={styles.signUpButtonContainer}
        >
          <Text style={styles.signButton}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 80,
    gap: 30,
    backgroundColor: 'white',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  signUpButtonContainer: {
    marginTop: 'auto',
    backgroundColor: theme.colors.secondary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },

  signButton: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#fff',
  },

  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  inputLabel: {
    fontWeight: '500',
    fontSize: 16,
  },

  input: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  progressBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },

  progressBar: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    padding: 6,
    borderRadius: 20,
  },

  warningContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  warningItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },

  warningIcon: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 50,
  },
})

export default SignUpScreen

