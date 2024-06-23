import React, { useEffect, useMemo, useState } from 'react'
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native'
import SvgArrowLeft from '../assets/svgs/arrowLeft'
import Ans from '../components/Ans'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width

function PerScreen({
  navigation,
  listQues,
  ques,
  quesLen,
  handleAnswerChange,
}) {
  const checkNextStatus = () => {
    return ques.listAns?.every((c) => c.isSelect === false)
  }

  const handleOnNext = () => {
    if (ques.id === quesLen - 1) {
      const newQues = listQues.map(({ svg, ...rest }) => ({ ...rest }))
      navigation.navigate('PersonalizeSetUp', { newQues })
    } else {
      navigation.navigate(`Personalize${(ques.id + 1).toString()}`)
    }
  }

  const handleBack = () => {
    navigation.navigate(`Personalize${(ques.id - 1).toString()}`)
  }

  // const handleAnswerChange = (updatedAnswer) => {
  //   const updatedAnswers = ques.listAns?.map((answer) =>
  //     answer.id === updatedAnswer.id ? updatedAnswer : answer,
  //   )
  //   setAnswers(updatedAnswers)
  // }

  const listCuisines = useMemo(
    () =>
      ques.listAns?.map((c) => (
        <Ans props={c} onChange={handleAnswerChange} ques={ques} key={c.id} />
      )),
    [ques.listAns]
  )

  // const handleAnswerChange = useCallback((updatedAnswer) => {
  //   const updatedAnswers = answers.map((answer) =>
  //     answer.id === updatedAnswer.id ? updatedAnswer : answer
  //   );
  //   setAnswers(updatedAnswers);
  // }, [answers]);

  // const listCuisines = answers.map((c)=>{
  //   return(
  //     <Ans props={c} onChange={handleAnswerChange} key={c.id}/>
  //   )
  // })

  return (
    // <SafeAreaView style={styles.container}>
    <View style={styles.container}>
      <View
        style={{
          position: 'relative',
          width: '100%',
          height: deviceHeight / 3,
        }}
      >
        <Image
          style={{ width: '100%', height: '100%' }}
          source={require('../assets/images/PersonalizeScreen/slice3.png')}
        />
        {ques.id > 0 ? (
          <TouchableHighlight
            style={styles.btnBackContain}
            onPress={handleBack}
          >
            <View style={styles.btnBack}>
              <SvgArrowLeft color='#5E5E5E' />
            </View>
          </TouchableHighlight>
        ) : null}
      </View>

      <View style={styles.svgCircle}>
        <ques.svg />
        <Text style={styles.textCircle}>You</Text>
      </View>

      {/* <Text style={styles.question}>What are your favorite cuisines?</Text> */}
      <Text style={styles.question}>{ques.question}</Text>

      <View style={styles.listCuisinesContainer}>{listCuisines}</View>

      <TouchableOpacity onPress={handleOnNext}>
        <View
          style={[
            styles.btn,
            checkNextStatus() ? styles.btnSkip : styles.btnNext,
          ]}
        >
          <Text
            style={[
              styles.btnText,
              { color: checkNextStatus() ? '#4CAF50' : '#ffffff' },
            ]}
          >
            {checkNextStatus() ? 'Skip' : 'Next'}
          </Text>
        </View>
      </TouchableOpacity>
      {/* </SafeAreaView> */}
    </View>
  )
}

export default PerScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  svgCircle: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateY: -48 / 2 }],
  },
  textCircle: {
    position: 'absolute',
    color: 'black',
    fontSize: deviceHeight * 0.018,
    fontWeight: '500',
    top: '50%',
    transform: [{ translateY: -((deviceHeight * 0.018) / 2 + 2) }],
  },
  question: {
    color: 'black',
    fontSize: deviceHeight * 0.024,
    fontWeight: '600',
    marginBottom: deviceHeight * 0.014,
  },
  listCuisinesContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'center',
    // gap: 10,
    rowGap: deviceHeight * 0.02,
    paddingHorizontal: deviceHeight * 0.02,
  },
  cuisinesText: {
    marginTop: 5,
    fontSize: deviceHeight * 0.015,
    fontWeight: '500',
  },
  btn: {
    width: deviceWidth * 0.3,
    height: deviceWidth * 0.09,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: deviceHeight * 0.028,
  },
  btnSkip: {
    borderColor: '#4CAF50',
    borderWidth: 1,
  },
  btnNext: {
    backgroundColor: '#4CAF50',
  },
  btnBackContain: {
    position: 'absolute',
    height: 45,
    width: 45,
    top: 35,
    left: 20,
    borderRadius: 100,
  },
  btnBack: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fbfbfb',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: deviceHeight * 0.018,
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

