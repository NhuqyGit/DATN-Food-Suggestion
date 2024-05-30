import React, { useState, useRef, useEffect } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Modal, Animated } from "react-native";
// import FoodSuggestionScreen from "./FoodSuggestion/FoodSuggestionScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons'
import { SIZES } from "../../theme/theme";
import Footer from "../../components/FoodSuggestion/Footer";
import Reccomand from "../../components/FoodSuggestion/Reccomand";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../theme/index";
import Header from "../../components/FoodSuggestion/Header";
import RenderChat from "../../components/FoodSuggestion/RenderChat";
import { useMessage } from "../../components/FoodSuggestion/MessageContext";
import ModalRename from "../../components/FoodSuggestion/ModalRename";

const FoodSuggestionScreen = ({topic, handleDeleteTopic, handleChangeNameTopic}) =>{
    const navigation = useNavigation()
    const scrollViewRef = useRef();
    const { listMessage, handleNewMessage,  handleNewResponse} = useMessage();
    const [modalVisible, setModalVisible] = useState(false);
    const [menuItem,  setMenuItem]  = useState(null)

    const handleOpenModal = (item) => {
        setMenuItem(item)
        setModalVisible(true)
    }

    const handleCloseModal = () =>{
        setModalVisible(false)
    }

    useEffect(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [listMessage]);

    const listMessageComponent = listMessage?.map((message, index)=>{
        return (
            <RenderChat key={index.toString()} props={message}/>
        )
    })
    // console.log("TOPIC: ", topic.id, topic)
    // console.log("LIST_MESSAGE: ", topic.id, listMessage)
    return (
        // <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.lightGreen}}>

            <View style={{flex: 1}}>
                <Header topic={topic} handleOpenModal={handleOpenModal}/>
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    vertical
                >
                    {
                        listMessage.length !== 0 ? 
                        <View style={{paddingLeft: 15, paddingVertical: 5}}>
                            {listMessageComponent}
                        </View> : 
                        <Reccomand />
                    }
                </ScrollView>
                <Footer />

                <ModalRename menuItem={menuItem} modalVisible={modalVisible} handleCloseModal={handleCloseModal} handleChangeNameTopic={handleChangeNameTopic} handleDeleteTopic={handleDeleteTopic}/>
            </View>
        // </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        //   flex: 1,
        backgroundColor: 'white',
        //   justifyContent: 'center',
        //   alignItems: 'center',
    }
});

export default FoodSuggestionScreen;
