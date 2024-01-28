import { StyleSheet, Text, View, TextInput, ScrollView, TouchableWithoutFeedback, TouchableOpacity, StatusBar} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import IconSearch from '../assets/svgs/iconSearch';
import IconCam from '../assets/svgs/iconCam';
import SvgArrowLeft from '../assets/svgs/arrowLeft';
import SearchHistory from '../components/SearchHistory/SearchHistory';
import React from 'react'

const SearchNormal = ({navigation}) => {
    const searchHis = [
        {
            keyWord: 'rau câu'
        },
        {
            keyWord: 'rau câu'
        },
        {
            keyWord: 'rau câu'
        },
        {
            keyWord: 'rau câu'
        },
        {
            keyWord: 'rau câu'
        },
    ]

    const handleBack = () =>{
        console.log("pop")
        navigation.pop()
    }

  return (
    <SafeAreaView style={styles.container}>
        <TouchableWithoutFeedback>
            <View style={styles.searchBar}>
                <TouchableOpacity onPress={handleBack}>
                    <SvgArrowLeft color="#231F20" />
                </TouchableOpacity>
                <View style={styles.searchBarContainer}>
                <IconSearch color="#8C8C8C" style={styles.searchIcon}/>
                {/* <Icon name='search' color={"#8C8C8C"} size={20} style={styles.searchIcon} /> */}
                <TextInput
                    style={styles.searchInput} 
                    autoFocus={true}
                    placeholder='Input your ingredients...'
                    placeholderTextColor='#9F9F9F'
                    // onFocus={handleOnFocus}
                />
                </View>
                <TouchableOpacity onPress={()=>navigation.push('SearchCam')}>
                    <IconCam color="#231F20"style={styles.camIcon} />
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
        <ScrollView 
            style={{padding: 15}}    
        >
            {searchHis.map((item, index)=>{
                return(
                    <SearchHistory key={index.toString()} item={item}/>
                )
            })}

        </ScrollView>
    </SafeAreaView>
  )
}

export default SearchNormal

const styles = StyleSheet.create({
    container:{
        position: 'relative',
        width: '100%',
        height: '100%',
        // paddingHorizontal: 10,
        backgroundColor: 'white',
    },
    searchBar:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: 10,
        backgroundColor: 'white'
    },
    searchBarContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        width: "80%",
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
})