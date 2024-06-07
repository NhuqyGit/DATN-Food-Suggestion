import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const reportApi = createApi({
  reducerPath: "reportApi",
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
    createReport: builder.mutation({
      query: (newReport) => ({
        url: "/reports",
        method: "POST",
        body: newReport,
      }),
    }),
    getReportByUserIdAndDishId: builder.query({
      query: ({ userId, dishId }) => `/reports/user/${userId}/dish/${dishId}`,
    }),
  }),
});

export const {
  useCreateReportMutation,
  useGetReportByUserIdAndDishIdQuery,
} = reportApi;

export default reportApi;
