import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const IconDrawer = ({size, color}) => {
    const height = size * 80 / 100
    return (
        <View style={[styles.container, {width: size, height: height}]}>
            <View style={[styles.first, {height: height * 0.18, backgroundColor: color}]}></View>
            <View style={[styles.second, {height: height * 0.18, backgroundColor: color}]}></View>
            <View style={[styles.third, {height: height * 0.18, backgroundColor: color}]}></View>
        </View>
    )
}

export default IconDrawer

const styles = StyleSheet.create({
    container:{
        // backgroundColor: 'red',
        display: 'flex',
        justifyContent: 'space-between'
    },
    first:{
        width: "50%",
        borderRadius: 100
    },
    second:{
        width: "100%",
        borderRadius: 100
    },
    third:{
        width: "50%",
        alignSelf: 'flex-end',
        borderRadius: 100
    }
})