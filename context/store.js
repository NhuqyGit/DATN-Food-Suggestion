import { configureStore } from '@reduxjs/toolkit'
import CounterReducer from '../slices/counterSlice'
import modalReducer from '../slices/modalSlice';
export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    modal: modalReducer,
  },
})
