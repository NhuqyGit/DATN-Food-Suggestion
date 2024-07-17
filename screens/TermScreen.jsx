import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Policy from "../assets/images/Spash/policy.png";

const TermScreen = () => {
  const navigation = useNavigation();
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(100)).current;
  const [acceptEnabled, setAcceptEnabled] = useState(false);

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateY, {
      toValue: 0,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, [opacity, translateY]);

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    const isScrolledToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;
    setAcceptEnabled(isScrolledToBottom);
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.animatedContainer,
          {
            opacity: opacity,
            transform: [{ translateY: translateY }],
          },
        ]}
      >
        <View style={styles.header}>
          <Image source={Policy} style={styles.image} />
          <Text style={styles.title}>Terms of Service</Text>
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        >
          <Text style={styles.text}>
            Welcome to IntelliTaste! By using our app, you agree to the
            following terms. Our app provides personalized meal suggestions
            based on your dietary preferences and requirements through AI
            technology. You are responsible for providing accurate information
            regarding your preferences and allergies and ensuring that the
            suggested meals align with your dietary restrictions. Suggestions
            are generated using available data and algorithms, and accuracy may
            vary. We prioritize your privacy; your personal data will not be
            shared with third parties without your consent. All content,
            including recipes and images, is the property of IntelliTaste or
            licensed to us and may not be reproduced or distributed without
            permission. IntelliTaste is not liable for any health issues
            resulting from the use of our meal suggestions, and we recommend
            consulting a healthcare professional before making significant
            dietary changes. We reserve the right to update these terms
            periodically, and continued use of the app indicates acceptance of
            the revised terms. We also reserve the right to suspend or terminate
            your access to the app without prior notice. Enjoy discovering new
            meals with us!
          </Text>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, { opacity: acceptEnabled ? 1 : 0.5 }]}
            onPress={() => navigation.navigate("Personalization")}
            disabled={!acceptEnabled}
          >
            <Text style={styles.buttonText}>Accept</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000B2",
  },
  animatedContainer: {
    width: "90%",
    maxWidth: 366,
    maxHeight: 512,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    alignItems: "center",
  },
  image: {
    width: 50,
    height: 50,
  },
  title: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: "bold",
    color: "#212325",
  },
  scrollView: {
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    color: "#616162",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default TermScreen;
