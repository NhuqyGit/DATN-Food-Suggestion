import {
  Animated,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

function Ans({ props, onChange, ques }) {
  // const [isPress, setPress] = useState(false)
  const animatedPop = useRef(new Animated.Value(1)).current

  const handlePress = () => {
    handleAnimatePop()
    // onChange(index)
    // setPress(!isPress)
    const updatedAnswer = { ...props, isSelect: !props.isSelect }
    onChange(updatedAnswer, ques.id)
  }

  const handleAnimatePop = () => {
    Animated.sequence([
      Animated.timing(animatedPop, {
        toValue: 0.95,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(animatedPop, {
        toValue: 1.1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(animatedPop, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start()
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View
          style={[
            styles.circle2,
            {
              backgroundColor: props.isSelect ? '#4CAF50' : '#bdbdbd',
              transform: [{ scale: animatedPop }],
            },
          ]}
        >
          <Image
            style={{
              width: deviceWidth * 0.17,
              height: deviceWidth * 0.17,
              borderRadius: 100,
            }}
            source={{uri: props.imgUrl}}
          />
        </Animated.View>
        <Text
          style={[
            styles.cuisinesText,
            { color: props.isSelect ? '#4CAF50' : '#000000' },
          ]}
        >
          {props.name}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

export default Ans
// export default React.memo(Ans, (prevProps, nextProps)=>{
//   return(
//     prevProps.props.status === nextProps.props.status
//   )
// })

const styles = StyleSheet.create({
  cuisinesText: {
    marginTop: 5,
    fontSize: deviceHeight * 0.015,
    fontWeight: '500',
  },
  circle2: {
    alignItems: 'center',
    justifyContent: 'center',
    width: deviceWidth * 0.19,
    height: deviceWidth * 0.19,
    borderRadius: 100,
    backgroundColor: '#bdbdbd',
  },
})
