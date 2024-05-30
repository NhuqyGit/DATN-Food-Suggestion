import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import DishMessage from './DishMessage';
import * as Animatable from 'react-native-animatable';

const ListDishMessage = ({ response, isSend }) => {
    const [visibleSections, setVisibleSections] = useState([]);
    const [visibleItems, setVisibleItems] = useState({});
    const delayPerItem = 300; // Thời gian delay giữa các phần tử

    const convertKeyToDisplayName = (key) => {
		switch (key) {
		  case "khaiVi":
			return "Khai Vị";
		  case "monChinh":
			return "Món Chính";
		  case "trangMieng":
			return "Tráng Miệng";
		  default:
			return key;
		}
	};
  
    useEffect(() => {
      if (response) {
        const entries = typeof response === 'object' ? 
          Object.entries(response) : 
          Object.entries(JSON.parse(response));
        
        if (!isSend) {
          entries.forEach(([key, value], sectionIndex) => {
            setTimeout(() => {
              setVisibleSections((prev) => [...prev, key]);
              value.forEach((item, itemIndex) => {
                setTimeout(() => {
                  setVisibleItems((prev) => ({
                    ...prev,
                    [key]: [...(prev[key] || []), item],
                  }));
                }, delayPerItem * (itemIndex + 1));
              });
            }, delayPerItem * sectionIndex);
          });
        } else {
          const newVisibleSections = entries.map(([key]) => key);
          const newVisibleItems = entries.reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {});
          setVisibleSections(newVisibleSections);
          setVisibleItems(newVisibleItems);
        }
      }
    }, [response, isSend]);
  
    return (
      <View>
        {visibleSections.map((key) => (
          <Animatable.View key={key} animation={isSend ? undefined : "fadeIn"}>
            <Text style={styles.sectionTitle}>
              {convertKeyToDisplayName(key)}
            </Text>
            {visibleItems[key] && visibleItems[key].map((item, index) => (
              <Animatable.View key={`${key}_${index}`} animation={isSend ? undefined : "fadeIn"}>
                <DishMessage item={item} />
              </Animatable.View>
            ))}
          </Animatable.View>
        ))}
      </View>
    );
  };

export default ListDishMessage

const styles = StyleSheet.create({})