import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const reportReviewApi = createApi({
  reducerPath: 'reportReviewApi',
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
    createReportReview: builder.mutation({
      query: (newReport) => ({
        url: '/report-reviews',
        method: 'POST',
        body: newReport,
      }),
    }),
    // getReportByUserIdAndDishId: builder.query({
    //   query: ({ userId, dishId }) => `/reports/user/${userId}/dish/${dishId}`,
    // }),
  }),
})

export const { useCreateReportReviewMutation } = reportReviewApi

export default reportReviewApi

