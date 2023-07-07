import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative min-h-screen">
      <div
        className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center text-white"
        style={{
          backgroundImage: "url('images/heroImage.jpg')", // Replace 'image-url' with the URL of your desired background image
        }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Tablemate</h1>
          <p className="text-lg mb-6">Discover the best dining experience in town</p>
          <Link to = "/reservation">
     
          <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded">Reserve table</button>


          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
