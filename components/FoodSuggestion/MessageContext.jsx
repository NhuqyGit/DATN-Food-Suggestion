import { useFocusEffect } from '@react-navigation/native';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { AsyncStorageService } from "../../utils/AsynStorage"
import { HOST } from "../../config"
import axios from 'axios';

const MessageContext = createContext();

export const MessageProvider = ({ topic, children }) => {
    const [listMessage, setListMessage] = useState([])
    const [isFetchDataCompleted, setIsFetchDataCompleted] = useState(true)
    const [nameRecord, setNameRecord] = useState(null)
    const [recordId, setRecordId] = useState(null)

    const [listRecord, setListRecord] = useState([])

    const handleFetchMessages = async () =>{
        try{
            const token = await AsyncStorageService.getAccessToken();
			const headers = {
			  Authorization: `Bearer ${token}`,
			};
            const response = await fetch(
                `${HOST}/topics/${topic.id}/messages`,
                { headers }
            )
            const data = await response.json();
            console.log(data)
            if (data.length > 0){
                const listMessage = data.map((m) => {
                    return {...m, isSend: true}
                })
                setListMessage(listMessage)
            }
        }catch (error) {
            console.error('Error fetching data messages:', error);
        }
    }

    const handlePatchRecordSelect = async (record) => {
        try{
            const token = await AsyncStorageService.getAccessToken();
			const headers = {
			  Authorization: `Bearer ${token}`,
			};
            const response = await axios.patch(
                `${HOST}/topics/${topic.id}`,
                { "recordId": record.id },
                { headers },
            )
            console.log('Response data:', response.data);
        }catch (error) {
            console.error('Error updating topic', error);
        }
        setNameRecord(record.nameRecord)
        setRecordId(record.id)
    }

    const handleSetListRecord = (recordId, updateData) => {
        console.log(updateData)
        setListRecord(prevList =>
            prevList.map(record =>
                record.id === recordId ? { ...record, ...updateData } : record
            )
        );
    }

    useFocusEffect(
        useCallback(() =>{
            if (topic.record){
                setNameRecord(topic.record.nameRecord)
                setRecordId(topic.record.id)
            }
            handleFetchMessages()
        }, [])
    )
    console.log(nameRecord)

    const handleNewMessage = ()=>{
        console.log("handleNewMessage")
        const newId = listMessage.length + 1; // Tạo id mới bằng cách lấy độ dài hiện tại của danh sách và cộng thêm 1
        const newMessage = `New message ${newId}`; // Tạo tin nhắn mới
        const newResponse = `1. Gỏi cuốn - 100.000 VNĐ\n2. Cà tím nướng mỡ hành - 150.000 VND\n3. Bún chả giò chay - 200.000 VNĐ\n4. Canh chua rau cải - 100.000 VNĐ\n5. Xà lách trộn - 150.000 VNĐ\n`
        const newMessageObj = { id: newId, content: newMessage, response: null, isSend: false}; // Tạo đối tượng tin nhắn mới
        setListMessage([...listMessage, newMessageObj]);
        setIsFetchDataCompleted(false)
    }

    const handleNewResponse = (id, newResponse)=>{
        // Tìm tin nhắn gửi đi tương ứng với id
        const sendMessageIndex = listMessage.findIndex(message => message.id === id);
        if (sendMessageIndex === -1) {
            console.error('Tin nhắn không tồn tại');
            return;
        }

        // Sao chép danh sách tin nhắn hiện có
        const updatedListMessage = [...listMessage];
        // Tạo tin nhắn phản hồi mới
        // const newResponse = `1. Gỏi cuốn - 100.000 VNĐ\n2. Cà tím nướng mỡ hành - 150.000 VND\n3. Bún chả giò chay - 200.000 VNĐ\n4. Canh chua rau cải - 100.000 VNĐ\n5. Xà lách trộn - 150.000 VNĐ\n`;
        
        // Cập nhật tin nhắn phản hồi vào tin nhắn gửi đi
        updatedListMessage[sendMessageIndex].response = newResponse;
        updatedListMessage[sendMessageIndex].isSend = true;

        // Cập nhật danh sách tin nhắn với tin nhắn phản hồi mới
        setListMessage(updatedListMessage);
    }

    const fetchData = (callback) => {
        setTimeout(() => {
            const newResponse = `1. Gỏi cuốn - 100.000 VNĐ\n2. Cà tím nướng mỡ hành - 150.000 VND\n3. Bún chả giò chay - 200.000 VNĐ\n4. Canh chua rau cải - 100.000 VNĐ\n5. Xà lách trộn - 150.000 VNĐ\n`;
            callback(newResponse); // Gọi hàm callback với dữ liệu mới nhận được
            setIsFetchDataCompleted(true)
        }, 4000); // Delay 2 giây để giả lập việc lấy dữ liệu
    };
    

    return (
        <MessageContext.Provider value={{ listMessage, isFetchDataCompleted, nameRecord, recordId, listRecord, handleNewMessage,  handleNewResponse, fetchData, handlePatchRecordSelect, setListRecord, handleSetListRecord}}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessage = () => {
    return useContext(MessageContext);
};