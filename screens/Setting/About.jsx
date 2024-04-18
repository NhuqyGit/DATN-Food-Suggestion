import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'

const About = ({ navigation }) => {
  const topics = [
    {
      id: 1,
      title: 'Terms of Use',
    },
    {
      id: 2,
      title: 'Privacy Notice',
    },
    {
      id: 3,
      title: 'Copyright Policy',
    },
    {
      id: 4,
      title: 'Do Not Sell My Personal Information',
    },
  ]

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name='keyboard-arrow-left' size={28} color='black' />
          </TouchableOpacity>

          <Text style={styles.head}>About Suggestion Food</Text>

          <Text style={styles.content}>
            Suggestion Food was launched in 2024 by Student of HCMUS on a{' '}
            mission to invent the ultimate kitchen tool. Whether it's finding a
            recipe or going to the store, Suggestion Food wants to make it
            easier for foodies to do what they love - cook, eat and share!.
            Suggestion Food's mission is to be the world's largest, most
            powerful and most helpful food site in the world.
          </Text>

          {topics?.map((topic, index) => {
            return (
              <>
                <TouchableOpacity style={styles.subTitleWrapper}>
                  <Text style={styles.subTitle}>{topic?.title}</Text>
                </TouchableOpacity>
                <View
                  style={{
                    borderBottomWidth: index !== topics?.length - 1 ? 1 : 0,
                    borderBottomColor: '#F1F1F1',
                  }}
                ></View>
              </>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default About

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
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
  content: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 32,
  },

  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 24,
  },

  subTitleWrapper: {
    paddingVertical: 20,
  },

  subTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
})

