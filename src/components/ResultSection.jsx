import React, { useState } from 'react';
import axios from 'axios';

const ResultSection = ({ result }) => {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    seat_number: '',
  });

  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  if (!result) return null;
  const { flights, buses } = result;

  const handleBookClick = (flight) => {
    setSelectedFlight(flight);
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const passengerRes = await axios.post('http://127.0.0.1:8000/api/airline/passengers/', formData);
      const passengerId = passengerRes.data.id;

      await axios.post('http://127.0.0.1:8000/api/airline/bookings/', {
        flight: selectedFlight.id,
        passenger: passengerId,
        seat_number: formData.seat_number,
      });

      setConfirmationMessage(`🎉 Booking confirmed for ${formData.first_name} ${formData.last_name}`);
      setShowConfirmation(true);
      setShowForm(false);
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        seat_number: '',
      });

      setTimeout(() => setShowConfirmation(false), 3000);
    } catch (err) {
      console.error(err);
      setConfirmationMessage('❌ Failed to book flight. Try again.');
      setShowConfirmation(true);
      setTimeout(() => setShowConfirmation(false), 3000);
    }
  };

  const handleBusBooking = (from, to) => {
    const url = `http://localhost:8001/book?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
    window.open(url, '_blank');
  };

  return (
    <section id="results" className="max-w-7xl mx-auto px-4 py-16">
      <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-12">Available Transport Options</h2>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Flights */}
        <div>
          <h3 className="text-2xl font-semibold text-blue-600 mb-6">✈️ Flights</h3>
          {flights?.length > 0 ? (
            <ul className="space-y-6">
              {flights.map((flight, index) => (
                <li key={index} className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition">
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-lg font-semibold">
                      {flight.flight_number} — {flight.airline || 'Airline'}
                    </p>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full uppercase">
                      {flight.status || 'Scheduled'}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-1">
                    <strong>From:</strong> {flight.origin} → <strong>To:</strong> {flight.destination}
                  </p>
                  <p className="text-sm text-gray-500">⏱ Departure: {flight.departure_time}</p>
                  <p className="text-sm text-gray-500">🛬 Arrival: {flight.arrival_time}</p>
                  <p className="text-blue-600 font-bold mt-2">💶 {flight.price}</p>
                  <button
                    onClick={() => handleBookClick(flight)}
                    className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Book Flight
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No flights found.</p>
          )}
        </div>

        {/* Buses */}
        <div>
          <h3 className="text-2xl font-semibold text-blue-600 mb-6">🚌 Buses</h3>
          {buses?.length > 0 ? (
            <ul className="space-y-6">
              {buses.map((bus, index) => (
                <li key={index} className="bg-white p-6 rounded-xl shadow-md border hover:shadow-lg transition">
                  <p className="text-lg font-medium">{bus.from_city} → {bus.to_city}</p>
                  <p className="text-sm text-gray-500">🕒 Duration: {bus.duration}</p>
                  <p className="text-sm text-gray-500">🚌 Mode: {bus.mode}</p>
                  <p className="text-green-600 font-bold mt-2">💶 {bus.price}</p>
                  <button
                    onClick={() => handleBusBooking(bus.from_city, bus.to_city)}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Book Bus
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No buses found.</p>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {showForm && selectedFlight && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg">
            <h3 className="text-xl font-bold text-blue-700 mb-4">Book Flight: {selectedFlight.flight_number}</h3>
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <input
                name="first_name"
                type="text"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleFormChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                name="last_name"
                type="text"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleFormChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleFormChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                name="phone"
                type="text"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleFormChange}
                className="w-full border px-3 py-2 rounded"
                required
              />
              <input
                name="seat_number"
                type="text"
                placeholder="Seat Number"
                value={formData.seat_number}
                onChange={handleFormChange}
                className="w-full border px-3 py-2 rounded"
                required
              />

              <div className="flex justify-between items-center">
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Confirm Booking
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="text-gray-600 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast */}
      {showConfirmation && (
        <div className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg z-50 animate-fade-in-up">
          {confirmationMessage}
        </div>
      )}
    </section>
  );
};

export default ResultSection;
