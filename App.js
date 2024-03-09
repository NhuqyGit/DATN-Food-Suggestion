import { Provider } from 'react-redux'
import { store } from './context/store'
import Navigation from './navigation'

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}
