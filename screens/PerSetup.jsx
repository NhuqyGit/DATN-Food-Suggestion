import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator
  } from 'react-native'
  import React, { useEffect, useState } from 'react'
  import { AsyncStorageService } from '../utils/AsynStorage'
  import { selectUserInfo, setUserInfo } from '../slices/userLoginSlice'
  import { useSelector, useDispatch } from 'react-redux'
  import { HOST } from '../config'
  import { useRoute, useNavigation } from '@react-navigation/native'
  import axios from 'axios'
  
  const deviceHeight = Dimensions.get('window').height
  const deviceWidth = Dimensions.get('window').width
  
  function PerSetup() {
    const userInfo = useSelector(selectUserInfo)
    const routes = useRoute()
    const navigation = useNavigation()
    const { newQues } = routes.params
    const [isLoading, setIsLoading] = useState(false)
    // console.log(newQues)
  
    useEffect(()=>{
        const createPersonalize = async () => {
            setIsLoading(true)
            try{
                const token = await AsyncStorageService.getAccessToken();
                const headers = {
                  Authorization: `Bearer ${token}`,
                };
                const cuisineIds = newQues[0].listAns.filter(cuisine => cuisine.isSelect).map(cuisine => cuisine.id);
                const dietIds = newQues[1].listAns.filter(diet => diet.isSelect).map(diet => diet.id);
                const allergyIds = newQues[2].listAns.filter(allergy => allergy.isSelect).map(allergy => allergy.id);

                console.log(cuisineIds)
                console.log(dietIds)
                console.log(allergyIds)
                const bodyData = {
                    "user": userInfo?.id,
                    "cuisines": cuisineIds,
                    "diets": dietIds,
                    "allergies": allergyIds
                }
                const response = await axios.post(
                    `${HOST}/personalize`,
                    bodyData,
                    { headers },
                )
                navigation.navigate("PersonalizeDone")
                setIsLoading(false)
            }catch (error) {
                console.error('Error posting personalize', error);
                setIsLoading(false)
            }
        }

        createPersonalize()
    }, [])
    
    if (isLoading) {
        return (
            <View style={styles.loadingOverlay}>
                <ActivityIndicator size="large" color={"black"} />
            </View>
        );
    }
    return (
      <View style={styles.container}>
        <Image
          style={{ width: '100%', height: deviceHeight / 3 }}
          source={require('../assets/images/PersonalizeScreen/slice3.png')}
        />
  
        {/* <TouchableOpacity onPress={() => navigation.navigate("PersonalizeDone")}>
          <View style={styles.btn}>
            <Text style={styles.btnText}>Get Started</Text>
          </View>
        </TouchableOpacity> */}
      </View>
    )
  }
  
  export default PerSetup
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#ffffff',
      alignItems: 'center',
    },
    h1: {
      marginTop: deviceHeight * 0.07,
      marginBottom: deviceHeight * 0.015,
      fontSize: deviceHeight * 0.04,
      fontWeight: '600',
    },
    span: {
      fontSize: deviceHeight * 0.018,
      marginBottom: deviceHeight * 0.07,
      maxWidth: '75%',
      // fontWeight: '500',
      textAlign: 'center',
    },
    btn: {
      // width: deviceWidth * 0.3,
      // height: deviceWidth * 0.012,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: deviceHeight * 0.028,
      backgroundColor: '#4CAF50',
    },
    btnText: {
      fontSize: deviceHeight * 0.018,
      fontWeight: '500',
      color: '#ffffff',
      paddingHorizontal: deviceWidth * 0.065,
      paddingVertical: deviceWidth * 0.03,
    },
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
  })
  
  