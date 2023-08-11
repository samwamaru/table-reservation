import React, { useState } from 'react';
import { useGetMyReservationsQuery } from '../../slices/reservationApiSlice';
import { useSelector } from 'react-redux';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';
import { TiTick } from 'react-icons/ti';
import { RiEdit2Line } from 'react-icons/ri';



const MyReservations = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { data, isLoading } = useGetMyReservationsQuery();
  const reservations = data?.reservations;
  const [activeTab, setActiveTab] = useState('all');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const upcomingReservations = reservations?.filter(
    (reservation) => reservation.status === 'confirmed'
  );
  const pastReservations = reservations?.filter(
    (reservation) => reservation.status === 'cancelled'
  );
  const memberSince = new Date(userInfo.createdAt);
  const memberSinceString = memberSince.toLocaleString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  // Helper function to format date
  const formatDate = (date) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  // Helper function to format time
  const formatTime = (time) => {
    return new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  let displayedReservations = [];

  if (activeTab === 'all') {
    displayedReservations = reservations;
  } else if (activeTab === 'upcoming') {
    displayedReservations = upcomingReservations;
  } else if (activeTab === 'past') {
    displayedReservations = pastReservations;
  }

  // Show loading state when reservations are being fetched
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Show a message when reservations are not available
  if (!reservations || reservations.length === 0) {
    return <div>No reservations found.<span className='underline font-bold'>Make reservation now</span></div>;
  }
  const restaurantName= "pepper-tree"

  return (
    <div className="">



<section className="bg-white py-6 border-t border-b border-gray-300">
  <div className="flex items-center ml-6 pl-6">
    <div className="relative rounded-full bg-blue-500 text-white h-24 w-24 flex items-center justify-center group">
      <span className="text-2xl">{userInfo.name.charAt(0)}</span>
      <div className="absolute top-0 right-0 mt-1 mr-1 opacity-0 group-hover:opacity-100">
      
      </div>
    </div>
    <div className="ml-4 text-black">
      <h2 className="text-2xl font-bold text-black font-sans">Hi, {userInfo.name}</h2>
      <p className="text-black font-sans">
        <span className="space-x-2">Member since</span>
        {memberSinceString}
      </p>
      <div className="flex items-center space-x-1 text-gray-900 hover:text-black cursor-pointer transition-colors duration-300">
          <RiEdit2Line className="text-xl" />
          <span className="text-sm">Update My  Account</span>
        </div>
    </div>
  </div>
</section>




      <section className="p-4  bg-gray-100">
  <div className="flex flex-wrap justify-center">
    <span
      className={`${
        activeTab === 'all' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'
      } px-2 py-1 rounded-md m-1 cursor-pointer`}
      onClick={() => handleTabChange('all')}
    >
      All({reservations.length})
    </span>
    <span
      className={`${
        activeTab === 'upcoming' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'
      } px-2 py-1 rounded-md m-1 cursor-pointer`}
      onClick={() => handleTabChange('upcoming')}
    >
      Upcoming
    </span>
    <span
      className={`${
        activeTab === 'past' ? 'bg-gray-900 text-white' : 'bg-white text-gray-600'
      } px-2 py-1 rounded-md m-1 cursor-pointer`}
      onClick={() => handleTabChange('past')}
    >
      Past & Cancelled
    </span>
  </div>
</section>






<section className="p-4 bg-gray-100">
  {activeTab === 'all' && <h3 className="text-lg font-bold">All Reservations</h3>}
  {activeTab === 'upcoming' && <h3 className="text-lg font-bold">Upcoming Reservations</h3>}
  {activeTab === 'past' && <h3 className="text-lg font-bold">Past Reservations</h3>}

  <div className="flex flex-col items-center justify-center mb-4">
 

  <div className="flex flex-col items-center justify-center mb-4 px-4 sm:px-0">
  {displayedReservations.map((reservation) => (
    <div key={reservation.id} className="bg-white  rounded-lg my-2">
      <div className="p-2 mx-auto w-full sm:max-w-xl flex flex-col sm:flex-row ">
        {/* Image */}
        <img src="../images/dish2.jpg" alt="Reservation" className="my-4 sm:w-1/3 sm:mr-4 h-auto" />

        {/* Reservation Info */}
        <div className="flex flex-col justify-between">
          {/* Restaurant Name */}
          <h1>{restaurantName}</h1>

          {/* Reservation Status */}
          {reservation.status === 'confirmed' ? (
      


<div className="flex ">

  
 
 <p className='text-white bg-green-300 px-2 md:mx-2'>confirmed</p> 
</div>

        
          ) : (
            <div className="flex items-center ">
            <p className='text-white bg-red-300 px-2 md:mx-2'>canceled</p> 
            </div>

          )}

          {/* Date and Time */}
          <div>
            {formatDate(reservation.date)}, {formatTime(reservation.time)}
          </div>
        </div>
      </div>

      {activeTab === 'upcoming' && (
        <div className="mt-4 space-x-6">
          <div className="bg-white p-2 rounded">
            <div className="mr-4 flex items-center space-x-8">
              <div className="text-gray-900 cursor-pointer hover:underline flex items-center">
                <FaPencilAlt />
                <p className="ml-2">Modify my reservation</p>
              </div>
              <div className="text-gray-900 cursor-pointer hover:underline flex items-center">
                <FaTimes />
                <p className="ml-2">Cancel reservation</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  ))}
</div>



</div>



</section>








    </div>
  );
};

export default MyReservations;
