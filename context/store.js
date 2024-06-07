import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import CounterReducer from '../slices/counterSlice'
import modalReducer from '../slices/modalSlice'
import foodDetailsSlice from '../slices/foodDetailsSlice'
import userInfoSlice from '../slices/userInfoSlice'
import collectionApi from '../slices/collectionSlice'
import noteApi from '../slices/noteSlice'
import reviewApi from '../slices/reviewSlice'
import UserLoginReducer from '../slices/userLoginSlice'
import mealPlanSlice from '../slices/mealPlanSlice'
import reportApi from '../slices/reportSlice'
import searchSlice from '../slices/searchSlice'

export const store = configureStore({
  reducer: {
    counter: CounterReducer,
    userLogin: UserLoginReducer,
    modal: modalReducer,
    search: searchSlice,
    [foodDetailsSlice.reducerPath]: foodDetailsSlice.reducer,
    [userInfoSlice.reducerPath]: userInfoSlice.reducer,
    [collectionApi.reducerPath]: collectionApi.reducer,
    [noteApi.reducerPath]: noteApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [mealPlanSlice.reducerPath]: mealPlanSlice.reducer,
    [reportApi.reducerPath]: reportApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      foodDetailsSlice.middleware,
      userInfoSlice.middleware,
      collectionApi.middleware,
      noteApi.middleware,
      reviewApi.middleware,
      mealPlanSlice.middleware,
      reportApi.middleware
    ),
})

setupListeners(store.dispatch)

