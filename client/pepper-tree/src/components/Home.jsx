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
      <Navbar />
      <Hero />
      <About/>
      <OpeningHours/>
      <MenuGallery/>
      <ContactDetails/>
      <LocationMap/>
      <Footer/>
     
      
    </div>
  );
};

export default Home;
