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

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
    gap: '1rem',
    border: '1px solid #C1CFDA',
    borderRadius: '0.5rem',
    padding: '1rem',
  };

  const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1rem',
  };

  const heading2Style = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
  };

  const textStyle = {
    color: '#03191E',
  };

  return (
    <div style={containerStyle}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 style={headingStyle}>Opening Hours</h2>
        <div style={gridStyle}>
          <div style={itemStyle}>
            <div>
              <h3 style={heading2Style}>Monday - Wednesday</h3>
              <p style={textStyle}>12:00 PM-10:30 PM</p>
              <p style={textStyle}>Kitchen closes at 9:00 PM</p>
            </div>
          </div>
          <div style={itemStyle}>
            <div>
              <h3 style={heading2Style}>Saturday</h3>
              <p style={textStyle}>12:00 PM - 11:00 PM</p>
              <p style={textStyle}>Kitchen closes at 9:30 PM</p>
            </div>
          </div>
          <div style={itemStyle}>
            <div>
              <h3 style={heading2Style}>Sunday</h3>
              <p style={textStyle}>12:00 PM-10:30 PM</p>
              <p style={textStyle}>Kitchen closes at 9:00 PM</p>
            </div>
          </div>
          <div style={itemStyle}>
            <div>
              <h3 style={heading2Style}>Public Holidays</h3>
              <p style={textStyle}>12:00 PM-10:30 PM</p>
              <p style={textStyle}>Kitchen closes at 9:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpeningHours;
