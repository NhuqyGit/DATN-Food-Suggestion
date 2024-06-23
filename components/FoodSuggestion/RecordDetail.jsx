import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useNavigation, useRoute } from '@react-navigation/native'
import { theme } from '../../theme/index'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import Tag from './Tag'
import { HOST } from '../../config'
import { AsyncStorageService } from '../../utils/AsynStorage'
import TagForMeal from './TagForMeal'
import { useMessage } from './MessageContext'
import axios from 'axios'
import TagForType from './TagForType'

const RecordDetail = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { handleUpdateListRecord, handleSetListRecord } = useMessage()
  const { recordSelect, type } = route.params
  const [nameRecord, setNameRecord] = useState(
    type === 'PATCH' ? recordSelect.nameRecord : ''
  )
  const [price, setPrice] = useState(
    type === 'PATCH'
      ? recordSelect.money !== null
        ? recordSelect.money?.toString()
        : ''
      : ''
  )
  const [meal, setMeal] = useState(
    type === 'PATCH' ? recordSelect.meal.toString() : '0'
  )
  const [diner, setDiner] = useState(
    type === 'PATCH' ? recordSelect.numberOfDiners.toString() : '1'
  )
  const [diets, setDiets] = useState(null)
  const [allergies, setAllergies] = useState(null)
  const [cuisines, setCuisines] = useState(null)
  const [typeSuggest, setTypeSuggest] = useState(
    type === 'PATCH' ? recordSelect.typeSuggest.toString() : '0'
  )

  const [isLoading, setLoading] = useState(false)

  const mealData = [
    {
      name: 'Breakfast',
      value: '0',
    },
    {
      name: 'Lunch',
      value: '1',
    },
    {
      name: 'Dinner',
      value: '2',
    },
  ]

  const typeSuggestData = [
    {
      name: 'For a day',
      value: '0',
    },
    {
      name: 'For a week',
      value: '1',
    },
  ]

  const handleFetchCuisines = async () => {
    const token = await AsyncStorageService.getAccessToken()
    // const userId = await AsyncStorageService.getUserId();
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    try {
      const response = await fetch(`${HOST}/cuisines`, { headers })
      const data = await response.json()
      if (data.length > 0) {
        const refactorData = data.map((m) => {
          const { id, name } = m
          const isExist =
            type === 'PATCH' &&
            recordSelect?.cuisines?.some((item) => item.id === id)
              ? true
              : false
          return { id, name: name, isSelect: isExist }
        })
        setCuisines(refactorData)
      }
    } catch (error) {
      console.error('Error fetching data record diet:', error)
    }
  }

  const handleFetchDiets = async () => {
    const token = await AsyncStorageService.getAccessToken()
    // const userId = await AsyncStorageService.getUserId();
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    try {
      const response = await fetch(`${HOST}/diets`, { headers })
      const data = await response.json()
      if (data.length > 0) {
        const refactorData = data.map((m) => {
          const { id, name } = m
          const isExist =
            type === 'PATCH' &&
            recordSelect?.diets?.some((item) => item.id === id)
              ? true
              : false
          return { id, name: name, isSelect: isExist }
        })
        setDiets(refactorData)
      }
    } catch (error) {
      console.error('Error fetching data record diet:', error)
    }
  }

  const handleFetchAllergies = async () => {
    const token = await AsyncStorageService.getAccessToken()
    // const userId = await AsyncStorageService.getUserId();
    const headers = {
      Authorization: `Bearer ${token}`,
    }
    try {
      const response = await fetch(`${HOST}/allergies`, { headers })
      const data = await response.json()
      if (data.length > 0) {
        const refactorData = data.map((m) => {
          const { id, allergiesName } = m
          const isExist =
            type === 'PATCH' &&
            recordSelect?.allergies?.some((item) => item.id === id)
              ? true
              : false
          return { id, name: allergiesName, isSelect: isExist }
        })
        setAllergies(refactorData)
      }
    } catch (error) {
      console.error('Error fetching data record allergies:', error)
    }
  }

  useEffect(() => {
    handleFetchDiets()
    handleFetchAllergies()
    handleFetchCuisines()
  }, [])

  const handleIsChange = () => {
    if (!diets || !allergies || !cuisines) {
      return false
    }
    if (type === 'PATCH') {
      const isNameRecordChange = recordSelect.nameRecord === nameRecord

      const isMoneyChange =
        recordSelect.money !== null
          ? recordSelect.money.toString() === price
          : '' === price
      const isMealChange = recordSelect.meal.toString() === meal
      const isTypeSuggestChange =
        recordSelect.typeSuggest.toString() === typeSuggest
      const isDinerChange = recordSelect.numberOfDiners.toString() === diner

      //cuisinses
      const cuisinesIds = cuisines
        .filter((cuisine) => cuisine.isSelect)
        .map((cuisine) => cuisine.id)
      const recordCuisinesIds = recordSelect.cuisines.map(
        (cuisine) => cuisine.id
      )

      //diets
      const dietsIds = diets
        .filter((diet) => diet.isSelect)
        .map((diet) => diet.id)
      const recordDietsIds = recordSelect.diets.map((diet) => diet.id)

      //allergies
      const allergiesIds = allergies
        .filter((allergy) => allergy.isSelect)
        .map((allergy) => allergy.id)
      const recordAllergiesIds = recordSelect.allergies.map(
        (allergy) => allergy.id
      )

      // Compare 2 array cuisines id
      const areCuisinesSame =
        cuisinesIds.length === recordCuisinesIds.length &&
        cuisinesIds.every((id) => recordCuisinesIds.includes(id))

      // Compare 2 array diets id
      const areDietsSame =
        dietsIds.length === recordDietsIds.length &&
        dietsIds.every((id) => recordDietsIds.includes(id))

      // Compare 2 array allergies id
      const areAllergiesSame =
        allergiesIds.length === recordAllergiesIds.length &&
        allergiesIds.every((id) => recordAllergiesIds.includes(id))

      return (
        isNameRecordChange &&
        isMoneyChange &&
        isTypeSuggestChange &&
        isMealChange &&
        isDinerChange &&
        areDietsSame &&
        areAllergiesSame &&
        areCuisinesSame
      )
    } else if (type === 'POST') {
      const isNameRecordChange = nameRecord === ''
      const isMoneyChange = price === ''
      const isMealChange = meal === '0'
      const isTypeSuggestChange = typeSuggest === '0'
      const isDinerChange = diner === '1'

      //diets
      const cuisinesIds = cuisines
        .filter((cuisine) => cuisine.isSelect)
        .map((cuisine) => cuisine.id)

      //diets
      const dietsIds = diets
        .filter((diet) => diet.isSelect)
        .map((diet) => diet.id)

      //allergies
      const allergiesIds = allergies
        .filter((allergy) => allergy.isSelect)
        .map((allergy) => allergy.id)

      // Compare 2 array cuisines id
      const isHasCuisine = cuisinesIds.length === 0

      // Compare 2 array diets id
      const isHasDiet = dietsIds.length === 0

      // Compare 2 array allergies id
      const isHasAllergy = allergiesIds.length === 0
      return (
        isNameRecordChange &&
        isMoneyChange &&
        isTypeSuggestChange &&
        isMealChange &&
        isDinerChange &&
        isHasDiet &&
        isHasAllergy &&
        isHasCuisine
      )
    }
  }

  const handleChangeName = (name) => {
    setNameRecord(name)
  }

  const handleChangePrice = (price) => {
    setPrice(price)
  }

  const handleChangeMeal = (value) => {
    setMeal(value)
  }

  const handleChangeTypeSuggest = (value) => {
    setTypeSuggest(value)
  }

  const handleChangeDiner = (diner) => {
    setDiner(diner)
  }

  const handleToggleSelect = (personalize, id) => {
    if (personalize === 'diets') {
      const updatedDiets = diets.map((diet) =>
        diet.id === id ? { ...diet, isSelect: !diet.isSelect } : diet
      )
      setDiets(updatedDiets)
    } else if (personalize === 'allergies') {
      const updatedAllergies = allergies.map((allergy) =>
        allergy.id === id
          ? { ...allergy, isSelect: !allergy.isSelect }
          : allergy
      )
      setAllergies(updatedAllergies)
    } else if (personalize === 'cuisines') {
      const updatedCuisines = cuisines.map((cuisine) =>
        cuisine.id === id
          ? { ...cuisine, isSelect: !cuisine.isSelect }
          : cuisine
      )
      setCuisines(updatedCuisines)
    }
  }

  const handlePress = async () => {
    if (type === 'PATCH') {
      if (nameRecord === '') {
        alert('Name record null')
        setLoading(false)
        return
      }
      if (diner === '' || diner === '0') {
        alert('Number of diners must larger than 0')
        setLoading(false)
        return
      }
      if (typeSuggest === '0' && price !== '' && parseInt(price) < 10000) {
        alert('Money have to larger than 10000 or null')
        setLoading(false)
        return
      }
      setLoading(true)
      try {
        const token = await AsyncStorageService.getAccessToken()
        const headers = {
          Authorization: `Bearer ${token}`,
        }
        const cuisinesIds = cuisines
          .filter((cuisine) => cuisine.isSelect)
          .map((cuisine) => cuisine.id)
        const dietsIds = diets
          .filter((diet) => diet.isSelect)
          .map((diet) => diet.id)
        const allergiesIds = allergies
          .filter((allergy) => allergy.isSelect)
          .map((allergy) => allergy.id)
        const bodyData = {
          nameRecord: nameRecord,
          meal: parseInt(meal, 10),
          money: price !== '' ? parseInt(price, 10) : null,
          numberOfDiners: parseInt(diner, 10),
          cuisines: cuisinesIds,
          diets: dietsIds,
          allergies: allergiesIds,
          typeSuggest: parseInt(typeSuggest, 10),
        }
        const response = await axios.patch(
          `${HOST}/record/${recordSelect.id}`,
          bodyData,
          { headers }
        )
        handleUpdateListRecord(recordSelect.id, response.data)
        setLoading(false)
        navigation.goBack()
      } catch (error) {
        console.error('Error updating record', error)
        setLoading(false)
      }
    } else if (type === 'POST') {
      if (nameRecord === '') {
        alert('Name record null')
        setLoading(false)
        return
      }
      if (diner === '' || diner === '0') {
        alert('Number of diners must larger than 0')
        setLoading(false)
        return
      }
      if (typeSuggest === '0' && price !== '' && parseInt(price) < 10000) {
        alert('Money have to larger than 10000 or null')
        setLoading(false)
        return
      }
      setLoading(true)
      try {
        const token = await AsyncStorageService.getAccessToken()
        const userId = await AsyncStorageService.getUserId()
        const headers = {
          Authorization: `Bearer ${token}`,
        }
        const cuisinesIds = cuisines
          .filter((cuisine) => cuisine.isSelect)
          .map((cuisine) => cuisine.id)
        const dietsIds = diets
          .filter((diet) => diet.isSelect)
          .map((diet) => diet.id)
        const allergiesIds = allergies
          .filter((allergy) => allergy.isSelect)
          .map((allergy) => allergy.id)
        const bodyData = {
          userId: parseInt(userId, 10),
          nameRecord: nameRecord,
          meal: parseInt(meal, 10),
          money: price !== '' ? parseInt(price, 10) : null,
          numberOfDiners: parseInt(diner, 10),
          cuisines: cuisinesIds,
          diets: dietsIds,
          allergies: allergiesIds,
          typeSuggest: parseInt(typeSuggest, 10),
        }
        const response = await axios.post(`${HOST}/record`, bodyData, {
          headers,
        })
        handleSetListRecord(response.data)
        setLoading(false)
        navigation.goBack()
      } catch (error) {
        console.error('Error posting record', error)
      }
    }
  }

  const listTypeSuggest = typeSuggestData.map((m) => {
    return (
      <TagForType
        key={m.value}
        props={m}
        typeSuggest={typeSuggest}
        handleChangeTypeSuggest={handleChangeTypeSuggest}
      />
      // <TagForMeal key={m.value} props={m} meal={meal} handleChangeMeal={handleChangeMeal}/>
    )
  })
  const listMeal = mealData.map((m) => {
    return (
      <TagForMeal
        key={m.value}
        props={m}
        meal={meal}
        handleChangeMeal={handleChangeMeal}
      />
    )
  })

  const listCuisines = cuisines?.map((c) => {
    return (
      <Tag
        key={c.id.toString()}
        props={c}
        handleToggleSelect={() => handleToggleSelect('cuisines', c.id)}
      />
    )
  })

  const listDiets = diets?.map((d) => {
    return (
      <Tag
        key={d.id.toString()}
        props={d}
        handleToggleSelect={() => handleToggleSelect('diets', d.id)}
      />
    )
  })

  const listAllergies = allergies?.map((a) => {
    return (
      <Tag
        key={a.id.toString()}
        props={a}
        handleToggleSelect={() => handleToggleSelect('allergies', a.id)}
      />
    )
  })

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.btnBack}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name='keyboard-arrow-left' size={28} color='black' />
        </TouchableOpacity>

        <TouchableOpacity disabled={handleIsChange()} onPress={handlePress}>
          {type === 'PATCH' ? (
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: handleIsChange()
                  ? theme.colors.darkGray
                  : theme.colors.secondary,
              }}
            >
              Save
            </Text>
          ) : (
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: handleIsChange()
                  ? theme.colors.darkGray
                  : theme.colors.secondary,
              }}
            >
              Create
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={{ paddingHorizontal: 15 }}>
        <View style={styles.inputForm}>
          <Text style={styles.title}>Name record</Text>
          <TextInput
            style={styles.inputName}
            value={nameRecord ? nameRecord : ''}
            onChangeText={handleChangeName}
            placeholder='Enter your name record'
          />
        </View>

        <View style={styles.inputForm}>
          <Text style={styles.title}>Type suggestion</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {listTypeSuggest}
          </View>
        </View>

        {typeSuggest === '0' ? (
          <View style={styles.inputForm}>
            <Text style={styles.title}>Price Range</Text>
            <TextInput
              style={styles.inputName}
              value={price}
              keyboardType='numeric'
              onChangeText={handleChangePrice}
              placeholder='Enter your price'
            />
          </View>
        ) : null}

        {typeSuggest === '0' ? (
          <View style={styles.inputForm}>
            <Text style={styles.title}>Meal</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
              {listMeal}
            </View>
          </View>
        ) : null}

        <View style={styles.inputForm}>
          <Text style={styles.title}>Numbers of diners</Text>
          <TextInput
            style={styles.inputName}
            value={diner}
            onChangeText={handleChangeDiner}
            placeholder='Enter your name record'
          />
        </View>

        <View style={styles.inputForm}>
          <Text style={styles.title}>Cuisines</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {listCuisines}
          </View>
        </View>

        <View style={styles.inputForm}>
          <Text style={styles.title}>Allergies</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {listAllergies}
          </View>
        </View>

        <View style={styles.inputForm}>
          <Text style={styles.title}>Diet</Text>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {listDiets}
          </View>
          {/* <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 3}}>
                        <Feather name='plus' size={18} color={theme.colors.secondary} />
                        <Text style={{fontSize: 13, fontWeight: '500', color: theme.colors.dark}}>Add ingredients</Text>
                    </TouchableOpacity> */}
        </View>

        <View style={styles.inputForm}>
          <Text style={styles.title}>Personal Taste Preferences</Text>
          <TextInput
            style={styles.inputName}
            placeholder='Enter your name record'
          ></TextInput>
        </View>
      </ScrollView>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size='large' color={theme.colors.secondary} />
        </View>
      )}
    </View>
  )
}

export default RecordDetail

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 15,
  },
  btnBack: {
    width: 35,
    height: 35,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    backgroundColor: '#F3F3F3',
  },
  inputForm: {
    display: 'flex',
    gap: 8,
    marginVertical: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.dark,
    marginBottom: 5,
  },
  inputName: {
    backgroundColor: theme.colors.grayBackground,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Màu nền tối mờ
  },
})

