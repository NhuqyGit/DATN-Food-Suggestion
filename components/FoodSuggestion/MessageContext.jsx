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
    const [recordActive, setRecordActive] = useState(topic.record)
    const [listRecord, setListRecord] = useState([])
    const [newMessage, setNewMessage] = useState(null)

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
            setRecordActive(response.data.record)
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

    const handleCreateMessage = () =>{
        let count = 1;
        const { meal, money, numberOfDiners, diets, allergies } = recordActive;
        let newMessage = "";
        const formatJson = "{khaiVi: [{food: món 1, price: giá 1}, {food: món 2,price: giá 2}, ...],\n monChinh: [{food: món 1, price: giá 1}, {food: món 2, price: giá 2}, ...],\n trangMieng: [{food: món 1, price: giá 1}, {food: món 2, price: giá 2}, ...]\n }\n"
        if (meal !== undefined && meal !== null) {
            const listMeal = ["sáng", "trưa", "tối"];
            newMessage += `Đề xuất cho tôi một bữa ăn ${listMeal[meal]} (khác) với tiêu chí:\n `;
        }
        if (numberOfDiners !== undefined && numberOfDiners !== null) {
            newMessage += `${count}. Số lượng người ăn: ${numberOfDiners}\n `;
            count += 1;
        }
        if (money !== undefined && money !== null) {
            newMessage += `${count}. Lượng tiền cho bữa ăn: ${money} vnđ\n `;
            count += 1;
        }
        if (diets && diets.length > 0) {
            newMessage += `${count}. Cần ăn kiêng theo: ${diets.map(diet => diet.dietName).join(', ')}\n `;
            count += 1;
        }
        if (allergies && allergies.length > 0) {
            newMessage += `${count}. Có người bị dị ứng: ${allergies.map(allergy => allergy.allergiesName).join(', ')}\n `;
            count += 1;
        }
        newMessage += `${count}. Hiển thị số tiền tương đương với từng món\n `
        count += 1
        newMessage += `${count}. Có đầy đủ khai vị, món chính và món tráng miệng\n `
        count += 1
        newMessage += `${count}. Liệt kê danh sách món ăn theo format json như sau \n${formatJson} và chỉ cần nội dụng json, không cần nội dung khác."`

        return newMessage
    }

    useFocusEffect(
        useCallback(() =>{
            handleFetchMessages()
        }, [])
    )
    useFocusEffect(
        useCallback(() =>{
            if (recordActive){
                setNameRecord(recordActive.nameRecord)
                setRecordId(recordActive.id)
                const newMessage = handleCreateMessage()
                setNewMessage(newMessage)
            }
        }, [recordActive])
    )
    // console.log(newMessage)

    const handleNewMessage = ()=>{
        console.log("handleNewMessage")
        const newMessageObj = { id: null, content: nameRecord, response: null, isSend: false}; // Tạo đối tượng tin nhắn mới
        setListMessage([...listMessage, newMessageObj]);
        setIsFetchDataCompleted(false)
    }

    const handleNewResponse = async (newResponse)=>{
        try{
            const sendMessageIndex = listMessage.findIndex(message => message.isSend === false);
            if (sendMessageIndex === -1) {
                console.error('Tin nhắn không tồn tại');
                return;
            }
            
            // Sao chép danh sách tin nhắn hiện có
            const updatedListMessage = [...listMessage];
            
            // Cập nhật tin nhắn phản hồi vào tin nhắn gửi đi
            updatedListMessage[sendMessageIndex].response = newResponse;
            updatedListMessage[sendMessageIndex].isSend = true;

            const token = await AsyncStorageService.getAccessToken();
			const headers = {
			  Authorization: `Bearer ${token}`,
			};
            console.log(newMessage)
            const body = {
                "content": updatedListMessage[sendMessageIndex].content,
                "response": updatedListMessage[sendMessageIndex].response,
                "topicBelong": topic.id,
            }
            const response = await axios.post(
                `${HOST}/messages`,
                body,
                { headers }
            )
            const data = await response.data;
            updatedListMessage[sendMessageIndex].id = data.id
            setListMessage(updatedListMessage);
        }catch (error) {
            console.error('Error posting new message:', error);
        }

        
    }
    console.log("LIST-MESSAGE: ", listMessage)
    const fetchData = async (callback) => {
        // setTimeout(() => {
        // const newResponse = `1. Gỏi cuốn - 100.000 VNĐ\n2. Cà tím nướng mỡ hành - 150.000 VND\n3. Bún chả giò chay - 200.000 VNĐ\n4. Canh chua rau cải - 100.000 VNĐ\n5. Xà lách trộn - 150.000 VNĐ\n`;
        try{
            const token = await AsyncStorageService.getAccessToken();
			const headers = {
			  Authorization: `Bearer ${token}`,
			};
            console.log(newMessage)
            const body = {
                "prompt": newMessage
            }
            const response = await axios.post(
                `${HOST}/openai/generate`,
                body,
                { headers }
            )
            const data = await response.data;
            console.log(data)
            callback(data);
            setIsFetchDataCompleted(true)
        }catch (error) {
            console.error('Error fetching openai response:', error);
        }
    };
    

    return (
        <MessageContext.Provider value={{ listMessage, isFetchDataCompleted, nameRecord, recordId, listRecord, newMessage, recordActive, handleNewMessage,  handleNewResponse, fetchData, handlePatchRecordSelect, setListRecord, handleSetListRecord}}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessage = () => {
    return useContext(MessageContext);
};