// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { AsyncStorage } from "react-native";

// export const foodDetailsSlice = createApi({
//   reducerPath: "foodDetailsSlice",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://10.0.2.106:3000",
//     prepareHeaders: async (headers) => {
//       // Retrieve the authorization token from AsyncStorage
//       const token = await AsyncStorage.getItem("token");
//       if (token) {
//         // If a token exists, set it in the Authorization header
//         headers.set("Authorization", `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     getAllFoodDetails: builder.query({
//       query: () => "/dish",
//     }),
//   }),
// });

// export const { useGetAllFoodDetailsQuery } = foodDetailsSlice;

// export default foodDetailsSlice;

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import AsyncStorage from "@react-native-async-storage/async-storage";

// const baseQuery = fetchBaseQuery({
//   baseUrl: 'http://10.0.2.106:3000',
//   prepareHeaders: async (headers) => {
//     // Retrieve the authorization token from AsyncStorage
//     const token = await AsyncStorage.getItem('accessToken');
//     if (token) {
//       console.log('Authorization Token:', token);
//       // If a token exists, set it in the Authorization header
//       headers.set('Authorization', `Bearer ${token}`);
//     }
//     return headers;
//   },
// });

// export const foodDetailsSlice = createApi({
//   reducerPath: 'foodDetailsSlice',
//   baseQuery,
//   endpoints: (builder) => ({
//     getAllFoodDetails: builder.query({
//       query: () => '/dish',
//     }),
//   }),
// });

// export const { useGetAllFoodDetailsQuery } = foodDetailsSlice;

// export default foodDetailsSlice;
// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
// import { selectUserInfo } from './userLoginSlice'; // Import your selector

// export const foodDetailsSlice = createApi({
//   reducerPath: 'foodDetailsSlice',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://10.0.2.106:3000',
//     prepareHeaders: (headers, { getState }) => {
//       const userInfo = selectUserInfo(getState()); // Use the selector to get userInfo
//       console.log('User in4:', userInfo);
//       const token = userInfo?.accessToken; // Assuming token is stored in userInfo
//       console.log('Authorization Token:', token);
//       if (token) {
//         console.log('Authorization Token:', token);
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     getAllFoodDetails: builder.query({
//       query: () => '/dish',
//     }),
//   }),
// });

// export const { useGetAllFoodDetailsQuery } = foodDetailsSlice;

// export default foodDetailsSlice;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const foodDetailsSlice = createApi({
  reducerPath: 'foodDetailsSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://datn-admin-be.onrender.com',
    prepareHeaders: async (headers) => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          console.log('Authorization Tok:', token);
          headers.set('Authorization', `Bearer ${token}`);
        }
      } catch (error) {
        console.error('Error fetching token from AsyncStorage:', error);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllFoodDetails: builder.query({
      query: () => '/dish',
    }),
  }),
});

export const { useGetAllFoodDetailsQuery } = foodDetailsSlice;

export default foodDetailsSlice;
