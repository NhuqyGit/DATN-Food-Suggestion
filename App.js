import { Provider } from 'react-redux'
import { store } from './context/store'
import Navigation from './navigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { Camera, CameraType } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Button from './components/Button/Button'
import { Entypo } from '@expo/vector-icons'

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
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: image ? 'space-between' : 'flex-end',
              padding: 20,
            }}
          >
            {image && <Button icon={'close'} onPress={() => setImage(null)} />}

            <View
              style={{
                flexDirection: 'row',
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
                childrenIcon={
                  <Entypo
                    name='flash'
                    size={24}
                    color={
                      flash === Camera.Constants.FlashMode.off
                        ? 'gray'
                        : '#f1f1f1'
                    }
                  />
                }
                onPress={() =>
                  setFlash(
                    flash === Camera.Constants.FlashMode.off
                      ? Camera.Constants.FlashMode.on
                      : Camera.Constants.FlashMode.off
                  )
                }
              />
            </View>
          </View>
        </Camera>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: !image ? 'center' : 'space-between',
            padding: 16,
          }}
        >
          {image && (
            <View>
              <Image
                source={{ uri: image }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 5,
                }}
              />
            </View>
          )}
          <View>
            <Button
              title={'Take a picture'}
              onPress={takePicture}
              icon={'camera'}
              color={'#000'}
            />
          </View>

          {image && (
            <View>
              <Button color={'#000'} icon={'check'} onPress={saveImage} />
            </View>
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
    paddingBottom: 32,
  },

  camera: {
    flex: 1,
    borderRadius: 20,
  },
})

