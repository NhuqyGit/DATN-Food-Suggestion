import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native'
import React from 'react'
import { theme } from '../../theme'

const RecipeWithImage = ({ response }) => {
  const responseChat =
    response && (typeof response === 'object' ? response : JSON.parse(response))

  const listVideo =
    responseChat?.video?.length > 0
      ? responseChat.video.map((v, index) => (
          <View
            key={index}
            style={{ gap: 3, marginBottom: 5, alignItems: 'flex-start' }}
          >
            <Text style={{ marginRight: 5, color: 'white' }}>
              Link {index + 1}
            </Text>
            <TouchableOpacity onPress={() => handlePress(v.url)}>
              <Text style={styles.linkText}>{v.title}</Text>
            </TouchableOpacity>
          </View>
        ))
      : null
  const handlePress = (url) => {
    Linking.openURL(url)
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: responseChat?.image,
        }}
      />
      <Text style={{ color: 'white' }}>{responseChat.recipe}</Text>

      <Text
        style={{
          fontWeight: '500',
          color: 'white',
          fontSize: 15,
          alignSelf: 'flex-start',
          marginTop: 10,
        }}
      >
        Các link video hướng dẫn tham khảo:
      </Text>
      {/* {
                responseChat?.video.map((v)=>{
                    <TouchableOpacity onPress={handlePress}>
                        <Text></Text>
                        <Text style={styles.linkText}>Mở trình duyệt</Text>
                    </TouchableOpacity>
                })
            } */}
      {listVideo}
    </View>
  )
}

export default RecipeWithImage

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: theme.colors.dark,
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 10,
  },
  linkText: {
    color: '#37B7C3',
    textDecorationLine: 'underline',
  },
})
