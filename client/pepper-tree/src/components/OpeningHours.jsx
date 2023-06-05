import React from 'react';

const OpeningHours = () => {
  return (
    <div className="bg-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8">Opening Hours</h2>
        <div className="grid grid-cols-2 gap-4 border border-gray-300 rounded-lg p-4">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Monday - Wednesday</h3>
              <p className="text-gray-600">12:00 PM-10:30 PM</p>
              <p className="text-gray-600">Kitchen closes at 9:00 PM</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Saturday</h3>
              <p className="text-gray-600">12:00 PM - 11:00 PM</p>
              <p className="text-gray-600">Kitchen closes at 9:30 PM</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Sunday</h3>
              <p className="text-gray-600">12:00 PM-10:30 PM</p>
              <p className="text-gray-600">Kitchen closes at 9:00 PM</p>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-2">Public Holidays</h3>
              <p className="text-gray-600">12:00 PM-10:30 PM</p>
              <p className="text-gray-600">Kitchen closes at 9:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpeningHours;
