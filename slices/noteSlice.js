import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const noteApi = createApi({
  reducerPath: "noteApi",
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
    getNotes: builder.query({
      query: () => "/notes",
    }),
    getNoteById: builder.query({
      query: (id) => `/notes/${id}`,
    }),
    getNotesByUserId: builder.query({
      query: (userId) => `/notes/user/${userId}`,
    }),
    createNote: builder.mutation({
      query: (newNote) => ({
        url: "/notes",
        method: "POST",
        body: newNote,
      }),
    }),
    updateNote: builder.mutation({
      query: ({ id, ...updatedNote }) => ({
        url: `/notes/${id}`,
        method: "PUT",
        body: updatedNote,
      }),
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: `/notes/${id}`,
        method: "DELETE",
      }),
    }),
    getNoteByUserIdAndDishId: builder.query({
      query: ({ userId, dishId }) => `/notes/user/${userId}/dish/${dishId}`,
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetNoteByIdQuery,
  useGetNotesByUserIdQuery,
  useCreateNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
  useGetNoteByUserIdAndDishIdQuery,
} = noteApi;

export default noteApi;
