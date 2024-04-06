import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native'
import Reccomand from "../../components/FoodSuggestion/Reccomand";
import RenderChat from "../../components/FoodSuggestion/RenderChat";
import { StatusBar } from 'react-native';
import React, { useRef } from 'react'
import { MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons'
import { theme } from "../../theme/index";
import { SIZES } from "../../theme/theme";
import { translate } from 'react-native-redash';

const FoodSuggestionScreen = () => {
    const scrollY = useRef(new Animated.Value(0)).current;

    const footerTranslateY = scrollY.interpolate({
        inputRange: [0, 100], // Giá trị scroll khi footer sẽ hiện và biến mất
        outputRange: [0, 200], // Giá trị translateY tương ứng
        extrapolate: 'clamp' // Giữ cho giá trị không vượt ra khỏi phạm vi inputRange
    });

    return (
        <View style={{flex: 1}}>
            <StatusBar backgroundColor="black" barStyle="dark-content" />
            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                vertical
            >
                <View>
                    <Reccomand />
                    {/* <Reccomand /> */}
                    {/* <Reccomand /> */}
                </View>
            </ScrollView>
            <View style={styles.footer} className="px-6">
            {/* <Animated.View className="px-6" style={[styles.footer, { transform: [{ translateY: footerTranslateY }] }]}> */}

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
            {/* </Animated.View> */}
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
        backgroundColor: 'white',
        width: "100%",
        paddingVertical: 10,
    }
});