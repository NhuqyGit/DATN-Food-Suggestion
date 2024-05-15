import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { theme } from '../../theme/index'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import Tag from './Tag'

const RecordDetail = () => {
    const navigation = useNavigation()
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
                    <TextInput style={styles.inputName} placeholder='Enter your name record'></TextInput>
                </View>

                <View style={styles.inputForm}>
                    <Text style={styles.title}>Price Range</Text>
                    <TextInput style={styles.inputName} placeholder='Enter your name record'></TextInput>
                </View>
                
                <View style={styles.inputForm}>
                    <Text style={styles.title}>Meal</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 8}}>
                        <Tag text="Breakfast"/>
                        <Tag text="Lunch"/>
                        <Tag text="Dinner"/>
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
                        <Tag text="Egg"/>
                        <Tag text="Milk"/>
                        <Tag text="Bean"/>
                        <Tag text="Butter"/>
                        <Tag text="Shrimp"/>
                        <Tag text="Fish"/>
                        <Tag text="Strawberry"/>
                    </View>
                    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3}}>
                        <Feather name='plus' size={18} color={theme.colors.secondary} />
                        <Text style={{fontSize: 13, fontWeight: '500', color: theme.colors.dark}}>Add ingredients</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.inputForm}>
                    <Text style={styles.title}>Diet</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 8}}>
                        <Tag text="Egg"/>
                        <Tag text="Beaf"/>
                        <Tag text="Sugar"/>
                        <Tag text="Oil"/>
                        <Tag text="Bread"/>
                        <Tag text="Meat"/>
                        <Tag text="Chicken"/>
                        <Tag text="Starch"/>
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