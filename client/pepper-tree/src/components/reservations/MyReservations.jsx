import React from 'react';
import { useGetMyReservationsQuery } from '../../slices/reservationApiSlice';
import { useSelector } from 'react-redux';

const MyReservations = () => {
  // Fetch reservations using the generated query hook
  const { data, isLoading } = useGetMyReservationsQuery();
  const reservations = data?.reservations; // Access the reservations array

  return (
    <div>
      {isLoading ? (
        <p>Loading reservations...</p>
      ) : (
        <div>
          <h1>My Reservations</h1>
          {reservations && reservations.length > 0 ? (
            <ul>
                {`${reservations.length} reservations` }
              {reservations.map((reservation) => (
                <li key={reservation._id}>
                  <p>Date: {reservation.date}</p>
                  <p>Time: {reservation.time}</p>
                  <p>Number of Guests: {reservation.numberOfGuests}</p>
                  <p>Special Requests: {reservation.specialRequests}</p>
                  <p>Duration: {reservation.duration}</p>
                  <p>Status: {reservation.status}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>No reservations found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MyReservations;
