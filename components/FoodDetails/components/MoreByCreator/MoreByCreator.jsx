import React from 'react'
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'

export function renderStarRating(rating) {
  const filledStars = Math.floor(rating)
  const hasHalfStar = rating - filledStars >= 0.5
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0)

  const starElements = []

  for (let i = 0; i < filledStars; i++) {
    starElements.push(<Icon key={i} name='star' size={16} color='#FF6321' />)
  }

  if (hasHalfStar) {
    starElements.push(
      <View key='half' style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name='star-half-empty' size={16} color='#FF6321' />
      </View>,
    )
  }

  for (let i = 0; i < emptyStars; i++) {
    starElements.push(
      <Icon key={`empty_${i}`} name='star' size={16} color='gray' />,
    )
  }

  return starElements
}

function MoreByCreator({ author, recipes }) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>More by {author}</Text>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => alert(`View all by ${author}`)}
        >
          <Text style={{ color: 'green' }}>View All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => alert(`View details of ${item.name}`)}
            style={styles.recipeItem}
          >
            <View style={styles.recipeContainer}>
              <Image source={item.image} style={styles.recipeImage} />
              <TouchableOpacity
                style={styles.saveRecipeButton}
                onPress={() => alert(`Save ${item.name} to recipes!`)}
              >
                <Icon name='plus' size={20} color='green' />
              </TouchableOpacity>
              <View style={styles.recipeDetails}>
                <Text style={styles.recipeName}>{item.name}</Text>
                <View style={styles.ratingContainer}>
                  {renderStarRating(item.rating)}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  viewAllButton: {
    padding: 5,
  },
  recipeItem: {
    marginRight: 10,
  },
  recipeContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  recipeImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  saveRecipeButton: {
    padding: 5,
    position: 'absolute',
    top: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipeDetails: {
    padding: 10,
  },
  recipeName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
})
export default MoreByCreator
