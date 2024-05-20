import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const foodDetailsSlice = createApi({
  reducerPath: 'foodDetailsSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.1.7:3000' }),
  endpoints: (builder) => ({
    getAllFoodDetails: builder.query({
      query: () => '/dish',
    }),
  }),
});

export const { useGetAllFoodDetailsQuery } = foodDetailsSlice;

export default foodDetailsSlice;
