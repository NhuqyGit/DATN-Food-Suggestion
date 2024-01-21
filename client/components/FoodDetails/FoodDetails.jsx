import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MoreByCreator from './components/MoreByCreator/MoreByCreator';
const FoodDetailsScreen = () => {
  const [selectedTab, setSelectedTab] = useState('overview');

  const foodDetails = {
    name: 'Delicious Dish',
    author: 'Chef John Doe',
    image: require('../../assets/icon.png'),
    ingredients: ['Ingredient 1', 'Ingredient 2', 'Ingredient 3'],
    reviews: [
      { user: 'User1', comment: 'Delicious!', rating: 5 },
      { user: 'User2', comment: 'Amazing recipe!', rating: 4 },
    ],
  };

  const moreByThisCreator = [
    {
      id: '1',
      name: 'Recipe 1',
      author: 'Chef John Doe',
      image: require('../../assets/icon.png'),
    },
    {
      id: '2',
      name: 'Recipe 2',
      author: 'Chef John Doe',
      image: require('../../assets/icon.png'),
    },
    {
      id: '3',
      name: 'Recipe 3',
      author: 'Chef John Doe',
      image: require('../../assets/icon.png'),
    },
    {
      id: '4',
      name: 'Recipe 4',
      author: 'Chef John Doe',
      image: require('../../assets/icon.png'),
    },
    {
      id: '5',
      name: 'Recipe 5',
      author: 'Chef John Doe',
      image: require('../../assets/icon.png'),
    },
  ];
  const handleTabPress = (tab) => {
    setSelectedTab(tab);
  };

  const renderOverviewTab = () => (
    <View>
      <Text>Overview content</Text>
      <Text>Total Ingredients: {foodDetails.ingredients.length}</Text>
      <Text>Total Reviews: {foodDetails.reviews.length}</Text>
      <MoreByCreator author={foodDetails.author} recipes={moreByThisCreator} />
    </View>
  );

  const renderIngredientsTab = () => (
    <View>
      <Text>Ingredients</Text>
      <Text style={{ fontSize: 20 }}>
        Total: {foodDetails.ingredients.length}
      </Text>
      {foodDetails.ingredients.map((ingredient, index) => (
        <Text key={index} style={{ marginLeft: 10 }}>
          {ingredient}
        </Text>
      ))}
    </View>
  );

  const renderReviewsTab = () => (
    <View>
      <Text>Total Reviews: {foodDetails.reviews.length}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={foodDetails.image}
        style={{ width: '100%', height: 300 }}
      />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: 10,
        }}
      >
        <View>
          <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
            {foodDetails.name}
          </Text>
          <Text style={{ fontSize: 16 }}>{`By ${foodDetails.author}`}</Text>
        </View>

        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            backgroundColor: 'green',
          }}
          onPress={() => alert('Food added to planning!')}
        >
          <Icon name='plus' size={20} color='white' />
        </TouchableOpacity>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          borderBottomColor: 'gray',
          borderBottomWidth: 1,
        }}
      >
        <TouchableOpacity
          onPress={() => handleTabPress('overview')}
          style={{
            padding: 10,
            borderBottomColor: 'green',
            borderBottomWidth: selectedTab === 'overview' ? 2 : 0,
          }}
        >
          <Text>Overview</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTabPress('ingredients')}
          style={{
            padding: 10,
            borderBottomColor: 'green',
            borderBottomWidth: selectedTab === 'ingredients' ? 2 : 0,
          }}
        >
          <View>
            <Text>Ingredients</Text>
            <Text style={{ fontSize: 12 }}>
              {foodDetails.ingredients.length} Items
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleTabPress('reviews')}
          style={{
            padding: 10,
            borderBottomColor: 'green',
            borderBottomWidth: selectedTab === 'reviews' ? 2 : 0,
          }}
        >
          <View>
            <Text>Reviews</Text>
            <Text style={{ fontSize: 12 }}>
              {foodDetails.reviews.length} Items
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView style={{ flex: 1, padding: 10, marginTop: 20 }}>
        {selectedTab === 'overview' && renderOverviewTab()}
        {selectedTab === 'ingredients' && renderIngredientsTab()}
        {selectedTab === 'reviews' && renderReviewsTab()}
      </ScrollView>
    </View>
  );
};

export default FoodDetailsScreen;

