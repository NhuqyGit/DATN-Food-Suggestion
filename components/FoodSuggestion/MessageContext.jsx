import { useFocusEffect } from "@react-navigation/native";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AsyncStorageService } from "../../utils/AsynStorage";
import { HOST } from "../../config";
import axios from "axios";

const MessageContext = createContext();

export const MessageProvider = ({
  topic,
  children,
  handleAddNewMessage,
  handleChangeRecordActie,
}) => {
  const [listMessage, setListMessage] = useState([]);
  const [isFetchDataCompleted, setIsFetchDataCompleted] = useState(true);
  const [nameRecord, setNameRecord] = useState(null);
  const [recordId, setRecordId] = useState(null);
  const [recordActive, setRecordActive] = useState(topic.record);
  const [listRecord, setListRecord] = useState([]);
  const [newMessage, setNewMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleFetchMessages = async () => {
    try {
      const token = await AsyncStorageService.getAccessToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await fetch(`${HOST}/topics/${topic.id}/messages`, {
        headers,
      });
      const data = await response.json();
      if (data.length > 0) {
        const listMessage = data.map((m) => {
          return { ...m, isSend: true };
        });
        setListMessage(listMessage);
      }
    } catch (error) {
      console.error("Error fetching data messages:", error);
    }
  };

  const handlePatchRecordSelect = async (record) => {
    try {
      const token = await AsyncStorageService.getAccessToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.patch(
        `${HOST}/topics/${topic.id}`,
        { recordId: record.id },
        { headers }
      );
      setRecordActive(response.data.record);
      handleChangeRecordActie(topic.id, response.data.record);
    } catch (error) {
      console.error("Error updating topic", error);
    }
    setNameRecord(record.nameRecord);
    setRecordId(record.id);
  };

  const handleUpdateListRecord = (recordId, updateData) => {
    setListRecord((prevList) =>
      prevList.map((record) =>
        record.id === recordId ? { ...record, ...updateData } : record
      )
    );

    if (recordActive != null) {
      if (recordId === recordActive?.id) {
        setRecordActive((prevRecord) => ({ ...prevRecord, ...updateData }));
      }
    }
  };

  const handleSetListRecord = (newRecord) => {
    setListRecord((prevList) => [...prevList, newRecord]);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("vi-VN").format(price);
  };

  const handleCreateMessage = () => {
    let count = 1;
    const { meal, money, numberOfDiners, diets, allergies } = recordActive;
    let newMessage = "";
    let messageHeader =
      "Sau đây là các món ăn dựa trên các tiêu chí của bạn: \n";
    const formatJson =
      '{"khaiVi": [{"food": món 1, "price": giá 1}, {"food": món 2, "price": giá 2}, ...],\n "monChinh": [{"food": món 1, "price": giá 1}, {"food": món 2, "price": giá 2}, ...],\n "trangMieng": [{"food": món 1, "price": giá 1}, {"food": món 2, "price": giá 2}, ...]\n }\n';
    if (meal !== undefined && meal !== null) {
      const listMeal = ["sáng", "trưa", "tối"];
      newMessage += `Đề xuất cho tôi một bữa ăn ${listMeal[meal]} (khác) với tiêu chí:\n `;
      messageHeader += `- Bữa ${listMeal[meal]}\n`;
    }
    if (
      numberOfDiners !== undefined &&
      numberOfDiners !== null &&
      numberOfDiners > 1
    ) {
      newMessage += `${count}. Số lượng người ăn: ${numberOfDiners}\n `;
      messageHeader += `- Số lượng người ăn: ${numberOfDiners}\n`;
      count += 1;
    }
    if (money !== undefined && money !== null) {
      newMessage += `${count}. Lượng tiền cho bữa ăn: ${money} vnđ\n `;
      messageHeader += `- Lượng tiền cho bữa ăn: ${formatPrice(money)} vnđ\n`;
      count += 1;
    }
    if (diets && diets.length > 0) {
      newMessage += `${count}. Cần ăn kiêng theo: ${diets.map((diet) => diet.dietName).join(", ")}\n `;
      messageHeader += `- Cần ăn kiêng theo: ${diets.map((diet) => diet.dietName).join(", ")}\n`;
      count += 1;
    }
    if (allergies && allergies.length > 0) {
      newMessage += `${count}. Có người bị dị ứng: ${allergies.map((allergy) => allergy.allergiesName).join(", ")}\n `;
      messageHeader += `- Có người bị dị ứng: ${allergies.map((allergy) => allergy.allergiesName).join(", ")}\n`;
      count += 1;
    }
    newMessage += `${count}. Hiển thị số tiền tương đương với từng món\n `;
    count += 1;
    newMessage += `${count}. Có đầy đủ khai vị, món chính và món tráng miệng\n `;
    count += 1;
    newMessage += `${count}. Liệt kê danh sách món ăn theo format json như sau \n${formatJson} và chỉ cần nội dụng json, không cần nội dung khác."`;

    return [newMessage, messageHeader];
  };

  useFocusEffect(
    useCallback(() => {
      // handleFetchMessages()
      // console.log("sdfdfsdfsdfsdfsdfsdfdsfsdfsdfdfs")
      if (topic.messageList !== undefined) {
        if (topic.messageList.length > 0) {
          const listMessage = topic.messageList.map((m) => {
            return { ...m, isSend: true };
          });
          setListMessage(listMessage);
        }
      }
    }, [])
  );
  useFocusEffect(
    useCallback(() => {
      if (recordActive) {
        setNameRecord(recordActive.nameRecord);
        setRecordId(recordActive.id);
        const newMessage = handleCreateMessage();
        setNewMessage(newMessage);
      }
    }, [recordActive])
  );

  const handleNewMessage = () => {
    console.log("handleNewMessage");
    const newMessageObj = {
      id: null,
      content: nameRecord,
      response: null,
      isSend: false,
    }; // Tạo đối tượng tin nhắn mới
    setListMessage([...listMessage, newMessageObj]);
    setIsFetchDataCompleted(false);
  };

  const handleNewResponse = async (newResponse) => {
    try {
      const sendMessageIndex = listMessage.findIndex(
        (message) => message.isSend === false
      );
      if (sendMessageIndex === -1) {
        console.error("Tin nhắn không tồn tại");
        return;
      }

      // Sao chép danh sách tin nhắn hiện có
      const updatedListMessage = [...listMessage];

      // Cập nhật tin nhắn phản hồi vào tin nhắn gửi đi
      updatedListMessage[sendMessageIndex].header = newMessage[1];
      updatedListMessage[sendMessageIndex].response = newResponse;
      updatedListMessage[sendMessageIndex].isSend = true;

      const token = await AsyncStorageService.getAccessToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const body = {
        header: updatedListMessage[sendMessageIndex].header,
        content: updatedListMessage[sendMessageIndex].content,
        response: updatedListMessage[sendMessageIndex].response,
        topicBelong: topic.id,
      };
      const response = await axios.post(`${HOST}/messages`, body, { headers });
      const data = await response.data;
      updatedListMessage[sendMessageIndex].id = data.id;
      setListMessage(updatedListMessage);
      handleAddNewMessage(topic.id, updatedListMessage[sendMessageIndex]);
    } catch (error) {
      console.error("Error posting new message:", error);
    }
  };

  const fetchData = async (callback) => {
    try {
      const token = await AsyncStorageService.getAccessToken();
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const body = {
        prompt: newMessage[0],
      };
      const response = await axios.post(`${HOST}/openai/generate`, body, {
        headers,
      });
      const data = await response.data;
      callback(data);
    } catch (error) {
      console.error("Error fetching openai response:", error);
      setIsError(true);
    } finally {
      setIsFetchDataCompleted(true);
    }
  };

  console.log(newMessage);
  return (
    <MessageContext.Provider
      value={{
        isError,
        topic,
        listMessage,
        isFetchDataCompleted,
        nameRecord,
        recordId,
        listRecord,
        newMessage,
        recordActive,
        handleNewMessage,
        handleNewResponse,
        fetchData,
        handlePatchRecordSelect,
        setListRecord,
        handleUpdateListRecord,
        handleSetListRecord,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  return useContext(MessageContext);
};
