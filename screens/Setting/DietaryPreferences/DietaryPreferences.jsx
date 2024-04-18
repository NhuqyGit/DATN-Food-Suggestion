import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { MaterialIcons } from '@expo/vector-icons'
import DietaryItem from './DietaryItem'

const DietaryPreferences = ({ navigation }) => {
  const mockData = [
    {
      id: 1,
      title: 'Diets',
      items: [
        {
          id: 1,
          title: 'Vegetarian',
          selected: true,
        },
        {
          id: 2,
          title: 'Vegan',
        },
        {
          id: 3,
          title: 'Keto',
        },
        {
          id: 4,
          title: 'Paleo',
        },
        {
          id: 5,
          title: 'Gluten Free',
          selected: true,
        },
        {
          id: 6,
          title: 'Dairy Free',
        },
        {
          id: 7,
          title: 'Nut Free',
          selected: true,
        },
        {
          id: 8,
          title: 'Low FODMAP',
        },
        {
          id: 9,
          title: 'Whole 30',
        },
      ],
    },
    {
      id: 2,
      title: 'Allergies',
      items: [
        {
          id: 1,
          title: 'Egg',
        },
        {
          id: 2,
          title: 'Fish',
          selected: true,
        },
        {
          id: 3,
          title: 'Milk',
        },
        {
          id: 4,
          title: 'Peanut',
        },
        {
          id: 5,
          title: 'Shellfish',
          selected: true,
        },
        {
          id: 6,
          title: 'Soy',
        },
        {
          id: 7,
          title: 'Tree Nut',
          selected: true,
        },
        {
          id: 8,
          title: 'Wheat',
        },
      ],
    },
    {
      id: 3,
      title: 'Health',
      items: [
        {
          id: 1,
          title: 'Low Sodium',
          selected: true,
        },
        {
          id: 2,
          title: 'Low Sugar',
        },
        {
          id: 3,
          title: 'Low Carb',
        },
        {
          id: 4,
          title: 'High Protein',
        },
        {
          id: 5,
          title: 'Balanced',
        },
        {
          id: 6,
          title: 'Heart Healthy',
          selected: true,
        },
        {
          id: 7,
          title: 'Diabetic',
        },
        {
          id: 8,
          title: 'Renal',
        },
        {
          id: 9,
          title: 'Celiac',
        },
        {
          id: 10,
          title: "Crohn's",
        },
        {
          id: 11,
          title: 'GERD',
        },
        {
          id: 12,
          title: 'IBS',
        },
        {
          id: 13,
          title: 'Kidney Friendly',
        },
        {
          id: 14,
          title: 'Liver Friendly',
        },
        {
          id: 15,
          title: 'Thyroid Friendly',
        },
        {
          id: 16,
          title: 'Weight Loss',
        },
        {
          id: 17,
          title: 'Weight Gain',
        },
      ],
    },
    {
      id: 4,
      title: 'Favorite Cuisines',
      items: [
        {
          id: 1,
          title: 'American',
        },
        {
          id: 2,
          title: 'Chinese',
        },
        {
          id: 3,
          title: 'French',
          selected: true,
        },
        {
          id: 4,
          title: 'Indian',
        },
        {
          id: 5,
          title: 'Italian',
          selected: true,
        },
        {
          id: 6,
          title: 'Japanese',
        },
        {
          id: 7,
          title: 'Mediterranean',
        },
        {
          id: 8,
          title: 'Mexican',
        },
        {
          id: 9,
          title: 'Thai',
          selected: true,
        },
        {
          id: 10,
          title: 'Vietnamese',
          selected: true,
        },
      ],
    },
    {
      id: 5,
      title: 'Disliked Ingredients',
      items: [
        {
          id: 1,
          title: 'Beef',
        },
        {
          id: 2,
          title: 'Chicken',
        },
        {
          id: 3,
          title: 'Pork',
        },
        {
          id: 4,
          title: 'Seafood',
        },
        {
          id: 5,
          title: 'Tofu',
          selected: true,
        },
        {
          id: 6,
          title: 'Turkey',
        },
        {
          id: 7,
          title: 'Venison',
        },
        {
          id: 8,
          title: 'Lamb',
        },
        {
          id: 9,
          title: 'Duck',
        },
        {
          id: 10,
          title: 'Goose',
        },
        {
          id: 11,
          title: 'Quail',
        },
        {
          id: 12,
          title: 'Squab',
        },
        {
          id: 13,
          title: 'Buffalo',
        },
        {
          id: 14,
          title: 'Rabbit',
          selected: true,
        },
        {
          id: 15,
          title: 'Soy',
        },
        {
          id: 16,
          title: 'Tofu',
        },
        {
          id: 17,
          title: 'Tempeh',
          selected: true,
        },
        {
          id: 18,
          title: 'Seitan',
        },
        {
          id: 19,
          title: 'Peanuts',
        },
        {
          id: 20,
          title: 'Tree Nuts',
        },
        {
          id: 21,
          title: 'Shellfish',
        },
        {
          id: 22,
          title: 'Fish',
          selected: true,
        },
        {
          id: 23,
          title: 'Milk',
          selected: true,
        },
        {
          id: 24,
          title: 'Eggs',
        },
        {
          id: 25,
          title: 'Wheat',
          selected: true,
        },
      ],
    },
  ]

  return (
    <SafeAreaView
      style={{
        backgroundColor: 'white',
        flex: 1,
      }}
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
            return <DietaryItem key={item.id} data={item} />
          })}
        </View>
      </ScrollView>
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
})

