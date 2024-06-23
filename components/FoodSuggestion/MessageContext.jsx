import { useFocusEffect } from '@react-navigation/native'
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import { AsyncStorageService } from '../../utils/AsynStorage'
import { HOST } from '../../config'
import axios from 'axios'
import Toast from 'react-native-toast-message'

const MessageContext = createContext()

export const MessageProvider = ({
  topic,
  children,
  handleAddNewMessage,
  handleChangeRecordActie,
  getTopics,
}) => {
  const [listMessage, setListMessage] = useState([])
  const [isFetchDataCompleted, setIsFetchDataCompleted] = useState(true)
  const [nameRecord, setNameRecord] = useState(null)
  const [recordId, setRecordId] = useState(null)
  const [recordActive, setRecordActive] = useState(topic.record)
  const [listRecord, setListRecord] = useState([])
  const [newMessage, setNewMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  const handleFetchMessages = async () => {
    try {
      const token = await AsyncStorageService.getAccessToken()
      const headers = {
        Authorization: `Bearer ${token}`,
      }
      const response = await fetch(`${HOST}/topics/${topic.id}/messages`, {
        headers,
      })
      const data = await response.json()
      if (data.length > 0) {
        const listMessage = data.map((m) => {
          return { ...m, isSend: true }
        })
        setListMessage(listMessage)
      }
    } catch (error) {
      console.error('Error fetching data messages:', error)
    }
  }

  const handlePatchRecordSelect = async (record) => {
    try {
      const token = await AsyncStorageService.getAccessToken()
      const headers = {
        Authorization: `Bearer ${token}`,
      }
      const response = await axios.patch(
        `${HOST}/topics/${topic.id}`,
        { recordId: record.id },
        { headers }
      )
      setRecordActive(response.data.record)
      handleChangeRecordActie(topic.id, response.data.record)
    } catch (error) {
      console.error('Error updating topic', error)
    }
    setNameRecord(record.nameRecord)
    setRecordId(record.id)
  }

  const handleUpdateListRecord = (recordId, updateData) => {
    setListRecord((prevList) =>
      prevList.map((record) =>
        record.id === recordId ? { ...record, ...updateData } : record
      )
    )

    if (recordActive != null) {
      if (recordId === recordActive?.id) {
        setRecordActive((prevRecord) => ({ ...prevRecord, ...updateData }))
      }
    }
  }

  const handleSetListRecord = (newRecord) => {
    setListRecord((prevList) => [...prevList, newRecord])
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN').format(price)
  }

  const handleCreateMessage = () => {
    let count = 1
    const {
      meal,
      money,
      numberOfDiners,
      diets,
      allergies,
      cuisines,
      typeSuggest,
    } = recordActive
    let newMessage = ''
    let messageHeader =
      typeSuggest === 0 || typeSuggest === '0'
        ? 'Sau đây là các món ăn dựa trên các tiêu chí của bạn: \n'
        : 'Sau đây là lịch trình cho một tuần dựa trên các tiêu chí của bạn: \n'
    const formatJson =
      '{"khaiVi": [{"food": món 1, "price": giá 1}, {"food": món 2, "price": giá 2}, ...],\n "monChinh": [{"food": món 1, "price": giá 1}, {"food": món 2, "price": giá 2}, ...],\n "trangMieng": [{"food": món 1, "price": giá 1}, {"food": món 2, "price": giá 2}, ...]\n }\n'
    const formatJsonWeek =
      '{"T2": [{"food": món 1, "price": giá 1}, {"food": món 2, "price": giá 2}, ...],\n "T3": [{"food": món 1, "price": giá 1}, {"food": món 2, "price": giá 2}, ...],\n "T4": [{"food": món 1, "price": giá 1}, {"food": món 2, "price": giá 2}, ...],\n "T5": [{"food": món 1, "price": giá 1}, {"food": món 2, "price": giá 2}, ...],\n "T6": [{"food": món 1, "price": giá 1}, {"food": món 2, "price": giá 2}, ...],\n "T7": [{"food": món 1, "price": giá 1}, {"food": món 2, "price": giá 2}, ...],\n "CN": [{"food": món 1, "price": giá 1}, {"food": món 2, "price": giá 2}, ...]\n }\n'
    if (typeSuggest === 0 || typeSuggest === '0') {
      if (meal !== undefined && meal !== null) {
        const listMeal = ['sáng', 'trưa', 'tối']
        newMessage += `Đề xuất cho tôi một bữa ăn ${listMeal[meal]} (khác) với tiêu chí:\n `
        messageHeader += `- Bữa ${listMeal[meal]}\n`
      }
    } else {
      if (typeSuggest !== undefined && typeSuggest !== null) {
        newMessage += `Đề xuất cho tôi một bữa ăn cho một tuần (khác) với tiêu chí:\n `
      }
    }

    if (
      numberOfDiners !== undefined &&
      numberOfDiners !== null &&
      numberOfDiners > 1
    ) {
      newMessage += `${count}. Số lượng người ăn: ${numberOfDiners}\n `
      messageHeader += `- Số lượng người ăn: ${numberOfDiners}\n`
      count += 1
    }

    if (typeSuggest === 0 || typeSuggest === '0') {
      if (money !== undefined && money !== null) {
        newMessage += `${count}. Lượng tiền cho bữa ăn: ${money} vnđ\n `
        messageHeader += `- Lượng tiền cho bữa ăn: ${formatPrice(money)} vnđ\n`
        count += 1
      }
    }

    if (cuisines && cuisines.length > 0) {
      newMessage += `${count}. Ẩm thực: ${cuisines.map((cuisine) => cuisine.name).join(', ')}\n `
      messageHeader += `- Ẩm thực: ${cuisines.map((cuisine) => cuisine.name).join(', ')}\n`
      count += 1
    }
    if (diets && diets.length > 0) {
      newMessage += `${count}. Cần ăn kiêng theo: ${diets.map((diet) => diet.name).join(', ')}\n `
      messageHeader += `- Cần ăn kiêng theo: ${diets.map((diet) => diet.name).join(', ')}\n`
      count += 1
    }
    if (allergies && allergies.length > 0) {
      newMessage += `${count}. Có người bị dị ứng: ${allergies.map((allergy) => allergy.allergiesName).join(', ')}\n `
      messageHeader += `- Có người bị dị ứng: ${allergies.map((allergy) => allergy.allergiesName).join(', ')}\n`
      count += 1
    }
    newMessage += `${count}. Hiển thị số tiền tương đương với từng món\n `
    count += 1
    newMessage += `${count}. Có đầy đủ khai vị, món chính và món tráng miệng và mỗi cái phải có ít nhất 2 món trở lên.\n `
    count += 1
    if (typeSuggest === 0 || typeSuggest === '0') {
      newMessage += `${count}. Liệt kê danh sách món ăn theo format json như sau \n${formatJson} và chỉ cần nội dụng json, không cần nội dung khác."`
    } else {
      newMessage += `${count}. Liệt kê danh sách món ăn theo format json như sau \n${formatJsonWeek} và chỉ cần nội dụng json, không cần nội dung khác."`
    }

    return [newMessage, messageHeader]
  }
  useEffect(() => {
    // useCallback(() => {
    // handleFetchMessages()
    if (topic.messageList !== undefined) {
      if (topic.messageList.length > 0) {
        const listMessage = topic.messageList.map((m) => {
          return { ...m, isSend: true }
        })
        setListMessage(listMessage)
      }
    }
  }, [])

  useFocusEffect(
    useCallback(() => {
      if (recordActive) {
        setNameRecord(recordActive.nameRecord)
        setRecordId(recordActive.id)
        const newMessage = handleCreateMessage()
        setNewMessage(newMessage)
      }
    }, [recordActive])
  )

  const handleNewMessage = () => {
    const newMessageObj = {
      id: null,
      content: nameRecord,
      response: null,
      isSend: false,
      isRecipe: false,
      isRecipeImage: false,
    } // Tạo đối tượng tin nhắn mới
    setListMessage([...listMessage, newMessageObj])
    setIsFetchDataCompleted(false)
  }

  const handleNewRecipe = (nameDish) => {
    const newMessageObj = {
      id: null,
      content: `Find me the recipe for ${nameDish}`,
      response: null,
      isSend: false,
      isRecipe: true,
      isRecipeImage: true,
    } // Tạo đối tượng tin nhắn mới
    setListMessage([...listMessage, newMessageObj])
    setIsFetchDataCompleted(false)
  }

  function extractQuery(inputString) {
    const keyword = 'for'
    const keywordIndex = inputString.indexOf(keyword)

    if (keywordIndex !== -1) {
      // Extract the part of the string after "for"
      const query = inputString.substring(keywordIndex + keyword.length).trim()
      return query
    } else {
      throw new Error('Keyword "for" not found in the input string')
    }
  }

  const handleNewResponse = async (newResponse) => {
    try {
      const sendMessageIndex = listMessage.findIndex(
        (message) => message.isSend === false
      )
      if (sendMessageIndex === -1) {
        console.error('Tin nhắn không tồn tại')
        return
      }

      // Sao chép danh sách tin nhắn hiện có
      const updatedListMessage = [...listMessage]

      // Cập nhật tin nhắn phản hồi vào tin nhắn gửi đi
      // updatedListMessage[sendMessageIndex].header = newMessage[1];
      updatedListMessage[sendMessageIndex].response = newResponse
      updatedListMessage[sendMessageIndex].isSend = true

      const token = await AsyncStorageService.getAccessToken()
      const headers = {
        Authorization: `Bearer ${token}`,
      }
      const body = {
        // header: updatedListMessage[sendMessageIndex].header,
        content: updatedListMessage[sendMessageIndex].content,
        response: updatedListMessage[sendMessageIndex].response,
        topicBelong: topic.id,
      }
      if (updatedListMessage[sendMessageIndex].isRecipe) {
        const nameDish = extractQuery(
          updatedListMessage[sendMessageIndex].content
        )
        updatedListMessage[sendMessageIndex].isRecipe = true
        updatedListMessage[sendMessageIndex].header =
          `Sau đây là các công thức của món ${nameDish} được tìm thấy trong hệ thống:\n- Để xem công thức bạn hãy nhấn vào món ăn.\n- Để chuyển đến mô tả món ăn cụ thể bạn hãy nhấn vào nút mũi tên.`
        body.isRecipe = true
        body.isRecipeImage = false
        body.header = `Sau đây là các công thức của món ${nameDish} được tìm thấy trong hệ thống:\n- Để xem công thức bạn hãy nhấn vào món ăn.\n- Để chuyển đến mô tả món ăn cụ thể bạn hãy nhấn vào nút mũi tên.`
      } else {
        updatedListMessage[sendMessageIndex].header = newMessage[1]
        body.header = newMessage[1]
      }
      const response = await axios.post(`${HOST}/messages`, body, { headers })
      const data = await response.data
      updatedListMessage[sendMessageIndex].id = data.id
      setListMessage(updatedListMessage)
      // handleAddNewMessage(topic.id, updatedListMessage[sendMessageIndex]);
      getTopics()
    } catch (error) {
      console.error('Error posting new message:', error)
    }
  }

  const handleResponseRecipe = async (newResponse) => {
    try {
      const sendMessageIndex = listMessage.findIndex(
        (message) => message.isSend === false
      )
      if (sendMessageIndex === -1) {
        console.error('Tin nhắn không tồn tại')
        return
      }

      // Sao chép danh sách tin nhắn hiện có
      const updatedListMessage = [...listMessage]

      // Cập nhật tin nhắn phản hồi vào tin nhắn gửi đi
      updatedListMessage[sendMessageIndex].response = newResponse
      updatedListMessage[sendMessageIndex].isSend = true
      updatedListMessage[sendMessageIndex].isRecipe = false

      const token = await AsyncStorageService.getAccessToken()
      const headers = {
        Authorization: `Bearer ${token}`,
      }
      const body = {
        header: `Đây là công thức của món ${nameDish} chúng tôi tìm thấy được ở ngoài hệ thống, bên dưới là hình ảnh, công thức và link youtube hướng dẫn.`,
        content: updatedListMessage[sendMessageIndex].content,
        response: updatedListMessage[sendMessageIndex].response,
        isRecipe: false,
        isRecipeImage: true,
        topicBelong: topic.id,
      }
      // if(updatedListMessage[sendMessageIndex].isRecipeImage){
      const nameDish = extractQuery(
        updatedListMessage[sendMessageIndex].content
      )
      // updatedListMessage[sendMessageIndex].isRecipe = true;
      updatedListMessage[sendMessageIndex].header =
        `Đây là công thức của món ${nameDish} chúng tôi tìm thấy được ở ngoài hệ thống, bên dưới là hình ảnh, công thức và link youtube hướng dẫn.`
      // body.isRecipe = true;
      // body.header = `Sau đây là các công thức của món ${nameDish} được tìm thấy trong hệ thống:\n- Để xem công thức bạn hãy nhấn vào món ăn.\n- Để chuyển đến mô tả món ăn cụ thể bạn hãy nhấn vào nút mũi tên.`
      // }else{
      const response = await axios.post(`${HOST}/messages`, body, { headers })
      const data = await response.data
      updatedListMessage[sendMessageIndex].id = data.id
      setListMessage(updatedListMessage)
      // handleAddNewMessage(topic.id, updatedListMessage[sendMessageIndex]);
      getTopics()
    } catch (error) {
      console.error('Error posting new message:', error)
    }
  }

  const fetchData = async (callback) => {
    try {
      const token = await AsyncStorageService.getAccessToken()
      const headers = {
        Authorization: `Bearer ${token}`,
      }
      const body = {
        prompt: newMessage[0],
      }
      const response = await axios.post(`${HOST}/openai/generate`, body, {
        headers,
      })
      const data = await response.data
      callback(data)
    } catch (error) {
      console.error('Error fetching openai response:', error)
      setIsError(true)
    } finally {
      setIsFetchDataCompleted(true)
    }
  }

  const fetchDataListRecipe = async (callback, nameDish) => {
    let data // Declare `data` at the function level
    try {
      const token = await AsyncStorageService.getAccessToken()
      const headers = {
        Authorization: `Bearer ${token}`,
      }
      const body = {
        name: nameDish,
      }
      const response = await axios.post(
        `${HOST}/openai/find-in-database`,
        body,
        {
          headers,
        }
      )
      data = response.data // Assign response data to `data`
      callback(data)
    } catch (error) {
      console.error('Error fetching recipe response:', error)
      setIsError(true) // Ensure `setIsError` is accessible
    } finally {
      if (data && data.existedInDatabase) {
        setIsFetchDataCompleted(true) // Ensure `setIsFetchDataCompleted` is accessible
      } else {
        Toast.show({
          type: 'info',
          text1: 'Searching for recipe...',
          text2:
            'No recipe found in the system, please wait while we search external sources for you.',
          textStyle: { fontSize: 28 },
        })
      }
    }
  }

  const fetchRecipeImage = async (callback, nameDish) => {
    try {
      const token = await AsyncStorageService.getAccessToken()
      const headers = {
        Authorization: `Bearer ${token}`,
      }

      const response = await axios.get(`${HOST}/openai/recipe-image`, {
        headers,
        params: { query: nameDish },
      })
      const data = await response.data
      callback(data)
    } catch (error) {
      console.error('Error fetching recipe response:', error)
      setIsError(true)
    } finally {
      setIsFetchDataCompleted(true)
    }
  }

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
        handleNewRecipe,
        handleNewResponse,
        fetchData,
        fetchDataListRecipe,
        handlePatchRecordSelect,
        setListRecord,
        handleUpdateListRecord,
        handleSetListRecord,
        handleResponseRecipe,
        extractQuery,
        fetchRecipeImage,
      }}
    >
      {children}
    </MessageContext.Provider>
  )
}

export const useMessage = () => {
  return useContext(MessageContext)
}

