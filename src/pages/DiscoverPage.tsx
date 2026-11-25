import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import margilonImg from '../assets/images/margilon city.jpg';
import rishtonImg from '../assets/images/rishton.jpg';
import qoqonImg from '../assets/images/qoqon.jpg';
import { SEO } from '../components/seo/SEO';
import { HOTEL } from '../data/hotelData';
import { MapPin, Compass, Phone, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const DiscoverPage: React.FC = () => {
  const { t } = useTranslation();
  const { lang = 'uz' } = useParams<{ lang?: string }>();

  const attractions = [
    {
      id: 'margilan',
      title: "Marg'ilon — 'Yodgorlik' Ipak Fabrikasi",
      subtitle: "Qadimiy ipakchilik va tabiiy atlas to'qish beshigi",
      desc: "Marg'ilon shahri ming yildan ortiq vaqtdan beri tabiiy ipak va xonatlas ishlab chiqarish markazi hisoblanadi. 'Yodgorlik' fabrikasida ipak qurtidan tortib qo'lda to'qilgan tayyor ipak matolarigacha bo'lgan an'anaviy jarayonni o'z ko'zingiz bilan ko'rishingiz mumkin.",
      distance: "Mehmonxonadan taxminan 15 km (20 daqiqa)",
      image: margilonImg,
    },
    {
      id: 'rishtan',
      title: "Rishton — Kulolchilik Markazi",
      subtitle: "Nafis moviy va zangori sirlangan kulolchilik san'ati",
      desc: "Rishton kulollari tayyorlagan lagan va piyolalar butun jahonga mashhur. Mahalliy qizil loy va 'ishqor' o'simligi kuli asosida tayyorlanadigan tabiiy sirlar asrlar davomida o'z jilosini yo'qotmaydi. Rishtondagi mashhur ustalar ustaxonasida master-klasslarda qatnashish mumkin.",
      distance: "Mehmonxonadan taxminan 45 km (45 daqiqa)",
      image: rishtonImg,
    },
    {
      id: 'kokand',
      title: "Qo'qon — Xudoyorxon O'rdasi",
      subtitle: "Qo'qon xonligining muazzam saroy majmuasi",
      desc: "1871-yilda qurib bitkazilgan Xudoyorxon saroyi sharq me'morchiligining betakror durdonasidir. Rang-barang koshinlar, o'ymakor yog'och ustunlar va qadimiy xonlik tarixi bilan tanishish uchun ajoyib maskan.",
      distance: "Mehmonxonadan taxminan 85 km (1 soat 15 daqiqa)",
      image: qoqonImg,
    },
    {
      id: 'fergana-park',
      title: "Al-Farg'oniy Markaziy Bog'i va Xiyoboni",
      subtitle: "Farg'onaning qadimiy chinorlar bilan qoplangan sokin markazi",
      desc: "Ahmad al-Farg'oniy haykali qad rostlagan ushbu soya-salqin xiyobon asrlik chinorlari, favvoralari va sokin choyxonalari bilan mashhur. Ziyorat Hotelda turgan mehmonlar uchun piyoda sayr qilishga ideal maskan.",
      distance: "Mehmonxonadan 3 km (5 daqiqalik masofa)",
      image: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1200&q=80',
    },
  ];

  return (
    <div className="bg-[#F5F1E8] min-h-screen pt-28 pb-24 text-[#20251F]">
      <SEO
        title={`${t('discover.title')} — Ziyorat Hotel`}
        description={t('discover.subtitle')}
        lang={lang}
        path="/discover"
      />

      {/* Hero Banner */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-16">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest3 text-[#B99A65] font-sans font-semibold mb-2">
            Farg'ona Vodiysi Sayyohligi
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#20251F] leading-[1.1]">
            {t('discover.title')}
          </h1>
          <p className="text-sm sm:text-base text-[#5C645B] mt-4 font-light leading-relaxed">
            {t('discover.subtitle')}
          </p>
        </div>
      </div>

      {/* Attractions Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 space-y-16">
        {attractions.map((att, idx) => {
          const isEven = idx % 2 === 1;

          return (
            <motion.div
              key={att.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white border border-[#B99A65]/20 rounded-sm overflow-hidden shadow-sm hover:shadow-lg transition-all ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              <div className={`lg:col-span-6 h-[300px] sm:h-[380px] overflow-hidden ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <img
                  src={att.image}
                  alt={att.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
              </div>

              <div className={`lg:col-span-6 p-8 sm:p-10 space-y-4 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <div className="flex items-center gap-2 text-[#B99A65] text-xs font-semibold">
                  <Compass className="w-4 h-4" />
                  <span>Sayyohlik Maskani</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#20251F]">
                  {att.title}
                </h2>

                <p className="text-xs uppercase tracking-wider text-[#7E867C] font-sans">
                  {att.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[#444C42] leading-relaxed font-light">
                  {att.desc}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs text-[#153D2A] font-semibold border-t border-slate-100">
                  <MapPin className="w-4 h-4 text-[#B99A65]" />
                  <span>{att.distance}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Concierge Assistance Card */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mt-20">
        <div className="p-8 sm:p-12 bg-[#0F2F20] text-[#F5F1E8] rounded-sm border border-[#B99A65]/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs uppercase tracking-widest3 text-[#B99A65] font-semibold">
              Ziyorat Hotel Konsyerj Xizmati
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-normal">
              Farg'ona Bo'ylab Ekskursiya Uyushtirishni Xohlaysizmi?
            </h3>
            <p className="text-xs sm:text-sm text-[#B9CBBF] font-light leading-relaxed">
              Mehmonxonamiz qabulxonasi siz uchun professional gid, qulay transport va xususiy ekskursiyalarni tashkil qilishda yordam beradi.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0">
            <a
              href={`tel:${HOTEL.phoneRaw}`}
              className="px-6 py-3.5 bg-[#B99A65] hover:bg-[#A4844F] text-[#0F2F20] font-sans font-bold text-xs uppercase tracking-widest rounded-sm transition-all inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>{HOTEL.phone}</span>
            </a>

            <Link
              to={`/${lang}/contact`}
              className="px-6 py-3.5 border border-[#B99A65] text-[#B99A65] hover:bg-[#B99A65] hover:text-[#0F2F20] font-sans font-bold text-xs uppercase tracking-widest rounded-sm transition-all inline-flex items-center gap-2"
            >
              <span>Aloqaga Chiqish</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
