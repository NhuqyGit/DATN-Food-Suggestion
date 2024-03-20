import React from 'react'
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { theme } from '../../theme'

function SmallRecommendItem({ item }) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.container}>
      <Image style={styles.image} source={item?.image} />
      <View>
        <Text style={styles.rating}>{`Rating: ${item.rating}`}</Text>
        <View style={styles.authorContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.iconContainer}>
            <Icon style={styles.addIcon} name='plus' />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 140,
    height: 140,
    borderRadius: 8,
    marginRight: 16,
  },

  title: {
    color: '#000000',
    fontSize: 13,
    fontWeight: 'bold',
  },
  rating: {
    color: 'white',
    fontSize: 14,
  },
  authorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: 110,
    gap: 8,
  },
  author: {
    color: 'white',
    fontSize: 14,
    marginRight: 4,
  },
  iconContainer: {
    backgroundColor: theme.colors.secondary,
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height,
      ) / 2,
    width: Dimensions.get('window').width * 0.065,
    height: Dimensions.get('window').width * 0.065,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    color: 'white',
    fontSize: 16,
  },
})

export default SmallRecommendItem
