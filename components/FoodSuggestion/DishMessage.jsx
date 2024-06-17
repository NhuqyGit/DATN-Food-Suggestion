import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { theme } from '../../theme/index'
import { useMessage } from './MessageContext'

const DishMessage = ({item}) => {
    const { handleNewRecipe } = useMessage();
    const formatPrice = (price) => {
        // Convert price to string if it's not already
        const priceStr = price.toString();
    
        // Remove non-numeric characters, except the decimal point
        const cleanPrice = priceStr.replace(/[^0-9.]/g, '');
    
        // Convert to number
        const numericPrice = parseFloat(cleanPrice);
    
        // Format the price using the Vietnamese locale
        return new Intl.NumberFormat('vi-VN').format(numericPrice);
    };
    console.log(item.price)
    return (
        <View style={styles.container}>
            <View style={{width: "75%"}}>
                <Text style={[styles.text, styles.textFood]}>{item.food}</Text>
                <Text style={[styles.text, styles.textPrice]}>{`(${formatPrice(item.price)} VND)`}</Text>
            </View>
            <View style={{width: "25%"}}>
                <TouchableOpacity
                    onPress={()=>handleNewRecipe("bún bò")}
                    style={styles.btnRequestRecipe}>
                    <Text style={{color: "white"}}>recipe?</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DishMessage

const styles = StyleSheet.create({
    container:{
        display: 'flex',
        flexDirection: 'row',
        // backgroundColor: "#232325",
        // backgroundColor: "#F2FFE9",
        backgroundColor: theme.colors.dark,
        padding: 15,
        marginVertical: 3,
        // borderColor: theme.colors.lightGray,
        // borderWidth: 1,
        borderRadius: 6,
        justifyContent: "space-between",
        alignItems: 'center'
    },
    text:{
        color: theme.colors.lightGray,
    },
    textFood: {
        color: theme.colors.secondary,
        marginRight: 10,
        fontSize: 15,
        fontWeight: "600",
        marginBottom: 5,
    },
    textPrice:{
        fontSize: 13,
        color: theme.colors.lightGray
    },
    btnRequestRecipe:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EE4E4E',
        borderRadius: 10,
        padding: 10
    }
})