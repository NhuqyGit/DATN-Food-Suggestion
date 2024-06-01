import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const userInfoSlice = createApi({
  reducerPath: "userInfoSlice",
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
    getUserInfo: builder.query({
      query: () => "/users",
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),
  }),
});

export const { useGetUserInfoQuery, useGetUserByIdQuery } = userInfoSlice;

export default userInfoSlice;
