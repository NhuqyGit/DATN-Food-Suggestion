import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import SmallRecommendItem from '../RecommendItem/SmallRecommendItem'
import DishRecipe from './DishRecipe'
import { theme } from '../../theme'

const ListDishRecipe = ({ response }) => {
  const [id, setId] = useState(null)

  const responseChat =
    response && (typeof response === 'object' ? response : JSON.parse(response))

  const handleSetId = (newId) => {
    if (id === newId) {
      setId(null)
    } else {
      setId(newId)
    }
  }

  const findIndexRecipe = () => {
    const index = responseChat?.dishList?.findIndex((r) => r.id === id)
    return index
  }

  const listDirection = (directions) => {
    try {
      if (typeof directions === 'string') {
        return JSON.parse(directions.replace(/,\s(?=\d+\.)/g, '\n').split('\n'))
      } else if (Array.isArray(directions)) {
        return directions
      } else {
        throw new Error('Invalid directions format')
      }
    } catch (error) {
      return []
    }
  }

  const ListRecipe = () => {
    const index = findIndexRecipe()

    if (index === -1) {
      return null
    }
    const steps = listDirection(responseChat?.dishList[index]?.directions)

    return (
      <>
        {steps.map((step, index) => (
          <View key={index} style={styles.stepContainer}>
            <Text style={styles.stepNumber}>{`${index + 1}.`}</Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </>
    )
  }

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {responseChat?.dishList?.map((item) => (
          // <SmallRecommendItem key={item.id} item={item} />
          <DishRecipe
            key={item.id}
            item={item}
            handleSetId={handleSetId}
            id={id}
          />
        ))}
      </ScrollView>

      <View
        style={{ backgroundColor: theme.colors.lightGray, padding: id ? 8 : 0 }}
      >
        {/* {listDirection(responseChat?.dishList[1]?.directions).map((step, index) => (
                    <View key={index} style={styles.stepContainer}>
                        <Text style={styles.stepNumber}>{`${index + 1}.`}</Text>
                        <Text style={styles.stepText}>{step}</Text>
                    </View>
                ))} */}
        <ListRecipe />
        {/* <Text style={{color: 'white'}}>{responseChat?.dishList[1]?.directions}</Text> */}
      </View>
    </View>
  )
}

export default ListDishRecipe

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
  },
  stepNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 8,
  },
  stepText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    flexWrap: 'wrap',
  },
})
