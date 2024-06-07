import { Provider } from 'react-redux'
import { store } from './context/store'
import Navigation from './navigation'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import 'react-native-reanimated'
import 'react-native-gesture-handler'
import { usePushNotification } from './notification.service'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  const {expoPushToken, notification} = usePushNotification()
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <Navigation />
      </Provider>
    </GestureHandlerRootView>
  )
}

