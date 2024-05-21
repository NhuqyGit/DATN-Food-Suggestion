import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { theme } from '../../theme/index'

const Tag = ({ props, handleToggleSelect }) => {
    const [isActive, setIsActive] = useState(props.isSelect)
    const handleChange = () => {
        handleToggleSelect()
        setIsActive(!isActive)
    }
    return (
        <TouchableOpacity
            onPress={handleChange}
            activeOpacity={1}
            style={[styles.container, {backgroundColor: isActive ? theme.colors.secondary : "#ebebeb"}]}>
            <Text style={{color: isActive ? "white" : theme.colors.darkGray, fontWeight: '500'}}>{props.name}</Text>
        </TouchableOpacity>
    )
}

export default Tag

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
