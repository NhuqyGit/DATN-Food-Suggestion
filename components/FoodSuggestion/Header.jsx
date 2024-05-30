import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { MaterialIcons, Ionicons, Entypo } from '@expo/vector-icons'
import React, { useState } from 'react'
import IconDrawer from './IconDrawer'
import { useNavigation } from '@react-navigation/native'
import { theme } from '../../theme/index'

const Header = ({topic, handleOpenModal}) => {
    const [openMenu, setOpenMenu] = useState(false)
    const navigation = useNavigation()

    const handlePressRename = (item) => {
        setOpenMenu(false)
        handleOpenModal(item)
    }

    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={()=>navigation.openDrawer()}
                >
                    <IconDrawer color={theme.colors.dark} size={26}/>
                </TouchableOpacity>

                <Text style={{color: theme.colors.dark, fontSize: 18, fontWeight: "600"}}>Food Suggestion</Text>
                <TouchableOpacity
                    onPress={()=>setOpenMenu(!openMenu)}
                >
                    <Ionicons name="ellipsis-horizontal" size={26} color={theme.colors.dark} />
                </TouchableOpacity>
            </View>
            { 
                openMenu ? 
                    <View style={{backgroundColor: '#5e5e5e', position: 'absolute', top: 46, right: 3, zIndex: 2, borderRadius: 6}}>
                        <TouchableOpacity 
                            onPress={() => handlePressRename('rename')}
                            style={{display: 'flex', flexDirection: 'row', padding: 15, alignItems: 'center'}}>
                            <MaterialIcons name='edit' size={20} color={theme.colors.lightGray} />
                            <Text style={{color: theme.colors.lightGray, marginLeft: 10}}>Rename</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => handlePressRename('delete')}
                            style={{display: 'flex', flexDirection: 'row', padding: 15, alignItems: 'center'}}>
                            <MaterialIcons name='delete-forever' size={20} color={theme.colors.lightGray} />
                            <Text style={{color: theme.colors.lightGray, marginLeft: 10}}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                : null
            }
        </>
    )
}

export default Header

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 18,
        paddingVertical: 10,
        alignItems: 'center',
        // borderBottomWidth: 1,
        // borderBottomColor: theme.colors.lightGray
    }
})