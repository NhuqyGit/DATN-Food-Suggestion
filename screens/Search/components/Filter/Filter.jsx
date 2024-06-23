import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useDispatch } from 'react-redux'
import {
  setCookingTime,
  setIngredientIds,
} from '../../../../slices/searchSlice'
import FilterItem from './FilterItem'

const Filter = ({ hasButton = false, ingredients, setIsFilter, isFilter }) => {
  const dispatch = useDispatch()

  const cookingTimeOptions = [
    {
      id: 1,
      title: '< 5 minutes',
      active: false,
      value: 300,
    },
    {
      id: 2,
      title: '< 10 minutes',
      active: false,
      value: 600,
    },
    {
      id: 3,
      title: '< 15 minutes',
      active: false,
      value: 900,
    },
    {
      id: 4,
      title: '< 30 minutes',
      active: false,
      value: 1800,
    },
    {
      id: 5,
      title: '< 45 minutes',
      active: false,
      value: 2700,
    },
    {
      id: 6,
      title: '< 1 hour',
      active: false,
      value: 3600,
    },
    {
      id: 7,
      title: '< 2 hours',
      active: false,
      value: 7200,
    },
  ]

  const [cookingTimeState, setCookingTimeState] = useState(0)
  const [ingredientState, setIngredientState] = useState([])

  const [ingredientsMapping, setIngredientsMapping] = useState([])
  const [cookingTimeMapping, setCookingTimeMapping] =
    useState(cookingTimeOptions)
  const [showAllPopular, setShowAllPopular] = useState(false)

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

  const handleSeeIngredients = () => {
    setShowAllPopular(!showAllPopular)
  }

  return (
    <Modal
      animationType='slide'
      transparent
      visible={isFilter}
      onRequestClose={() => {
        setIsFilter(false)
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 8,
            }}
          >
            <Text style={styles.title}>Ingredients you have</Text>
            <TouchableOpacity
              onPress={() => {
                setIsFilter(false)
              }}
            >
              <AntDesign name='close' size={24} color='white' />
            </TouchableOpacity>
          </View>

          <View style={styles.wrapper}>
            {ingredients?.length > 10 && (
              <TouchableOpacity
                onPress={handleSeeIngredients}
                style={styles.seeMoreButton}
              >
                <Text style={styles.seeMoreText}>
                  {showAllPopular ? 'See Less' : 'See More'}
                </Text>
              </TouchableOpacity>
            )}
            <View style={styles.list}>
              {ingredientsMapping
                ?.slice(0, showAllPopular ? ingredients.length : 10)
                .map((item, index) => (
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
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 8,
            }}
          >
            <Text style={styles.title}>Less cooking time:</Text>
          </View>
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
      </ScrollView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#373739',
    paddingVertical: 32,
    gap: 16,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingVertical: 8,
    color: '#fff',
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
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 64,
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

  seeMoreButton: {
    paddingTop: 16,
    paddingHorizontal: 8,
    alignSelf: 'flex-end',
  },

  seeMoreText: {
    fontSize: 14,
    fontWeight: 600,
    color: `white`,
  },
})

export default Filter

