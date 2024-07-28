import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { theme } from '../theme/index'
import Carousel from 'react-native-reanimated-carousel'

function SplashScreen() {
  const WIDTH = Dimensions.get('window').width
  const [activeSlide, setActiveSlide] = useState(0)
  const [reverse, setReverse] = useState(false)
  const navigation = useNavigation()

  const images = [
    {
      bg: require('../assets/splash1.png'),
      icon: require('../assets/images/Spash/sp1.png'),
    },
    {
      bg: require('../assets/splash2.png'),
      icon: require('../assets/images/Spash/sp2.png'),
    },
    {
      bg: require('../assets/splash3.png'),
      icon: require('../assets/images/Spash/sp3.png'),
    },
    {
      bg: require('../assets/splash4.png'),
      icon: require('../assets/images/Spash/sp4.png'),
    },
  ]

  function onSnap(index) {
    setActiveSlide(index)
    if (index == 0 || index == images.length - 1) setReverse(!reverse)
  }

  function pagination() {
    var loop = []

    for (let i = 0; i < images.length; i++) {
      loop.push(
        <View
          key={i}
          style={[
            styles.paginationItem,
            {
              backgroundColor: i == activeSlide ? '#FBBC05' : 'white',
            },
          ]}
        />
      )
    }

    return <View style={styles.pagination}>{loop}</View>
  }
  return (
    <SafeAreaView
      style={{ backgroundColor: theme.colors.secondary, flex: 1 }}
      edges={['right', 'left', 'top']}
    >
      <View style={styles.container}>
        <View style={styles.topContainer}>
          <Carousel
            loop
            width={WIDTH}
            height={WIDTH}
            autoPlay
            autoPlayReverse={reverse}
            autoPlayInterval={1000}
            data={images}
            scrollAnimationDuration={2000}
            onSnapToItem={(index) => onSnap(index)}
            renderItem={({ item, index }) => (
              <View
                style={{ flex: 1, marginVertical: 30, paddingTop: 50 }}
                key={index}
              >
                <ImageBackground
                  resizeMode='stretch'
                  source={item.bg}
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Image
                    style={{
                      height: 200,
                      resizeMode: 'contain',
                    }}
                    source={item.icon}
                  />
                </ImageBackground>
              </View>
            )}
          />

          <View
            style={{ justifyContent: 'center', position: 'absolute', top: 0 }}
          >
            <Text className=' text-[#FFFFFF] text-[20px] font-medium leading-normal text-center mt-[20px]'>
              Welcome to
            </Text>
            <View className='flex flex-row mt-[10px]'>
              <View className='bg-[#FFFFFF] w-[56px] h-[56px] rounded-lg flex justify-center items-center'>
                <Text className='text-[#3a9693] text-[42px] font-bold leading-normal '>
                  I
                </Text>
              </View>
              <Text className='text-[#FFFFFF] font-bold text-[42px] leading-normal '>
                ntelliTaste
              </Text>
            </View>
          </View>
          <View style={{ position: 'absolute', bottom: 10 }}>
            {pagination()}
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => {
              navigation.navigate('SignInScreen')
            }}
          >
            <Text style={styles.loginText}>Log-in</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.signupBtn}
            onPress={() => {
              navigation.navigate('SignUpScreen')
            }}
          >
            <Text style={styles.signupText}>Sign-up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  loginBtn: {
    borderRadius: 40,
    backgroundColor: theme.colors.secondary,
    width: '80%',
    paddingVertical: 15,
    marginTop: 20,
  },
  loginText: {
    alignSelf: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  signupBtn: {
    borderRadius: 40,

    width: '80%',
    borderWidth: 0.5,
    paddingVertical: 15,
    marginTop: 20,
  },
  signupText: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
  },
  topContainer: {
    flex: 7,
    backgroundColor: theme.colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 4,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  paginationItem: {
    height: 3,
    width: 20,
    borderRadius: 40,
  },
})

export default SplashScreen

