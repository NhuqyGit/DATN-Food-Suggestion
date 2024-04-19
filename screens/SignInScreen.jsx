import React, { useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
// import { theme } from '../theme'
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme/index';
import { COLORS } from '../theme/theme';
import { Ionicons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectIsDonePersonalization } from '../slices/UserLoginSlice';

function SignInScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isHide, setIsHide] = useState(true);
  const dispatch = useDispatch();
  const isDonePersonalization = useSelector(selectIsDonePersonalization);

  const handleEmailChange = (email) => {
    setEmail(email);
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
  };

  const handleLogin = () => {
    if (password === 'admin' && email === 'admin') {
      dispatch(
        login({
          email: email,
          password: password,
        }),
      );
      if (!isDonePersonalization) {
        navigation.navigate('Personalization');
      }
    } else {
      console.log('Wrong email or password');
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Sign In</Text>
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder='Enter your email'
              keyboardType='email-address'
              value={email}
              onChangeText={handleEmailChange}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.passwordInput}>
              <TextInput
                style={[styles.input, styles.passwordInputLayout]}
                type='password'
                secureTextEntry={isHide}
                placeholder='Enter your password'
                value={password}
                onChangeText={handlePasswordChange}
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
          <Text style={styles.forgotPassword}>Forgot password?</Text>
          <View style={styles.thirdPartyContainer}>
            <TouchableOpacity style={styles.thirdPartyButton}>
              <Icon name='google' size={25} color='#900' />
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>
            <Text style={styles.orLogin}>Or sign up with email</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.signInButtonContainer}
          >
            <Text style={styles.signButton}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
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

  signInButtonContainer: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 15,
    // paddingHorizontal: 40,
    // width: '100%',
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

  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  label: {
    fontWeight: '500',
  },

  input: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
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

  thirdPartyContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 40,
    gap: 10,
  },

  thirdPartyButton: {
    padding: 15,
    minWidth: 60,
    borderRadius: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
  },

  forgotPassword: {
    color: theme.colors.primary,
  },

  orLogin: {
    alignSelf: 'center',
  },
});

export default SignInScreen;
