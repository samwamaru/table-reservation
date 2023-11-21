import { apiSlice } from './apiSlice';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/api/login",
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "api/logout", 
        method: 'POST',
        credentials: 'include',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: "/api/register/doctor", 
        method: 'POST',
        body: data,
        credentials: 'include'
      }),
    }),
    registerPatient: builder.mutation({
      query: (data) => ({
        url: "/api/register/patient", 
        method: 'POST',
        body: data,
        credentials: 'include'
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/api/updateuser",
        method: 'PUT',
        body: data,
      }),
    }),

    getUserProfile: builder.query({
      query: () => ({
        url: '/api/user',
        method: 'GET',
        credentials: 'include',
      }),
    }),
   
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useRegisterPatientMutation,
  useUpdateUserMutation,
  useGetUserProfileQuery,

} = userApiSlice;
