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

const FoodSuggestionScreen = ({topic, deleteTopic}) =>{
    const navigation = useNavigation()
    const scrollViewRef = useRef();
    const { listMessage, handleNewMessage,  handleNewResponse} = useMessage();


    // const [listMessage, setListMessage] = useState([
    //     {
    //         id: 1,
    //         send: "helloadfa df  dfad",
    //         response: `1. Gỏi cuốn - 100.000 VNĐ\n2. Cà tím nướng mỡ hành - 150.000 VND\n3. Bún chả giò chay - 200.000 VNĐ\n`
    //     },
    //     // {
    //     //     id: 2,
    //     //     send: "hello adf adf ",
    //     //     response: `1. Gỏi cuốn - 100.000 VNĐ\n2. Cà tím nướng mỡ hành - 150.000 VND\n3. Bún chả giò chay - 200.000 VNĐ\n4. Canh chua rau cải - 100.000 VNĐ\n5. Xà lách trộn - 150.000 VNĐ\n`
            
    //     // },
    // ])
    useEffect(() => {
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [listMessage]);

    // const handleNewMessage = ()=>{
    //     const newId = listMessage.length + 1; // Tạo id mới bằng cách lấy độ dài hiện tại của danh sách và cộng thêm 1
    //     const newMessage = `New message ${newId}`; // Tạo tin nhắn mới
    //     const newResponse = `1. Gỏi cuốn - 100.000 VNĐ\n2. Cà tím nướng mỡ hành - 150.000 VND\n3. Bún chả giò chay - 200.000 VNĐ\n4. Canh chua rau cải - 100.000 VNĐ\n5. Xà lách trộn - 150.000 VNĐ\n`
    //     const newMessageObj = { id: newId, send: newMessage}; // Tạo đối tượng tin nhắn mới
    //     setListMessage([...listMessage, newMessageObj]);
    // }

    // const handleNewResponse = (sendId)=>{
    //     // Tìm tin nhắn gửi đi tương ứng với sendId
    //     const sendMessage = listMessage.find(message => message.id === sendId);
    //     if (!sendMessage) {
    //         console.error('Tin nhắn không tồn tại');
    //         return;
    //     }

    //     // Tạo tin nhắn phản hồi mới
    //     const newResponse = `1. Gỏi cuốn - 100.000 VNĐ\n2. Cà tím nướng mỡ hành - 150.000 VND\n3. Bún chả giò chay - 200.000 VNĐ\n4. Canh chua rau cải - 100.000 VNĐ\n5. Xà lách trộn - 150.000 VNĐ\n`;
    //     const newResponseObj = { ...sendMessage, response: newResponse }; // Tin nhắn phản hồi sẽ có nội dung gửi tương tự tin nhắn gửi đi

    //     // Thêm tin nhắn phản hồi mới vào danh sách tin nhắn
    //     setListMessage([...listMessage, newResponseObj]);
    // }

    const listMessageComponent = listMessage.map((message, index)=>{
        return (
            <RenderChat key={index.toString()} props={message}/>
        )
    })
    console.log("FS RENDER")
    return (
        // <SafeAreaView style={{flex: 1, backgroundColor: theme.colors.lightGreen}}>

            <View style={{flex: 1}}>
                <Header topic={topic} deleteTopic={deleteTopic}/>
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    vertical
                >
                    <View style={{paddingLeft: 15, paddingVertical: 5}}>
                        {/* <Reccomand />
                        <Reccomand />
                        <Reccomand /> */}
                        {/* <Text>{name}</Text> */}

                        {listMessageComponent}
                        
                    </View>
                </ScrollView>
                <Footer />
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
