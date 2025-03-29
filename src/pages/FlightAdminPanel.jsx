import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';

import Footer from '../components/Footer';

const FlightAdminPanel = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [flights, setFlights] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://AirlineBusBooking-backend-lb-1215843260.eu-west-1.elb.amazonaws.com/api/airline/search/`, {
        params: { origin, destination },
      });
      setFlights(res.data?.data || []);
      setMessage('');
    } catch (err) {
      console.error(err);
      setFlights([]);
      setMessage('❌ Failed to fetch flights. Please check origin/destination.');
    }
  };

  const handleImport = async (flight) => {
    try {
      const payload = {
        flight_number: flight.flight?.iata || flight.flight?.number || 'N/A',
        origin: flight.departure?.iata,
        destination: flight.arrival?.iata,
        departure_time: flight.departure?.scheduled,
        arrival_time: flight.arrival?.scheduled,
        airline: flight.airline?.name || 'Unknown Airline',
        price: Math.floor(Math.random() * 200 + 50),
      };
      await axios.post(`http://AirlineBusBooking-backend-lb-1215843260.eu-west-1.elb.amazonaws.com/api/airline/import/`, payload);
      setMessage('✅ Flight imported successfully!');
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to import flight.');
    }
  };

  const statusColor = (status) => {
    switch (status) {
      case 'landed':
        return 'bg-green-100 text-green-700';
      case 'active':
        return 'bg-yellow-100 text-yellow-700';
      case 'cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-8">✈️ Admin – Import Flights</h2>

        {/* Admin Navigation */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => navigate('/admin/passengers')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            👤 Manage Passengers
          </button>
          <button
            onClick={() => navigate('/admin/bookings')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            📋 Manage Bookings
          </button>
        </div>

        {/* Search Inputs */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">Search Flights from Public API</h3>
          <div className="flex gap-4 flex-col sm:flex-row">
            <input
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              placeholder="Origin (e.g., DUB)"
              className="border border-gray-300 px-4 py-2 rounded w-full"
            />
            <input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              placeholder="Destination (e.g., LHR)"
              className="border border-gray-300 px-4 py-2 rounded w-full"
            />
            <button
              onClick={handleSearch}
              className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
            >
              Search
            </button>
          </div>
          {message && <p className="mt-4 text-sm text-blue-600">{message}</p>}
        </div>

        {/* Flight Results */}
        <div className="space-y-6">
          {flights.length > 0 ? (
            flights.map((flight, idx) => (
              <div
                key={idx}
                className="bg-white border border-gray-200 rounded-lg shadow-sm p-5 hover:shadow-md transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-lg font-semibold text-gray-800">
                    {flight.flight?.iata || 'Unknown'} —{' '}
                    <span className="text-sm text-gray-500">{flight.airline?.name}</span>
                  </p>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${statusColor(flight.flight_status)}`}>
                    {flight.flight_status || 'Scheduled'}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  <strong>From:</strong> {flight.departure?.iata} → <strong>To:</strong> {flight.arrival?.iata}
                </p>
                <p className="text-sm text-gray-500 mt-1">🕓 Departure: {flight.departure?.scheduled}</p>
                <p className="text-sm text-gray-500">🛬 Arrival: {flight.arrival?.scheduled}</p>
                <button
                  onClick={() => handleImport(flight)}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  Import Flight
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 italic">No flight results to display.</p>
          )}
        </div>
       
      </div>
   
    </>
    
  );
};

export default FlightAdminPanel;
