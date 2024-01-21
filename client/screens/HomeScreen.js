import { View, Text, ScrollView, StyleSheet } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../components/Header/Header';
import CategoryList from '../components/CategoryList/CategoryList';
import RecommendList from '../components/RecommendList/RecommendList';

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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    marginBottom: 16,
    gap: 16,
  },
});

export default HomeScreen;

