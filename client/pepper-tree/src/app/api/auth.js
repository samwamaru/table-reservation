// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const authApi = createApi({
//   reducerPath: 'authApi',
//   baseQuery: fetchBaseQuery({
//     baseUrl: 'http://localhost:8080',
//     credentials: "include",
//     prepareHeaders: (headers, {getState}) => {
//       const token = getState().auth.token
//       if (token) {
//         headers.set("Authorization", token)
//       }
//       return headers
//     }
//   }),
//   endpoints: (builder) => ({
//     register: builder.mutation({
//       query: (user) => ({
//         url: '/api/register',
//         method: 'POST',
//         body: user,
//       }),
//     }),
//     login: builder.mutation({
//       query: ({ identifier, password }) => ({
//         url: '/api/login',
//         method: 'POST',
//         body: { identifier, password },
//       }),
//     }),
//     // createReservation: builder.mutation({
//     //   query: (reservation) => ({
//     //     url: '/api/reservations',
//     //     method: 'POST',
//     //     body: reservation,
//     //   }),
//     // }),
//   }),
// });

// export const { useRegisterMutation, useLoginMutation} = authApi;




import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', token);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: ({ identifier, password }) => ({
        url: '/api/login',
        method: 'POST',
        body: { identifier, password },
      }),
    }),
    // createReservation: builder.mutation({
    //   query: (reservation) => ({
    //     url: '/api/reservations',
    //     method: 'POST',
    //     body: reservation,
    //   }),
    // }),
  }),
});

export const registerApi = createApi({
  reducerPath: 'registerApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080',

  }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (user) => ({
        url: '/api/register',
        method: 'POST',
        body: user,
      }),
    }),
  }),
});

export const { useLoginMutation } = authApi;
export const { useRegisterMutation } = registerApi;

