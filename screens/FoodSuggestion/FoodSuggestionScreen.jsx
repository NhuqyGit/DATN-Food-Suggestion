import React, { Component, useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet, Modal, Animated } from "react-native";
import { createDrawerNavigator, DrawerItemList, DrawerContentScrollView } from "@react-navigation/drawer";
// import FoodSuggestionScreen from "./FoodSuggestion/FoodSuggestionScreen";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { MaterialCommunityIcons, Ionicons, Entypo } from '@expo/vector-icons'
import { SIZES } from "../../theme/theme";
import Footer from "../../components/FoodSuggestion/Footer";
import Reccomand from "../../components/FoodSuggestion/Reccomand";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../../theme/index";
const Drawer = createDrawerNavigator();

const FoodSuggestion = ({name}) =>{
    const [isFolderOpen, setIsFolderOpen] = useState(false);
    const folderTranslateX = useState(new Animated.Value(-SIZES.width * 0.7))[0];
    const opacity = useState(new Animated.Value(0))[0];
    const navigation = useNavigation()

   

    const openFolder = () => {
        setIsFolderOpen(true);
        Animated.parallel([
            Animated.timing(opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true
            }),
            Animated.timing(folderTranslateX, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
            })
        ]).start();
    };

    const closeFolder = () => {
        Animated.parallel([
            Animated.timing(opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true
            }),
            Animated.timing(folderTranslateX, {
            toValue: -SIZES.width * 0.7,
            duration: 300,
            useNativeDriver: true
            })
        ]).start(() => setIsFolderOpen(false));
    };

    const handleNavigate = (name) =>{
        closeFolder()
        navigation.navigate(name)
    }

    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{flex: 1}}>
                <ScrollView
                    style={styles.container}
                    showsVerticalScrollIndicator={false}
                    vertical
                >
                    <View>
                        {/* <Reccomand />
                        <Reccomand />
                        <Reccomand /> */}
                        <Text>{name}</Text>
                    </View>
                </ScrollView>
                <Footer />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
    backgroundColor: 'white',
    //   justifyContent: 'center',
    //   alignItems: 'center',
    },
    folder: {
        position: 'absolute',
        backgroundColor: 'white',
        width: SIZES.width * 0.7,
        height: '100%',
        left: 0,
        zIndex: 2,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    overlayTouchArea:{
        ...StyleSheet.absoluteFillObject,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
        // justifyContent: 'center',
        // alignItems: 'center',
        // zIndex: 1,
    }
});

export default FoodSuggestion;
