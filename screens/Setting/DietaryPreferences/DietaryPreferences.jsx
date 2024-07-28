import React, { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import DietaryItem from './DietaryItem'
import { useSelector } from 'react-redux'
import { selectUserInfo } from '../../../slices/userLoginSlice'
import { AsyncStorageService } from '../../../utils/AsynStorage'
import { HOST } from '../../../config'
import { theme } from '../../../theme'
import { useFocusEffect } from '@react-navigation/native'
import axios from 'axios'

const DietaryPreferences = ({ navigation }) => {
  const userInfo = useSelector(selectUserInfo)
  const [personalize, setPersonlize] = useState(null)
  const [mockData, setMockData] = useState([
    {
      id: 1,
      title: 'Diets',
      items: [],
    },
    {
      id: 2,
      title: 'Allergies',
      items: [],
    },
    {
      id: 3,
      title: 'Favorite Cuisines',
      items: [],
    },
    {
      id: 4,
      title: 'Disliked Ingredients',
      items: [],
    },
  ])
  const [diets, setDiets] = useState([])
  const [allergies, setAllergies] = useState([])
  const [cuisines, setCuisines] = useState([])
  const [loading, setLoading] = useState(false)

  const handleFetchPersonalize = async () => {
    const token = await AsyncStorageService.getAccessToken()
    // const userId = await AsyncStorageService.getUserId();
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    try {
      const response = await fetch(`${HOST}/personalize/user/${userInfo?.id}`, {
        headers,
      })
      const data = await response.json()
      setPersonlize(data)
      return data
    } catch (error) {
      console.error('Error fetching data personalize:', error)
    }
  }

  const handleFetchDiets = async (personalize) => {
    const token = await AsyncStorageService.getAccessToken()
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    try {
      const response = await fetch(`${HOST}/diets`, { headers })
      const data = await response.json()
      if (data.length > 0) {
        const listDiets = []
        const refactorData = data.map((m) => {
          const { id, name } = m
          const isExist = personalize?.diets?.some((item) => item.id === id)
            ? true
            : false
          if (isExist) {
            listDiets.push(id) // Append id to listDiets if item.id matches
          }
          return { id, name: name, selected: isExist }
        })
        setMockData((prev) => {
          const updatedMockData = [...prev]
          updatedMockData[0].items = refactorData
          return updatedMockData
        })
        setDiets(listDiets)
      }
    } catch (error) {
      console.error('Error fetching data record diet:', error)
    }
  }

  const handleFetchAllergies = async (personalize) => {
    const token = await AsyncStorageService.getAccessToken()
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    try {
      const response = await fetch(`${HOST}/allergies`, { headers })
      const data = await response.json()
      if (data.length > 0) {
        const listAllergies = []
        const refactorData = data.map((m) => {
          const { id, allergiesName } = m
          const isExist = personalize?.allergies?.some((item) => item.id === id)
            ? true
            : false
          if (isExist) {
            listAllergies.push(id) // Append id to listDiets if item.id matches
          }
          return { id, name: allergiesName, selected: isExist }
        })
        setMockData((prev) => {
          const updatedMockData = [...prev]
          updatedMockData[1].items = refactorData
          return updatedMockData
        })
        setAllergies(listAllergies)
      }
    } catch (error) {
      console.error('Error fetching data record allergies:', error)
    }
  }

  const handleFetchCuisines = async (personalize) => {
    const token = await AsyncStorageService.getAccessToken()
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    try {
      const response = await fetch(`${HOST}/cuisines`, { headers })
      const data = await response.json()
      if (data.length > 0) {
        const listCuisines = []
        const refactorData = data.map((m) => {
          const { id, name } = m
          const isExist = personalize?.cuisines?.some((item) => item.id === id)
            ? true
            : false
          if (isExist) {
            listCuisines.push(id) // Append id to listDiets if item.id matches
          }
          return { id, name, selected: isExist }
        })
        setMockData((prev) => {
          const updatedMockData = [...prev]
          updatedMockData[2].items = refactorData
          return updatedMockData
        })
        setCuisines(listCuisines)
      }
    } catch (error) {
      console.error('Error fetching data record cuisines:', error)
    }
  }

  const handleIsChange = () => {
    if (!diets || !allergies || !cuisines) {
      return false
    }

    // diets
    const dietsIds = mockData[0]?.items
      .filter((diet) => diet.selected)
      .map((diet) => diet.id)

    // allergies
    const allergiesIds = mockData[1]?.items
      .filter((allergy) => allergy.selected)
      .map((allergy) => allergy.id)

    // cuisines
    const cuisinesIds = mockData[2]?.items
      .filter((cuisine) => cuisine.selected)
      .map((cuisine) => cuisine.id)

    // Check if all elements in diets match dietsIds
    const dietsMatch =
      diets.length === dietsIds.length &&
      diets.every((dietId) => dietsIds.includes(dietId))

    // Check if all elements in allergies match allergiesIds
    const allergiesMatch =
      allergies.length === allergiesIds.length &&
      allergies.every((allergyId) => allergiesIds.includes(allergyId))
    // Check if all elements in cuisines match cuisinesIds
    const cuisinesMatch =
      cuisines.length === cuisinesIds.length &&
      cuisines.every((cuisineId) => cuisinesIds.includes(cuisineId))

    return dietsMatch && allergiesMatch && cuisinesMatch
  }

  const handleChangePersonalize = (idPer, id) => {
    if (idPer === 1) {
      setDiets((prev) =>
        prev.includes(id)
          ? prev.filter((dietId) => dietId !== id)
          : [...prev, id]
      )
    } else if (idPer === 2) {
      setAllergies((prev) =>
        prev.includes(id)
          ? prev.filter((allergyId) => allergyId !== id)
          : [...prev, id]
      )
    } else if (idPer === 3) {
      setCuisines((prev) =>
        prev.includes(id)
          ? prev.filter((cuisineId) => cuisineId !== id)
          : [...prev, id]
      )
    }
  }

  const handlePress = async () => {
    setLoading(true)
    try {
      const token = await AsyncStorageService.getAccessToken()
      const headers = {
        Authorization: `Bearer ${token}`,
      }
      const bodyData = {
        diets: diets,
        cuisines: cuisines,
        allergies: allergies,
      }
      const response = await axios.patch(
        `${HOST}/personalize/${personalize?.id}`,
        bodyData,
        { headers }
      )
      const personalizeData = await handleFetchPersonalize()
      await handleFetchDiets(personalizeData)
      await handleFetchAllergies(personalizeData)
      await handleFetchCuisines(personalizeData)
    } catch (error) {
      console.error('Error updating personalize', error)
    } finally {
      setLoading(false)
    }
  }

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        const personalizeData = await handleFetchPersonalize()
        await handleFetchDiets(personalizeData)
        await handleFetchAllergies(personalizeData)
        await handleFetchCuisines(personalizeData)
      }
      fetchData()
    }, [])
  )
  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}
      edges={['right', 'left', 'top']}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => navigation.goBack()}
          >
            <MaterialIcons name='keyboard-arrow-left' size={28} color='black' />
          </TouchableOpacity>

          <Text style={styles.head}>Edit Dietary Preferences</Text>

          {mockData.map((item) => {
            return (
              <DietaryItem
                key={item.id}
                data={item}
                handleChangePersonalize={handleChangePersonalize}
              />
            )
          })}
        </View>
      </ScrollView>
      <View style={styles.updateBtnContainer}>
        <TouchableOpacity
          disabled={handleIsChange() || loading}
          onPress={handlePress}
          style={[
            styles.updateBtn,
            {
              backgroundColor:
                handleIsChange() || loading
                  ? theme.colors.darkGray
                  : theme.colors.secondary,
            },
          ]}
        >
          {loading ? (
            <ActivityIndicator size={'small'} color={'white'} />
          ) : (
            <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>
              Update Preferences
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default DietaryPreferences

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  btnBack: {
    width: 35,
    height: 35,
    marginTop: 20,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#F3F3F3',
  },
  head: {
    textAlign: 'left',
    fontSize: 24,
    marginVertical: 10,
    fontWeight: '700',
    color: '#231F20',
    marginBottom: 32,
  },
  updateBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: '#f1f1f1',
  },
  updateBtn: {
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 15,
    backgroundColor: theme.colors.secondary,
  },
})

