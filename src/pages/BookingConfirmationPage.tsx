import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HOTEL } from '../data/hotelData';
import { SEO } from '../components/seo/SEO';
import { CheckCircle2, MapPin, Phone, Home, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

interface SavedBooking {
  refCode: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  totalPrice: number;
  guestName: string;
  guestPhone: string;
  guestEmail: string;
  specialRequests: string;
}

export const BookingConfirmationPage: React.FC = () => {
  const { t } = useTranslation();
  const { lang = 'uz' } = useParams<{ lang?: string }>();
  const [searchParams] = useSearchParams();
  const refCode = searchParams.get('ref') || 'ZYR-DEMO';

  const [booking, setBooking] = useState<SavedBooking | null>(null);

  useEffect(() => {
    try {
      const data = sessionStorage.getItem('ziyorat_last_booking');
      if (data) {
        setBooking(JSON.parse(data));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  return (
    <div className="bg-[#F5F1E8] min-h-screen pt-32 pb-24 text-[#20251F]">
      <SEO
        title={`${t('booking.confirmTitle')} — Ziyorat Hotel`}
        description={t('booking.confirmDesc')}
        lang={lang}
        path="/booking/confirmation"
      />

      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-white border border-[#B99A65]/30 rounded-sm p-8 sm:p-12 shadow-xl text-center space-y-8"
        >
          {/* Success Icon */}
          <div className="w-16 h-16 rounded-full bg-[#153D2A] text-[#B99A65] mx-auto flex items-center justify-center border-2 border-[#B99A65]/40 shadow-inner">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest3 text-[#B99A65] font-semibold block">
              Ziyorat Hotel Fergana
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#20251F]">
              {t('booking.confirmTitle')}
            </h1>
            <p className="text-xs sm:text-sm text-[#5C645B] max-w-lg mx-auto font-light leading-relaxed">
              {t('booking.confirmDesc')}
            </p>
          </div>

          {/* Reference Code Box */}
          <div className="p-4 bg-[#F5F1E8] rounded-sm border border-[#B99A65]/20 inline-block px-8">
            <span className="text-[10px] uppercase tracking-widest text-[#7E867C] block font-semibold">
              Bron raqami (Reference Code)
            </span>
            <span className="font-mono text-xl sm:text-2xl font-bold text-[#153D2A] tracking-wider">
              {booking?.refCode || refCode}
            </span>
          </div>

          {/* Booking Summary Card */}
          <div className="bg-[#FAF8F5] border border-slate-200 rounded-sm p-6 text-left space-y-4 text-xs">
            <h3 className="font-serif text-lg font-normal text-[#20251F] border-b border-slate-200 pb-2">
              Bron tafsilotlari
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[#7E867C] block">Xona toifasi:</span>
                <span className="font-bold text-[#20251F]">
                  {booking?.roomName || "Ziyorat Hashamatli Xona"}
                </span>
              </div>

              <div>
                <span className="text-[#7E867C] block">Mehmon:</span>
                <span className="font-bold text-[#20251F]">
                  {booking?.guestName || "Hurmatli Mehmon"}
                </span>
              </div>

              <div>
                <span className="text-[#7E867C] block">Kelish sanasi:</span>
                <span className="font-bold text-[#20251F]">
                  {booking?.checkIn || "14:00 dan"} ({HOTEL.checkIn})
                </span>
              </div>

              <div>
                <span className="text-[#7E867C] block">Jo'nash sanasi:</span>
                <span className="font-bold text-[#20251F]">
                  {booking?.checkOut || "12:00 gacha"} ({HOTEL.checkOut})
                </span>
              </div>

              <div>
                <span className="text-[#7E867C] block">Telefon:</span>
                <span className="font-bold text-[#20251F]">
                  {booking?.guestPhone || HOTEL.phone}
                </span>
              </div>

              <div>
                <span className="text-[#7E867C] block">To'lov miqdori:</span>
                <span className="font-bold text-[#153D2A]">
                  {booking?.totalPrice ? `${booking.totalPrice.toLocaleString()} UZS` : "Joyida to'lanadi"}
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 text-[#5C645B] text-[11px] leading-relaxed">
              <p>
                <strong>To'lov sharti:</strong> Oldindan to'lov yoki karta talab etilmaydi. To'lov mehmonxonaga kelganda amalga oshiriladi.
              </p>
            </div>
          </div>

          {/* Location & Contact Notice */}
          <div className="text-xs text-[#5C645B] space-y-2">
            <p className="flex items-center justify-center gap-2">
              <MapPin className="w-4 h-4 text-[#B99A65]" />
              <span>{HOTEL.address}</span>
            </p>
            <p className="flex items-center justify-center gap-2">
              <Phone className="w-4 h-4 text-[#B99A65]" />
              <span>24/7 Qabulxona: <a href={`tel:${HOTEL.phoneRaw}`} className="font-bold text-[#153D2A]">{HOTEL.phone}</a></span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={`/${lang}`}
              className="px-7 py-3.5 bg-[#153D2A] hover:bg-[#0F2F20] text-[#F5F1E8] text-xs font-sans uppercase tracking-widest font-bold rounded-sm transition-all flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>{t('booking.backHome')}</span>
            </Link>

            <a
              href={HOTEL.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 border border-[#153D2A] text-[#153D2A] hover:bg-[#153D2A] hover:text-[#F5F1E8] text-xs font-sans uppercase tracking-widest font-semibold rounded-sm transition-all flex items-center gap-2"
            >
              <span>Xaritada ochish</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
