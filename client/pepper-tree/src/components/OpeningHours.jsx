import React from 'react';

const OpeningHours = () => {
  const containerStyle = {
    backgroundColor: '#C1CFDA',
    paddingTop: '8rem',
    paddingBottom: '8rem',
  };

  const headingStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#941C2F',
  };



  return (
    <div style={containerStyle}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 style={headingStyle}>24/7 Access to Your Health Records</h2>
      </div>
    </div>
  );
};

export default OpeningHours;
