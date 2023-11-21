import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {

  const handleDivClick = ()=>{
    

  }
  return (
    <div className="relative min-h-screen">
      <div
              onClick = {handleDivClick}
        className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center text-white"
        style={{
          backgroundImage: "url('images/hos.jpg')", // Replace 'image-url' with the URL of your desired background image
  

        }}
      >
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4 ">Welcome to Tophill</h1>
          <p className="text-lg mb-6">
  Explore the future of healthcare with our cutting-edge EHR system
</p>

          <Link to = "/reservation">
     
          <button className="px-6 py-3 bg-blue-500 text-white font-semibold rounded">Book appointment</button>


          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
