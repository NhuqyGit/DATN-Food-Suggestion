import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { theme } from '../theme';

const RecipeCollectionScreen = ({ navigation }) => {
  const collections = [
    { name: 'All Saved Recipes', recipes: 7, image: require('../assets/monngon.jpg') },
    { name: 'All Personal Recipes', recipes: 0, image: require('../assets/monngon.jpg') },
    { name: 'Schedule and Made', recipes: 2, image: require('../assets/monngon.jpg') },
    { name: 'Dinners', recipes: 2, image: require('../assets/monngon.jpg') },
    { name: 'Breakfasts', recipes: 1,image: require('../assets/monngon.jpg') },
    { name: 'Sweets', recipes: 0, image: require('../assets/monngon.jpg') },
    { name: 'Drinks', recipes: 0, image: require('../assets/monngon.jpg') },
    { name: 'For My Spouse', recipes: 2, image: require('../assets/monngon.jpg') },
    { name: 'All Saved Recipes', recipes: 0, image: require('../assets/monngon.jpg') },
    { name: 'All Saved Recipes', recipes: 0, image: require('../assets/monngon.jpg') },
    { name: 'All Saved Recipes', recipes: 0, image: require('../assets/monngon.jpg') },
    { name: 'All Saved Recipes', recipes: 0, image: require('../assets/monngon.jpg') },
  ];

  const renderCollectionItem = ({ item }) => (
    <TouchableOpacity style={styles.collectionItem} onPress={() => handleCollectionPress(item)}>
      <Image source={item.image} style={styles.collectionImage} />
      <View style={styles.collectionTextContainer}>
        <Text style={styles.collectionName}>{item.name}</Text>
        <Text style={styles.recipeCount}>{item.recipes} RECIPES</Text>
      </View>
    </TouchableOpacity>
  );

  const handleCollectionPress = (collection) => {
    //navigation.navigate('ReceipeListScreen', { collection }); 
    alert(`going to ${collection.name}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Saved Recipe</Text>
      <Text style={styles.subtitle}>Browse your collections</Text>
      <FlatList
        data={collections}
        renderItem={renderCollectionItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    backgroundColor: 'white',
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginTop: "15%",
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "light",
    color: 'gray',
    marginBottom: "8%",
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  collectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.grayBackground,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
    borderRadius: 20,
    marginVertical: 5,
    marginHorizontal: 10,
  },
  collectionImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  collectionTextContainer: {
    marginLeft: 15,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  collectionName: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  recipeCount: {
    color: 'gray',
  },
});

export default RecipeCollectionScreen;
