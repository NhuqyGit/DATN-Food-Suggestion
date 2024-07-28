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
    getRelatedDish: builder.query({
      query: (dishId) => `/dish/related/${dishId}`
    }),
    getRecommendedDish: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: '/dish/recommend2',
        params: { page, limit },
      }),
    }),
  }),
});

export const { useGetAllFoodDetailsQuery, useGetRelatedDishQuery, useGetRecommendedDishQuery } = foodDetailsSlice;

export default foodDetailsSlice;
