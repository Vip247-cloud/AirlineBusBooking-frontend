import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navItemStyle = (path) =>
    location.pathname === path
      ? 'text-blue-600 font-semibold'
      : 'text-gray-700 hover:text-blue-500';

  return (
    <nav className="bg-white shadow-sm py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-blue-600">
        ✈️ AirBus Booking
      </Link>
      <ul className="flex gap-6 text-lg">
        <li>
          <Link to="/" className={navItemStyle('/')}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/admin" className={navItemStyle('/admin')}>
            Admin Panel
          </Link>
        </li>
        <li>
          <Link to="/admin/passengers" className={navItemStyle('/admin/passengers')}>
            Passengers
          </Link>
        </li>
        <li>
          <Link to="/admin/bookings" className={navItemStyle('/admin/bookings')}>
            Bookings
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
