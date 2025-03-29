import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App';
import AdminPanel from './pages/FlightAdminPanel';
import AdminPassengerPanel from './pages/AdminPassengerPanel';
import AdminBookingPanel from './pages/AdminBookingPanel';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/admin/passengers" element={<AdminPassengerPanel />} />
        <Route path="/admin/bookings" element={<AdminBookingPanel />} />

      </Routes>
    </BrowserRouter>
  </StrictMode>
);
