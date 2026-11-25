import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ZIYORAT_ROOMS, HOTEL } from '../data/hotelData';
import { SEO } from '../components/seo/SEO';
import {
  ArrowLeft,
  ArrowRight,
  Maximize2,
  Users,
  Bed,
  CheckCircle,
  Phone,
  ShieldCheck,
  Calendar,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const RoomDetailsPage: React.FC = () => {
  const { t } = useTranslation();
  const { lang = 'uz', id } = useParams<{ lang?: string; id?: string }>();
  const navigate = useNavigate();
  const currentLang = (['uz', 'ru', 'en', 'tr'].includes(lang) ? lang : 'uz') as 'uz' | 'ru' | 'en' | 'tr';

  const room = ZIYORAT_ROOMS.find((r) => r.id === id);

  // Gallery state
  const [selectedPhotoIdx, setSelectedPhotoIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Quick booking inputs
  const today = new Date().toISOString().split('T')[0];
  const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guestCount, setGuestCount] = useState(room ? Math.min(2, room.capacity) : 2);

  if (!room) {
    return (
      <div className="min-h-screen bg-[#F5F1E8] pt-36 pb-20 flex flex-col items-center justify-center text-center px-6">
        <h1 className="font-serif text-3xl text-[#20251F] mb-4">Xona topilmadi</h1>
        <p className="text-sm text-[#5C645B] mb-8">Kechirasiz, siz qidirgan xona mavjud emas yoki o'chirilgan.</p>
        <Link
          to={`/${lang}/rooms`}
          className="px-6 py-3 bg-[#153D2A] text-white text-xs uppercase tracking-widest font-semibold rounded-sm"
        >
          {t('roomDetails.back')}
        </Link>
      </div>
    );
  }

  const relatedRooms = ZIYORAT_ROOMS.filter((r) => r.id !== room.id).slice(0, 2);

  const handleStartBooking = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('roomId', room.id);
    params.set('checkIn', checkIn);
    params.set('checkOut', checkOut);
    params.set('guests', guestCount.toString());
    navigate(`/${lang}/booking?${params.toString()}`);
  };

  return (
    <div className="bg-[#F5F1E8] min-h-screen pt-28 pb-24 text-[#20251F]">
      <SEO
        title={`${room.name[currentLang]} — Ziyorat Hotel`}
        description={room.subtitle[currentLang]}
        lang={lang}
        path={`/rooms/${room.id}`}
      />

      {/* Breadcrumb / Back Link */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-8">
        <Link
          to={`/${lang}/rooms`}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-semibold text-[#153D2A] hover:text-[#B99A65] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('roomDetails.back')}</span>
        </Link>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Gallery & Details (8 cols) */}
          <div className="lg:col-span-8 space-y-10">
            {/* Gallery Component */}
            <div className="space-y-4">
              {/* Main Hero Photo */}
              <div
                onClick={() => setLightboxOpen(true)}
                className="relative h-[360px] sm:h-[480px] rounded-sm overflow-hidden bg-[#153D2A]/10 cursor-pointer group"
              >
                <img
                  src={room.gallery[selectedPhotoIdx] || room.image}
                  alt={room.name[currentLang]}
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/70 backdrop-blur-sm text-white text-[11px] rounded-sm flex items-center gap-1.5 font-sans">
                  <span>Galereyani to'liq ko'rish</span>
                </div>
              </div>

              {/* Thumbnails */}
              {room.gallery.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {room.gallery.map((photo, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedPhotoIdx(idx)}
                      className={`h-20 sm:h-24 rounded-sm overflow-hidden border-2 transition-all ${
                        selectedPhotoIdx === idx
                          ? 'border-[#B99A65] opacity-100 scale-95'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={photo}
                        alt={`Room view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Title & Headline */}
            <div className="space-y-3 border-b border-[#B99A65]/20 pb-8">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-[#153D2A] text-[#F5F1E8] text-[10px] uppercase tracking-widest font-sans font-semibold rounded-sm">
                  {room.category.toUpperCase()}
                </span>
                <span className="text-xs text-[#7E867C]">• 4 Yulduzli standart</span>
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-normal text-[#20251F]">
                {room.name[currentLang]}
              </h1>
              <p className="text-sm sm:text-base text-[#5C645B] font-light leading-relaxed">
                {room.subtitle[currentLang]}
              </p>
            </div>

            {/* Room Specifications Strip */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-white border border-[#B99A65]/20 rounded-sm text-center">
              <div>
                <Maximize2 className="w-5 h-5 mx-auto text-[#B99A65] mb-2" />
                <span className="text-[10px] text-[#7E867C] uppercase tracking-wider block">
                  {t('featuredRooms.size')}
                </span>
                <span className="font-serif text-lg font-bold text-[#153D2A]">{room.size}</span>
              </div>
              <div>
                <Users className="w-5 h-5 mx-auto text-[#B99A65] mb-2" />
                <span className="text-[10px] text-[#7E867C] uppercase tracking-wider block">
                  {t('featuredRooms.capacity')}
                </span>
                <span className="font-serif text-lg font-bold text-[#153D2A]">
                  {room.capacity} mehmon
                </span>
              </div>
              <div>
                <Bed className="w-5 h-5 mx-auto text-[#B99A65] mb-2" />
                <span className="text-[10px] text-[#7E867C] uppercase tracking-wider block">
                  {t('featuredRooms.bed')}
                </span>
                <span className="font-serif text-base sm:text-lg font-bold text-[#153D2A] truncate block px-1">
                  {room.bed[currentLang]}
                </span>
              </div>
            </div>

            {/* Full Editorial Description */}
            <div className="space-y-4">
              <h2 className="font-serif text-2xl font-normal text-[#20251F]">
                Tavsif va Xususiyatlar
              </h2>
              <p className="text-sm text-[#444C42] leading-relaxed font-light">
                {room.description[currentLang]}
              </p>
              <p className="text-sm text-[#444C42] leading-relaxed font-light">
                Ziyorat Hotelning har bir xonasi yuqori shovqin izolyatsiyasi, individual iqlim nazorati va zamonaviy ergonomik mebellar bilan jihozlangan. Mehmonxonamizda tunash sizga to'liq hordiq va tetiklik bag'ishlaydi.
              </p>
            </div>

            {/* Amenities Grid */}
            <div className="space-y-4 pt-4 border-t border-[#B99A65]/20">
              <h2 className="font-serif text-2xl font-normal text-[#20251F]">
                {t('roomDetails.amenities')}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {room.amenities[currentLang].map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 bg-white border border-[#B99A65]/15 rounded-sm text-xs text-[#20251F]"
                  >
                    <CheckCircle className="w-4 h-4 text-[#B99A65] flex-shrink-0" />
                    <span className="font-medium">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Hotel Policies Card */}
            <div className="p-6 bg-[#0F2F20] text-[#F5F1E8] rounded-sm space-y-4">
              <div className="flex items-center gap-2 text-[#B99A65]">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-xs uppercase tracking-widest font-semibold font-sans">
                  Ziyorat Hotel Kafolati
                </span>
              </div>
              <p className="text-xs text-[#DCECE1] leading-relaxed font-light">
                Barcha xonalarda har kuni bepul tozalash (housekeeping), gigiyenik vositalar to'plami va yuqori tezlikdagi optik tolali Wi-Fi taqdim etiladi.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2 border-t border-white/10 text-xs">
                <div>
                  <span className="text-[#8A9C90] block">Kirish (Check-in)</span>
                  <span className="font-bold text-[#F5F1E8]">{HOTEL.checkIn} dan boshlab</span>
                </div>
                <div>
                  <span className="text-[#8A9C90] block">Chiqish (Check-out)</span>
                  <span className="font-bold text-[#F5F1E8]">{HOTEL.checkOut} gacha</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky Reservation Box (4 cols) */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white border border-[#B99A65]/30 rounded-sm p-6 sm:p-7 shadow-lg space-y-6">
              <div>
                <span className="text-[10px] text-[#7E867C] uppercase tracking-wider block">
                  {t('featuredRooms.perNight')}
                </span>
                <span className="font-serif text-3xl font-bold text-[#153D2A]">
                  {room.priceFormatted[currentLang]}
                </span>
              </div>

              <form onSubmit={handleStartBooking} className="space-y-4">
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
                    required
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
                    required
                  />
                </div>

                <div className="space-y-1.5 text-left">
                  <label htmlFor="guestCountDetailsSelect" className="text-[10px] uppercase tracking-widest text-[#7E867C] font-semibold flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#B99A65]" />
                    {t('search.guests')}
                  </label>
                  <select
                    id="guestCountDetailsSelect"
                    value={guestCount}
                    onChange={(e) => setGuestCount(Number(e.target.value))}
                    className="w-full bg-[#F5F1E8] border border-[#B99A65]/30 rounded-sm px-3.5 py-2.5 text-xs text-[#20251F] focus:outline-none focus:border-[#153D2A]"
                  >
                    {Array.from({ length: room.capacity }, (_, i) => i + 1).map((num) => (
                      <option key={num} value={num}>
                        {num} mehmon
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#153D2A] hover:bg-[#0F2F20] text-[#F5F1E8] text-xs font-sans uppercase tracking-widest font-bold rounded-sm transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg mt-2"
                >
                  <span>{t('roomDetails.bookThis')}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B99A65]" />
                </button>
              </form>

              <div className="pt-4 border-t border-slate-100 space-y-3 text-xs text-[#7E867C]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#B99A65]" />
                  <span>Kredit karta talab etilmaydi</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#B99A65]" />
                  <span>Joyida to'lov qilish imkoniyati</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-[#B99A65]" />
                  <span>Bepul bekor qilish siyosati</span>
                </div>
              </div>

              <div className="p-4 bg-[#F5F1E8] rounded-sm text-center">
                <span className="text-[11px] text-[#5C645B] block mb-1">Savollaringiz bormi?</span>
                <a
                  href={`tel:${HOTEL.phoneRaw}`}
                  className="text-xs font-bold text-[#153D2A] hover:text-[#B99A65] inline-flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3 h-3 text-[#B99A65]" />
                  <span>{HOTEL.phone} (24/7)</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Related Rooms Section */}
        {relatedRooms.length > 0 && (
          <div className="mt-24 pt-16 border-t border-[#B99A65]/20">
            <div className="mb-10">
              <p className="text-xs uppercase tracking-widest3 text-[#B99A65] font-sans font-semibold mb-2">
                Ziyorat Hotel
              </p>
              <h2 className="font-serif text-3xl font-normal text-[#20251F]">
                {t('roomDetails.related')}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedRooms.map((rel) => (
                <div
                  key={rel.id}
                  className="bg-white border border-[#B99A65]/20 rounded-sm overflow-hidden flex flex-col sm:flex-row group shadow-sm hover:shadow-lg transition-all"
                >
                  <div className="sm:w-1/2 h-52 sm:h-auto overflow-hidden relative">
                    <img
                      src={rel.image}
                      alt={rel.name[currentLang]}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  <div className="sm:w-1/2 p-6 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="font-serif text-xl font-normal text-[#20251F] mb-1">
                        {rel.name[currentLang]}
                      </h3>
                      <p className="text-xs text-[#5C645B] line-clamp-2 font-light">
                        {rel.subtitle[currentLang]}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                      <div>
                        <span className="text-[10px] text-[#7E867C] block uppercase">
                          1 kecha
                        </span>
                        <span className="font-serif text-base font-bold text-[#153D2A]">
                          {rel.priceFormatted[currentLang]}
                        </span>
                      </div>
                      <Link
                        to={`/${lang}/rooms/${rel.id}`}
                        className="px-3 py-1.5 bg-[#153D2A] text-white text-[11px] font-semibold uppercase tracking-wider rounded-sm hover:bg-[#0F2F20] transition-colors"
                      >
                        Batafsil
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 sm:p-10"
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-6 right-6 p-2 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="max-w-5xl max-h-[85vh] relative flex flex-col items-center">
              <img
                src={room.gallery[selectedPhotoIdx] || room.image}
                alt="Room view full"
                className="max-w-full max-h-[75vh] object-contain rounded-sm"
              />

              <div className="flex items-center gap-3 mt-4">
                {room.gallery.map((photo, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedPhotoIdx(i)}
                    className={`w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                      selectedPhotoIdx === i ? 'border-[#B99A65]' : 'border-transparent opacity-50'
                    }`}
                  >
                    <img src={photo} alt="Thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
