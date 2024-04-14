import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme/index'
import RecordItem from './RecordItem';

const ListRecordScreen = ({closeFolder}) => {
    const [isActive, setIsActive] = useState()
    const navigation = useNavigation()
    const recordData = [
        {
            id: 1,
            name: "Record A"
        },
        {
            id: 2,
            name: "Record B"
        },
        {
            id: 3,
            name: "Record C"
        },
        {
            id: 4,
            name: "Record D"
        },
    ]

    useEffect(()=>{
        if (recordData === null){
            
        }
    }, [recordData])

    const listRecord = recordData.map((record, index)=>{
        return (
            <RecordItem record={record} key={index.toString()}/>
        )
    })
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={closeFolder}
                style={styles.btnBack}>
                <Ionicons
                    name='close'
                    size={22}
                    color='black'
                />
            </TouchableOpacity>

            <Text style={styles.title}>List Records</Text>

            <ScrollView style={styles.recordsContainer}>
                {listRecord}
            </ScrollView>
        </View>
    )
}

export default ListRecordScreen

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
        paddingTop: 20,
        backgroundColor:'white',
        // position: 'relative'
    },
    btnBack:{
        width: 35,
        height: 35,
        alignSelf: 'flex-end',
        marginTop: 15,
        marginBottom: 15,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#F3F3F3'
    },
    title:{
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 10
    },
    recordsContainer:{

    }
})