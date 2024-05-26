import { StyleSheet, Text, View, TouchableOpacity, Animated, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons';
import { theme } from "../../theme/index";
import React, { useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { SIZES } from '../../theme/theme';
import { useMessage } from './MessageContext';
const Footer = () => {
    const navigation = useNavigation();
    const { listMessage, isFetchDataCompleted, nameRecord, handleNewMessage, handleNewResponse} = useMessage();
    const [isClick, setIsClick] = useState(false);
    const [isFolderOpen, setIsFolderOpen] = useState(false);
    const folderTranslateY = useRef(new Animated.Value(0)).current;

    const openFolder = () => {
        setIsFolderOpen(true);
        Animated.timing(folderTranslateY, {
            toValue: 1,
            duration: 500, // Điều chỉnh giá trị duration ở đây để làm cho nó slide lên chậm hơn
            useNativeDriver: true
        }).start();
    };

    const closeFolder = () => {
        setIsFolderOpen(false);
        Animated.timing(folderTranslateY, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
        }).start(() => setIsFolderOpen(false));
    };
    
    return (
        <>
            <View style={styles.footer} className="px-6">
                {/* <View style={{display: 'flex', position: 'absolute', top: -20, left: 10}}>
                    <TouchableOpacity
                        activeOpacity={1} 
                        onPress={()=> setIsClick(!isClick)}
                        style={{width: 45, height: 20, borderTopLeftRadius: 10, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', borderTopRightRadius: 10, backgroundColor: '#373739', borderWidth: 1, borderBottomWidth: 0, borderColor: '#d9d9d9'}}>
                        <Ionicons name='reorder-two-outline' color="white" size={24} />
                    </TouchableOpacity>
                </View> */}
                <View style={isClick ? {display: 'none'} : null} className="flex flex-row justify-between items-center">
                    <TouchableOpacity activeOpacity={1} style={styles.btnVisible}>
                        <Text></Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={()=>navigation.push("ListRecords")}
                        className="flex flex-row justify-center items-center rounded-[10px] bg-[#5e5e5e] w-3/5 py-2">
                        <MaterialCommunityIcons name="file-document-edit-outline" color="white" size={24}/>
                        <Text style={{marginLeft: 8, color: "white"}}>
                            {nameRecord ? nameRecord : "Create a new record"}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={handleNewMessage}
                        style={[styles.btnSend, {backgroundColor: !isFetchDataCompleted ? "#5e5e5e" : theme.colors.secondary}]}
                        disabled={!isFetchDataCompleted}
                    >
                        {!isFetchDataCompleted ? 
                            <ActivityIndicator color={theme.colors.lightGray}/> 
                            :
                            <Ionicons name="arrow-up-outline" color="white" size={24}/>
                        }
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

export default Footer;

const styles = StyleSheet.create({
    btnSend:{
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
        borderTopWidth: 1,
        borderTopColor: "#d9d9d9",
        backgroundColor: '#373739',
        width: "100%",
        paddingVertical: 10,
    },
});
