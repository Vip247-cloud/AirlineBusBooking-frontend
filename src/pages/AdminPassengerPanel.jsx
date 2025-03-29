import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavbar from '../components/AdminNavbar';

const AdminPassengerPanel = () => {
  const [passengers, setPassengers] = useState([]);
  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });

  const fetchPassengers = async () => {
    try {
      const res = await axios.get('http://AirlineBusBooking-backend-lb-1215843260.eu-west-1.elb.amazonaws.com/api/airline/passengers/');
      setPassengers(res.data);
    } catch (err) {
      console.error('❌ Failed to fetch passengers:', err);
    }
  };

  useEffect(() => {
    fetchPassengers();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    try {
      await axios.post('http://AirlineBusBooking-backend-lb-1215843260.eu-west-1.elb.amazonaws.com/api/airline/passengers/', form);
      setForm({ first_name: '', last_name: '', email: '', phone: '' });
      fetchPassengers();
    } catch (err) {
      console.error('❌ Failed to add passenger:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this passenger?')) return;
    try {
      await axios.delete(`http://AirlineBusBooking-backend-lb-1215843260.eu-west-1.elb.amazonaws.com/api/airline/passengers/${id}/`);
      fetchPassengers();
    } catch (err) {
      console.error('❌ Failed to delete passenger:', err);
    }
  };

  return (
    <>
      <AdminNavbar />
      <div className="max-w-5xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-blue-700 mb-8">👤 Admin – Manage Passengers</h2>

        {/* Add Passenger Form */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">➕ Add New Passenger</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            {['first_name', 'last_name', 'email', 'phone'].map((field) => (
              <input
                key={field}
                name={field}
                value={form[field]}
                onChange={handleChange}
                placeholder={field.replace('_', ' ').toUpperCase()}
                className="border border-gray-300 p-2 rounded"
              />
            ))}
          </div>
          <button
            onClick={handleCreate}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add Passenger
          </button>
        </div>

        {/* Passenger List */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">👥 All Passengers</h3>
          {passengers.length === 0 ? (
            <p className="text-gray-500">No passengers found.</p>
          ) : (
            <ul className="space-y-3">
              {passengers.map((p) => (
                <li
                  key={p.id}
                  className="flex justify-between items-center border p-3 rounded bg-gray-50"
                >
                  <span className="text-sm text-gray-700">
                    {p.first_name} {p.last_name} — {p.email} — {p.phone}
                  </span>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-500 hover:underline"
                  >
                    🗑 Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminPassengerPanel;
