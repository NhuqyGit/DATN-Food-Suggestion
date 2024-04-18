import { Entypo, MaterialIcons, Ionicons } from '@expo/vector-icons'
import { Camera, CameraType } from 'expo-camera'
import * as MediaLibrary from 'expo-media-library'
import { useEffect, useRef, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Button from '../../../components/Button/Button'

const CameraScreen = ({ navigation, route, setVisible }) => {
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
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        ref={cameraRef}
      >
        <View
          style={{
            backgroundColor: '#000',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 12,
              marginTop: 30,
            }}
          >
            {!image && (
              <Button
                onPress={() => setVisible(false)}
                childrenIcon={
                  <MaterialIcons
                    name='keyboard-arrow-left'
                    size={32}
                    color='white'
                  />
                }
              />
            )}
            {image && (
              <Button icon={'close'} size={26} onPress={() => setImage(null)} />
            )}

            <View
              style={{
                flexDirection: 'row',
              }}
            >
              <Button
                onPress={() =>
                  setType(
                    type === CameraType.back
                      ? CameraType.front
                      : CameraType.back
                  )
                }
                childrenIcon={
                  <MaterialIcons
                    name='flip-camera-ios'
                    size={24}
                    color='#fff'
                  />
                }
              />
              {flash === Camera.Constants.FlashMode.off ? (
                <Button
                  color={'#f1f1f1'}
                  childrenIcon={
                    <Ionicons name='flash-off' size={20} color='#fff' />
                  }
                  onPress={() => setFlash(Camera.Constants.FlashMode.on)}
                />
              ) : (
                <Button
                  childrenIcon={<Entypo name='flash' size={20} color='#fff' />}
                  onPress={() => setFlash(Camera.Constants.FlashMode.off)}
                />
              )}
            </View>
          </View>
        </View>
      </Camera>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: !image ? 'center' : 'space-between',
        }}
      >
        <View
          style={{
            backgroundColor: '#000',
            justifyContent: image ? 'space-between' : 'center',
            alignItems: 'center',
            flexDirection: 'row',
            padding: 10,
            paddingVertical: 20,
            marginBottom: 10,
            flex: 1,
          }}
        >
          {image && (
            <TouchableOpacity
              onPress={() => {
                setVisible(false)
                navigation.navigate('ViewImageScreen', { image })
              }}
            >
              <Image
                source={{ uri: image }}
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 5,
                }}
              />
            </TouchableOpacity>
          )}
          <View>
            <TouchableOpacity onPress={takePicture}>
              <View
                style={{
                  backgroundColor: '#fff',
                  height: 60,
                  width: 60,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 30,
                }}
              >
                <View
                  style={{
                    backgroundColor: '#000',
                    height: 50,
                    width: 50,
                    borderRadius: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <View
                    style={{
                      backgroundColor: '#fff',
                      height: 40,
                      width: 40,
                      borderRadius: 30,
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {image && (
            <View>
              <Button color={'#fff'} icon={'check'} onPress={saveImage} />
            </View>
          )}
        </View>
      </View>
    </View>
  )
}

export default CameraScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#000',
  },

  camera: {
    flex: 1,
    borderRadius: 20,
  },
})

