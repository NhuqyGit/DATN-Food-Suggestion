import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "../theme/theme";
import { MaterialIcons } from "@expo/vector-icons";

const SettingsItem = ({ item }) => {
  return (
    <TouchableOpacity
      onPress={item.action}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingLeft: 12,
      }}
    >
      <MaterialIcons name={item.icon} size={24} color={item.color} />
      <Text
        style={{
          marginLeft: 36,
          ...FONTS.semiBold,
          fontWeight: 600,
          fontSize: 16,
          color: item.color,
        }}
      >
        {item.text}
      </Text>
    </TouchableOpacity>
  );
};

const Settings = ({ navigation }) => {
  const navigateToEditProfile = () => {
    navigation.navigate("EditProfile");
  };

  const navigateToSecurity = () => {
    console.log("Security function");
  };

  const navigateToNotifications = () => {
    console.log("Notifications function");
  };

  const navigateToPrivacy = () => {
    console.log("Privacy function");
  };

  const navigateToSubscription = () => {
    console.log("Subscription function");
  };

  const navigateToSupport = () => {
    console.log("Support function");
  };

  const navigateToTermsAndPolicies = () => {
    console.log("Terms and Policies function");
  };

  const navigateToFreeSpace = () => {
    console.log("Free Space function");
  };

  const navigateToDateSaver = () => {
    console.log("Date saver");
  };

  const navigateToReportProblem = () => {
    console.log("Report a problem");
  };

  const addAccount = () => {
    console.log("Aadd account ");
  };

  const logout = () => {
    console.log("Logout");
  };

  const accountItems = [
    {
      icon: "person-outline",
      text: "Edit Profile",
      action: navigateToEditProfile,
      color: "black",
    },
    {
      icon: "security",
      text: "Security",
      action: navigateToSecurity,
      color: "black",
    },
    {
      icon: "notifications-none",
      text: "Notifications",
      action: navigateToNotifications,
      color: "black",
    },
    {
      icon: "lock-outline",
      text: "Privacy",
      action: navigateToPrivacy,
      color: "black",
    },
  ];

  const supportItems = [
    {
      icon: "credit-card",
      text: "My Subscription",
      action: navigateToSubscription,
      color: "black",
    },
    {
      icon: "help-outline",
      text: "Help & Support",
      action: navigateToSupport,
      color: "black",
    },
    {
      icon: "info-outline",
      text: "Terms and Policies",
      action: navigateToTermsAndPolicies,
      color: "black",
    },
  ];

  
  const actionsItems = [
    {
      icon: "outlined-flag",
      text: "Report a problem",
      action: navigateToReportProblem,
      color: "black",
    },
   
    { icon: "logout", text: "Log out", action: logout, color: "red" },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          backgroundColor: "orange",
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 10,
            top: 15,
          }}
        >
          <MaterialIcons name="keyboard-arrow-left" size={40} color="white" />
        </TouchableOpacity>

        <Text style={{ ...FONTS.h1, paddingVertical: 20, color: "white" }}>
          Settings
        </Text>
      </View>

      <ScrollView style={{ marginHorizontal: 12 }}>
        {/* Account Settings */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10 }}>Account</Text>
          <View
            style={{
              borderRadius: 15,
              backgroundColor: COLORS.gray,
            }}
          >
            {accountItems.map((item, index) => {
              return <SettingsItem item={item} key={index} />;
            })}
          </View>
        </View>

        {/* Support and About settings */}

        <View style={{ marginBottom: 12 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10 }}>
            Support & About{" "}
          </Text>
          <View
            style={{
              borderRadius: 15,
              backgroundColor: COLORS.gray,
            }}
          >
            {supportItems.map((item, index) => {
              return <SettingsItem item={item} key={index} />;
            })}
          </View>
        </View>

     
        {/* Actions Settings */}

        <View style={{ marginBottom: 15 }}>
          <Text style={{ ...FONTS.h4, marginVertical: 10 }}>Actions</Text>
          <View
            style={{
              borderRadius: 12,
              backgroundColor: COLORS.gray,
            }}
          >
            {actionsItems.map((item, index) => {
              return <SettingsItem item={item} key={index} />;
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
