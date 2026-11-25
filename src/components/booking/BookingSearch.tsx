import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Calendar, Users, Search, AlertCircle } from 'lucide-react';

interface BookingSearchProps {
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: number;
  className?: string;
}

export const BookingSearch: React.FC<BookingSearchProps> = ({
  initialCheckIn,
  initialCheckOut,
  initialGuests = 2,
  className = '',
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang = 'uz' } = useParams<{ lang?: string }>();

  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [checkIn, setCheckIn] = useState(initialCheckIn || today);
  const [checkOut, setCheckOut] = useState(initialCheckOut || tomorrow);
  const [guests, setGuests] = useState(initialGuests);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (new Date(checkOut) <= new Date(checkIn)) {
      setError(t('search.dateError'));
      return;
    }

    setError(null);
    navigate(`/${lang}/rooms?checkIn=${encodeURIComponent(checkIn)}&checkOut=${encodeURIComponent(checkOut)}&guests=${guests}`);
  };

  return (
    <div className={`bg-[#0F2F20] text-[#F5F1E8] border border-[#B99A65]/30 rounded-sm p-5 sm:p-7 shadow-2xl ${className}`}>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* Check-in */}
        <div className="space-y-1.5 text-left">
          <label className="text-[11px] uppercase tracking-widest font-sans text-[#B99A65] flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#B99A65]" />
            {t('search.checkIn')}
          </label>
          <input
            type="date"
            min={today}
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              setError(null);
            }}
            className="w-full bg-[#153D2A] border border-[#B99A65]/25 rounded px-3.5 py-2.5 text-xs text-[#F5F1E8] focus:border-[#B99A65] focus:outline-none transition-colors"
            required
          />
        </div>

        {/* Check-out */}
        <div className="space-y-1.5 text-left">
          <label className="text-[11px] uppercase tracking-widest font-sans text-[#B99A65] flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#B99A65]" />
            {t('search.checkOut')}
          </label>
          <input
            type="date"
            min={checkIn || today}
            value={checkOut}
            onChange={(e) => {
              setCheckOut(e.target.value);
              setError(null);
            }}
            className="w-full bg-[#153D2A] border border-[#B99A65]/25 rounded px-3.5 py-2.5 text-xs text-[#F5F1E8] focus:border-[#B99A65] focus:outline-none transition-colors"
            required
          />
        </div>

        {/* Number of Guests */}
        <div className="space-y-1.5 text-left">
          <label className="text-[11px] uppercase tracking-widest font-sans text-[#B99A65] flex items-center gap-1.5 font-medium">
            <Users className="w-3.5 h-3.5 text-[#B99A65]" />
            {t('search.guests')}
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="w-full bg-[#153D2A] border border-[#B99A65]/25 rounded px-3.5 py-2.5 text-xs text-[#F5F1E8] focus:border-[#B99A65] focus:outline-none transition-colors"
          >
            <option value={1} className="bg-[#153D2A]">{t('search.guestCount_1')}</option>
            <option value={2} className="bg-[#153D2A]">{t('search.guestCount_2')}</option>
            <option value={3} className="bg-[#153D2A]">{t('search.guestCount_3')}</option>
            <option value={4} className="bg-[#153D2A]">{t('search.guestCount_4')}</option>
          </select>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full h-[42px] bg-[#B99A65] hover:bg-[#A4844F] text-[#0F2F20] font-sans font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Search className="w-3.5 h-3.5" />
            <span>{t('search.findRoom')}</span>
          </button>
        </div>
      </form>

      {/* Date Validation Error Notice */}
      {error && (
        <div className="mt-3.5 p-2.5 rounded bg-red-900/40 border border-red-500/40 text-xs text-red-200 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
