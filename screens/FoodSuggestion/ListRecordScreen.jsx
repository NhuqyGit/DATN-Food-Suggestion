import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../../theme/index'

const ListRecordScreen = () => {
    const navigation = useNavigation()
    return (
        <SafeAreaView style={{backgroundColor: 'white'}}>
            <StatusBar backgroundColor="black" barStyle="dark-content" />

            <View style={styles.container}>
                <TouchableOpacity
                    onPress={()=>navigation.goBack()}
                    style={styles.btnBack}>
                    <Ionicons
                        name='close'
                        size={22}
                        color='black'
                    />
                </TouchableOpacity>

                <Text style={styles.title}>Add Collection</Text>

                <View style={styles.formCollection}>
                    <View style={styles.input}>
                        <TextInput placeholder='Name your collection' />
                    </View>

                    <View style={[styles.input, {height: '40%', paddingTop: 10}]}>
                        <TextInput
                            style={{height: '100%'}}
                            editable
                            multiline
                            numberOfLines={4}
                            placeholder='Add a description (optional)'
                        />
                    </View>
                </View>

                <View style={styles.btnSaveContainer}>
                    <TouchableOpacity style={styles.btnSave}>
                        <Text style={styles.btnText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default ListRecordScreen

const styles = StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        paddingHorizontal: 20,
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
        fontWeight: '700'
    },
    input:{
        borderRadius: 5,
        marginTop: 25,
        padding: 15,
        backgroundColor: '#F3F3F3',
    },
    btnSaveContainer:{
        position: 'absolute',
        bottom: 30,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnSave:{
        backgroundColor: theme.colors.secondary,
        paddingHorizontal: 30,
        paddingVertical: 15,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        width: '30%'
    },
    btnText:{
        color: 'white',
        fontSize: 16,
        fontWeight: '500'
    }
})