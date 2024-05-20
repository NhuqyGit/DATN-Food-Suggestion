import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const reviewApi = createApi({
  reducerPath: 'reviewApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.1.7:3000' }),
  endpoints: (builder) => ({
    getReviews: builder.query({
      query: () => '/reviews',
    }),
    getReviewsByUserId: builder.query({
      query: (userId) => `/reviews/user/${userId}`,
    }),
    createReview: builder.mutation({
      query: (newReview) => ({
        url: '/reviews',
        method: 'POST',
        body: newReview,
      }),
    }),
    updateReview: builder.mutation({
      query: ({ id, ...updatedReview}) => ({
        url: `/reviews/${id}`,
        method: 'PUT',
        body: updatedReview,
      }),
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/reviews/${id}`,
        method: 'DELETE',
      }),
    }),
    getReviewByUserIdAndDishId: builder.query({
      query: ({ userId, dishId }) => `/reviews/user/${userId}/dish/${dishId}`,
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetReviewsByUserIdQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetReviewByUserIdAndDishIdQuery,
} = reviewApi;

export default reviewApi;
