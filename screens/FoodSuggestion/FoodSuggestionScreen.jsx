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
const Drawer = createDrawerNavigator();

const FoodSuggestion = () =>{
    const [isFolderOpen, setIsFolderOpen] = useState(false);
    const folderTranslateX = useState(new Animated.Value(-SIZES.width * 0.7))[0];
    const opacity = useState(new Animated.Value(0))[0];

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

    return (
        <View style={{flex: 1}}>
            <TouchableOpacity onPress={openFolder}>
                <Text>Open Folder</Text>
            </TouchableOpacity>
            <Animated.View style={[styles.folder, { transform: [{ translateX: folderTranslateX }] }]}>
                <TouchableOpacity onPress={closeFolder}>
                    <Text>Close Folder</Text>
                </TouchableOpacity>
                {/* Your folder content here */}
            </Animated.View>

            {isFolderOpen && (
                <Animated.View style={[styles.overlay, { opacity }]}>
                    <TouchableOpacity onPress={closeFolder} style={styles.overlayTouchArea} activeOpacity={1} />
                </Animated.View>
            )}

            <ScrollView
                style={styles.container}
                showsVerticalScrollIndicator={false}
                vertical
            >
                <View>
                    <Reccomand />
                    <Reccomand />
                    <Reccomand />
                </View>
            </ScrollView>
            <Footer />
        </View>
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
    padding: 20,
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
