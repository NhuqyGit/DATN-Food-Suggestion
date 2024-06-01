import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { MotiView } from 'moti';

const { width } = Dimensions.get('window');

const SkeletonFoodDetails = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MotiView
          from={{ opacity: 1 }}
          animate={{ opacity: 0.3 }}
          transition={{ loop: true, type: 'timing', duration: 1000 }}
          style={styles.backButton}
        />
        <MotiView
          from={{ opacity: 1 }}
          animate={{ opacity: 0.3 }}
          transition={{ loop: true, type: 'timing', duration: 1000 }}
          style={styles.menuButton}
        />
      </View>
      <MotiView
        from={{ opacity: 1 }}
        animate={{ opacity: 0.3 }}
        transition={{ loop: true, type: 'timing', duration: 1000 }}
        style={styles.imagePlaceholder}
      />
      <View style={styles.textContainer}>
        <MotiView
          from={{ opacity: 1 }}
          animate={{ opacity: 0.3 }}
          transition={{ loop: true, type: 'timing', duration: 1000 }}
          style={styles.title}
        />
        <MotiView
          from={{ opacity: 1 }}
          animate={{ opacity: 0.3 }}
          transition={{ loop: true, type: 'timing', duration: 1000 }}
          style={styles.subtitle}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
  },
  menuButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#e0e0e0',
  },
  imagePlaceholder: {
    width: '100%',
    height: width * 0.5,
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    marginBottom: 16,
  },
  textContainer: {
    paddingHorizontal: 16,
  },
  title: {
    width: '70%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    marginBottom: 8,
  },
  subtitle: {
    width: '50%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
});

export default SkeletonFoodDetails;
