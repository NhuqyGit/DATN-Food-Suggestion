import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import Reccomand from "../../components/FoodSuggestion/Reccomand";
import RenderChat from "../../components/FoodSuggestion/RenderChat";
import { StatusBar } from 'react-native';
import React from 'react'
import { MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons'
import { theme } from "../../theme/index";
import { SIZES } from "../../theme/theme";

const FoodSuggestionScreen = () => {
    return (
        <View style={{flex: 1, backgroundColor: 'red'}}>
            <StatusBar backgroundColor="black" barStyle="dark-content" />
            {/* <View className="flex flex-row justify-between items-center h-[48px] border-b border-b-[#000000] px-4">
                <TouchableOpacity>
                    <Entypo name="menu" size={26} color="black" />
                </TouchableOpacity>
                <Text className="text-dark text-[18px] font-semibold leading-[21.78px]">
                    Food Suggestion
                </Text>
                <TouchableOpacity>
                    <Entypo name="dots-three-horizontal" size={26} color="black" />
                </TouchableOpacity>
            </View> */}
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                vertical
            >
                <View>
                    <Reccomand />
                    <Reccomand />
                    <Reccomand />
                </View>
            </ScrollView>
            <View style={styles.footer} className="px-6">
                <View className="flex flex-row justify-between items-center">
                    <TouchableOpacity activeOpacity={1} style={styles.btnVisible}>
                    <Text></Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex flex-row justify-center items-center rounded-[10px] bg-[#d9d9d9] w-3/5 py-2">
                    <MaterialCommunityIcons name="file-document-edit-outline" color="#373739" size={24}/>
                    <Text style={{marginLeft: 8, color: "#373739"}}>
                        Create a new record
                    </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btnSend}>
                    <Ionicons name="arrow-up-outline" color="white" size={24}/>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default FoodSuggestionScreen

const styles = StyleSheet.create({
    container: {
        // paddingVertical: 16,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'blue',
        // gap: 16,
        backgroundColor: "white",
        // width: '100%',
        // height: SIZES.height - 118,
        // height: 'fit-content',
    },
    btnSend:{
        backgroundColor: theme.colors.secondary,
        height: 40,
        width: 40,
        borderRadius: 10,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnVisible:{
        backgroundColor: "transparency",
        height: 40,
        width: 40,
        borderRadius: 10,
    },
    footer:{
        // position: 'absolute',
        // bottom: 48,
        width: "100%",
        paddingVertical: 10
    }
});