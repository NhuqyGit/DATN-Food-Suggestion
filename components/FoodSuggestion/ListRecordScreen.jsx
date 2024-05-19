import { StyleSheet, Text, View, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, Feather } from '@expo/vector-icons'
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme/index'
import RecordItem from './RecordItem';

const ListRecordScreen = () => {
    const [isActive, setIsActive] = useState()
    const [listRecord, setListRecord] = useState([])
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
        {
            id: 5,
            name: "Record D"
        },
        {
            id: 6,
            name: "Record D"
        },
        {
            id: 7,
            name: "Record D"
        },
        {
            id: 8,
            name: "Record D"
        },
        {
            id: 9,
            name: "Record D"
        },
        {
            id: 10,
            name: "Record D"
        },
        {
            id: 10,
            name: "Record D"
        },
        {
            id: 11,
            name: "Record D"
        },
        {
            id: 12,
            name: "Record D"
        },
        {
            id: 13,
            name: "Record D"
        },
        {
            id: 14,
            name: "Record 14"
        },
    ]

    const handleFetchListRecord = async () =>{
        try{
            const response = await fetch(`http://192.168.1.5:3000/users/1/records`)
            const data = await response.json();
            console.log(data)
            if (data.length > 0){
                setListRecord(data)
            }
        }catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    useEffect(()=>{
        handleFetchListRecord()
    }, [])

    const listRecordComponent = listRecord?.map((record, index)=>{
        return (
            <RecordItem record={record} key={index.toString()}/>
        )
    })
    return (
        // <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.lightGreen}}>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={()=> navigation.goBack()}
                    style={styles.btnBack}>
                    <Ionicons
                        name='close'
                        size={22}
                        color='black'
                    />
                </TouchableOpacity>

                <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10}}>
                    <Text style={styles.title}>List Records</Text>
                    <TouchableOpacity
                        onPress={()=>navigation.push("RecordDetail", { type: "POST"})}
                    >
                        <Text style={{fontSize: 14, fontWeight: '500', color: theme.colors.secondary}}>Add new record</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={styles.recordsContainer}>
                    {listRecordComponent}
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity style={styles.btnSelect}>
                        <Text style={styles.btnText}>Select</Text>
                    </TouchableOpacity>
                </View>
            </View>
        // </SafeAreaView>
    )
}

export default ListRecordScreen

const styles = StyleSheet.create({
    container:{
        // width: '100%',
        // height: '100%',
        flex: 1,
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

    },
    footer:{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnSelect:{
        backgroundColor: theme.colors.secondary,
        paddingHorizontal: 30,
        paddingVertical: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        width: '30%',
        marginVertical: 10
    },
    btnText:{
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    }
})