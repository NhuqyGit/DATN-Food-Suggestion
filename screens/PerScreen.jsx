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
  TouchableHighlight,
} from 'react-native';
import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  useMemo,
} from 'react';
import Ans from '../components/Ans';
import SvgArrowLeft from '../assets/svgs/arrowLeft';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const PerScreen = ({ navigation, ques, quesLen}) => {
  const [answers, setAnswers] = useState(ques.listAns);

  useEffect(() => {
    setAnswers(ques.listAns);
  }, [ques.listAns]);

  const checkNextStatus = () => {
    return answers.every((c) => c.status === false);
  };

  const handleOnNext = () => {
    if (ques.id === quesLen - 1) {
      navigation.navigate('PersonalizeDone');
    } 
    else {
      navigation.navigate('Personalize'+(ques.id+1).toString())
    }
  };

  const handleBack = () =>{
    navigation.navigate('Personalize'+(ques.id-1).toString())
  }


  const handleAnswerChange = (updatedAnswer) => {
    const updatedAnswers = answers.map((answer) =>
      answer.id === updatedAnswer.id ? updatedAnswer : answer
    );
    setAnswers(updatedAnswers);
  };

  const listCuisines = useMemo(
    () =>
      answers.map((c) => (
        <Ans props={c} onChange={handleAnswerChange} key={c.id} />
      )),
    [answers]
  );

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
      
      <View style={{position: 'relative', width: '100%', height: deviceHeight / 3}}>
        <Image
          style={{ width: '100%', height: '100%'}}
          source={require('../assets/images/PersonalizeScreen/slice3.png')}
        />
        {ques.id > 0 ? 
          <TouchableHighlight style={styles.btnBackContain} onPress={handleBack}>
            <View style={styles.btnBack}>
              <SvgArrowLeft color="#5E5E5E"/>
            </View>
          </TouchableHighlight>
          :
          null
        }
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
  );
};

export default PerScreen;

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
  btnBack:{
    width: "100%",
    height: "100%",
    backgroundColor: "#fbfbfb",
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
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
});

