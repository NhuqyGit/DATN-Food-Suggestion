import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme/index'
import { useMessage } from './MessageContext';
import React, { useState } from 'react'

const RecordItem = ({isSelect, record, handleOpenModal, setIsSelect}) => {
    return (
        <TouchableOpacity
            onPress={()=>setIsSelect(record.id)}
            style={[styles.container, {backgroundColor: isSelect === record.id ? theme.colors.secondary: "white"}]}>
            <Text>{record.nameRecord}</Text>
            <TouchableOpacity
                onPress={() => handleOpenModal(record)}
            >
                <Ionicons name='ellipsis-horizontal' size={24} color="black" />
            </TouchableOpacity>
        </TouchableOpacity>
    )
}

export default RecordItem

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // backgroundColor: 'tomato',
        marginVertical: 5,
        paddingVertical: 8,
        paddingHorizontal: 5,
        borderBottomWidth: 1,
    }
})