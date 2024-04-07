import { Provider } from 'react-redux'
import { store } from './context/store'
import Navigation from './navigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Camera, CameraType } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Button from './components/Button/Button'

export default function App() {
  const [hasPermission, setHasPermission] = useState(null)
  const [image, setImage] = useState(null)
  const [type, setType] = useState(Camera.Constants.Type.back)
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off)
  const cameraRef = useRef(null)

  useEffect(() => {
    const getPermissions = async () => {
      await MediaLibrary.requestPermissionsAsync()
      const cameraStatus = await Camera.requestCameraPermissionsAsync()
      setHasPermission(cameraStatus.status === 'granted')
    }

    getPermissions()
  }, [])

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const picture = await cameraRef.current.takePictureAsync()
        setImage(picture.uri)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image)
        alert('Image saved to library')
        setImage(null)
      } catch (error) {
        console.log(error)
      }
    }
  }

  if (!hasPermission) {
    return <Text>No access to camera</Text>
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        {image ? (
          <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
        ) : (
          <Camera
            style={styles.camera}
            type={type}
            flashMode={flash}
            ref={cameraRef}
          >
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 30,
              }}
            >
              <Button
                icon={'retweet'}
                onPress={() =>
                  setType(
                    type === CameraType.back
                      ? CameraType.front
                      : CameraType.back
                  )
                }
              />
              <Button
                color={
                  flash === Camera.Constants.FlashMode.off ? 'gray' : '#f1f1f1'
                }
                icon={'flash'}
                onPress={() =>
                  setFlash(
                    flash === Camera.Constants.FlashMode.off
                      ? Camera.Constants.FlashMode.on
                      : Camera.Constants.FlashMode.off
                  )
                }
              />
            </View>
          </Camera>
        )}

        <View>
          {image ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                padding: 16,
              }}
            >
              <Button
                title={'Retake'}
                icon={'retweet'}
                onPress={() => setImage(null)}
              />
              <Button title={'Save'} icon={'check'} onPress={saveImage} />
            </View>
          ) : (
            <Button
              title={'Take a picture'}
              onPress={takePicture}
              icon={'camera'}
            />
          )}
        </View>

        {/* <Navigation /> */}
      </Provider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
    paddingBottom: 16,
  },

  camera: {
    flex: 1,
    borderRadius: 20,
  },
})

