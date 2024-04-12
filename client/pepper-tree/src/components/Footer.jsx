import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../App.css';

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-8 flex-shrink-0">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-2 hover:text-blue-500"
        >
          <FaFacebook size={24} />
        </a>
        <a
          href="https://www.twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-2 hover:text-blue-500"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white mx-2 hover:text-blue-500"
        >
          <FaInstagram size={24} />
        </a>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 text-center text-white">
        &copy; PepperTree 2024. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
