import React from 'react';
import { FaPhone, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa';

const ContactDetails = () => {
  return (
    <div className="bg-gray-100 py-8">
      <div className="flex items-center justify-between max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <FaPhone className="text-xl mr-2" />
          <span className="text-lg">0110426093</span>
        </div>
        <div className="flex items-center">
          <FaMapMarkerAlt className="text-xl mr-2" />
          <span className="text-lg">Westlands, Nairobi, Kenya</span>
        </div>
        <div className="flex items-center">
          <FaEnvelope className="text-xl mr-2" />
          <span className="text-lg">jessebett@gmail.com</span>
        </div>
      </div>
    </div>
  );
};

export default ContactDetails;
