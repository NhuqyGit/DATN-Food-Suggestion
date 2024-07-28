import React, { useState } from 'react'
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import BackButton from '../../components/BackButton/BackButton'
import { HOST } from '../../config'
import { setUserInfo } from '../../slices/userLoginSlice'
import { theme } from '../../theme'
import { COLORS } from '../../theme/theme'
import { AsyncStorageService } from '../../utils/AsynStorage'
import Toast from 'react-native-toast-message'

function ChangePassword() {
  const dispatch = useDispatch()
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmNewPassword, setConfirmNewPassword] = useState('')

  const [isHide, setIsHide] = useState(true)
  const [isHideNewPassword, setIsHideNewPassword] = useState(true)
  const [isHideConfirmNewPassword, setIsHideConfirmNewPassword] = useState(true)

  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handlePasswordChange = (password) => {
    setCurrentPassword(password)
  }

  const handleNewPasswordChange = (password) => {
    setNewPassword(password)
  }

  const handleConfirmNewPasswordChange = (password) => {
    setConfirmNewPassword(password)
  }

  const logout = async () => {
    await AsyncStorageService.clearToken()
    dispatch(setUserInfo(null))
  }

  const handleChangePassword = async () => {
    try {
      setIsLoading(true)

      const token = await AsyncStorageService.getAccessToken()

      if (newPassword !== confirmNewPassword) {
        setError('New passwords do not match')
        setIsLoading(false)
        return
      }

      const response = await fetch(`${HOST}/auth/change-password`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: currentPassword,
          newPassword: newPassword,
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
        logout()
        Toast.show({
          type: 'success',
          text1: 'Change Password Successfully',
          text2: 'Please login again with your new password.',
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
    <SafeAreaView style={{ flex: 1 }} edges={['right', 'left', 'top']}>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20 }}>
        <View style={styles.container}>
          <BackButton />
          <Text style={styles.title}>Change Password</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Current Password</Text>
            <View style={styles.passwordInput}>
              <TextInput
                style={[styles.input, styles.passwordInputLayout]}
                secureTextEntry={isHide}
                placeholder='Enter your current password'
                value={currentPassword}
                onChangeText={handlePasswordChange}
              />
              <TouchableOpacity
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

          <View style={styles.inputContainer}>
            <Text style={styles.label}>New Password</Text>
            <View style={styles.passwordInput}>
              <TextInput
                style={[styles.input, styles.passwordInputLayout]}
                secureTextEntry={isHideNewPassword}
                placeholder='Enter your new password'
                value={newPassword}
                onChangeText={handleNewPasswordChange}
              />
              <TouchableOpacity
                onPress={() => setIsHideNewPassword(!isHideNewPassword)}
                style={styles.iconEye}
              >
                <Ionicons
                  name={isHideNewPassword ? 'eye-off' : 'eye'}
                  size={22}
                  color={COLORS.secondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm New Password</Text>
            <View style={styles.passwordInput}>
              <TextInput
                style={[styles.input, styles.passwordInputLayout]}
                secureTextEntry={isHideConfirmNewPassword}
                placeholder='Confirm your new password'
                value={confirmNewPassword}
                onChangeText={handleConfirmNewPasswordChange}
              />
              <TouchableOpacity
                onPress={() =>
                  setIsHideConfirmNewPassword(!isHideConfirmNewPassword)
                }
                style={styles.iconEye}
              >
                <Ionicons
                  name={isHideConfirmNewPassword ? 'eye-off' : 'eye'}
                  size={22}
                  color={COLORS.secondary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {error ? (
            <Text style={{ color: 'red', marginBottom: 10 }}>{error}</Text>
          ) : null}

          <TouchableOpacity
            onPress={handleChangePassword}
            style={[
              styles.signInButtonContainer,
              {
                backgroundColor:
                  !currentPassword ||
                  !newPassword ||
                  !confirmNewPassword ||
                  isLoading
                    ? theme?.colors?.grayBackground
                    : theme.colors.secondary,
              },
            ]}
            disabled={
              !currentPassword ||
              !newPassword ||
              !confirmNewPassword ||
              isLoading
            }
          >
            <Text style={styles.signButton}>
              {isLoading ? (
                <ActivityIndicator size='small' color='white' />
              ) : (
                'Submit'
              )}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  signInButtonContainer: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  signButton: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#fff',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  iconEye: {
    padding: 10,
  },
  passwordInputLayout: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
})

export default ChangePassword

