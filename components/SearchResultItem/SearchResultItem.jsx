import React from 'react'
import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native'
import { theme } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

function RecommendItem({ item }) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.push('FoodDetail', { foodDetails: item })
      }}
      activeOpacity={1}
      style={styles.container}
    >
      <Image style={styles.image} source={item?.image} />
      <View style={styles.overlay}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 3,
          }}
        >
          <Text style={styles.rating}>{`Rating: ${item.rating}`}</Text>
          <AntDesign name='star' size={20} color='#FF6321' />
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.authorContainer}>
          <Text style={styles.author}>{item.author}</Text>
          <View style={styles.iconContainer}>
            {/* <Icon style={styles.addIcon} name='plus' /> */}
            <MaterialIcons name='add' size={22} color='white' />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    paddingHorizontal: 16,
  },
  image: {
    width: '100%',
    height: 400,
    borderRadius: 8,
    marginRight: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    padding: 24,
  },
  title: {
    color: 'white',
    fontSize: 24,
    fontWeight: '700',
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
    fontWeight: '500',
    marginRight: 4,
    textTransform: 'uppercase',
    color: '#9e9e9e',
  },
  iconContainer: {
    backgroundColor: theme.colors.secondary,
    borderRadius:
      Math.round(
        Dimensions.get('window').width + Dimensions.get('window').height
      ) / 2,
    width: Dimensions.get('window').width * 0.075,
    height: Dimensions.get('window').width * 0.075,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addIcon: {
    color: 'white',
    fontSize: 16,
  },
})

export default RecommendItem

