import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://datn-admin-be.onrender.com',
    prepareHeaders: async (headers) => {
      try {
        const token = await AsyncStorage.getItem('accessToken')
        if (token) {
          headers.set('Authorization', `Bearer ${token}`)
        }
      } catch (error) {
        console.error('Error fetching token from AsyncStorage:', error)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    updateDishToEvent: builder.mutation({
      query: ({ id, formData }) => ({
        url: `/events/add-dish-to-event/${id}`,
        method: 'PATCH',

        body: formData,
      }),
    }),
    getAllEvent: builder.query({
      query: () => `/events`,
    }),
    getAllIngredients: builder.query({
      query: () => `/ingredient`,
    }),
  }),
})

export const {
  useUpdateDishToEventMutation,
  useGetAllEventQuery,
  useGetAllIngredientsQuery,
} = eventApi

export default eventApi

