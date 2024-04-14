import React, { useRef, forwardRef } from 'react'
import { ScrollView, StyleSheet, Animated } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CategoryList from '../../components/CategoryList/CategoryList'
import ExploreMore from '../../components/ExploreMore/ExploreMore'
import MealPlanMadeEasy from '../../components/Introduction/MealPlanMadeEasy'
import RecommendList from '../../components/RecommendList/RecommendList'

const AnimatedHeader = forwardRef((props, ref) => (
  <Animated.View {...props} ref={ref} />
))

const HomeScreen = () => {
  const scrollY = useRef(new Animated.Value(0)).current

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  })

  return (
    <SafeAreaView style={{ backgroundColor: '#c4e0e3' }}>
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        vertical
        onScroll={(e) => {
          const offsetY = e.nativeEvent.contentOffset.y
          scrollY.setValue(offsetY)
        }}
        scrollEventThrottle={16}
      >
        <AnimatedHeader style={[{ opacity: headerOpacity }]}></AnimatedHeader>
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
    paddingVertical: 20,
    height: 'fit-content',
    gap: 16,
    backgroundColor: 'white',
  },
})

export default HomeScreen

