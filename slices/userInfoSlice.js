import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userInfoSlice = createApi({
  reducerPath: 'userInfoSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://10.0.2.106:3000' }),
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => '/users',
    }),
    getUserById: builder.query({
      query: (id) => `/users/${id}`,
    }),
  }),
});

export const { useGetUserInfoQuery, useGetUserByIdQuery } = userInfoSlice;

export default userInfoSlice;
