import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-blue-700 text-white mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm">&copy; {new Date().getFullYear()} TravelMate. All rights reserved.</p>
        <div className="flex space-x-4">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#search" className="hover:underline">Search</a>
          <a href="/admin" className="hover:underline">Admin</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
