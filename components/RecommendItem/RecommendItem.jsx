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

function RecommendItem({ item }) {
  return (
    <TouchableOpacity style={styles.container}>
      <Image style={styles.image} source={item?.image} />
      <View style={styles.overlay}>
        <Text style={styles.rating}>{`Rating: ${item.rating}`}</Text>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.authorContainer}>
          <Text style={styles.author}>{item.author}</Text>
          <View style={styles.iconContainer}>
            <Icon style={styles.addIcon} name='plus' />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 8,
    marginRight: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 20,
    bottom: 0,
    justifyContent: 'flex-end',
    padding: 8,
  },
  title: {
    color: 'white',
    fontSize: 24,
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
    width: Dimensions.get('window').width * 0.075,
    height: Dimensions.get('window').width * 0.075,
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    color: 'white',
    fontSize: 16,
  },
})

export default RecommendItem
