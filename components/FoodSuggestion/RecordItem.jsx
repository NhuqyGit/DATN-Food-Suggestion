import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme/index'
import React from 'react'

const RecordItem = ({record}) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity
            onPress={()=>navigation.push("RecordDetail", {record, type: "PATCH"})}
            style={styles.container}>
            <Text>{record.nameRecord}</Text>
            <TouchableOpacity>
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