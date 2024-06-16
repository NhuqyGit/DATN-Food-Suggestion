import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  ActivityIndicator,
  ScrollView,
} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from '../theme/index'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../theme/theme'
import { HOST } from '../config'
import BackButton from '../components/BackButton/BackButton'

function SignUpScreen() {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [validLength, setValidLength] = useState(false)
  const [hasNumber, setHasNumber] = useState(false)
  const [hasSpecialCharacter, setHasSpecialCharacter] = useState(false)
  const [error, setError] = useState()
  const [isHide, setIsHide] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const handleEmailChange = (email) => {
    setEmail(email)
  }

  const handleSignup = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${HOST}/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      })

      const responseJson = await response.json()

      if (responseJson.error) {
        setError(responseJson.message)
        if (Array.isArray(responseJson.message)) {
          setError(responseJson.message.join('\n'))
        } else {
          setError(responseJson.message)
        }
        setIsLoading(false)
      } else {
        navigation.navigate('SignInScreen')
      }
    } catch (error) {
      console.error(error)
      setIsLoading(false)
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = (password) => {
    let pattern = /\d+/
    let patternCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/

    setPassword(password)
    if (password.length >= 8) {
      setValidLength(true)
    } else {
      setValidLength(false)
    }
    if (password.match(pattern)) {
      setHasNumber(true)
    } else {
      setHasNumber(false)
    }
    if (password.match(patternCharacter)) {
      setHasSpecialCharacter(true)
    } else {
      setHasSpecialCharacter(false)
    }
  }

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingHorizontal: 20 }}>
          <BackButton />
          <View style={styles.container}>
            <View>
              <Text style={styles.title}>Let’s get started!</Text>
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>What is your username?</Text>
              <TextInput
                style={styles.input}
                value={email}
                placeholder='Enter your username'
                onChangeText={handleEmailChange}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.inputLabel}>Create a password</Text>
              <View style={styles.passwordInput}>
                <TextInput
                  style={[styles.input, styles.passwordInputLayout]}
                  type='password'
                  placeholder='Enter your password'
                  secureTextEntry={isHide}
                  onChangeText={handlePasswordChange}
                  value={password}
                />
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => setIsHide(!isHide)}
                  style={styles.iconEye}
                >
                  <Ionicons
                    name={isHide ? 'eye-off' : 'eye'}
                    size={22}
                    color={COLORS.secondary}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.progressBarContainer}>
              <View
                style={[
                  styles.progressBar,
                  {
                    backgroundColor: validLength
                      ? theme?.colors?.secondary
                      : theme?.colors?.grayBackground,
                  },
                ]}
              />
              <View
                style={[
                  styles.progressBar,
                  {
                    backgroundColor: hasNumber
                      ? theme?.colors?.secondary
                      : theme?.colors?.grayBackground,
                  },
                ]}
              />
              <View
                style={[
                  styles.progressBar,
                  {
                    backgroundColor: hasSpecialCharacter
                      ? theme?.colors?.secondary
                      : theme?.colors?.grayBackground,
                  },
                ]}
              />
            </View>

            <View style={styles.warningContainer}>
              <View style={styles.warningItem}>
                <View
                  style={[
                    styles.warningIcon,
                    {
                      backgroundColor: validLength
                        ? theme?.colors?.secondary
                        : theme?.colors?.grayBackground,
                    },
                  ]}
                />
                <Text style={styles.warningItem}>
                  Must contain at least 8 characters
                </Text>
              </View>
              <View style={styles.warningItem}>
                <View
                  style={[
                    styles.warningIcon,
                    {
                      backgroundColor: hasNumber
                        ? theme?.colors?.secondary
                        : theme?.colors?.grayBackground,
                    },
                  ]}
                />
                <Text style={styles.warningItem}>One number</Text>
              </View>
              <View style={styles.warningItem}>
                <View
                  style={[
                    styles.warningIcon,
                    {
                      backgroundColor: hasSpecialCharacter
                        ? theme?.colors?.secondary
                        : theme?.colors?.grayBackground,
                    },
                  ]}
                />

                <Text style={styles.warningItem}>One special character</Text>
              </View>
            </View>
            {error && (
              <View>
                <Text className='text-red-500 font-medium text-sm'>
                  {error}
                </Text>
              </View>
            )}
            <KeyboardAvoidingView>
              <TouchableOpacity
                onPress={handleSignup}
                style={[
                  styles.signUpButtonContainer,
                  {
                    backgroundColor:
                      !password || !email || isLoading
                        ? theme?.colors?.grayBackground
                        : theme.colors.secondary,
                  },
                ]}
                disabled={!email || !password || isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size='small' color='white' />
                ) : (
                  <Text style={styles.signButton}>Sign Up</Text>
                )}
              </TouchableOpacity>
            </KeyboardAvoidingView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
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
    height: 50,
  },

  passwordInputLayout: {
    flex: 1,
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  iconEye: {
    height: '100%',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  progressBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 6,
  },

  progressBar: {
    flex: 1,
    // backgroundColor: theme.colors.grayBackground,
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
    //backgroundColor: theme.colors.grayBackground,
    padding: 10,
    borderRadius: 50,
  },
})

export default SignUpScreen

