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
              src="/images/about.jpg"
              alt="About Us"
              className="rounded-lg w-full h-auto object-cover mx-auto"
            />
          </div>
          <div className= "mx-auto">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-4">Our Story</h3>
            <p className="mb-4 leading-relaxed text-base sm:text-lg">
  At Tophill Hospital, our cutting-edge Electronic Health Record (EHR) system empowers seamless medical care.
  Committed to enhancing medical services, our team of dedicated professionals and technology enthusiasts is redefining healthcare accessibility and efficiency. Experience our integrated EHR system for a comprehensive, efficient, and personalized healthcare journey.
</p>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
