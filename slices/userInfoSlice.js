import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userInfoSlice = createApi({
  reducerPath: 'userInfoSlice',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://172.16.15.156:3000' }),
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: () => '/users',
    }),
  }),
});

export const { useGetUserInfoQuery } = userInfoSlice;

export default userInfoSlice;
