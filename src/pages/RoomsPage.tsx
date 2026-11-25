import React, { useState, useMemo } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ZIYORAT_ROOMS } from '../data/hotelData';
import type { Room } from '../data/hotelData';
import { SEO } from '../components/seo/SEO';
import { ArrowRight, Users, Maximize2, Bed, Check, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';

export const RoomsPage: React.FC = () => {
  const { t } = useTranslation();
  const { lang = 'uz' } = useParams<{ lang?: string }>();
  const [searchParams] = useSearchParams();
  const currentLang = (['uz', 'ru', 'en', 'tr'].includes(lang) ? lang : 'uz') as 'uz' | 'ru' | 'en' | 'tr';

  const initialGuests = Number(searchParams.get('guests')) || 0;
  const checkIn = searchParams.get('checkIn') || '';
  const checkOut = searchParams.get('checkOut') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [guestFilter, setGuestFilter] = useState<number>(initialGuests);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc' | 'default'>('default');

  const filteredRooms = useMemo(() => {
    let result = [...ZIYORAT_ROOMS];

    // Category filter
    if (selectedCategory !== 'all') {
      result = result.filter((room) => room.category === selectedCategory);
    }

    // Guest filter
    if (guestFilter > 0) {
      result = result.filter((room) => room.capacity >= guestFilter);
    }

    // Sort order
    if (sortOrder === 'asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [selectedCategory, guestFilter, sortOrder]);

  const categories = [
    { key: 'all', label: t('roomsPage.all') },
    { key: 'deluxe', label: t('roomsPage.deluxe') },
    { key: 'suite', label: t('roomsPage.suite') },
    { key: 'family', label: t('roomsPage.family') },
  ];

  const getBookingUrl = (room: Room) => {
    const params = new URLSearchParams();
    params.set('roomId', room.id);
    if (checkIn) params.set('checkIn', checkIn);
    if (checkOut) params.set('checkOut', checkOut);
    if (guestFilter > 0) params.set('guests', guestFilter.toString());
    return `/${lang}/booking?${params.toString()}`;
  };

  return (
    <div className="bg-[#F5F1E8] min-h-screen pt-28 pb-24">
      <SEO
        title={`${t('roomsPage.title')} — Ziyorat Hotel`}
        description={t('roomsPage.subtitle')}
        lang={lang}
        path="/rooms"
      />

      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-12">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest3 text-[#B99A65] font-sans font-semibold mb-2">
            Ziyorat Hotel Fergana
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#20251F] leading-[1.1]">
            {t('roomsPage.title')}
          </h1>
          <p className="text-sm sm:text-base text-[#5C645B] mt-4 font-light leading-relaxed">
            {t('roomsPage.subtitle')}
          </p>
        </div>

        {/* Filter & Sorting Controls */}
        <div className="mt-10 pt-8 border-t border-[#B99A65]/20 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-5 py-2.5 rounded-sm text-xs uppercase tracking-wider font-sans font-medium transition-all ${
                  selectedCategory === cat.key
                    ? 'bg-[#153D2A] text-[#F5F1E8] shadow-sm'
                    : 'bg-white border border-[#B99A65]/30 text-[#444C42] hover:border-[#153D2A]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Guest Count & Sort Dropdowns */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-sm border border-[#B99A65]/30">
              <Users className="w-3.5 h-3.5 text-[#B99A65]" />
              <label htmlFor="guestFilterSelect" className="text-[#5C645B] font-medium">{t('roomsPage.filterGuest')}:</label>
              <select
                id="guestFilterSelect"
                value={guestFilter}
                onChange={(e) => setGuestFilter(Number(e.target.value))}
                className="bg-transparent text-[#20251F] font-semibold focus:outline-none cursor-pointer"
              >
                <option value={0}>Barchasi</option>
                <option value={1}>1 kishi</option>
                <option value={2}>2 kishi</option>
                <option value={3}>3 kishi</option>
                <option value={4}>4+ kishi</option>
              </select>
            </div>

            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-sm border border-[#B99A65]/30">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#B99A65]" />
              <label htmlFor="sortOrderSelect" className="text-[#5C645B] font-medium">{t('roomsPage.filterPrice')}:</label>
              <select
                id="sortOrderSelect"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc' | 'default')}
                className="bg-transparent text-[#20251F] font-semibold focus:outline-none cursor-pointer"
              >
                <option value="default">Standart</option>
                <option value="asc">{t('roomsPage.priceAsc')}</option>
                <option value="desc">{t('roomsPage.priceDesc')}</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Room Listing Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {filteredRooms.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-sm border border-[#B99A65]/20 p-8">
            <p className="text-sm text-[#5C645B]">{t('roomsPage.noRooms')}</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setGuestFilter(0);
                setSortOrder('default');
              }}
              className="mt-4 px-5 py-2 bg-[#153D2A] text-white text-xs uppercase tracking-wider rounded-sm font-semibold"
            >
              Filtrlarni tozalash
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredRooms.map((room, idx) => (
              <motion.article
                key={room.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-[#B99A65]/20 rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12"
              >
                {/* Large Room Image */}
                <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-[360px] overflow-hidden bg-[#153D2A]/10 group">
                  <img
                    src={room.image}
                    alt={room.name[currentLang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-[#153D2A]/90 text-[#F5F1E8] text-[10px] uppercase tracking-widest font-sans font-semibold rounded-sm">
                    {room.category.toUpperCase()}
                  </div>
                </div>

                {/* Room Info */}
                <div className="lg:col-span-7 p-7 sm:p-9 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#B99A65]/15 pb-4">
                      <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#20251F]">
                        {room.name[currentLang]}
                      </h2>
                      <div className="text-left sm:text-right">
                        <span className="text-[10px] text-[#7E867C] uppercase tracking-wider block">
                          {t('featuredRooms.perNight')}
                        </span>
                        <span className="font-serif text-2xl font-bold text-[#153D2A]">
                          {room.priceFormatted[currentLang]}
                        </span>
                      </div>
                    </div>

                    <p className="text-xs sm:text-sm text-[#5C645B] font-light leading-relaxed">
                      {room.description[currentLang]}
                    </p>

                    {/* Room Specs */}
                    <div className="grid grid-cols-3 gap-3 py-3 border-y border-slate-100 text-xs text-[#444C42]">
                      <div className="flex items-center gap-2">
                        <Maximize2 className="w-4 h-4 text-[#B99A65] flex-shrink-0" />
                        <span>{room.size}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-[#B99A65] flex-shrink-0" />
                        <span>{room.capacity} mehmon</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Bed className="w-4 h-4 text-[#B99A65] flex-shrink-0" />
                        <span className="truncate">{room.bed[currentLang]}</span>
                      </div>
                    </div>

                    {/* Amenities Badges */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {room.amenities[currentLang].slice(0, 4).map((amenity, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F5F1E8] text-[#153D2A] text-[11px] font-medium"
                        >
                          <Check className="w-3 h-3 text-[#B99A65]" />
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <Link
                      to={`/${lang}/rooms/${room.id}`}
                      className="px-6 py-3 border border-[#153D2A] text-[#153D2A] hover:bg-[#153D2A] hover:text-[#F5F1E8] text-xs font-sans uppercase tracking-widest font-semibold rounded-sm transition-all text-center flex items-center justify-center gap-2"
                    >
                      <span>{t('featuredRooms.viewDetails')}</span>
                    </Link>

                    <Link
                      to={getBookingUrl(room)}
                      className="px-7 py-3 bg-[#153D2A] hover:bg-[#0F2F20] text-[#F5F1E8] text-xs font-sans uppercase tracking-widest font-bold rounded-sm transition-all text-center flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
                    >
                      <span>{t('featuredRooms.bookRoom')}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B99A65]" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
