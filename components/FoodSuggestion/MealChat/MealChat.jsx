import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { useNavigation } from '@react-navigation/native'
import { theme } from '../../../theme/index'
import Appetizer from './Appetizer'
import MainDishes from './MainDishes'
import Desserts from './Desserts'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DishMessage from '../DishMessage'

const Tab = createMaterialTopTabNavigator()

const MealChat = ({ response }) => {
  const [selectedTab, setSelectedTab] = useState('');

  const convertKeyToDisplayName = (key) => {
    switch (key) {
      case 'khaiVi':
        return 'Khai Vị';
      case 'monChinh':
        return 'Món Chính';
      case 'trangMieng':
        return 'Tráng Miệng';
      case 'T2':
        return 'Thứ Hai';
      case 'T3':
        return 'Thứ Ba';
      case 'T4':
        return 'Thứ Tư';
      case 'T5':
        return 'Thứ Năm';
      case 'T6':
        return 'Thứ Sáu';
      case 'T7':
        return 'Thứ Bảy';
      case 'CN':
        return 'Chủ Nhật';
      default:
        return key;
    }
  };

  const parseResponse = (response) => {
    if (typeof response === 'string') {
      try {
        return JSON.parse(response);
      } catch (e) {
        console.error('Invalid JSON response:', e);
        return {};
      }
    } else if (typeof response === 'object' && response !== null) {
      return response;
    } else {
      return {};
    }
  };

  const responseChat = parseResponse(response);
  const tabs = responseChat ? Object.keys(responseChat) : [];

  useEffect(() => {
    if (tabs.length > 0 && !selectedTab) {
      setSelectedTab(tabs[0]);
    }
  }, [tabs]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.buttonContainer}>
        {tabs.map((key, index) => (
          <TouchableOpacity
            style={[
              styles.button,
              {
                borderTopLeftRadius: index === 0 ? 8 : 0,
                backgroundColor: selectedTab === key ? theme.colors.dark : null,
              },
            ]}
            key={key}
            onPress={() => setSelectedTab(key)}
          >
            <Text style={styles.buttonText}>{convertKeyToDisplayName(key)}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={{ flex: 1 }}>
        {responseChat[selectedTab] && responseChat[selectedTab].length === 0 ? (
          <Text>No items available</Text>
        ) : (
          responseChat[selectedTab] &&
          responseChat[selectedTab].map((item, index) => (
            <DishMessage key={index.toString()} item={item} />
          ))
        )}
      </View>
    </View>
  );
};

export default MealChat;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    backgroundColor: "#5e5e5e",
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
})