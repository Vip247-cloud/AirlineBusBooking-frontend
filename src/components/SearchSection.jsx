import React, { useState } from 'react';
import { FaMapMarkerAlt, FaSearchLocation } from 'react-icons/fa';

const SearchSection = ({ onSearch }) => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (origin && destination) {
      onSearch(origin.trim(), destination.trim());
    }
  };

  return (
    <section id="search" className="py-20 bg-gradient-to-br from-blue-50 to-blue-100">
      <div className="max-w-xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-blue-800 mb-8 tracking-tight">
          Find Your Journey
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-xl shadow-lg space-y-4 border"
        >
          <div className="flex items-center border border-gray-300 rounded px-3 py-2 shadow-sm bg-gray-50 focus-within:ring-2 focus-within:ring-blue-200">
            <FaMapMarkerAlt className="text-blue-500 mr-2" />
            <input
              type="text"
              placeholder="Origin (e.g., DUB)"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full bg-transparent outline-none"
              required
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded px-3 py-2 shadow-sm bg-gray-50 focus-within:ring-2 focus-within:ring-blue-200">
            <FaSearchLocation className="text-blue-500 mr-2" />
            <input
              type="text"
              placeholder="Destination (e.g., LHR)"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full bg-transparent outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded hover:bg-blue-700 transition duration-200"
          >
            🔍 Search Now
          </button>
        </form>
      </div>
    </section>
  );
};

export default SearchSection;
