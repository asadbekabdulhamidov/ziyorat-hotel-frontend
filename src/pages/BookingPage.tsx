import React, { useState, useMemo } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ZIYORAT_ROOMS, HOTEL } from '../data/hotelData';
import { SEO } from '../components/seo/SEO';
import { Calendar, Users, ShieldCheck, Check, Info, ArrowRight, Clock } from 'lucide-react';

const bookingSchema = z.object({
  fullName: z.string().min(3, "To'liq ism-familiyangizni kiriting"),
  phone: z.string().min(9, "To'g'ri telefon raqam kiriting"),
  email: z.string().email("To'g'ri email manzil kiriting").optional().or(z.literal('')),
  arrivalTime: z.string().optional(),
  specialRequests: z.string().optional(),
});

type BookingFormData = z.infer<typeof bookingSchema>;

export const BookingPage: React.FC = () => {
  const { t } = useTranslation();
  const { lang = 'uz' } = useParams<{ lang?: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentLang = (['uz', 'ru', 'en', 'tr'].includes(lang) ? lang : 'uz') as 'uz' | 'ru' | 'en' | 'tr';

  const initialRoomId = searchParams.get('roomId') || ZIYORAT_ROOMS[0].id;
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [selectedRoomId, setSelectedRoomId] = useState<string>(initialRoomId);
  const [checkIn, setCheckIn] = useState<string>(searchParams.get('checkIn') || today);
  const [checkOut, setCheckOut] = useState<string>(searchParams.get('checkOut') || tomorrow);
  const [guests, setGuests] = useState<number>(Number(searchParams.get('guests')) || 2);

  const selectedRoom = useMemo(() => {
    return ZIYORAT_ROOMS.find((r) => r.id === selectedRoomId) || ZIYORAT_ROOMS[0];
  }, [selectedRoomId]);

  // Calculate nights
  const nights = useMemo(() => {
    try {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diff = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
      return diff > 0 ? diff : 1;
    } catch {
      return 1;
    }
  }, [checkIn, checkOut]);

  // Total price
  const totalPrice = nights * selectedRoom.price;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingFormData) => {
    // Generate mock reservation code
    const refCode = `ZYR-${Math.floor(100000 + Math.random() * 900000)}`;
    const reservationState = {
      refCode,
      roomName: selectedRoom.name[currentLang],
      checkIn,
      checkOut,
      guests,
      nights,
      totalPrice,
      guestName: data.fullName,
      guestPhone: data.phone,
      guestEmail: data.email || '—',
      specialRequests: data.specialRequests || '—',
      createdAt: new Date().toISOString(),
    };

    // Save temporarily in sessionStorage for confirmation page display
    sessionStorage.setItem('ziyorat_last_booking', JSON.stringify(reservationState));

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    navigate(`/${lang}/booking/confirmation?ref=${refCode}`);
  };

  return (
    <div className="bg-[#F5F1E8] min-h-screen pt-28 pb-24 text-[#20251F]">
      <SEO
        title={`${t('booking.title')} — Ziyorat Hotel`}
        description={t('booking.subtitle')}
        lang={lang}
        path="/booking"
      />

      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-12">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest3 text-[#B99A65] font-sans font-semibold mb-2">
            Ziyorat Hotel Fergana
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#20251F] leading-[1.1]">
            {t('booking.title')}
          </h1>
          <p className="text-sm sm:text-base text-[#5C645B] mt-4 font-light leading-relaxed">
            {t('booking.subtitle')}
          </p>
        </div>

        {/* Frontend Demo Banner Alert */}
        <div className="mt-8 p-4 bg-[#153D2A]/10 border border-[#153D2A]/20 rounded-sm flex items-start gap-3 text-xs text-[#153D2A]">
          <Info className="w-4 h-4 text-[#B99A65] flex-shrink-0 mt-0.5" />
          <span>{t('booking.demoNotice')}</span>
        </div>
      </div>

      {/* Booking Form & Summary Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Form & Room Selection (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* 1. Date & Room Picker */}
            <div className="bg-white border border-[#B99A65]/20 rounded-sm p-7 sm:p-8 shadow-sm space-y-6">
              <h2 className="font-serif text-2xl font-normal text-[#20251F] border-b border-[#B99A65]/15 pb-4">
                1. Sanalar va Xona Toifasi
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] uppercase tracking-widest text-[#7E867C] font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#B99A65]" />
                    {t('search.checkIn')}
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-[#F5F1E8] border border-[#B99A65]/30 rounded-sm px-3.5 py-2.5 text-xs text-[#20251F] focus:outline-none focus:border-[#153D2A]"
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] uppercase tracking-widest text-[#7E867C] font-semibold flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#B99A65]" />
                    {t('search.checkOut')}
                  </label>
                  <input
                    type="date"
                    min={checkIn || today}
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-[#F5F1E8] border border-[#B99A65]/30 rounded-sm px-3.5 py-2.5 text-xs text-[#20251F] focus:outline-none focus:border-[#153D2A]"
                  />
                </div>

                <div className="space-y-1.5 text-left sm:col-span-2">
                  <label htmlFor="bookingGuestsSelect" className="text-[10px] uppercase tracking-widest text-[#7E867C] font-semibold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#B99A65]" />
                    {t('search.guests')}
                  </label>
                  <select
                    id="bookingGuestsSelect"
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full bg-[#F5F1E8] border border-[#B99A65]/30 rounded-sm px-3.5 py-2.5 text-xs text-[#20251F] focus:outline-none focus:border-[#153D2A]"
                  >
                    <option value={1}>1 mehmon</option>
                    <option value={2}>2 mehmon</option>
                    <option value={3}>3 mehmon</option>
                    <option value={4}>4+ mehmon</option>
                  </select>
                </div>
              </div>

              {/* Room Cards Selector */}
              <div className="space-y-3 pt-2">
                <label className="text-[10px] uppercase tracking-widest text-[#7E867C] font-semibold block">
                  Xona toifasini tanlang:
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ZIYORAT_ROOMS.map((r) => {
                    const isSelected = r.id === selectedRoomId;
                    return (
                      <div
                        key={r.id}
                        onClick={() => setSelectedRoomId(r.id)}
                        className={`p-3.5 rounded-sm border cursor-pointer transition-all flex items-center gap-3 ${
                          isSelected
                            ? 'bg-[#153D2A]/5 border-[#153D2A] ring-1 ring-[#153D2A]'
                            : 'bg-white border-[#B99A65]/20 hover:border-[#153D2A]'
                        }`}
                      >
                        <img
                          src={r.image}
                          alt={r.name[currentLang]}
                          className="w-14 h-14 object-cover rounded-sm flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-serif font-bold text-[#20251F] truncate">
                            {r.name[currentLang]}
                          </h4>
                          <span className="text-[11px] font-semibold text-[#153D2A] block">
                            {r.priceFormatted[currentLang]} / kecha
                          </span>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#153D2A] text-white flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 2. Guest Information Form */}
            <div className="bg-white border border-[#B99A65]/20 rounded-sm p-7 sm:p-8 shadow-sm space-y-6">
              <h2 className="font-serif text-2xl font-normal text-[#20251F] border-b border-[#B99A65]/15 pb-4">
                2. Mehmon Ma'lumotlari
              </h2>

              <form id="booking-flow-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#7E867C] font-semibold block">
                    {t('booking.fullName')} *
                  </label>
                  <input
                    type="text"
                    placeholder="Masalan: Azizbek Rahimov"
                    {...register('fullName')}
                    className="w-full bg-[#F5F1E8] border border-[#B99A65]/30 rounded-sm px-4 py-3 text-xs text-[#20251F] focus:outline-none focus:border-[#153D2A]"
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-red-600 font-medium">{errors.fullName.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#7E867C] font-semibold block">
                      {t('booking.guestPhone')} *
                    </label>
                    <input
                      type="tel"
                      placeholder="+998 90 123 45 67"
                      {...register('phone')}
                      className="w-full bg-[#F5F1E8] border border-[#B99A65]/30 rounded-sm px-4 py-3 text-xs text-[#20251F] focus:outline-none focus:border-[#153D2A]"
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-600 font-medium">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#7E867C] font-semibold block">
                      {t('booking.guestEmail')} (ixtiyoriy)
                    </label>
                    <input
                      type="email"
                      placeholder="mehmon@misol.uz"
                      {...register('email')}
                      className="w-full bg-[#F5F1E8] border border-[#B99A65]/30 rounded-sm px-4 py-3 text-xs text-[#20251F] focus:outline-none focus:border-[#153D2A]"
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-600 font-medium">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="arrivalTimeSelect" className="text-xs uppercase tracking-wider text-[#7E867C] font-semibold block">
                    {t('booking.arrivalTime')}
                  </label>
                  <select
                    id="arrivalTimeSelect"
                    {...register('arrivalTime')}
                    className="w-full bg-[#F5F1E8] border border-[#B99A65]/30 rounded-sm px-4 py-3 text-xs text-[#20251F] focus:outline-none focus:border-[#153D2A]"
                  >
                    <option value="14:00 - 16:00">14:00 - 16:00 (Standart)</option>
                    <option value="16:00 - 18:00">16:00 - 18:00</option>
                    <option value="18:00 - 22:00">18:00 - 22:00 (Kechki)</option>
                    <option value="22:00+">22:00 dan keyin (Tungi)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#7E867C] font-semibold block">
                    {t('booking.specialRequests')}
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Masalan: Tinch xona, aeroportdan transfer yoki qo'shimcha to'shak..."
                    {...register('specialRequests')}
                    className="w-full bg-[#F5F1E8] border border-[#B99A65]/30 rounded-sm px-4 py-3 text-xs text-[#20251F] focus:outline-none focus:border-[#153D2A]"
                  />
                </div>
              </form>
            </div>
          </div>

          {/* Right Column: Sticky Reservation Summary (5 cols) */}
          <div className="lg:col-span-5">
            <div className="sticky top-28 bg-white border border-[#B99A65]/30 rounded-sm p-7 sm:p-8 shadow-xl space-y-6">
              <h3 className="font-serif text-2xl font-normal text-[#20251F] border-b border-[#B99A65]/15 pb-4">
                Buyurtma Tafsilotlari
              </h3>

              {/* Selected Room Overview */}
              <div className="flex gap-4 items-center">
                <img
                  src={selectedRoom.image}
                  alt={selectedRoom.name[currentLang]}
                  className="w-20 h-20 object-cover rounded-sm border border-[#B99A65]/20"
                />
                <div>
                  <h4 className="font-serif text-lg font-normal text-[#20251F]">
                    {selectedRoom.name[currentLang]}
                  </h4>
                  <span className="text-xs text-[#7E867C] block">
                    {selectedRoom.size} • {selectedRoom.bed[currentLang]}
                  </span>
                  <span className="text-xs font-bold text-[#153D2A] mt-1 block">
                    {selectedRoom.priceFormatted[currentLang]} / kecha
                  </span>
                </div>
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-3 pt-4 border-t border-slate-100 text-xs">
                <div className="flex justify-between text-[#5C645B]">
                  <span>Kelish sanasi:</span>
                  <span className="font-semibold text-[#20251F]">{checkIn} (14:00 dan)</span>
                </div>
                <div className="flex justify-between text-[#5C645B]">
                  <span>Jo'nash sanasi:</span>
                  <span className="font-semibold text-[#20251F]">{checkOut} (12:00 gacha)</span>
                </div>
                <div className="flex justify-between text-[#5C645B]">
                  <span>Kechalar soni:</span>
                  <span className="font-semibold text-[#20251F]">{nights} kecha</span>
                </div>
                <div className="flex justify-between text-[#5C645B]">
                  <span>Nonushta (Shved stoli):</span>
                  <span className="font-semibold text-emerald-700">Bepul kiritilgan</span>
                </div>
                <div className="flex justify-between text-[#5C645B]">
                  <span>Basseyn & Spa:</span>
                  <span className="font-semibold text-emerald-700">Bepul kiritilgan</span>
                </div>

                <div className="pt-4 border-t border-[#B99A65]/20 flex justify-between items-baseline">
                  <span className="font-serif text-base font-semibold text-[#20251F]">
                    {t('booking.total')}:
                  </span>
                  <span className="font-serif text-3xl font-bold text-[#153D2A]">
                    {totalPrice.toLocaleString()} UZS
                  </span>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  form="booking-flow-form"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-[#153D2A] hover:bg-[#0F2F20] text-[#F5F1E8] text-xs font-sans uppercase tracking-widest font-bold rounded-sm transition-all flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  <span>{isSubmitting ? "Tasdiqlanmoqda..." : t('booking.submitBooking')}</span>
                  <ArrowRight className="w-4 h-4 text-[#B99A65]" />
                </button>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-[#7E867C]">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#B99A65]" />
                  <span>Kredit karta yoki oldindan to'lov talab etilmaydi</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#B99A65]" />
                  <span>To'lov mehmonxonaga kelganda (naqd yoki karta)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#B99A65]" />
                  <span>24/7 qabulxona: {HOTEL.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
