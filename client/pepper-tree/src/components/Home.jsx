import React from 'react';
import Navbar from './Navbar';
import Hero from './Hero';
import About from "./About"
import OpeningHours from './OpeningHours';
import MenuGallery from './MenuGallery';
import ContactDetails from './ContactDetails';
import LocationMap from './LocationMap';
import Footer from './Footer';
const Home = () => {
  return (
    <div>
 
      <Hero />
      <About/>
      <OpeningHours/>
      <MenuGallery/>
      <ContactDetails/>
      <LocationMap/>
      
     
      
    </div>
  );
};

export default Home;
