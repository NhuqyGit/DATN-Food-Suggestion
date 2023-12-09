import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const SignInScreen = () => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Sign In</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text className=''>Email</Text>
          <TextInput style={styles.input} placeholder='Enter your email' />
        </View>
        <View style={styles.inputContainer}>
          <Text className=''>Password</Text>
          <TextInput
            style={styles.input}
            type='password'
            placeholder='Enter your password'
          />
        </View>
        <Text style={styles.forgotPassword}>Forgot password?</Text>
        <View style={styles.thirdPartyContainer}>
          <TouchableOpacity style={styles.thirdPartyButton}>
            <Icon name='google' size={25} color='#900' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.thirdPartyButton}>
            <Icon name='facebook' size={25} color='#900' />
          </TouchableOpacity>
          <TouchableOpacity style={styles.thirdPartyButton}>
            <Icon name='facebook' size={25} color='#900' />
          </TouchableOpacity>
        </View>
        <Text style={styles.orLogin}>Or sign up with email</Text>
        <TouchableOpacity style={styles.signInButtonContainer}>
          <Text style={styles.signButton}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 80,
    gap: 30,
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },

  signInButtonContainer: {
    backgroundColor: '#FF6321',
    paddingVertical: 15,
    paddingHorizontal: 40,
    width: '100%',
    borderRadius: 20,
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

  input: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },

  thirdPartyContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
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

