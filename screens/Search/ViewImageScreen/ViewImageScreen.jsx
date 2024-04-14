import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native'
import React from 'react'
import Button from '../../../components/Button/Button'
import { MaterialIcons } from '@expo/vector-icons'
import IngredientItem from './IngredientItem'

const ViewImageScreen = ({ navigation, route }) => {
  const { image } = route.params

  const mockOptions = [
    { id: 1, title: 'Hành tây' },
    { id: 2, title: 'Trứng gà' },
    { id: 3, title: 'Thịt bò' },
    { id: 4, title: 'Tỏi' },
    { id: 5, title: 'Củ cải trắng' },
    { id: 6, title: 'Hành lá' },
    { id: 7, title: 'Giá đỗ' },
    { id: 8, title: 'Giá đỗ' },
    { id: 9, title: 'Giá đỗ' },
    { id: 10, title: 'Giá đỗ' },
    { id: 11, title: 'Giá đỗ' },
    { id: 12, title: 'Giá đỗ' },
  ]
  return (
    <SafeAreaView style={styles.container}>
      <Button
        style={styles.button}
        onPress={() => navigation.goBack()}
        childrenIcon={
          <MaterialIcons name='keyboard-arrow-left' size={32} color='#fff' />
        }
      />
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.title}>XÁC NHẬN NGUYÊN LIỆU CỦA BẠN </Text>
        <ScrollView showsVerticalScrollIndicator={false}>
          {mockOptions.map((item, index) => {
            if (index === mockOptions.length - 1) {
              return (
                <IngredientItem
                  key={item.id}
                  title={item.title}
                  style={styles.borderButton}
                />
              )
            }
            return <IngredientItem key={item.id} title={item.title} />
          })}
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default ViewImageScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    position: 'relative',
  },

  image: {
    width: '100%',
    height: '70%',
    position: 'absolute',
    minHeight: '70%',
    zIndex: 1,
  },

  button: {
    zIndex: 2,
    position: 'absolute',
    top: 20,
    left: 10,
  },

  content: {
    marginTop: '90%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingBottom: 46,
    alignItems: 'center',
    width: '100%',
    zIndex: 3,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5E5E5E',
    marginBottom: 16,
  },

  borderButton: {
    borderBottomWidth: 1,
    borderColor: '#BDBDBD',
  },
})

