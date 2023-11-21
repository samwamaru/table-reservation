import { apiSlice } from './apiSlice';

export const reservationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Existing endpoints...

    createAppointment: builder.mutation({
      query: (data) => ({
        url: "/api/create/appointment",
        method: 'POST',
        body: data,
        credentials: 'include',
      }),
    }),
    createMedicalRecord: builder.mutation({
      query: (data) => ({
        url: "/api/new/medicalrecord",
        method: 'POST',  
        body: data,  
        credentials: 'include',
      }),
    }),

    getMyReservations: builder.query({
      query: () => ({
        url: "/api/my-reservations",
        method: 'GET',
        credentials: 'include',
      }),
    }),
  }),
});

export const {
  
  
useCreateMedicalRecordMutation,
  useCreateAppointmentMutation,
  useGetMyReservationsQuery,
} = reservationApiSlice;
