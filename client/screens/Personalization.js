import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useState } from 'react';
import SvgPer1 from '../assets/svgs/Personalize/per1';
import SvgPer2 from '../assets/svgs/Personalize/per2';
import SvgPer3 from '../assets/svgs/Personalize/per3';
import SvgPer4 from '../assets/svgs/Personalize/per4';
import PerScreen from './PerScreen';
import PerDone from './PerDone';

const Stack = createNativeStackNavigator();

const cuisines = [
  {
    id: 1,
    name: '???',
    image: require('./assets/images/PersonalizeScreen/deep-dish-pizza-chicago.png'),
    status: false,
  },
  {
    id: 2,
    name: 'Việt Nam',
    image: require('./assets/images/PersonalizeScreen/deep-dish-pizza-chicago.png'),
    status: false,
  },
  {
    id: 3,
    name: 'Lorem',
    image: require('./assets/images/PersonalizeScreen/deep-dish-pizza-chicago.png'),
    status: false,
  },
  {
    id: 4,
    name: 'Lorem',
    image: require('./assets/images/PersonalizeScreen/deep-dish-pizza-chicago.png'),
    status: false,
  },
  {
    id: 5,
    name: 'Lorem',
    image: require('./assets/images/PersonalizeScreen/deep-dish-pizza-chicago.png'),
    status: false,
  },
  {
    id: 6,
    name: 'Lorem',
    image: require('./assets/images/PersonalizeScreen/deep-dish-pizza-chicago.png'),
    status: false,
  },
  {
    id: 7,
    name: 'Lorem',
    image: require('./assets/images/PersonalizeScreen/deep-dish-pizza-chicago.png'),
    status: false,
  },
  {
    id: 8,
    name: 'Lorem',
    image: require('./assets/images/PersonalizeScreen/deep-dish-pizza-chicago.png'),
    status: false,
  },
  {
    id: 9,
    name: 'Lorem',
    image: require('./assets/images/PersonalizeScreen/deep-dish-pizza-chicago.png'),
    status: false,
  },
  {
    id: 10,
    name: 'Lorem',
    image: require('./assets/images/PersonalizeScreen/deep-dish-pizza-chicago.png'),
    status: false,
  },
  {
    id: 11,
    name: 'Lorem',
    image: require('./assets/images/PersonalizeScreen/deep-dish-pizza-chicago.png'),
    status: false,
  },
  {
    id: 12,
    name: 'Lorem',
    image: require('./assets/images/PersonalizeScreen/deep-dish-pizza-chicago.png'),
    status: false,
  },
];
const step2 = [
  {
    id: 1,
    name: 'Concak',
    image: require('./assets/images/PersonalizeScreen/deep-dish-pizza-chicago.png'),
    status: false,
  },
  {
    id: 2,
    name: 'Việt Nam',
    image: require('./assets/images/PersonalizeScreen/tasty-butter-chicken-curry-dish-from-indian-cuisine-1277362334.jpg'),
    status: false,
  },
  {
    id: 3,
    name: 'Loremadf',
    image: require('./assets/images/PersonalizeScreen/tasty-butter-chicken-curry-dish-from-indian-cuisine-1277362334.jpg'),
    status: false,
  },
  {
    id: 4,
    name: 'Lorem',
    image: require('./assets/images/PersonalizeScreen/tasty-butter-chicken-curry-dish-from-indian-cuisine-1277362334.jpg'),
    status: false,
  },
  {
    id: 5,
    name: 'Lorem',
    image: require('./assets/images/PersonalizeScreen/tasty-butter-chicken-curry-dish-from-indian-cuisine-1277362334.jpg'),
    status: false,
  },
  {
    id: 6,
    name: 'Lorem',
    image: require('./assets/images/PersonalizeScreen/tasty-butter-chicken-curry-dish-from-indian-cuisine-1277362334.jpg'),
    status: false,
  },
  {
    id: 7,
    name: 'Lorem',
    image: require('./assets/images/PersonalizeScreen/tasty-butter-chicken-curry-dish-from-indian-cuisine-1277362334.jpg'),
    status: false,
  },
  {
    id: 8,
    name: 'Lorem',
    image: require('./assets/images/PersonalizeScreen/tasty-butter-chicken-curry-dish-from-indian-cuisine-1277362334.jpg'),
    status: false,
  },
  {
    id: 9,
    name: 'Lorem',
    image: require('./assets/images/PersonalizeScreen/tasty-butter-chicken-curry-dish-from-indian-cuisine-1277362334.jpg'),
    status: false,
  },
  {
    id: 10,
    name: 'Lorem',
    image: require('./assets/images/PersonalizeScreen/tasty-butter-chicken-curry-dish-from-indian-cuisine-1277362334.jpg'),
    status: false,
  },
  {
    id: 11,
    name: 'Lorem',
    image: require('./assets/images/PersonalizeScreen/tasty-butter-chicken-curry-dish-from-indian-cuisine-1277362334.jpg'),
    status: false,
  },
  {
    id: 12,
    name: 'Lorem',
    image: require('./assets/images/PersonalizeScreen/tasty-butter-chicken-curry-dish-from-indian-cuisine-1277362334.jpg'),
    status: false,
  },
];
const ques = [
  {
    id: 0,
    question: 'What are your favorite cuisines?',
    listAns: cuisines,
    svg: SvgPer1,
  },
  {
    id: 1,
    question: 'What are your favorite cuisidfasdfnes?',
    listAns: step2,
    svg: SvgPer2,
  },
  {
    id: 2,
    question: 'What are your favorite cuisidfasdfnes?',
    listAns: step2,
    svg: SvgPer3,
  },
  {
    id: 3,
    question: 'What are your favorite cuisidfasdfnes?',
    listAns: step2,
    svg: SvgPer4,
  },
];

export default function Personalization() {
  const listStackPer = ques.map((s, i) => {
    return (
      <Stack.Screen
        key={i.toString()}
        name={'Personalize' + i.toString()}
        options={{
          headerShown: false,
        }}
      >
        {(props) => <PerScreen {...props} ques={s} quesLen={ques.length} />}
      </Stack.Screen>
    );
  });
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          animation: 'none',
        }}
      >
        {listStackPer}
        <Stack.Screen
          name={'PersonalizeDone'}
          component={PerDone}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

