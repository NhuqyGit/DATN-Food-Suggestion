import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const collectionApi = createApi({
  reducerPath: "collectionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://datn-admin-be.onrender.com",
    prepareHeaders: async (headers) => {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      } catch (error) {
        console.error("Error fetching token from AsyncStorage:", error);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getCollections: builder.query({
      query: () => "/collections",
    }),
    getCollectionById: builder.query({
      query: (id) => `/collections/${id}`,
    }),
    getCollectionsByUserId: builder.query({
      query: (userId) => `/collections/user/${userId}`,
    }),
    createCollection: builder.mutation({
      query: (newCollection) => ({
        url: "/collections",
        method: "POST",
        body: newCollection,
      }),
    }),
    updateCollection: builder.mutation({
      query: ({ id, ...updatedCollection }) => ({
        url: `/collections/${id}`,
        method: "PUT",
        body: updatedCollection,
      }),
    }),
    deleteCollection: builder.mutation({
      query: (id) => ({
        url: `/collections/${id}`,
        method: "DELETE",
      }),
    }),
    isDishInCollection: builder.query({
      query: ({ userId, dishId }) =>
        `/collections/user/${userId}/dish/${dishId}`,
    }),
    isCollectionNameExists: builder.query({
      query: ({ userId, collectionName }) =>
        `/collections/exists/${userId}/${collectionName}`,
    }),
    addDishToCollections: builder.mutation({
      query: ({ userId, dishId, collectionIds }) => ({
        url: `/collections/user/${userId}/dishes/${dishId}`,
        method: "POST",
        body: { collectionIds },
      }),
    }),
    getCollectionsByDishId: builder.query({
      query: (dishId) => `collections/dish/${dishId}`,
    }),
    updateDishCollections: builder.mutation({
      query: ({ userId, dishId, collectionIds }) => ({
        url: `collections/updateDishCollections`,
        method: 'POST',
        body: { userId, dishId, collectionIds },
      }),
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
  useIsCollectionNameExistsQuery,
  useAddDishToCollectionsMutation,
  useGetCollectionsByDishIdQuery,
  useUpdateDishCollectionsMutation,
} = collectionApi;

export default collectionApi;
