import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl: "https://table-mate-app-api.onrender.com" });

export const apiSlice = createApi({
  baseQuery,
  tagTypes:["User"],
  
  endpoints: (builder) => ({}),
});