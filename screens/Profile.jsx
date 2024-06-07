import { MaterialIcons } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../theme/theme";
import * as ImagePicker from "expo-image-picker";

import { AsyncStorageService } from "../utils/AsynStorage";
import { selectUserInfo, setUserInfo } from "../slices/userLoginSlice";
import { useSelector, useDispatch } from "react-redux";
import { HOST, uploadToFirebase } from "../config";

//const img = require("../constants/knife-fork.jpg");

// const data = [
//   { id: 0, name: "List", date: "12/21/54" },
//   { id: 0, name: "List", date: "12/21/54" },
//   { id: 0, name: "List", date: "12/21/54" },
//   { id: 0, name: "List", date: "12/21/54" },
// ];

// function SavedRecipeLists() {
//   const navigation = useNavigation();
//   return (
//     <View style={{ flex: 1 }}>
//       <View
//         style={{
//           borderRadius: 15,
//           alignItems: "center",
//           flexDirection: "row",
//           justifyContent: "space-between",
//           paddingVertical: 5,
//         }}
//       >
//         <TouchableOpacity>
//           <View
//             style={{
//               flexDirection: "row",
//               backgroundColor: "orange",
//               alignItems: "center",
//               justifyContent: "center",
//               paddingHorizontal: 10,
//               paddingVertical: 5,
//               borderRadius: 45,
//             }}
//           >
//             <Text style={{ color: "white", fontSize: 17, paddingBottom: 2 }}>
//               Sort
//             </Text>
//             <MaterialIcons
//               name="sort-by-alpha"
//               size={24}
//               color="white"
//               style={{ marginLeft: 5 }}
//             />
//           </View>
//         </TouchableOpacity>

//         <TouchableOpacity style={{ marginRight: 5 }}>
//           <View style={{ flexDirection: "row", alignItems: "center" }}>
//             <MaterialIcons size={24} name="add-box" color="orange" />
//             <Text
//               style={{
//                 fontSize: 17,
//                 color: "orange",
//                 alignItems: "center",
//               }}
//             >
//               Add
//             </Text>
//           </View>
//         </TouchableOpacity>
//       </View>
//       {data.map((item, index) => {
//         return (
//           <TouchableOpacity
//             key={index}
//             style={[
//               {
//                 flex: 1,
//                 flexDirection: "row",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 borderRadius: 15,
//                 paddingHorizontal: 20,
//                 marginTop: 5,
//                 paddingVertical: 5,
//                 backgroundColor: "white",
//               },
//               styles.boxShadow,
//             ]}
//             onPress={() => {
//               navigation.navigate("List", { id: item.id, name: item.name });
//             }}
//           >
//             <Text
//               style={{
//                 ...FONTS.h3,
//                 color: COLORS.primary,
//                 alignItems: "center",
//               }}
//             >
//               {item.name}
//             </Text>

//             <Image
//               source={img}
//               style={{
//                 width: 50,
//                 height: 50,
//                 borderRadius: 45,
//                 opacity: 0.5,
//               }}
//             />
//           </TouchableOpacity>
//         );
//       })}
//     </View>
//   );
// }

// function PersonalRecipeList() {
//   const navigation = useNavigation();
//   return (
//     <View style={{ flex: 1 }}>
//       <TouchableOpacity
//         style={[
//           {
//             flex: 1,
//             flexDirection: "row",
//             justifyContent: "space-between",
//             alignItems: "center",
//             borderRadius: 15,
//             paddingHorizontal: 20,
//             marginTop: 5,
//             paddingVertical: 5,
//             backgroundColor: "white",
//           },
//           styles.boxShadow,
//         ]}
//         onPress={() => {
//           navigation.navigate("PersonalList", { id: 1, name: "My recipes" });
//         }}
//       >
//         <Text style={{ ...FONTS.h3 }}>My recipes</Text>

//         <Image
//           source={img}
//           style={{
//             width: 50,
//             height: 50,
//             borderRadius: 45,
//             opacity: 0.5,
//           }}
//         />
//       </TouchableOpacity>
//     </View>
//   );
// }

// function Profile({ navigation }) {
//   const [isCreateVisible, setCreateVisible] = useState(false)
//   const [isSettingVisible, setSettingVisible] = useState(false)
//   const [listName, setListName] = useState('')
//   const generateBoxShadowStyle = (
//     xOffset,
//     yOffset,
//     shadowColorIos,
//     shadowOpacity,
//     shadowRadius,
//     elevation,
//     shadowColorAndroid,
//   ) => {
//     if (Platform.OS === 'ios') {
//       styles.boxShadow = {
//         shadowColor: shadowColorIos,
//         shadowOffset: { width: xOffset, height: yOffset },
//         shadowOpacity,
//         shadowRadius,
//       }
//     } else if (Platform.OS === 'android') {
//       styles.boxShadow = {
//         elevation,
//         shadowColor: shadowColorAndroid,
//       }
//     }
//   }
//   generateBoxShadowStyle(0, 2, '#000', 0.3, 3, 4, '#000')
//   const createList = () => {}
//   return (
//     <SafeAreaView
//       style={{
//         flex: 1,
//         backgroundColor: COLORS.white,
//       }}
//     >
//       <StatusBar backgroundColor='black' style='light' />

//       <ScrollView>
//         <View
//           style={{
//             marginTop: 30,
//             alignItems: 'center',
//           }}
//         >
//           <TouchableOpacity
//             onPress={() => {
//               navigation.navigate('Settings')
//               // setSettingVisible(true);
//             }}
//             style={{ position: 'absolute', right: 20, top: 0 }}
//           >
//             <View
//               style={{
//                 backgroundColor: 'rgba(52, 52, 52, 0.1)',
//                 padding: 10,
//                 borderRadius: 999,
//               }}
//             >
//               <MaterialIcons name='settings' size={24} color='gray' />
//             </View>
//           </TouchableOpacity>
//           <Image
//             source={img}
//             resizeMode='contain'
//             style={{
//               height: 100,
//               width: 100,
//               borderRadius: 999,
//               borderColor: COLORS.primary,
//               borderWidth: 0.5,
//             }}
//           />

//           <Text
//             style={{
//               ...FONTS.h2,
//               color: COLORS.primary,
//               marginVertical: 8,
//               fontWeight: 'bold',
//             }}
//           >
//             Melissa Peters
//           </Text>
//         </View>

//         <View style={{ flex: 1, marginHorizontal: 22, marginTop: 20, gap: 20 }}>
//           <PersonalRecipeList />
//           <SavedRecipeLists />
//         </View>
//         <View style={{ height: 500 }} />
//       </ScrollView>

//       <Modal animationType='fade' transparent visible={isSettingVisible}>
//         <TouchableWithoutFeedback
//           onPress={() => {
//             setSettingVisible(false)
//           }}
//         >
//           <View
//             style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               bottom: 0,
//               right: 0,
//               backgroundColor: 'gray',
//               opacity: 0.1,
//             }}
//           />
//         </TouchableWithoutFeedback>
//         <View
//           style={[
//             {
//               position: 'absolute',
//               right: 50,
//               top: 60,
//               width: '35%',
//               backgroundColor: 'white',
//               borderRadius: 20,
//             },
//             styles.boxShadow,
//           ]}
//         >
//           <TouchableOpacity
//             style={{
//               justifyContent: 'center',
//               padding: 15,
//             }}
//           >
//             <Text style={{ ...FONTS.h3, fontWeight: '500' }}>Edit account</Text>
//           </TouchableOpacity>
//           <TouchableOpacity
//             style={{
//               backgroundColor: 'red',
//               justifyContent: 'center',
//               padding: 15,
//               borderBottomLeftRadius: 20,
//               borderBottomRightRadius: 20,
//             }}
//           >
//             <Text style={{ ...FONTS.h3, color: 'white', fontWeight: '500' }}>
//               Settings
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </Modal>
//     </SafeAreaView>
//   )
// }

import Collection from "../components/Profile/Collection";
import SortPopUp from "../components/Profile/SortPopUp";

function Profile({ navigation }) {
  const userInfo = useSelector(selectUserInfo);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const isFocused = useIsFocused();
  const [collections, setCollections] = useState([]);

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  useEffect(() => {
    if (isFocused) {
      const fetchCollections = async () => {
        const token = await AsyncStorageService.getAccessToken();
        try {
          const response = await fetch(
            `${HOST}/collections/user/${userInfo?.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const responseJson = await response.json();

          if (responseJson.error) {
            console.log(responseJson.message);
          } else {
           
            setCollections(responseJson.collections);
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchCollections();
    }
  }, [isFocused]);

  const data = [
    {
      nameCollection: "All Personal Recipes",
      num: 5,
      imgCol: require("../assets/images/Profile/avatarDefault.png"),
    },
    {
      nameCollection: "Breakfasts",
      num: 2,
      imgCol: require("../assets/images/Profile/avatarDefault.png"),
    },
    {
      nameCollection: "Desserts",
      num: 3,
      imgCol: require("../assets/images/Profile/avatarDefault.png"),
    },
  ];

  const updateProfileImage = async (newImgUrl) => {
    const token = await AsyncStorageService.getAccessToken();
    try {
      const response = await fetch(`${HOST}/users/${userInfo?.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          imgUrl: newImgUrl,
        }),
      });

      const responseJson = await response.json();

      if (responseJson.error) {
        console.log(responseJson.message);
      } else {
        dispatch(setUserInfo({ ...userInfo, imgUrl: newImgUrl }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const listCollection = collections?.map((col, index) => {
    return (
      <Collection props={col} navigation={navigation} key={index.toString()} />
    );
  });

  const importImage = async () => {
    try {
      let res = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
      });
      if (!res.canceled) {
        const { fileName, uri } = res.assets[0];
        const uploadRes = await uploadToFirebase(uri, fileName);
        updateProfileImage(uploadRes.downloadURL);
        // replace user state url
      }
    } catch (e) {
      Alert.alert("Error uploading image");
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white" }}>
      <ScrollView style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Settings");
          }}
          style={{ alignItems: "flex-end" }}
        >
          <View style={styles.btnSetting}>
            <MaterialIcons name="settings" size={24} color="black" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.avatar} onPress={importImage}>
          <Image
            style={styles.avatarImage}
            source={
              userInfo?.imgUrl
                ? require("../assets/images/Profile/avatarTest.jpg")
                : { uri: userInfo.imgUrl }
            }
          />
        </TouchableOpacity>

        <Text style={styles.userName}>Hà Đăng Nhuận</Text>
        <Text style={styles.userDescription}>
          Edit your description and tell us a little about yourself
        </Text>

        <View style={styles.collectionHeader}>
          <TouchableOpacity
            onPress={() => navigation.push("NewCollection")}
            style={styles.btnAddColl}
          >
            <MaterialIcons name="playlist-add" size={28} color="#3a9693" />
            <Text style={[styles.titleCollection]}>New Collection</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={styles.btnSort}
          >
            <Text style={styles.titleFilter}>Sort</Text>
            <MaterialIcons
              name="keyboard-arrow-down"
              style={{ marginLeft: 5 }}
              size={24}
              color="#2d6d64"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.listCollection}>
          {/* <Collection /> */}
          {listCollection}
        </View>

        <SortPopUp closePopUp={handleCloseModal} modalVisible={modalVisible} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
  },
  btnSetting: {
    width: 35,
    height: 35,
    marginTop: 20,
    marginRight: 20,
    marginBottom: 15,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    backgroundColor: "#F3F3F3",
  },
  avatar: {
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 200,
  },
  userName: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 24,
    fontWeight: "700",
    color: "#231F20",
  },
  userDescription: {
    textAlign: "center",
    marginTop: 15,
    fontSize: 13,
    color: "#231F20",
  },
  collectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    marginVertical: 30,
  },
  btnAddColl: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnSort: {
    backgroundColor: "#ecf5f4",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleCollection: {
    fontSize: 14,
    fontWeight: "700",
    color: "#231F20",
    marginLeft: 5,
  },
  titleFilter: {
    fontSize: 14,
    fontWeight: "700",
    color: "#2d6d64",
  },
  listCollection: {
    paddingHorizontal: 25,
  },
});

export default Profile;
