import { apiSlice } from './apiSlice';

export const reservationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Existing endpoints...

    createReservation: builder.mutation({
      query: (data) => ({
        url: "/api/reservations",
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
  
  

  useCreateReservationMutation,
  useGetMyReservationsQuery,
} = reservationApiSlice;
