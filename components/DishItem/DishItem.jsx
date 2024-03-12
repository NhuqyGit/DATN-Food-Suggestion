import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

const DishItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{
          uri: item.image,
        }}
      />
      <Text style={styles.title}>{item.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  image: {
    width: 200, // Đảm bảo rằng ảnh chiếm toàn bộ chiều rộng của container
    height: 100, // Kích thước ảnh có thể điều chỉnh tùy thuộc vào nhu cầu của bạn
    borderRadius: 20,
    resizeMode: 'cover', // Đảm bảo ảnh sẽ bao phủ hết kích thước của khung
  },
  title: {
    position: 'absolute',
    bottom: 10, // Dịch văn bản lên trên một chút để tránh chồng lên mép dưới của ảnh
    textAlign: 'center', // Căn giữa văn bản
    color: 'white',
    fontWeight: 'bold',
    width: '100%', // Chiều rộng của văn bản tương đương với chiều rộng của ảnh
    backgroundColor: 'rgba(0,0,0,0.5)', // Đặt một lớp mờ phía dưới văn bản để làm nổi bật văn bản trước nền ảnh
    paddingVertical: 5, // Thêm một số padding để văn bản không chạm vào mép của ảnh
  },
})

export default DishItem

