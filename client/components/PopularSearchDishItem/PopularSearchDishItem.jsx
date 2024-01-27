import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const PopularSearchDishItem = ({item}) => {
  return (
    <View style={styles.container}>
        <Image style={styles.image} source={item.image} />
        {/* <Text>{item.title}</Text> */}
    </View>
  )
}

export default PopularSearchDishItem

const styles = StyleSheet.create({
    container:{

        // backgroundColor:'red',
        // flex: 1
        width: '49%',
        marginRight: '2%',
        marginBottom: '2%',
    },
    image:{
        height: 100,
        width: '100%',
        borderRadius: 8,
    }
})