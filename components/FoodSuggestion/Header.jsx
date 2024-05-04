import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons'
import React from 'react'
import IconDrawer from './IconDrawer'
import { useNavigation } from '@react-navigation/native'
import { theme } from '../../theme/index'

const Header = ({topic, deleteTopic}) => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={()=>navigation.openDrawer()}
            >
                <IconDrawer color={theme.colors.dark} size={26}/>
            </TouchableOpacity>
            <Text style={{color: theme.colors.dark, fontSize: 18, fontWeight: "600"}}>Food Suggestion</Text>
            <TouchableOpacity
                onPress={()=>deleteTopic(topic.id)}
            >
                <Ionicons name="ellipsis-horizontal" size={26} color={theme.colors.dark} />
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        borderBottomWidth: 1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingVertical: 10,
        alignItems: 'center',
        borderBottomColor: theme.colors.lightGray
    }
})