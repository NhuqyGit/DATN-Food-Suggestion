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
import RenderHTML from 'react-native-render-html'
import { useWindowDimensions } from 'react-native'

const FAQDetails = ({ navigation, route }) => {
  const { title, topic } = route.params

  const { width } = useWindowDimensions()

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

          <Text style={styles.head}>{`FAQ - ${title}`}</Text>
          <Text style={styles.title}>{topic.title}</Text>
          {topic?.content && (
            <View>
              <RenderHTML contentWidth={width} source={topic?.content} />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default FAQDetails

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

  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#231F20',
    marginBottom: 16,
  },
})

