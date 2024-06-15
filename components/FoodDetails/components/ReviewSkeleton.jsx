import React from "react";
import { View, StyleSheet } from "react-native";
import { MotiView } from "moti";
const ReviewSkeleton = () => {
    return (
      <View style={{ paddingTop: 20 }}>
        <MotiView
          from={{ opacity: 1 }}
          animate={{ opacity: 0.3 }}
          transition={{ loop: true, type: "timing", duration: 1000 }}
          style={styles.imagePlaceholder}
        />
        <View style={styles.textContainer}>
          <MotiView
            from={{ opacity: 1 }}
            animate={{ opacity: 0.3 }}
            transition={{ loop: true, type: "timing", duration: 1000 }}
            style={styles.title}
          />
          <MotiView
            from={{ opacity: 1 }}
            animate={{ opacity: 0.3 }}
            transition={{ loop: true, type: "timing", duration: 1000 }}
            style={styles.subtitle}
          />
        </View>
      </View>
    );
  };

  const styles = StyleSheet.create({
    textContainer: {
        paddingHorizontal: 16,
      },
      title: {
        width: "70%",
        height: 20,
        backgroundColor: "gray",
        borderRadius: 4,
        marginBottom: 8,
      },
      subtitle: {
        width: "50%",
        height: 20,
        backgroundColor: "gray",
        borderRadius: 4,
      },
      imagePlaceholder: {
        width: "80%",
        height: 60,
        backgroundColor: "gray",
        borderRadius: 8,
        marginBottom: 16,
        paddingHorizontal: 16,
        marginLeft: 15
      },
  })
  export default ReviewSkeleton;