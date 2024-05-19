import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import { theme } from '../../theme/index'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import Tag from './Tag'

const RecordDetail = () => {
    const navigation = useNavigation()
    const route = useRoute();
    const { record, type } = route.params

    const [nameRecord, setNameRecord] = useState(type === "PATCH" ? record.nameRecord : "")
    const [price, setPrice] = useState(type === "PATCH" ? record.money.toString() : 0)
    const [diets, setDiets] = useState(null)
    const [allergies, setAllergies] = useState(null)

    const handleFetchDiets = async () => {
        try{
            const response = await fetch(`http://192.168.1.5:3000/diets`)
            const data = await response.json();
            console.log("data: ",data)
            if (data.length > 0){
                const refactorData = data.map((m) => {
                    const { id, dietName } = m;
                    const isExist = type === "PATCH" && record?.diets?.some(item => item.id === id) ? true : false;
                    return {id, name: dietName, isSelect: isExist}
                })
                setDiets(refactorData)
            }
        }catch (error) {
            console.error('Error fetching data record diet:', error);
        }
    }

    const handleFetchAllergies = async () => {
        try{
            const response = await fetch(`http://192.168.1.5:3000/allergies`)
            const data = await response.json();
            console.log("data: ",data)
            if (data.length > 0){
                const refactorData = data.map((m) => {
                    const { id, allergiesName } = m;
                    const isExist = type === "PATCH" && record?.allergies?.some(item => item.id === id) ? true : false;
                    return {id, name: allergiesName, isSelect: isExist}
                })
                setAllergies(refactorData)
            }
        }catch (error) {
            console.error('Error fetching data record allergies:', error);
        }
    }

    useEffect(()=>{
        handleFetchDiets()
        handleFetchAllergies()
        console.log("useEffect")
    }, [])

    console.log(type)
    // console.log(nameRecord)
    // console.log(price)
    console.log(diets)
    console.log(allergies)

    const listDiets = diets?.map((d) => {
        return (
            <Tag key={d.id.toString()} props={d}/>
        )
    })

    const listAllergies = allergies?.map((a) => {
        return (
            <Tag key={a.id.toString()} props={a}/>
        )
    })

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.btnBack}
                    onPress={() => navigation.goBack()}
                >
                    <MaterialIcons name='keyboard-arrow-left' size={28} color='black' />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Text style={{fontSize: 16, fontWeight: "600", color: theme.colors.secondary}}>Save</Text>
                </TouchableOpacity>
            </View>
        
            <ScrollView 
                style={{paddingHorizontal: 15}}>
                <View style={styles.inputForm}>
                    <Text style={styles.title}>Name record</Text>
                    <TextInput
                        style={styles.inputName}
                        value={nameRecord}
                        placeholder='Enter your name record'/>
                </View>

                <View style={styles.inputForm}>
                    <Text style={styles.title}>Price Range</Text>
                    <TextInput
                        style={styles.inputName} 
                        value={price}
                        keyboardType='numeric'
                        placeholder='Enter your price' />
                </View>
                
                <View style={styles.inputForm}>
                    <Text style={styles.title}>Meal</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 8}}>
                        {/* <Tag text="Breakfast"/>
                        <Tag text="Lunch"/>
                        <Tag text="Dinner"/> */}
                    </View>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3}}>
                        <Feather name='plus' size={18} color={theme.colors.secondary} />
                        <Text style={{fontSize: 13, fontWeight: '500', color: theme.colors.dark}}>Add ingredients</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.inputForm}>
                    <Text style={styles.title}>Numbers of diners</Text>
                    <TextInput style={styles.inputName} placeholder='Enter your name record'></TextInput>
                </View>

                <View style={styles.inputForm}>
                    <Text style={styles.title}>Allergies</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 8}}>
                        {listAllergies}
                    </View>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3}}>
                        <Feather name='plus' size={18} color={theme.colors.secondary} />
                        <Text style={{fontSize: 13, fontWeight: '500', color: theme.colors.dark}}>Add ingredients</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputForm}>
                    <Text style={styles.title}>Diet</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 8}}>
                        {/* <Tag text="Egg"/>
                        <Tag text="Beaf"/>
                        <Tag text="Sugar"/>
                        <Tag text="Oil"/>
                        <Tag text="Bread"/>
                        <Tag text="Meat"/>
                        <Tag text="Chicken"/>
                        <Tag text="Starch"/> */}
                        {listDiets}
                    </View>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3}}>
                        <Feather name='plus' size={18} color={theme.colors.secondary} />
                        <Text style={{fontSize: 13, fontWeight: '500', color: theme.colors.dark}}>Add ingredients</Text>
                    </TouchableOpacity>
                </View>
                
                <View style={styles.inputForm}>
                    <Text style={styles.title}>Personal Taste Preferences</Text>
                    <TextInput style={styles.inputName} placeholder='Enter your name record'></TextInput>
                </View>
            </ScrollView>
        </View>
    )
}

export default RecordDetail

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
    },
    header:{
        paddingHorizontal: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20,
        marginBottom: 15,
    },
    btnBack: {
        width: 35,
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        backgroundColor: '#F3F3F3'
    },
    inputForm:{
        display: 'flex',
        gap: 8,
        marginVertical: 15,
    },
    title:{
        fontSize: 16,
        fontWeight: "600",
        color: theme.colors.dark,
        marginBottom: 5,
    },
    inputName:{
        backgroundColor: theme.colors.grayBackground,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 5
    }
})