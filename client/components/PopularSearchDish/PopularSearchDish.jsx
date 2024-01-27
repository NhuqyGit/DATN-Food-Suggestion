import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PopularSearchDishItem from '../PopularSearchDishItem/PopularSearchDishItem'
import _image from '../../assets/images/PersonalizeScreen/tasty-butter-chicken-curry-dish-from-indian-cuisine-1277362334.jpg'
const PopularSearchDish = () => {
    const data = [
        {
            id: 1, 
            image: require('../../assets/images/PersonalizeScreen/tasty-butter-chicken-curry-dish-from-indian-cuisine-1277362334.jpg'), 
            title: "test"
        },
        {
            id: 2, 
            image: require('../../assets/images/PersonalizeScreen/tasty-butter-chicken-curry-dish-from-indian-cuisine-1277362334.jpg'), 
            title: "test"
        },
        {
            id: 3, 
            image: require('../../assets/images/PersonalizeScreen/tasty-butter-chicken-curry-dish-from-indian-cuisine-1277362334.jpg'), 
            title: "test"
        },
        {
            id: 4, 
            image: require('../../assets/images/PersonalizeScreen/tasty-butter-chicken-curry-dish-from-indian-cuisine-1277362334.jpg'), 
            title: "test"
        },
        {
            id: 5, 
            image: require('../../assets/images/PersonalizeScreen/tasty-butter-chicken-curry-dish-from-indian-cuisine-1277362334.jpg'), 
            title: "test"
        },
        {
            id: 6, 
            image: require('../../assets/images/PersonalizeScreen/tasty-butter-chicken-curry-dish-from-indian-cuisine-1277362334.jpg'), 
            title: "test"
        },
        {
            id: 7, 
            image: require('../../assets/images/PersonalizeScreen/tasty-butter-chicken-curry-dish-from-indian-cuisine-1277362334.jpg'), 
            title: "test"
        },
        {
            id: 8, 
            image: require('../../assets/images/PersonalizeScreen/tasty-butter-chicken-curry-dish-from-indian-cuisine-1277362334.jpg'), 
            title: "test"
        },
    ]
    return (
        <View style={styles.container}>
            <Text style={styles.textHeader}>Popular search dish today</Text>
            
            <FlatList 
                style={styles.listItem}
                data={data}
                numColumns={2}
                scrollEnabled={false}
                renderItem={({item})=>{
                    return(
                        <PopularSearchDishItem item={item}/>
                    )
                }}
                keyExtractor={(item, index)=> index.toString()}
                // contentContainerStyle={{justifyContent: 'center'}}
            />
        </View>
    )
}

export default PopularSearchDish

const styles = StyleSheet.create({
    container:{
        // paddingHorizontal: 5,
        marginTop: 10,
    },
    textHeader: {
        fontSize: 20,
        fontWeight: "500",
        marginBottom: 10,

    },
    listItem:{
    }
})