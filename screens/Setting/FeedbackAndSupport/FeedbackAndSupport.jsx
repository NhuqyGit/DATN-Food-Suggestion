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

const FeedbackAndSupport = ({ navigation }) => {
  const menu = [
    {
      id: 1,
      title: 'Feedback',
      route: 'Feedback',
    },
    {
      id: 4,
      title: 'FAQ',
      route: 'FAQStack',
    },
  ]

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}
      edges={['right', 'left', 'top']}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name='keyboard-arrow-left' size={28} color='black' />
          </TouchableOpacity>

          <Text style={styles.head}>Feedback & Support</Text>
          {menu?.map((item, index) => {
            return (
              <View key={item.id}>
                <TouchableOpacity
                  style={[styles.titleWrapper]}
                  onPress={() => {
                    navigation.navigate(item.route)
                  }}
                >
                  <Text style={styles.title}>{item?.title}</Text>
                </TouchableOpacity>
                <View
                  style={{
                    borderBottomWidth: index !== menu?.length - 1 ? 1 : 0,
                    borderBottomColor: '#F1F1F1',
                  }}
                ></View>
              </View>
            )
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default FeedbackAndSupport

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

  titleWrapper: {
    paddingVertical: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: '600',
  },
})

