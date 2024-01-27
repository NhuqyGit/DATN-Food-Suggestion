import { StyleSheet, Text, View, TextInput, ScrollView, TouchableWithoutFeedback, TouchableOpacity, StatusBar } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconSearch from '../assets/svgs/iconSearch';
import IconCam from '../assets/svgs/iconCam';
import SvgArrowLeft from '../assets/svgs/arrowLeft';

import PopularSearchDish from '../components/PopularSearchDish/PopularSearchDish';


const SearchSreenMain = ({navigation}) => {
    const [isFocus, setIsFocus] = useState(false)

    const handleOnFocus = ()=>{
        // setIsFocus(true)
        console.log('push')
        navigation.push('SearchNormal')
    }
    console.log('render')
    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.searchBar}>
                {/* <SvgArrowLeft color="#231F20" /> */}
                <View style={styles.searchBarContainer}>
                <IconSearch color="#8C8C8C" style={styles.searchIcon}/>
                {/* <Icon name='search' color={"#8C8C8C"} size={20} style={styles.searchIcon} /> */}
                <TextInput
                    style={styles.searchInput} 
                    placeholder='Input your ingredients...'
                    placeholderTextColor='#9F9F9F'
                    onFocus={handleOnFocus}
                />
                </View>
                <TouchableOpacity onPress={()=>navigation.push('SearchCam')}>
                    <IconCam color="#231F20"style={styles.camIcon} />
                </TouchableOpacity>
            </View>
            <ScrollView 
                // contentContainerStyle={{justifyContent: 'center'}}
                
                >

                <PopularSearchDish />
            </ScrollView>
        </SafeAreaView>
    )
}

export default SearchSreenMain

const styles = StyleSheet.create({
    container:{
        position: 'relative',
        width: '100%',
        height: '100%',
        paddingHorizontal: 15,
        backgroundColor: 'white',
    },
    searchBar:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 10,
        backgroundColor: 'white',
    },
    searchBarContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        width: "90%",
        borderWidth: 1,
        borderColor: "#9F9F9F",
        borderRadius: 30,
    },
    searchIcon:{
        marginHorizontal: 12,
    },
    searchInput:{
        padding: 8,
        paddingLeft: 0,
        width: '85%',
        color: '#231F20',
        // backgroundColor: 'red',
        fontSize: 16,
    },
    camIcon:{
    },

})