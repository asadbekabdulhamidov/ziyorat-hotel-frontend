import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './i18n';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { RoomsPage } from './pages/RoomsPage';
import { RoomDetailsPage } from './pages/RoomDetailsPage';
import { ExperiencesPage } from './pages/ExperiencesPage';
import { AboutPage } from './pages/AboutPage';
import { DiscoverPage } from './pages/DiscoverPage';
import { ContactPage } from './pages/ContactPage';
import { BookingPage } from './pages/BookingPage';
import { BookingConfirmationPage } from './pages/BookingConfirmationPage';

export const App: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          {/* Default redirect to Uzbek root */}
          <Route path="/" element={<Navigate to="/uz" replace />} />

          {/* Multilingual localized routes */}
          <Route path="/:lang" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="rooms" element={<RoomsPage />} />
            <Route path="rooms/:id" element={<RoomDetailsPage />} />
            <Route path="experiences" element={<ExperiencesPage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="discover" element={<DiscoverPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="booking" element={<BookingPage />} />
            <Route path="booking/confirmation" element={<BookingConfirmationPage />} />
          </Route>

          {/* Global Fallback Route */}
          <Route path="*" element={<Navigate to="/uz" replace />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default App;
