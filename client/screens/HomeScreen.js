import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header/Header';
import CategoryList from '../components/CategoryList/CategoryList';
import RecommendList from '../components/RecommendList/RecommendList';
import MealPlanMadeEasy from '../components/Introduction/MealPlanMadeEasy';
import ExploreMore from '../components/ExploreMore/ExploreMore';

const HomeScreen = () => {
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
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    height: 'fit-content',
    gap: 16,
  },
});

export default HomeScreen;

