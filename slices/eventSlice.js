import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HOST } from '../config'

export const eventApi = createApi({
  reducerPath: 'eventApi',
  baseQuery: fetchBaseQuery({
    baseUrl: HOST,
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
      query: () => `/events/without-dishes`,
    }),
    getEventById: builder.query({
      query: (id) => `/events/${id}`,
    }),
    getMyRankingByEventId: builder.query({
      query: (id) => `/events/${id}/my-ranking`,
    }),
    getEventRankings: builder.query({
      query: (id) => `/events/${id}/top-dishes`,
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
  useGetEventByIdQuery,
  useGetMyRankingByEventIdQuery,
  useGetEventRankingsQuery,
} = eventApi

export default eventApi

