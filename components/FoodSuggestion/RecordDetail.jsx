import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'

const RecordDetail = () => {
    const navigation = useNavigation()
    return (
        <View>
            <TouchableOpacity
                onPress={()=>navigation.goBack()}
            >
                <Text>GO BACK</Text>
            </TouchableOpacity>
        <Text>RecordDetail</Text>
        </View>
    )
}

export default RecordDetail

const styles = StyleSheet.create({})