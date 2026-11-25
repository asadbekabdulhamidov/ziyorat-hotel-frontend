import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout: React.FC = () => {
  const { pathname } = useLocation();
  // Home page renders its own footer as the last full-page section
  const isHome = /^\/[a-z]{2}\/?$/.test(pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8] text-[#20251F] font-sans">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      {!isHome && <Footer />}
    </div>
  );
};
