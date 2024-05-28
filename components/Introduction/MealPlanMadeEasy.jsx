import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

function MealPlanMadeEasy() {
  const navigator = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Meal planning made easy</Text>
        <Text style={styles.description}>
          Add recipes, instantly create shopping lists, schedule meals, and get
          cooking reminders
        </Text>
      </View>
      <Image
        style={styles.image}
        source={require('../../assets/mealPlanMadeEasy.png')}
      />
      <TouchableOpacity
        onPress={() => {
          navigator.push('MealPlan')
        }}
      >
        <View style={styles.startButton}>
          <Text style={styles.startButtonText}>Start Planning</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9D88B',
    alignItems: 'center',
    paddingVertical: 50,
    height: 500,
    position: 'relative',
    justifyContent: 'space-between',
  },

  title: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 32,
  },

  description: {
    textAlign: 'center',
    fontSize: 16,
  },

  content: {
    alignItems: 'center',
    maxWidth: 240,
  },

  image: {
    position: 'absolute',
    bottom: 0,
  },

  startButton: {
    backgroundColor: '#40AD53',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 200,
  },

  startButtonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
})

export default MealPlanMadeEasy

