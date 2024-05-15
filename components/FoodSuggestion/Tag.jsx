import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { theme } from '../../theme/index'

const Tag = ({ text }) => {
    const [isActive, setIsActive] = useState(false)
    return (
        <TouchableOpacity
            onPress={()=>setIsActive(!isActive)}
            activeOpacity={1}
            style={[styles.container, {backgroundColor: isActive ? theme.colors.secondary : "#ebebeb"}]}>
            <Text style={{color: isActive ? "white" : theme.colors.darkGray, fontWeight: '500'}}>{text}</Text>
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
