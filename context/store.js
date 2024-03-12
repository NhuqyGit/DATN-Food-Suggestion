import { configureStore } from '@reduxjs/toolkit'
import CounterReducer from '../slices/counterSlice'

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
  },
})
