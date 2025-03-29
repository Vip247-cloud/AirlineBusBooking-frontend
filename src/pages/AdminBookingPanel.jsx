import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';

const AdminBookingPanel = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await axios.get('http://AirlineBusBooking-backend-lb-1215843260.eu-west-1.elb.amazonaws.com/api/airline/bookings/');
      setBookings(res.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this booking?')) return;
    try {
      await axios.delete(`http://AirlineBusBooking-backend-lb-1215843260.eu-west-1.elb.amazonaws.com/api/airline/bookings/${id}/`);
      fetchBookings();
    } catch (error) {
      console.error('Failed to delete booking:', error);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-8">📋 Admin – Manage Bookings</h2>

        {bookings.length === 0 ? (
          <p className="text-gray-500 italic">No bookings found.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="bg-white p-5 rounded-lg shadow-md border border-gray-200"
              >
                <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
                  <p><strong>Passenger:</strong> {booking.passenger_name || 'N/A'}</p>
                  <p><strong>Flight:</strong> {booking.flight_number || 'N/A'}</p>
                  <p><strong>Seat Number:</strong> {booking.seat_number || '—'}</p>
                  <p><strong>Status:</strong> {booking.status}</p>
                  <p><strong>Booking Date:</strong> {new Date(booking.booking_date).toLocaleString()}</p>
                </div>
                <button
                  onClick={() => handleDelete(booking.id)}
                  className="mt-4 inline-block text-red-600 hover:underline text-sm"
                >
                  🗑 Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AdminBookingPanel;
