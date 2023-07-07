import React from 'react';
import { TiTick } from 'react-icons/ti';

const Success = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-white p-8 mx-auto rounded-lg shadow-lg flex items-center animate-pulse">
        <div className="text-green-500 mr-4">
          <TiTick size={32} />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Reservation Successful!</h2>
          <p className="text-lg text-center">
            Thank you for your reservation. You will receive an email shortly to confirm your booking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Success;
