import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const mealPlanSlice = createApi({
  reducerPath: "mealPlanSlice",
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
    addDishToMealPlan: builder.mutation({
      query: (newDish) => ({
        url: "/mealplan",
        method: "POST",
        body: newDish,
      }),
    }),
    deleteDishFromMealPlan: builder.mutation({
      query: ({ dishId, mealPlanId }) => ({
        url: "/mealplan",
        method: "DELETE",
        body: { mealPlanId, dishId },
      }),
    }),
    deleteAllDishFromMealPlan: builder.mutation({
      query: ({ dishId, mealPlanId }) => ({
        url: "/mealplan/deleteAllDish",
        method: "DELETE",
        body: { dishId, mealPlanId },
      }),
    }),
    isDishInMealPlan: builder.query({
      query: ({ mealPlanId, dishId }) =>
        `/mealplan/in-mealplan/${mealPlanId}/dish/${dishId}`,
    }),
    getMealplanIdByUserId: builder.query({
      query: ({ userId }) => `/mealplan/user/${userId}`,
    }),
  }),
});

export const {
  useIsDishInMealPlanQuery,
  useAddDishToMealPlanMutation,
  useDeleteDishFromMealPlanMutation,
  useDeleteAllDishFromMealPlanMutation,
  useGetMealplanIdByUserIdQuery,
} = mealPlanSlice;

export default mealPlanSlice;
