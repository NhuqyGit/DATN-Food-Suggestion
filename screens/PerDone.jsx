import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native'
import React from 'react'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

function PerDone({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        style={{ width: '100%', height: deviceHeight / 3 }}
        source={require('../assets/images/PersonalizeScreen/slice3.png')}
      />

      <Text style={styles.h1}>You're all set!!!</Text>
      <Text style={styles.span}>
        Visit your personalized home feed of recipe suggestions
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate('Personalize1')}>
        <View style={styles.btn}>
          <Text style={styles.btnText}>Get Started</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default PerDone

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  h1: {
    marginTop: deviceHeight * 0.07,
    marginBottom: deviceHeight * 0.015,
    fontSize: deviceHeight * 0.04,
    fontWeight: '600',
  },
  span: {
    fontSize: deviceHeight * 0.018,
    marginBottom: deviceHeight * 0.07,
    maxWidth: '75%',
    // fontWeight: '500',
    textAlign: 'center',
  },
  btn: {
    // width: deviceWidth * 0.3,
    // height: deviceWidth * 0.012,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: deviceHeight * 0.028,
    backgroundColor: '#4CAF50',
  },
  btnText: {
    fontSize: deviceHeight * 0.018,
    fontWeight: '500',
    color: '#ffffff',
    paddingHorizontal: deviceWidth * 0.065,
    paddingVertical: deviceWidth * 0.03,
  },
})
