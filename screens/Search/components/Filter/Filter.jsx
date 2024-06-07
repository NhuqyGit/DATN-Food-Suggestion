import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import FilterItem from './FilterItem'
import { AntDesign } from '@expo/vector-icons'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCookingTime,
  selectIngredientIds,
  setCookingTime,
  setIngredientIds,
} from '../../../../slices/searchSlice'

const Filter = ({ hasButton = false, ingredients, setIsFilter }) => {
  const dispatch = useDispatch()

  const cookingTimeOptions = [
    {
      id: 1,
      title: '< 5 phút',
      active: false,
      value: 300,
    },
    {
      id: 2,
      title: '< 10 phút',
      active: false,
      value: 600,
    },
    {
      id: 3,
      title: '< 15 phút',
      active: false,
      value: 900,
    },
    {
      id: 4,
      title: '< 30 phút',
      active: false,
      value: 1800,
    },
    {
      id: 5,
      title: '< 45 phút',
      active: false,
      value: 2700,
    },
    {
      id: 6,
      title: '< 1 giờ',
      active: false,
      value: 3600,
    },
    {
      id: 7,
      title: '< 2 giờ',
      active: false,
      value: 7200,
    },
  ]

  const [cookingTimeState, setCookingTimeState] = useState(0)
  const [ingredientState, setIngredientState] = useState([])

  const [ingredientsMapping, setIngredientsMapping] = useState([])
  const [cookingTimeMapping, setCookingTimeMapping] =
    useState(cookingTimeOptions)

  useEffect(() => {
    setIngredientsMapping(
      ingredients.map((item) => ({
        id: item.id,
        title: item?.ingredientName,
        active: false,
      }))
    )
  }, [])

  const handleClickIngredient = (id) => {
    setIngredientsMapping(
      ingredientsMapping.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            active: !item.active,
          }
        }
        return item
      })
    )

    if (ingredientState.includes(id)) {
      setIngredientState(ingredientState.filter((item) => item !== id))
    } else {
      setIngredientState([...ingredientState, id])
    }
  }

  const handleClickCookingTime = (value) => {
    setCookingTimeMapping(
      cookingTimeOptions.map((item) => {
        if (item.value === value) {
          return {
            ...item,
            active: !item.active,
          }
        }
        return {
          ...item,
          active: false,
        }
      })
    )
    if (cookingTimeState === value) {
      setCookingTimeState(0)
    } else {
      setCookingTimeState(value)
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Nguyên liệu bạn có</Text>
        <View style={styles.wrapper}>
          <View style={styles.list}>
            {ingredientsMapping.map((item, index) => (
              <FilterItem
                key={index}
                data={item}
                onPress={() => {
                  handleClickIngredient(item.id)
                }}
              />
            ))}
          </View>
        </View>
      </View>

      <View>
        <Text style={styles.title}>Thời gian nấu, ít hơn:</Text>
        <View style={styles.wrapper}>
          <View style={styles.list}>
            {cookingTimeMapping.map((item, index) => (
              <FilterItem
                key={index}
                data={item}
                onPress={() => {
                  handleClickCookingTime(item.value)
                }}
              />
            ))}
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => {
          setIsFilter(false)
          dispatch(setIngredientIds(ingredientState))
          dispatch(setCookingTime(cookingTimeState))
        }}
        style={styles.filterButton}
      >
        <View style={styles.filterWrapper}>
          <Text style={styles.filterTitle}>Filter</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#373739',
    paddingVertical: 32,
    gap: 16,
    position: 'absolute',
    zIndex: 100,
    top: 48,
    minHeight: 500,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
    marginLeft: 16,
  },

  wrapper: {
    backgroundColor: '#2E2E30',
  },

  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    padding: 16,
  },

  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingBottom: 16,
  },

  addButton: {
    color: '#fff',
  },

  filterButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  filterWrapper: {
    backgroundColor: '#4CAF50',
    paddingVertical: 16,
    paddingHorizontal: 64,
    borderColor: '#4CAF50',
    borderRadius: 200,
    fontWeight: 'bold',
  },

  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
})

export default Filter

