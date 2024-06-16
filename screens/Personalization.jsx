import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SvgPer1 from "../assets/svgs/Personalize/per1";
import SvgPer2 from "../assets/svgs/Personalize/per2";
import SvgPer3 from "../assets/svgs/Personalize/per3";
import SvgPer4 from "../assets/svgs/Personalize/per4";
import PerDone from "./PerDone";
import PerScreen from "./PerScreen";
import { AsyncStorageService } from "../utils/AsynStorage";
import { useEffect, useState } from "react";
import { HOST } from "../config";

const Stack = createNativeStackNavigator();

export default function Personalization({ setIsDone }) {
  const [diets, setDiets] = useState(null)
  const [allergies, setAllergies] = useState(null)
  const [cuisines, setCuisines] = useState(null)

  const [ques, setQues] = useState([
    {
      id: 0,
      question: "Tell us your favourite cuisines",
      listAns: null,
      svg: SvgPer1,
    },
    {
      id: 1,
      question: "Are you allergic to anything?",
      listAns: null,
      svg: SvgPer2,
    },
    {
      id: 2,
      question: "Are you following any specific diet?",
      listAns: null,
      svg: SvgPer3,
    },
    // {
    //   id: 3,
    //   question: "What are your favorite cuisidfasdfnes?",
    //   listAns: step2,
    //   svg: SvgPer4,
    // },
  ]);


  const handleFetchDiets = async () => {
    const token = await AsyncStorageService.getAccessToken();
    // const userId = await AsyncStorageService.getUserId();
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    try{
        const response = await fetch(`${HOST}/diets`, {headers})
        const data = await response.json();
        if (data.length > 0){
            const refactorData = data.map((m) => {
                const { id, name, imgUrl } = m;
                return {id, name: name, imgUrl, isSelect: false}
            })
            // ques[0].listAns = refactorData
            setQues((prevQues) => {
              const updatedQues = [...prevQues];
              updatedQues[1].listAns = refactorData;
              return updatedQues;
            });
            // setDiets(refactorData)
        }
    }catch (error) {
        console.error('Error fetching data record diet:', error);
    }
  }
  
  const handleFetchAllergies = async () => {
    const token = await AsyncStorageService.getAccessToken();
    // const userId = await AsyncStorageService.getUserId();
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    try{
        const response = await fetch(`${HOST}/allergies`, {headers})
        const data = await response.json();
        // console.log("data: ",data)
        if (data.length > 0){
            const refactorData = data.map((m) => {
                const { id, allergiesName, imgUrl } = m;
                return {id, name: allergiesName, imgUrl, isSelect: false}
            })
            // ques[1].listAns = refactorData
            setQues((prevQues) => {
              const updatedQues = [...prevQues];
              updatedQues[2].listAns = refactorData;
              return updatedQues;
            });
            // setAllergies(refactorData)
        }
    }catch (error) {
        console.error('Error fetching data record allergies:', error);
    }
  }

  const handleFetchCuisines = async () => {
    const token = await AsyncStorageService.getAccessToken();
    // const userId = await AsyncStorageService.getUserId();
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    try{
        const response = await fetch(`${HOST}/cuisines`, {headers})
        const data = await response.json();
        // console.log("data: ",data)
        if (data.length > 0){
            const refactorData = data.map((m) => {
                const { id, name, imgUrl } = m;
                return {id, name: name, imgUrl, isSelect: false}
            })
            // ques[1].listAns = refactorData
            setQues((prevQues) => {
              const updatedQues = [...prevQues];
              updatedQues[0].listAns = refactorData;
              return updatedQues;
            });
            // setAllergies(refactorData)
        }
    }catch (error) {
        console.error('Error fetching data record allergies:', error);
    }
  }

  const handleAnswerChange = (updatedAnswer, quesId) => {
    setQues(prevQues =>
      prevQues.map(q =>
        q.id === quesId
          ? {
              ...q,
              listAns: q.listAns.map(ans =>
                ans.id === updatedAnswer.id ? updatedAnswer : ans
              )
            }
          : q
      )
    );
    
  }

  // console.log(ques[0].listAns)
  useEffect(()=>{
    handleFetchDiets()
    handleFetchAllergies()
    handleFetchCuisines()
  }, [])

  const listStackPer = ques.map((s, i) => {
    return (
      <Stack.Screen
        key={i.toString()}
        name={`Personalize${i.toString()}`}
        options={{
          headerShown: false,
        }}
      >
        {(props) => <PerScreen {...props} listQues={ques} ques={s} quesLen={ques.length} handleAnswerChange={handleAnswerChange}/>}
      </Stack.Screen>
    );
  });
  return (
    <Stack.Navigator
      screenOptions={{
        animation: "none",
      }}
    >
      {listStackPer}
      <Stack.Screen
        name="PersonalizeDone"
        options={{
          headerShown: false,
        }}
      >
        {(props) => <PerDone {...props} setIsDone={setIsDone} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
