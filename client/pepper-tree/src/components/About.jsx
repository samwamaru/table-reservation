import React from 'react';

const About = () => {

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#941C2F',
  };
  return (
    <section className="py-12 bg-gray-100">
      <div className="max-w-4xl mx-auto px-2 sm:px-6 lg:px-4">
        <h2 style={headingStyle}>About Us</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div className="flex items-center">
            <img
              src="/images/cocktail2.jpg"
              alt="About Us"
              className="rounded-lg w-full h-auto object-cover mx-auto"
            />
          </div>
          <div className= "mx-auto">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Our Story</h3>
            <p className="mb-4 leading-relaxed text-base sm:text-lg">
              Peppertree is a craft cocktail and global flavours concept that offers exciting food and drinks in a design centric environment. Inspired by culinary traditions from around the world, Peppertree uses the best of local Kenyan ingredients to create a cuisine that is unique, fresh, and indulgent.

              Our team is a pioneer group of chefs, managers, partners and investors who are intent on transforming the Nairobi dining scene. Our goal is to bring delicious food and a sense of genuine hospitality to every guest who walks through our doors. We hope to see you soon!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
