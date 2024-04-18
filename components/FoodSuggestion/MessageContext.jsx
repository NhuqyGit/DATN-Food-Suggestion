import React, { createContext, useContext, useEffect, useState } from 'react';

const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
    const [listMessage, setListMessage] = useState([
        {
            id: 1,
            send: "helloadfa df  dfad",
            response: `1. Gỏi cuốn - 100.000 VNĐ\n2. Cà tím nướng mỡ hành - 150.000 VND\n3. Bún chả giò chay - 200.000 VNĐ\n`,
            isSend: true
        },
        {
            id: 2,
            send: "hello adf adf ",
            response: `1. Gỏi cuốn - 100.000 VNĐ\n2. Cà tím nướng mỡ hành - 150.000 VND\n3. Bún chả giò chay - 200.000 VNĐ\n4. Canh chua rau cải - 100.000 VNĐ`,
            isSend: true
        },
    ])
    const [isFetchDataCompleted, setIsFetchDataCompleted] = useState(true)

    const handleNewMessage = ()=>{
        console.log("handleNewMessage")
        const newId = listMessage.length + 1; // Tạo id mới bằng cách lấy độ dài hiện tại của danh sách và cộng thêm 1
        const newMessage = `New message ${newId}`; // Tạo tin nhắn mới
        const newResponse = `1. Gỏi cuốn - 100.000 VNĐ\n2. Cà tím nướng mỡ hành - 150.000 VND\n3. Bún chả giò chay - 200.000 VNĐ\n4. Canh chua rau cải - 100.000 VNĐ\n5. Xà lách trộn - 150.000 VNĐ\n`
        const newMessageObj = { id: newId, send: newMessage, response: null, isSend: false}; // Tạo đối tượng tin nhắn mới
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
        <MessageContext.Provider value={{ listMessage, isFetchDataCompleted, handleNewMessage,  handleNewResponse, fetchData}}>
            {children}
        </MessageContext.Provider>
    );
};

export const useMessage = () => {
    return useContext(MessageContext);
};