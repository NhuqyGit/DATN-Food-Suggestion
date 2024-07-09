import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import HomeScreen from './HomeScreen'
import FoodDetailsScreen from '../../components/FoodDetails/FoodDetails'
import CollectionScreen from '../../components/FoodDetails/CollectionScreen'
import ExploreCategories from '../../components/CategoryList/ExploreCategories'
import AddNewCollection from '../../components/FoodDetails/AddNewCollection'
import AddNewNote from '../../components/FoodDetails/AddNewNote'
import ReviewScreen from '../../components/FoodDetails/ReviewScreen'
import MealPlan from '../MealPlan'
import ExploreCuisine from '../../components/CategoryList/ExploreCuisine'
import ViewAllRecommend from '../../components/CategoryList/ViewAllRecommend'
const Stack = createNativeStackNavigator()
function Home() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='HomeScreen' component={HomeScreen} />
      <Stack.Screen name='ExploreCategories' component={ExploreCategories} />
      <Stack.Screen name='ViewAllRecommend' component={ViewAllRecommend} />
      <Stack.Screen name='ExploreCuisine' component={ExploreCuisine} />
      <Stack.Screen name='FoodDetail' component={FoodDetailsScreen} />
      <Stack.Screen name="AddNewNote" component={AddNewNote} />
      <Stack.Screen name="ReviewScreen" component={ReviewScreen} />
      <Stack.Screen name="CollectionScreen" component={CollectionScreen} />
      <Stack.Screen name="AddNewCollection" component={AddNewCollection} />
      <Stack.Screen name='MealPlan' component={MealPlan} />
    </Stack.Navigator>
  )
}

export default Home

