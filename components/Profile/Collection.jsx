import { StyleSheet, Text, TouchableOpacity, Image, View, Platform } from 'react-native'
import React from 'react'

const Collection = ({props, navigation, isProtected = false}) => {
    const generateBoxShadowStyle = (
        xOffset,
        yOffset,
        shadowColorIos,
        shadowOpacity,
        shadowRadius,
        elevation,
        shadowColorAndroid,
    ) => {
        if (Platform.OS === 'ios') {
            return {
                shadowColor: shadowColorIos,
                shadowOffset: { width: xOffset, height: yOffset },
                shadowOpacity,
                shadowRadius,
            }
        } else if (Platform.OS === 'android') {
            return  {
                elevation,
                shadowColor: shadowColorAndroid,
            }
        }
    }
    
    const boxShadow = generateBoxShadowStyle(0, 2, 'black', 0.1, 5, 5, 'black')

    return (
        <TouchableOpacity
            onPress={() => {
                navigation.navigate(isProtected?'PersonalList':'List', { id: props.id, name: props.collectionName })
            }}
            style={[boxShadow, {backgroundColor: 'white', borderRadius: 10, marginBottom: 15}]}>
            <View style={{paddingHorizontal: 20, paddingVertical: 8}}>
                <View style={[styles.container]}>
                    <View style={styles.infoCollection}>
                        <Text style={styles.title}>{props.collectionName}</Text>
                        <Text style={styles.des}>{props.dishes?.length} RECIPES</Text>
                    </View>
                    <Image style={styles.imageCollection} source={require('../../assets/images/Profile/avatarDefault.png')}/>
                </View>
            </View>
        </TouchableOpacity>
  )
}

export default Collection

const styles = StyleSheet.create({
    container:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    infoCollection:{
        gap: 8,
    },
    title:{
        fontSize: 13,
        fontWeight: '500',
    },
    des:{
        fontSize: 11,
        fontWeight: '300'
    },  
    imageCollection:{
        width: 55,
        height: 55,
        borderRadius: 100,
    },
})