import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CategoryList from '../components/CategoryList/CategoryList'
import ExploreMore from '../components/ExploreMore/ExploreMore'
import Header from '../components/Header/Header'
import MealPlanMadeEasy from '../components/Introduction/MealPlanMadeEasy'
import RecommendList from '../components/RecommendList/RecommendList'

function HomeScreen() {
  return (
    <SafeAreaView>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        vertical
      >
        <Header />
        <CategoryList />
        <RecommendList />
        <MealPlanMadeEasy />
        <ExploreMore />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    height: 'fit-content',
    gap: 16,
  },
})

export default HomeScreen
