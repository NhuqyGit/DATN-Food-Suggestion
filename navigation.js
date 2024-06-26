import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { useSelector } from "react-redux";

import Home from "./screens/Home/Home";
import MealPlan from "./screens/MealPlan";
import Personalization from "./screens/Personalization";
import ProfileStack from "./screens/ProfileStack";
import SearchScreen from "./screens/Search/SearchScreen/SearchScreen";
import Splash from "./components/Splash/Spash";
import FoodSuggestionScreen from "./screens/FoodSuggestionScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import SplashScreen from "./screens/SplashScreen";
import Search from "./screens/Search/Search";
import { selectUserInfo } from "./slices/userLoginSlice";
import PerDone from "./screens/PerDone";
import PerSetup from "./screens/PerSetup";
import Toast from "react-native-toast-message";
import toastConfig from "./utils/toastConfig";
import { theme } from "./theme/index";
import TermScreen from "./screens/TermScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabArr = [
  {
    route: Home,
    label: "Home",
    activeIcon: "home-sharp",
    inActiveIcon: "home-outline",
    size: 26,
  },
  {
    route: Search,
    label: "Search",
    activeIcon: "search-outline",
    inActiveIcon: "search-outline",
    size: 26,
    tabBarVisible: false,
  },
  {
    route: FoodSuggestionScreen,
    label: "Per1",
    activeIcon: "add-circle-sharp",
    inActiveIcon: "add-circle-outline",
    size: 40,
  },
  {
    route: MealPlan,
    label: "Meal Plan",
    activeIcon: "calendar-sharp",
    inActiveIcon: "calendar-outline",
    size: 26,
  },
  {
    route: ProfileStack,
    label: "Profile",
    activeIcon: "person-sharp",
    inActiveIcon: "person-outline",
    size: 26,
  },
];

const Navigation = () => {
  const userInfo = useSelector(selectUserInfo);

  return (
    <NavigationContainer>
      {!userInfo?.isLogin ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen name="TermScreen" component={TermScreen} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Personalization">
            {(props) => <Personalization {...props} />}
          </Stack.Screen>
          <Stack.Screen name="PersonalizeSetUp" component={PerSetup} />
          <Stack.Screen name="PersonalizeDone" component={PerDone} />
        </Stack.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          {TabArr.map((item, index) => (
            <Tab.Screen
              key={index.toString()}
              name={item.label}
              options={{
                tabBarShowLabel: false,
                tabBarIcon: ({ focused }) => (
                  <Ionicons
                    name={focused ? item.activeIcon : item.inActiveIcon}
                    size={item.size}
                    color={focused ? theme.colors.secondary : "#9e9e9e"}
                  />
                ),
              }}
              component={item.route}
            />
          ))}
        </Tab.Navigator>
      )}
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};

export default Navigation;
