import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AsyncStorage } from "react-native";

export const foodDetailsSlice = createApi({
  reducerPath: "foodDetailsSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.0.2.106:3000",
    prepareHeaders: async (headers) => {
      // Retrieve the authorization token from AsyncStorage
      const token = await AsyncStorage.getItem("token");
      if (token) {
        // If a token exists, set it in the Authorization header
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllFoodDetails: builder.query({
      query: () => "/dish",
    }),
  }),
});

export const { useGetAllFoodDetailsQuery } = foodDetailsSlice;

export default foodDetailsSlice;
