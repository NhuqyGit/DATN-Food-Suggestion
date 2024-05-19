import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
import * as ImagePicker from 'expo-image-picker';

const ReviewScreen = () => {
  const [rating, setRating] = useState(3);
  const [review, setReview] = useState('');
  const [imageUri, setImageUri] = useState(null);

  const handleChoosePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      //aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    // Handle the submit action
    console.log('Rating:', rating);
    console.log('Review:', review);
    console.log('Image URI:', imageUri);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Leave a Review</Text>

      <Rating
        showRating
        onFinishRating={setRating}
        style={styles.rating}
        startingValue={rating}
        imageSize={30}
      />

      <TextInput
        style={styles.input}
        placeholder="How did it turn out? Leave your feedback and share your culinary tips! (optional)"
        multiline
        numberOfLines={4}
        onChangeText={setReview}
        value={review}
      />

      <TouchableOpacity style={styles.imageUpload} onPress={handleChoosePhoto}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} />
        ) : (
          <Text style={styles.imageUploadText}>Upload Imageg</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 16,
  },
  rating: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  imageUpload: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  imageUploadText: {
    color: '#aaa',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#0288D1',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ReviewScreen;