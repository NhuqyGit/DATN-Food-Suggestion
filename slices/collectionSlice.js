import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const collectionApi = createApi({
  reducerPath: 'collectionApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.1.7:3000' }),
  endpoints: (builder) => ({
    getCollections: builder.query({
      query: () => '/collections',
    }),
    getCollectionById: builder.query({
      query: (id) => `/collections/${id}`,
    }),
    getCollectionsByUserId: builder.query({
      query: (userId) => `/collections/user/${userId}`,
    }),
    createCollection: builder.mutation({
      query: (newCollection) => ({
        url: '/collections',
        method: 'POST',
        body: newCollection,
      }),
    }),
    updateCollection: builder.mutation({
      query: ({ id, ...updatedCollection }) => ({
        url: `/collections/${id}`,
        method: 'PUT',
        body: updatedCollection,
      }),
    }),
    deleteCollection: builder.mutation({
      query: (id) => ({
        url: `/collections/${id}`,
        method: 'DELETE',
      }),
    }),
    isDishInCollection: builder.query({
      query: ({ userId, dishId }) => `/collections/user/${userId}/dish/${dishId}`,
    }),
  }),
});

export const {
  useGetCollectionsQuery,
  useGetCollectionByIdQuery,
  useGetCollectionsByUserIdQuery,
  useCreateCollectionMutation,
  useUpdateCollectionMutation,
  useDeleteCollectionMutation,
  useIsDishInCollectionQuery,
} = collectionApi;

export default collectionApi;
