import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react';
import CounterReducer from '../slices/counterSlice'
import modalReducer from '../slices/modalSlice';
import foodDetailsSlice from '../slices/foodDetailsSlice'
import userInfoSlice from '../slices/userInfoSlice';
import collectionApi from '../slices/collectionSlice'
import noteApi from '../slices/noteSlice'
import reviewApi from '../slices/reviewSlice';

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    modal: modalReducer,
    [foodDetailsSlice.reducerPath]: foodDetailsSlice.reducer,
    [userInfoSlice.reducerPath]: userInfoSlice.reducer,
    [collectionApi.reducerPath]: collectionApi.reducer,
    [noteApi.reducerPath]: noteApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(foodDetailsSlice.middleware, userInfoSlice.middleware, collectionApi.middleware, noteApi.middleware, reviewApi.middleware,),
});

setupListeners(store.dispatch);

