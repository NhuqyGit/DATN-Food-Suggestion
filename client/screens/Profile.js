import {
  View,
  Text,
  Image,
  TouchableOpacity,
  useWindowDimensions,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS, SIZES} from "../constants/theme";
import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";
import { photos } from "../constants/data";


const img = requie(../assets/knife-fork.jpg);
const SavedRecipeLists = () => (
  <View style={{ flex: 1, width: 80% }}>
  
	<View style={{borderRadius: 12, flexDirection: 'row', justifyContent:'space-between'}}>
		<View/>
		<Text>Saved Recipes</Text>
		<TouchableOpacity>		
			<Text>Add</Text>
		</TouchableOpacity>
	</View>
	
    <FlatList
      data={recipeLists}
      numColumns={1}
      renderItem={({ item, index }) => (
	  <TouchableOpacity>
        <View
          style={{
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
            paddingHorizontal: 3,
			marginVertical: 5
          }}
        >
          <Image
            key={index}
            source={img}
            style={{ width: "100%", height: "100%", borderRadius: 45 }}
          />
		  
		  <Text>{item.name}</Text>
        </View>

	  </TouchableOpacity>
      )}
    />
  </View>
);

const PersonalRecipeList = () => (
  <View style={{ flex: 1, width: 80% }}>
  
	<View style={{borderRadius: 12, flexDirection: 'row', justifyContent:'space-between'}}>
		<View/>
		<Text>Personal Recipes</Text>
	</View>
	
	<TouchableOpacity>
		<View
		  style={{
			flexDirection: 'row',
			justifyContent: 'space-between',
			alignItems: 'center',
			paddingHorizontal: 3,
			marginVertical: 5
		  }}
		>
		  <Image
			key={index}
			source={img}
			style={{ width: "100%", height: "100%", borderRadius: 45 }}
		  />
		  
		  <Text>{item.name}</Text>
		</View>
	</TouchableOpacity>
</View>
);

const Profile = () => {

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <StatusBar backgroundColor={COLORS.gray} />
      <View style={{ width: "100%" }}>
        <Image
          source={img}
          resizeMode="cover"
          style={{
            height: 228,
            width: "100%",
          }}
        />
      </View>

      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={img}
          resizeMode="contain"
          style={{
            height: 155,
            width: 155,
            borderRadius: 999,
            borderColor: COLORS.primary,
            borderWidth: 2,
            marginTop: -90,
          }}
        />

        <Text
          style={{
            ...FONTS.h3,
            color: COLORS.primary,
            marginVertical: 8,
          }}
        >
          Melissa Peters
        </Text>
        <Text
          style={{
            color: COLORS.black,
            ...FONTS.body4,
          }}
        >
          Interior designer
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
            alignItems: "center",
          }}
        >
          <MaterialIcons name="location-on" size={24} color="black" />
          <Text
            style={{
              ...FONTS.body4,
              marginLeft: 4,
            }}
          >
            Lagos, Nigeria
          </Text>
        </View>

        <View
          style={{
            paddingVertical: 8,
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: SIZES.padding,
            }}
          >
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.primary,
              }}
            >
              122
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.primary,
              }}
            >
              Followers
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: SIZES.padding,
            }}
          >
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.primary,
              }}
            >
              67
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.primary,
              }}
            >
              Followings
            </Text>
          </View>

          <View
            style={{
              flexDirection: "column",
              alignItems: "center",
              marginHorizontal: SIZES.padding,
            }}
          >
            <Text
              style={{
                ...FONTS.h2,
                color: COLORS.primary,
              }}
            >
              77K
            </Text>
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.primary,
              }}
            >
              Likes
            </Text>
          </View>
        </View>

        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              width: 124,
              height: 36,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.primary,
              borderRadius: 10,
              marginHorizontal: SIZES.padding * 2,
            }}
          >
            <Text
              style={{
                ...FONTS.body4,
                color: COLORS.white,
              }}
            >
              Edit Profile
            </Text>
          </TouchableOpacity>

          
        </View>
      </View>

      <View style={{ flex: 1, marginHorizontal: 22, marginTop: 20 }}>
		<PersonalRecipeList />
		<SavedRecipeLists />
       
      </View>
    </SafeAreaView>
  );
};

export default Profile;
