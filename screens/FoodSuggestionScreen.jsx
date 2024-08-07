import React, { Component, useEffect, useState } from 'react'
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native'
import {
  MaterialCommunityIcons,
  Ionicons,
  Entypo,
  Feather,
} from '@expo/vector-icons'
import FoodSuggesionStack from './FoodSuggestion/FoodSuggesionStack'
import { useNavigation, useRoute } from '@react-navigation/native'
import { theme } from '../theme/index'
import { HOST } from '../config'
import { AsyncStorageService } from '../utils/AsynStorage'
import axios from 'axios'

const Drawer = createDrawerNavigator()
const FoodSuggestion = () => {
  const navigation = useNavigation()
  const [listTopic, setListTopic] = useState([])

  const [topicFilter, setTopicFilter] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loadingDeleteAdd, setLoadingDeleteAdd] = useState(false)

  const demoData1 = {
    Today: [
      {
        id: 1,
        name: 'Lorem Ipsum',
        date: '',
        message: [],
      },
      {
        id: 2,
        name: 'A type specimen book',
        date: '',
        message: [],
      },
    ],
    Yesterday: [
      {
        id: 3,
        name: 'Many desktop publishing package',
        date: '',
        message: [],
      },
      {
        id: 4,
        name: 'There are many variations of passages',
        date: '',
        message: [],
      },
      {
        id: 5,
        name: 'All the Lorem Ipsum generators',
        date: '',
        message: [],
      },
    ],
    'Previous 7 Days': [
      {
        id: 6,
        name: 'Contrary to popular belief',
        date: '',
        message: [],
      },
      {
        id: 7,
        name: 'Always free from repetition',
        date: '',
        message: [],
      },
    ],
  }

  const [focusedItem, setFocusedItem] = useState(null)

  const getTopics = async () => {
    try {
      const token = await AsyncStorageService.getAccessToken()
      const userId = await AsyncStorageService.getUserId()
      const headers = {
        Authorization: `Bearer ${token}`,
      }

      const [dateFilterResponse, topicsResponse] = await Promise.all([
        fetch(`${HOST}/topics/user/${userId}/date-filter`, { headers }),
        fetch(`${HOST}/topics/user/${userId}`, { headers }),
      ])

      if (!dateFilterResponse.ok) {
        throw new Error('Failed to fetch date filter data')
      }
      if (!topicsResponse.ok) {
        throw new Error('Failed to fetch topics data')
      }

      const dateFilterData = await dateFilterResponse.json()
      const topicsData = await topicsResponse.json()

      setTopicFilter(dateFilterData)
      setListTopic(topicsData)
      setFocusedItem(topicsData[0].id)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }
  useEffect(() => {
    getTopics()
  }, [])

  // useEffect(() => {
  // 	if (listTopic.length > 0) {
  // 		setFocusedItem(listTopic[0].id);
  // 	} else {
  // 		setFocusedItem(null);
  // 	}
  // }, [listTopic]);
  // useEffect(() => {
  // 	if (focusedItem) {
  // 		const topic = listTopic.find(t => t.id === focusedItem);
  // 		if (topic) {
  // 			navigation.navigate(topic.title + topic.id.toString());
  // 		}
  // 	}
  // }, [listTopic, focusedItem]);

  const handlePress = (item) => {
    const label = item.title + item.id.toString()
    navigation.navigate(label)
    setFocusedItem(item.id)
  }

  const handleAddNewSuggestion = (newTopic) => {
    setListTopic((prevList) => [newTopic, ...prevList])
    setTopicFilter((prev) => ({
      ...prev,
      Today: [newTopic, ...prev.Today],
    }))
  }

  const handleNewSuggestion = async () => {
    try {
      const token = await AsyncStorageService.getAccessToken()
      const userId = await AsyncStorageService.getUserId()
      const headers = {
        Authorization: `Bearer ${token}`,
      }

      const messages = await axios.get(
        `${HOST}/topics/${listTopic[0].id}/messages`,
        { headers }
      )
      const dataMessage = await messages.data
      if (dataMessage.length === null || dataMessage.length === 0) {
        return
      }
      setLoadingDeleteAdd(true)

      const body = {
        user: parseInt(userId),
        title: 'New suggestion',
      }

      const response = await axios.post(`${HOST}/topics`, body, { headers })
      const data = await response.data
      handleAddNewSuggestion(data)
      setFocusedItem(data.id)
      navigation.navigate(data.title + data.id.toString())
      // setTopicFilter(dateFilterData);
      // setListTopic(topicsData);
    } catch (error) {
      console.error('Error add new topics:', error)
    } finally {
      setLoadingDeleteAdd(false)
    }
  }

  const handleDeleteAllMessage = async (topicId) => {
    try {
      const token = await AsyncStorageService.getAccessToken()
      const headers = {
        Authorization: `Bearer ${token}`,
      }

      const response = await axios.delete(
        `${HOST}/topics/${topicId}/messages`,
        { headers }
      )
      const data = await response.data
    } catch (error) {
      console.error('Error add new topics:', error)
    }
  }

  const handleDeleteTopic = async (topicId) => {
    if (listTopic.length <= 1) {
      await handleDeleteAllMessage(topicId)
      // Update listTopic state
      setListTopic((prevTopics) => {
        const newTopics = [
          {
            id: topicId,
            title: 'New suggestion',
            isActive: true,
            record: null,
            messageList: [],
          },
        ]
        return newTopics
      })

      // Update topicFilter state
      setTopicFilter((prevFilter) => {
        const updatedFilter = { ...prevFilter }
        Object.keys(updatedFilter).forEach((key) => {
          if (key === 'Today') {
            updatedFilter[key] = [
              {
                id: topicId,
                title: 'New suggestion',
                isActive: true,
                record: null,
                messageList: [],
              },
            ]
          } else {
            updatedFilter[key] = []
          }
        })
        return updatedFilter
      })
      return true
    }
    try {
      const token = await AsyncStorageService.getAccessToken()
      const headers = {
        Authorization: `Bearer ${token}`,
      }

      const response = await axios.delete(`${HOST}/topics/${topicId}`, {
        headers,
      })
      const data = await response.data

      // Update listTopic state
      setListTopic((prevTopics) => {
        const newTopics = prevTopics.filter((topic) => topic.id !== topicId)
        if (newTopics.length > 0) {
          setFocusedItem(newTopics[0].id)
        } else {
          setFocusedItem(null)
        }

        return newTopics
      })

      // Update topicFilter state
      setTopicFilter((prevFilter) => {
        const updatedFilter = { ...prevFilter }
        Object.keys(updatedFilter).forEach((key) => {
          updatedFilter[key] = updatedFilter[key].filter(
            (topic) => topic.id !== topicId
          )
        })
        return updatedFilter
      })
      return true
    } catch (error) {
      console.error('Error delete topics:', error)
      return false
    }
  }

  const handleChangeNameTopic = async (topicId, newName) => {
    try {
      const token = await AsyncStorageService.getAccessToken()
      const userId = await AsyncStorageService.getUserId()
      const headers = {
        Authorization: `Bearer ${token}`,
      }

      const response = await axios.patch(
        `${HOST}/topics/${topicId}`,
        { title: newName },
        { headers }
      )

      const data = await response.data
      // Update listTopic state
      setListTopic((prevTopics) =>
        prevTopics.map((topic) =>
          topic.id === topicId ? { ...topic, title: newName } : topic
        )
      )

      // Update topicFilter state
      setTopicFilter((prevFilter) => {
        const updatedFilter = { ...prevFilter }
        Object.keys(updatedFilter).forEach((key) => {
          updatedFilter[key] = updatedFilter[key].map((topic) =>
            topic.id === topicId ? { ...topic, title: newName } : topic
          )
        })

        navigation.navigate(newName + topicId.toString())

        return updatedFilter
      })

      // setFocusedItem(data.id);
      // navigation.navigate(data.title + data.id.toString())
      return true
    } catch (error) {
      console.error('Error patching topics:', error)
      return false
    }
  }

  const handleAddNewMessage = (topicId, newMessage) => {
    const topicIndex = listTopic.findIndex((t) => t.id === topicId)
    if (topicIndex !== -1) {
      // Tạo một bản sao của danh sách các chủ đề
      const updatedListTopic = [...listTopic]
      // Tạo một bản sao của chủ đề cần cập nhật
      const updatedTopic = {
        ...updatedListTopic[topicIndex],
        messageList: [...updatedListTopic[topicIndex].messageList, newMessage],
      }
      // Thay thế chủ đề cũ bằng chủ đề đã cập nhật
      updatedListTopic[topicIndex] = updatedTopic
      // Cập nhật trạng thái với danh sách chủ đề đã cập nhật
      setListTopic(updatedListTopic)
    }
  }

  const handleChangeRecordActie = (topicId, recordActive) => {
    const topicIndex = listTopic.findIndex((t) => t.id === topicId)
    if (topicIndex !== -1) {
      listTopic[topicIndex].record = recordActive
    }
  }

  const listScreen = listTopic
    ? listTopic.map((topic, index) => {
        return (
          <Drawer.Screen
            key={index.toString()}
            name={topic.title + topic.id.toString()}
          >
            {(props) => (
              <FoodSuggesionStack
                {...props}
                focusedItem={focusedItem}
                topic={topic}
                handleDeleteTopic={handleDeleteTopic}
                handleChangeNameTopic={handleChangeNameTopic}
                handleAddNewMessage={handleAddNewMessage}
                handleChangeRecordActie={handleChangeRecordActie}
                getTopics={getTopics}
              />
            )}
          </Drawer.Screen>
        )
      })
    : null

  const listScreen1 = topicFilter
    ? Object.keys(topicFilter).flatMap((key) => {
        return (
          <View key={key}>
            {topicFilter[key]?.length > 0 ? (
              <>
                <Text
                  style={{
                    color: '#6e6e6e',
                    paddingHorizontal: 16,
                    marginTop: 20,
                    fontSize: 13,
                  }}
                >
                  {key}
                </Text>
                {topicFilter[key]?.map((item, index) => (
                  <DrawerItem
                    key={`${key}_${index.toString()}`}
                    label={item.title}
                    onPress={() => handlePress(item)}
                    focused={focusedItem === item.id}
                    activeBackgroundColor={'rgba(196, 224, 227, 0.4)'}
                    labelStyle={{
                      fontWeight: 'bold',
                      fontSize: 15,
                      color: theme.colors.dark,
                    }}
                  />
                ))}
              </>
            ) : null}
          </View>
        )
      })
    : null

  if (loading) {
    return (
      <View style={styles.loadingOverlay}>
        <ActivityIndicator size='large' color={'black'} />
      </View>
    )
  }
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <SafeAreaView
            style={{ flex: 1, position: 'relative' }}
            edges={['right', 'left', 'top']}
          >
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: 5,
                  // backgroundColor: 'red',
                  borderRadius: 8,
                }}
                onPress={handleNewSuggestion}
              >
                <View style={styles.avatarGPT}>
                  <Image
                    style={styles.imageAI}
                    source={require('../assets/images/suggestion/AI.png')}
                  />
                  {/* <Feather name='slack' size={20} color={theme.colors.dark} /> */}
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    flex: 1,
                  }}
                >
                  <Text style={{ fontWeight: 'bold' }}>New suggestion</Text>
                  <Ionicons name='create-outline' size={22} color={'black'} />
                </View>
              </TouchableOpacity>
            </View>

            <ScrollView>
              {/* <DrawerItemList {...props} /> */}

              {/* {
								listTopic.map((item, index)=>{
									return(
										<DrawerItem
											key={index.toString()}
											label={item.name}
											onPress={() => handlePress(item.name)}
											focused={focusedItem === item.name}
											activeBackgroundColor='#d9d9d9'
											activeTintColor={theme.colors.dark}
										/>
									)
								})
							} */}
              {loadingDeleteAdd ? (
                <View
                  style={[
                    styles.loadingOverlay,
                    {
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'white',
                      zIndex: 3,
                    },
                  ]}
                >
                  <ActivityIndicator size='medium' color={'black'} />
                </View>
              ) : null}
              {listScreen1}
            </ScrollView>
          </SafeAreaView>
        )
      }}
      screenOptions={{
        drawerType: 'slide',
        swipeEnabled: false,
        headerShown: false,
        headerTintColor: 'black',
        headerTitle: 'Food Suggestion',
        drawerActiveBackgroundColor: '#d9d9d9',
        drawerActiveTintColor: 'black',

        headerStyle: {
          borderBottomWidth: 1, // Độ dày của border bottom
          borderBottomColor: '#d9d9d9', // Màu của border bottom
        },
      }}
    >
      {listScreen}
      {/* {listScreen1} */}
    </Drawer.Navigator>
  )
}

const styles = StyleSheet.create({
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  avatarGPT: {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
    backgroundColor: '#e6ecff',
  },
  imageAI: {
    width: 32,
    height: 32,
    borderRadius: 100,
  },
})

export default FoodSuggestion

