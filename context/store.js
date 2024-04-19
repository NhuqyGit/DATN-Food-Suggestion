import { configureStore } from '@reduxjs/toolkit';
import CounterReducer from '../slices/counterSlice';
import UserLoginReducer from '../slices/UserLoginSlice';

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    userLogin: UserLoginReducer,
  },
});
