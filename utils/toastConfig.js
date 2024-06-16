import React from 'react';
import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { StyleSheet, Text } from 'react-native';
import { theme } from '../theme';

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={styles.successToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text2NumberOfLines={2} 
      renderText2={(props) => (
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={styles.text2}
        >
          {props.text2}
        </Text>
      )}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={styles.errorToast}
      contentContainerStyle={styles.contentContainer}
      text1Style={styles.text1}
      text2Style={styles.text2}
      text2NumberOfLines={2}
      renderText2={(props) => (
        <Text
          numberOfLines={2}
          ellipsizeMode="tail"
          style={styles.text2}
        >
          {props.text2}
        </Text>
      )}
    />
  ),
};

const styles = StyleSheet.create({
  successToast: {
    borderLeftColor: theme.colors.secondary,
    height: 'auto',
    minHeight: 80,
    padding: 10,
  },
  errorToast: {
    borderLeftColor: 'red',
    height: 'auto',
    minHeight: 80,
    padding: 10,
  },
  contentContainer: {
    paddingHorizontal: 10,
  },
  text1: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  text2: {
    fontSize: 16,
    color: '#333',
  },
});

export default toastConfig;
