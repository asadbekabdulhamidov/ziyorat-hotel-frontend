import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HOTEL } from '../../data/hotelData';
import { Phone, Menu, X, Globe, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { lang = 'uz' } = useParams<{ lang?: string }>();

  const [scrolledByWindow, setScrolledByWindow] = useState(false);
  // On the full-page home, the window never scrolls — follow the active section instead
  const [fullpageIndex, setFullpageIndex] = useState<number | null>(null);
  const isScrolled = fullpageIndex !== null ? fullpageIndex > 0 : scrolledByWindow;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolledByWindow(window.scrollY > 40);
    };
    const handleFullpage = (e: Event) => {
      const { enabled, index } = (e as CustomEvent<{ enabled: boolean; index: number }>).detail;
      setFullpageIndex(enabled ? index : null);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('fullpage:change', handleFullpage);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('fullpage:change', handleFullpage);
    };
  }, []);

  // Sync i18n with route lang param
  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
      document.documentElement.lang = lang;
    }
  }, [lang, i18n]);

  const languages = [
    { code: 'uz', label: "O'zbekcha", short: 'UZ', flag: '🇺🇿' },
    { code: 'ru', label: 'Русский', short: 'RU', flag: '🇷🇺' },
    { code: 'en', label: 'English', short: 'EN', flag: 'GB' },
    { code: 'tr', label: 'Türkçe', short: 'TR', flag: '🇹🇷' },
  ];

  const handleLanguageChange = (newLang: string) => {
    setLangDropdownOpen(false);
    // Replace the language segment in pathname, preserving query params
    const segments = location.pathname.split('/').filter(Boolean);
    if (segments.length > 0) {
      segments[0] = newLang;
    } else {
      segments.push(newLang);
    }
    const newPath = '/' + segments.join('/') + location.search;
    navigate(newPath);
  };

  const navLinks = [
    { to: `/${lang}`, label: t('nav.home') },
    { to: `/${lang}/rooms`, label: t('nav.rooms') },
    { to: `/${lang}/experiences`, label: t('nav.experiences') },
    { to: `/${lang}/about`, label: t('nav.about') },
    { to: `/${lang}/discover`, label: t('nav.discover') },
    { to: `/${lang}/contact`, label: t('nav.contact') },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#153D2A]/95 backdrop-blur-md py-3.5 shadow-xl border-b border-[#B99A65]/20 text-[#F5F1E8]'
          : 'bg-gradient-to-b from-black/70 via-black/40 to-transparent py-5 text-white'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to={`/${lang}`} className="flex items-center gap-3 group">
          <div className="w-10 h-10 border border-[#B99A65]/70 rounded-full flex items-center justify-center text-[#B99A65] font-serif text-xl font-bold bg-[#153D2A]/40 backdrop-blur-sm group-hover:border-[#B99A65] transition-all">
            Z
          </div>
          <div className="flex flex-col text-left">
            <span className="font-serif text-xl sm:text-2xl tracking-widest text-[#F5F1E8] uppercase font-medium">
              Ziyorat Hotel
            </span>
            <div className="flex items-center gap-1.5 text-[9px] tracking-widest3 text-[#B99A65] uppercase font-sans">
              <span>★★★★</span>
              <span>•</span>
              <span>Fergana</span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`text-xs uppercase tracking-widest font-sans transition-all py-1 relative ${
                  isActive
                    ? 'text-[#B99A65] font-semibold after:content-[""] after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-[#B99A65]'
                    : 'text-[#EFE9DC] hover:text-[#B99A65]'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions: Phone, Language Switcher, Reservation CTA */}
        <div className="hidden sm:flex items-center gap-5">
          {/* Direct Phone */}
          <a
            href={`tel:${HOTEL.phoneRaw}`}
            className="flex items-center gap-1.5 text-xs text-[#EFE9DC] hover:text-[#B99A65] transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#B99A65]" />
            <span className="font-medium tracking-wide">{HOTEL.phone}</span>
          </a>

          {/* Language Switcher Dropdown */}
          <div className="relative">
            <button
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-[#B99A65]/40 text-xs font-semibold uppercase tracking-wider text-[#F5F1E8] hover:border-[#B99A65] transition-all"
              aria-label="Change language"
            >
              <Globe className="w-3.5 h-3.5 text-[#B99A65]" />
              <span>{lang.toUpperCase()}</span>
              <ChevronDown className="w-3 h-3 text-[#B99A65]" />
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  className="absolute right-0 mt-2 w-36 bg-[#0F2F20] border border-[#B99A65]/30 rounded-md shadow-2xl py-1.5 z-50 text-left"
                >
                  {languages.map((l) => (
                    <button
                      key={l.code}
                      onClick={() => handleLanguageChange(l.code)}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-[#153D2A] transition-colors ${
                        lang === l.code ? 'text-[#B99A65] font-bold bg-[#153D2A]/60' : 'text-[#EFE9DC]'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{l.flag}</span>
                        <span>{l.label}</span>
                      </span>
                      {lang === l.code && <span className="text-[10px] text-[#B99A65]">✓</span>}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Reservation CTA Button */}
          <Link
            to={`/${lang}/booking`}
            className="px-5 py-2.5 bg-[#B99A65] hover:bg-[#A4844F] text-[#0F2F20] font-sans font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md"
          >
            {t('nav.bookNow')}
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-3 lg:hidden">
          {/* Quick mobile language toggle */}
          <button
            onClick={() => handleLanguageChange(lang === 'uz' ? 'ru' : lang === 'ru' ? 'en' : lang === 'en' ? 'tr' : 'uz')}
            className="px-2 py-1 border border-[#B99A65]/40 rounded text-xs text-[#B99A65] font-bold"
          >
            {lang.toUpperCase()}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-[#F5F1E8] hover:text-[#B99A65]"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0F2F20] border-b border-[#B99A65]/30 px-6 py-6 overflow-hidden"
          >
            <nav className="flex flex-col gap-3.5">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm uppercase tracking-widest text-[#EFE9DC] hover:text-[#B99A65] py-1.5 border-b border-white/5"
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <Link
                  to={`/${lang}/booking`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 bg-[#B99A65] text-[#0F2F20] font-bold text-xs uppercase tracking-widest text-center rounded-sm"
                >
                  {t('nav.bookNow')}
                </Link>

                <div className="flex items-center justify-between pt-2 text-xs text-[#EFE9DC]/80">
                  <a href={`tel:${HOTEL.phoneRaw}`} className="flex items-center gap-1.5 text-[#B99A65]">
                    <Phone className="w-3.5 h-3.5" />
                    <span>{HOTEL.phone}</span>
                  </a>
                  <span>24/7 Qabulxona</span>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
