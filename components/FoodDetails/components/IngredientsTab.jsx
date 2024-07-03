import React from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { theme } from '../../../theme/index'
function IngredientsTab({ ingredients }) {
  if (!ingredients || ingredients?.length === 0) {
    return (
      <View style={styles.noDirectionsContainer}>
        <Text style={styles.noDirectionsText}>No ingredients available</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {ingredients?.map((ingredientType) => (
          <View key={ingredientType.id}>
              <View style={styles.row}>
                <View key={ingredientType?.id} style={styles.rowItem}>
                  <Icon
                    name='cutlery'
                    size={20}
                    color={theme.colors.secondary}
                    style={{ paddingHorizontal: 10 }}
                  />
                  <Text style={styles.ingredientText}>
                    {ingredientType?.mass}{' '}
                    {ingredientType?.ingredient?.ingredientName}
                  </Text>
                </View>
              </View>
            <View style={styles.line} />
          </View>
        ))}
      </ScrollView>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 15,
    backgroundColor: 'white',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  line: {
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.secondary,
  },
  ingredientText: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    fontSize: 16,
  },
  noDirectionsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
  },
  noDirectionsText: {
    fontSize: 16,
    color: 'gray',
  },
})
export default IngredientsTab

