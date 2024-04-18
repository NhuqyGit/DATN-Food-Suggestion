import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { theme } from "../../../theme/index";
function IngredientsTab({ foodDetails }) {
  return (
    <View style={styles.container}>
      <ScrollView>
        {foodDetails.ingredients.map((ingredient, index) => (
          <View key={index.toString()}>
            <TouchableOpacity
              onPress={() => alert(`Add ${ingredient} to shopping list!`)}
            >
              <View style={styles.row}>
                <View key={index} style={styles.rowItem}>
                  <Icon
                    name="cutlery"
                    size={20}
                    color={theme.colors.secondary}
                    style={{ paddingHorizontal: 10 }}
                  />
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              </View>
            </TouchableOpacity>

            <View style={styles.line} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingHorizontal: 15,
    //marginBottom: 12,
    backgroundColor: "white",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rowItem: {
    flexDirection: "row",
    alignItems: "center",
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
});
export default IngredientsTab;
