import { StyleSheet, Text, View } from 'react-native'
import IconTime from '../../assets/svgs/iconTime'
import IconDelete from '../../assets/svgs/iconDelete'
import React from 'react'

const SearchHistory = ({item}) => {
  return (
    <View style={styles.container}>
        <IconTime color="#35353D"/>
        <Text style={styles.text}>{item.keyWord}</Text>
        <IconDelete color="#35353D" />
    </View>
  )
}

export default SearchHistory

const styles = StyleSheet.create({
    
    container:{
        flexDirection: 'row',
    },
    text: {
        color: '#35353D',
        fontWeight: "500",
        fontSize: 16,
    }
})