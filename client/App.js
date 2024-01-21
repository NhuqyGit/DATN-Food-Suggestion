// import Navigation from './navigation';

// export default function App() {
//   return <Navigation />;
// }

import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useState } from 'react';
import SvgPer1 from './assets/svgs/per1';
import SvgPer2 from './assets/svgs/per2';
import PerScreen from './screens/PerScreen';
import PerDone from './screens/PerDone';

const Stack = createNativeStackNavigator();

const cuisines = [
  {
    id: 1,
    name: 'Concak',
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
    question: 'What are your favorite cuisines?',
    listAns: cuisines,
    svg: SvgPer1,
  },
  {
    question: 'What are your favorite cuisidfasdfnes?',
    listAns: step2,
    svg: SvgPer2,
  },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const onNext = () => {
    setCurrentStep((prevStep) => prevStep + 1);
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'Personalize'}
          options={{
            headerShown: false,
          }}
        >
          {(props) => (
            <PerScreen
              {...props}
              step={currentStep}
              ques={ques[currentStep]}
              onNext={onNext}
            />
          )}
        </Stack.Screen>

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

