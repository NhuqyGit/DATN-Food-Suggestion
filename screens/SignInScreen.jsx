import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/FontAwesome";
// import { theme } from '../theme'
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme/index";
import { COLORS } from "../theme/theme";
import { Ionicons } from "@expo/vector-icons";
import { AsyncStorageService } from "../utils/AsynStorage";

function SignInScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isHide, setIsHide] = useState(true);
  const [error, setError] = useState();

  const handleEmailChange = (email) => {
    setEmail(email);
  };

  const handlePasswordChange = (password) => {
    setError("");
    setPassword(password);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "https://datn-admin-be.onrender.com/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: email,
            password: password,
          }),
        }
      );

      const responseJson = await response.json();

      if (responseJson.error) {
        setError(responseJson.message);
        if (Array.isArray(responseJson.message)) {
          setError(responseJson.message.join("\n"));
        } else {
          setError(responseJson.message);
        }
      } else {
        await AsyncStorageService.setToken(responseJson?.accessToken);
        await AsyncStorage.setItem("user_id", responseJson?.id.toString());

        navigation.navigate("Personalization");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Sign In</Text>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Username</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your username"
            value={email}
            onChangeText={handleEmailChange}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordInput}>
            <TextInput
              style={[styles.input, styles.passwordInputLayout]}
              type="password"
              secureTextEntry={isHide}
              placeholder="Enter your password"
              value={password}
              onChangeText={handlePasswordChange}
            />
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setIsHide(!isHide)}
              style={styles.iconEye}
            >
              <Ionicons
                name={isHide ? "eye-off" : "eye"}
                size={22}
                color={COLORS.secondary}
              />
            </TouchableOpacity>
          </View>
        </View>
        {error && password && <Text className="text-red-500">{error}</Text>}
        <Text style={styles.forgotPassword}>Forgot password?</Text>
        <View style={styles.thirdPartyContainer}>
          <TouchableOpacity style={styles.thirdPartyButton}>
            <Icon name="google" size={25} color="#900" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.thirdPartyButton}>
            <Icon name="facebook" size={25} color="#900" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.thirdPartyButton}>
            <Icon name="facebook" size={25} color="#900" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
          <Text style={styles.orLogin}>Or sign up with email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogin}
          style={styles.signInButtonContainer}
        >
          <Text style={styles.signButton}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingTop: 80,
    gap: 30,
    backgroundColor: "white",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
  },

  signInButtonContainer: {
    backgroundColor: theme.colors.secondary,
    paddingVertical: 15,
    // paddingHorizontal: 40,
    // width: '100%',
    borderRadius: 10,
  },

  signButton: {
    alignSelf: "center",
    fontSize: 16,
    color: "#fff",
  },

  inputContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },

  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
  },

  label: {
    fontWeight: "500",
  },

  input: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  passwordInputLayout: {
    flex: 1,
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },

  iconEye: {
    height: "100%",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    borderLeftWidth: 0,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },

  thirdPartyContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 40,
    gap: 10,
  },

  thirdPartyButton: {
    padding: 15,
    minWidth: 60,
    borderRadius: 6,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
  },

  forgotPassword: {
    color: theme.colors.primary,
  },

  orLogin: {
    alignSelf: "center",
  },
});

export default SignInScreen;
