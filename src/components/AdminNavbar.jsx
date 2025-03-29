import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminNavbar = () => {
  const { pathname } = useLocation();

  const isActive = (path) =>
    pathname === path ? 'text-blue-600 font-bold' : 'text-gray-700 hover:text-blue-600';

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 mb-6">
      <ul className="flex gap-6 text-lg">
        
        <li>
          <Link to="/admin" className={isActive('/admin')}>✈️ Import Flights</Link>
        </li>
        <li>
                      <Link to="/" className={isActive('/')}>
                        Home
                      </Link>
        </li>
        <li>
          <Link to="/admin/passengers" className={isActive('/admin/passengers')}>👤 Passengers</Link>
        </li>
        <li>
          <Link to="/admin/bookings" className={isActive('/admin/bookings')}>📋 Bookings</Link>
        </li>

      </ul>
    </nav>
  );
};

export default AdminNavbar;
