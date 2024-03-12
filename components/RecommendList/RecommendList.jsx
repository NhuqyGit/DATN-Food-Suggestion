import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native'
import React from 'react'
import RecommendItem from '../RecommendItem/RecommendItem'
import { theme } from '../../theme'
import RecommendItemHorizontal from '../RecommendItem/RecommendItemHorizontal'
import SmallRecommendItem from '../RecommendItem/SmallRecommendItem'

function RecommendList() {
  const mockData = [
    {
      id: 1,
      title: 'Breakfast with bread, eggs and bacon',
      author: 'Tan Sang',
      image: require('../../assets/recommendImage.jpg'),
    },
    {
      id: 2,
      title: 'Bun bo Hue with new broth, best recipe from around the world',
      author: 'Tan Sang',
      image: require('../../assets/recommendImage.jpg'),
    },
    {
      id: 3,
      title: 'Breakfast with bread, eggs and bacon',
      author: 'Tan Sang',
      image: require('../../assets/recommendImage.jpg'),
    },
    {
      id: 4,
      title: 'Bun bo Hue with new broth, best recipe from around the world',
      author: 'Tan Sang',
      image: require('../../assets/recommendImage.jpg'),
    },
    {
      id: 5,
      title: 'Breakfast with bread, eggs and bacon',
      author: 'Tan Sang',
      image: require('../../assets/recommendImage.jpg'),
    },
  ]
  return (
    <View style={styles.container}>
      <View style={styles.horizontalPadding}>
        <View style={styles.header}>
          <Text style={styles.title}>Recommend for you</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {mockData?.map((item) => (
            <RecommendItem key={item.id} item={item} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.horizontalPadding}>
        <View style={styles.header}>
          <Text style={styles.title}>Recommend for you</Text>
        </View>
        <ScrollView vertical showsVerticalScrollIndicator={false}>
          {mockData?.map((item) => (
            <RecommendItemHorizontal key={item.id} item={item} />
          ))}
        </ScrollView>
      </View>

      <View style={[styles.healthyList, styles.horizontalPadding]}>
        <View style={styles.header}>
          <Text style={styles.title}>Healthy recipes</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {mockData?.map((item) => (
            <SmallRecommendItem key={item.id} item={item} />
          ))}
        </ScrollView>

        <View style={styles.header}>
          <Text style={styles.title}>Quick recipes</Text>
          <TouchableOpacity>
            <Text style={styles.viewAll}>View all</Text>
          </TouchableOpacity>
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {mockData?.map((item) => (
            <SmallRecommendItem key={item.id} item={item} />
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    flexDirection: 'column',
  },

  horizontalPadding: {
    paddingHorizontal: 16,
  },

  header: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  viewAll: {
    fontSize: 16,
    color: theme.colors.secondary,
  },

  healthyList: {
    backgroundColor: '#FEFFD3',
    paddingBottom: 32,
  },
})

export default RecommendList
