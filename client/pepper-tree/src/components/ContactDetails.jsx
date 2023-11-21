import React from 'react';
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const ContactDetails = () => {
  return (
    <div className="bg-gray-100 py-8">
      <div className="flex flex-col items-center md:flex-row justify-between max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center mb-4 md:mb-0">
          <FaPhone className="text-xl mr-2" />
          <span className="text-lg">0110426093</span>
        </div>
        <div className="flex items-center mb-4 md:mb-0">
          <FaMapMarkerAlt className="text-xl mr-2" />
          <span className="text-lg">Westlands, Nairobi, Kenya</span>
        </div>
        <div className="flex items-center">
          <FaEnvelope className="text-xl mr-2" />
          <span className="text-lg break-all">jessebett@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
