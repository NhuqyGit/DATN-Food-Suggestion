import { Image, StyleSheet, Text, View } from 'react-native'
import {
  MaterialCommunityIcons,
  Feather,
  Ionicons,
  Entypo,
} from '@expo/vector-icons'
import React, { useCallback, useEffect, useState } from 'react'
import { theme } from '../../theme/index'
import { useMessage } from './MessageContext'
import { Skeleton } from 'moti/skeleton'
import { useFocusEffect } from '@react-navigation/native'
import DishMessage from './DishMessage'
import ListDishMessage from './ListDishMessage'
import * as Animatable from 'react-native-animatable'
import MealChat from './MealChat/MealChat'
import ListDishRecipe from './ListDishRecipe'
import RecipeWithImage from './RecipeWithImage'
import { useSelector } from 'react-redux'
import { selectUserInfo } from '../../slices/userLoginSlice'

const RenderChat = ({ props }) => {
  const {
    recordActive,
    isError,
    handleNewResponse,
    fetchData,
    fetchDataListRecipe,
    extractQuery,
    fetchRecipeImage,
    handleResponseRecipe,
  } = useMessage()
  const userInfo = useSelector(selectUserInfo)

  useFocusEffect(
    useCallback(() => {
      if (!props.isSend) {
        if (!isError) {
          if (props.isRecipe) {
            const nameDish = extractQuery(props.content)
            fetchDataListRecipe((response) => {
              if (response.existedInDatabase) {
                handleNewResponse(response)
              } else {
                fetchRecipeImage((res) => {
                  handleResponseRecipe(res)
                }, nameDish)
              }
            }, nameDish)
          } else {
            fetchData((response) => {
              handleNewResponse(response)
            })
          }
        }
      }
    }, [])
  )
  const convertKeyToDisplayName = (key) => {
    switch (key) {
      case 'khaiVi':
        return 'Khai Vị'
      case 'monChinh':
        return 'Món Chính'
      case 'trangMieng':
        return 'Tráng Miệng'
      default:
        return key
    }
  }

  // const listDishMessage = props.response && (typeof props.response === 'object' ?
  // 	Object.entries(props.response).flatMap(([key, value]) => (
  // 	<Animatable.View key={key} animation="fadeIn" delay={props.isSend ? 0 : 300}>
  // 		<Text style={styles.sectionTitle}>
  // 			{convertKeyToDisplayName(key)}
  // 		</Text>
  // 		{value.map((item, index) => (
  // 			<Animatable.View key={`${key}_${index}`} animation="fadeIn" delay={props.isSend ? 0 : 300 * (index + 1)}>
  // 				<DishMessage item={item} />
  // 			</Animatable.View>
  // 		))}
  // 	</Animatable.View>
  // 	)) :
  // 	Object.entries(JSON.parse(props.response)).flatMap(([key, value]) => (
  // 	<Animatable.View key={key} animation="fadeIn" delay={props.isSend ? 0 : 300}>
  // 		<Text style={styles.sectionTitle}>
  // 			{convertKeyToDisplayName(key)}
  // 		</Text>
  // 		{value.map((item, index) => (
  // 			<Animatable.View key={`${key}_${index}`} animation="fadeIn" delay={props.isSend ? 0 : 300 * (index + 1)}>
  // 				<DishMessage item={item} />
  // 			</Animatable.View>
  // 		))}
  // 	</Animatable.View>
  // 	))
  // );

  // const formatPrice = (price) => {
  //     return new Intl.NumberFormat('vi-VN').format(price);
  // };

  // const GenerateHeaderMessage = () => {
  // 	if (recordActive === undefined || recordActive === null){
  // 		return
  // 	}
  // 	const { meal, money, numberOfDiners } = recordActive;
  // 	const listMeal = ["bữa sáng", "bữa trưa", "bữa tối"];

  // 	return (
  // 		<Animatable.View animation="fadeIn" delay={300}>
  // 			<Text style={{marginBottom: 10}}>
  // 				Dựa trên tiêu chí của bạn, đây là một gợi ý
  // 				<Text style={{ fontWeight: '700' }}> `{listMeal[meal]}` </Text>
  // 				cho
  // 				<Text style={{ fontWeight: '700' }}> `{numberOfDiners} người` </Text>
  // 				với giá
  // 				<Text style={{ fontWeight: '700' }}> `{formatPrice(money)} VND`</Text>:
  // 			</Text>
  // 		</Animatable.View>
  // 	);
  // };

  return (
    <View style={styles.container}>
      <View style={styles.sendContainer}>
        <View style={styles.avatarUser}>
          {/* <Image
            style={styles.imageUser}
            source={require('../../assets/images/Profile/avatarTest.jpg')}
            /> */}
          <Image
            style={styles.imageUser}
            source={
              userInfo?.imgUrl
                ? { uri: userInfo.imgUrl }
                : require('../../assets/images/Profile/user.png')
            }
          />
        </View>
        <View style={styles.sendChat}>
          <Text style={styles.nameText}>{userInfo?.username}</Text>
          <Text style={styles.sendText}>{props.content}</Text>
        </View>
      </View>

      <View style={styles.responseContainer}>
        <View style={styles.avatarGPT}>
          <Image style={styles.imageAI} source={require("../../assets/images/suggestion/AI.png")} />
          {/* <Feather name='slack' size={20} color={theme.colors.dark} /> */}
        </View>
        <View style={styles.responseChat}>
          <Text style={styles.nameText}>Nhuqy</Text>
          {isError ? (
            <Text>Error</Text>
          ) : (
            <>
              <Skeleton
                colorMode='light'
                width={'90%'}
                height={14}
                radius={'round'}
              >
                {props.isSend ? (
                  <>
                    <Text>{props.header}</Text>
                    <View
                      style={{
                        backgroundColor: props.isRecipe ? 'white' : '#232325',
                        borderRadius: 8,
                        borderColor: theme.colors.lightGray,
                        borderWidth: props.isRecipe ? 0 : 1,
                      }}
                    >
                      {props.isRecipe ? (
                        <ListDishRecipe response={props.response} />
                      ) : props.isRecipeImage ? (
                        <RecipeWithImage response={props.response} />
                      ) : (
                        <MealChat response={props.response} />
                      )}
                    </View>
                  </>
                ) : null}
              </Skeleton>

              {props.isSend ? null : (
                <View style={{ marginTop: 5 }}>
                  <Skeleton
                    colorMode='light'
                    width={'70%'}
                    height={14}
                    radius={'round'}
                  />
                </View>
              )}
              {props.isSend ? null : (
                <View style={{ marginTop: 5 }}>
                  <Skeleton
                    colorMode='light'
                    width={'40%'}
                    height={14}
                    radius={'round'}
                  />
                </View>
              )}
              {props.isSend ? null : (
                <View style={{ marginTop: 5 }}>
                  <Skeleton
                    colorMode='light'
                    width={'60%'}
                    height={14}
                    radius={'round'}
                  />
                </View>
              )}
            </>
          )}
        </View>
      </View>
    </View>
  )
}

export default RenderChat

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    display: 'flex',
    gap: 10,
  },
  nameText: {
    fontWeight: '600',
    marginBottom: 5,
  },
  avatarUser: {
    display: 'flex',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarGPT: {
    width: 30,
    height: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: theme.colors.lightGray,
    backgroundColor: "#e6ecff",
    borderColor: '#5360ac',
  },
  imageUser: {
    width: 30,
    height: 30,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#5360ac',
  },
  imageAI: {
    width: 25,
    height: 25,
    borderRadius: 100,
    // borderWidth: 1,
    // borderColor: '#5360ac',
  },
  sendContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 5,
  },
  sendChat: {
    // backgroundColor: 'tomato',
  },
  sendText: {
    marginBottom: 5,
  },

  responseContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 5,
  },
  responseChat: {
    width: '85%',
  },
  sendResponse: {},
  sectionTitle: {
    color: theme.colors.lightGray,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    marginTop: 12,
  },
})

