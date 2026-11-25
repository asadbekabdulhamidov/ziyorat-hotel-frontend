import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/seo/SEO';
import { Waves, Utensils, Sparkles, Dumbbell, Clock, Coffee, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export const ExperiencesPage: React.FC = () => {
  const { t } = useTranslation();
  const { lang = 'uz' } = useParams<{ lang?: string }>();

  const experiences = [
    {
      id: 'pools',
      tag: 'Salomatlik & Hordiq',
      title: 'Ochiq va Yopiq Suzish Havzalari',
      desc: "Ziyorat Hotel mehmonlariga yil davomida tiniq va harorati nazorat qilinadigan ikki xil basseyn xizmat ko'rsatadi: yozgi quyoshli kunlar uchun keng ochiq hovuz va qishki sokin suzish uchun isitiladigan yopiq basseyn. Qulay shezlonglar va toza sochiqlar doim sizning ixtiyoringizda.",
      features: ['Isitiladigan yopiq basseyn', 'Yozgi ochiq akva hudud', 'Bolalar uchun xavfsiz qism', 'Kunlik suv filtrlash tizimi'],
      image: '/hotel/a22091c41a17d8b0.webp',
      icon: Waves,
    },
    {
      id: 'restaurant',
      tag: 'Gastronomiya',
      title: "Ziyorat Restorani & Shved Stoli Nonushtasi",
      desc: "Har kuni ertalab 07:00 dan 10:30 gacha mehmonlar uchun boy shved stoli servisi taqdim etiladi. Tushlik va kechki ovqatda esa mashhur Farg'ona palovi, milliy tandir taomlari hamda yevropa klassik oshxonasi noz-ne'matlaridan bahramand bo'lishingiz mumkin.",
      features: ['Har kungi bepul nonushta (bufet)', "Haqiqiy Farg'ona palovi", 'Xonaga taom buyurtma qilish (Room Service)', 'Dietik va bolalar menyusi'],
      image: '/hotel/18165b7504a6f18c.webp',
      icon: Utensils,
    },
    {
      id: 'spa-hammam',
      tag: 'Spa & Relaks',
      title: 'Turk Hamomi va Fin Saunasi',
      desc: "Charchoqni chiqarish va tanani tozalash uchun an'anaviy sharqona marmar bug' hamomi hamda tabiiy kedr yog'ochidan ishlangan fin saunasi. Professional massaj va tana parvarishi xizmatlari buyurtma asosida taqdim etiladi.",
      features: ['Tabiiy bug\'li turk hamomi', 'Fin quruq saunasi', 'Massaj va dam olish xonalari', 'Choyxona burchagi va sharqona choylar'],
      image: '/hotel/7686fdf8c4238815.webp',
      icon: Sparkles,
    },
    {
      id: 'fitness',
      tag: 'Faol Hayot',
      title: 'Zamonaviy Fitness & Trenajyor Zali',
      desc: "Sayohat yoki ish safari davomida ham o'z sport rejimingizni buzmang. Zalimizda zamonaviy yugurish yo'lakchalari, kardio trenajyorlar, gantellar va cho'zilish zonalari mavjud.",
      features: ['Kardio va kuch trenajyorlari', 'Erkin vaznlar va gantellar', 'Konditsionerlangan toza havo', 'Mehmonlar uchun 24/7 ochiq'],
      image: '/hotel/f511d712633e8bd6.webp',
      icon: Dumbbell,
    },
  ];

  return (
    <div className="bg-[#F5F1E8] min-h-screen pt-28 pb-24 text-[#20251F]">
      <SEO
        title={`${t('experiences.title')} — Ziyorat Hotel`}
        description={t('experiences.subtitle')}
        lang={lang}
        path="/experiences"
      />

      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-16">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest3 text-[#B99A65] font-sans font-semibold mb-2">
            Ziyorat Hotel Hospitality
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#20251F] leading-[1.1]">
            {t('experiences.title')}
          </h1>
          <p className="text-sm sm:text-base text-[#5C645B] mt-4 font-light leading-relaxed">
            {t('experiences.subtitle')}
          </p>
        </div>
      </div>

      {/* Alternating Editorial Sections */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 space-y-24">
        {experiences.map((exp, idx) => {
          const isEven = idx % 2 === 1;
          const Icon = exp.icon;

          return (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                isEven ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Col (7 cols) */}
              <div className={`lg:col-span-7 ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="relative h-[320px] sm:h-[440px] rounded-sm overflow-hidden shadow-lg border border-[#B99A65]/20 group">
                  <img
                    src={exp.image}
                    alt={exp.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 left-4 p-2.5 rounded-full bg-[#0F2F20]/80 text-[#B99A65] border border-[#B99A65]/40 backdrop-blur-sm">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Text Col (5 cols) */}
              <div className={`lg:col-span-5 space-y-6 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <p className="text-xs uppercase tracking-widest3 text-[#B99A65] font-sans font-semibold">
                  {exp.tag}
                </p>
                <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#20251F] leading-tight">
                  {exp.title}
                </h2>
                <p className="text-xs sm:text-sm text-[#444C42] leading-relaxed font-light">
                  {exp.desc}
                </p>

                <div className="space-y-2.5 pt-2">
                  {exp.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2.5 text-xs text-[#153D2A] font-medium">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B99A65]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Additional Hospitality Perks Strip */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mt-28">
        <div className="bg-[#153D2A] text-[#F5F1E8] rounded-sm p-8 sm:p-12 shadow-xl border border-[#B99A65]/30">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-widest3 text-[#B99A65] font-semibold block mb-2">
              Hammasi Sizning Qulayligingiz Uchun
            </span>
            <h3 className="font-serif text-2xl sm:text-4xl font-normal">
              Qo'shimcha Mehmonxona Xizmatlari
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="p-4 bg-[#0F2F20] rounded-sm border border-white/5 space-y-2">
              <Clock className="w-6 h-6 mx-auto text-[#B99A65]" />
              <h4 className="font-serif text-lg text-[#F5F1E8]">24/7 Qabulxona</h4>
              <p className="text-xs text-[#B9CBBF] font-light">Kun-u tun istalgan vaqtda kirish va assistentlik.</p>
            </div>
            <div className="p-4 bg-[#0F2F20] rounded-sm border border-white/5 space-y-2">
              <Coffee className="w-6 h-6 mx-auto text-[#B99A65]" />
              <h4 className="font-serif text-lg text-[#F5F1E8]">Xona Xizmati</h4>
              <p className="text-xs text-[#B9CBBF] font-light">Ichimliklar va taomlarni bevosita xonangizga yetkazish.</p>
            </div>
            <div className="p-4 bg-[#0F2F20] rounded-sm border border-white/5 space-y-2">
              <ShieldCheck className="w-6 h-6 mx-auto text-[#B99A65]" />
              <h4 className="font-serif text-lg text-[#F5F1E8]">Xavfsiz Avtoturargoh</h4>
              <p className="text-xs text-[#B9CBBF] font-light">Mehmonlar avtomobillari uchun bepul videokuzatuvli parkovka.</p>
            </div>
            <div className="p-4 bg-[#0F2F20] rounded-sm border border-white/5 space-y-2">
              <ArrowRight className="w-6 h-6 mx-auto text-[#B99A65]" />
              <h4 className="font-serif text-lg text-[#F5F1E8]">Aeroport Transferi</h4>
              <p className="text-xs text-[#B9CBBF] font-light">Farg'ona xalqaro aeroportidan qulay kutib olish va kuzatish.</p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              to={`/${lang}/booking`}
              className="px-8 py-3.5 bg-[#B99A65] hover:bg-[#A4844F] text-[#0F2F20] font-sans font-bold text-xs uppercase tracking-widest rounded-sm transition-all inline-flex items-center gap-2"
            >
              <span>Xonani band qilish</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
