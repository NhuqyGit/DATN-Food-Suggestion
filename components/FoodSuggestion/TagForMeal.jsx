import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { theme } from '../../theme/index'

const TagForMeal = ({ props, meal, handleChangeMeal }) => {
    return (
        <TouchableOpacity
            onPress={() => handleChangeMeal(props.value)}
            activeOpacity={1}
            style={[styles.container, {backgroundColor: props.value === meal ? theme.colors.secondary : "#ebebeb"}]}>
            <Text style={{color: props.value === meal ? "white" : theme.colors.darkGray, fontWeight: '500'}}>{props.name}</Text>
        </TouchableOpacity>
    )
}

export default TagForMeal

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 8,
    },
})
