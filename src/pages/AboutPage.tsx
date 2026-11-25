import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SEO } from '../components/seo/SEO';
import { Shield, HeartHandshake, MapPin, CheckCircle, ArrowRight } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { t } = useTranslation();
  const { lang = 'uz' } = useParams<{ lang?: string }>();

  const stats = [
    { value: '4 ★', label: 'Xalqaro toifa' },
    { value: '24/7', label: 'Qabulxona servisi' },
    { value: '2 ta', label: 'Suzish havzasi (yopiq/ochiq)' },
    { value: '10 daqiqa', label: 'Aeroportgacha masofa' },
  ];

  return (
    <div className="bg-[#F5F1E8] min-h-screen pt-28 pb-24 text-[#20251F]">
      <SEO
        title={`${t('about.title')} — Ziyorat Hotel`}
        description={t('about.subtitle')}
        lang={lang}
        path="/about"
      />

      {/* Hero Narrative */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-20">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest3 text-[#B99A65] font-sans font-semibold mb-2">
            Ziyorat Hotel Fergana
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#20251F] leading-[1.1]">
            {t('about.title')}
          </h1>
          <p className="text-sm sm:text-base text-[#5C645B] mt-4 font-light leading-relaxed">
            {t('about.subtitle')}
          </p>
        </div>
      </div>

      {/* Main Story & Visuals */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[#20251F]">
              Sharqona Lutf va Zamonaviy Mukammallik
            </h2>
            <p className="text-sm text-[#444C42] leading-relaxed font-light">
              {t('about.story')}
            </p>
            <p className="text-sm text-[#444C42] leading-relaxed font-light">
              Bizning falsafamiz oddiy: mehmonxona shunchaki tunash joyi emas, balki safardan keyingi xotirjamlik va iliq uy hissini berishi kerak. Shu bois biz xonalarning shovqindan xoli bo'lishi, to'shaklarning yuqori ortopedik sifati va taomlarning yangiligiga alohida e'tibor qaratamiz.
            </p>

            <div className="pt-2 space-y-3 text-xs text-[#153D2A] font-medium">
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#B99A65]" />
                <span>{t('about.bullet1')}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#B99A65]" />
                <span>{t('about.bullet2')}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#B99A65]" />
                <span>{t('about.bullet3')}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle className="w-4 h-4 text-[#B99A65]" />
                <span>{t('about.bullet4')}</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="relative h-80 sm:h-96 rounded-sm overflow-hidden border border-[#B99A65]/30">
              <img
                src="/hotel/fb082889a68ce49f.webp"
                alt="Ziyorat Hotel Interior"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative h-80 sm:h-96 rounded-sm overflow-hidden border border-[#B99A65]/30 mt-8">
              <img
                src="/hotel/7686fdf8c4238815.webp"
                alt="Ziyorat Hotel Spa"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Key Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 p-8 sm:p-12 bg-white rounded-sm border border-[#B99A65]/20 shadow-sm text-center mb-24">
          {stats.map((s, idx) => (
            <div key={idx} className="space-y-1">
              <span className="font-serif text-3xl sm:text-5xl font-bold text-[#153D2A] block">
                {s.value}
              </span>
              <span className="text-xs uppercase tracking-widest text-[#7E867C] font-sans">
                {s.label}
              </span>
            </div>
          ))}
        </div>

        {/* Our Hospitality Values */}
        <div className="space-y-12 mb-24">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-widest3 text-[#B99A65] font-semibold mb-2">
              Bizning Tamoyillarimiz
            </p>
            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#20251F]">
              Nega Mehmonlar Ziyorat Hotelni Tanlaydi?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-white border border-[#B99A65]/20 rounded-sm space-y-4">
              <Shield className="w-8 h-8 text-[#B99A65]" />
              <h4 className="font-serif text-xl font-normal text-[#20251F]">
                Mutlaq Xavfsizlik & Tozalik
              </h4>
              <p className="text-xs text-[#5C645B] font-light leading-relaxed">
                Mehmonxonamizda 24 soatlik xavfsizlik, videokuzatuv tizimi va xonalarni qat'iy sanitariya qoidalariga binoan steril tozalash yo'lga qo'yilgan.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#B99A65]/20 rounded-sm space-y-4">
              <HeartHandshake className="w-8 h-8 text-[#B99A65]" />
              <h4 className="font-serif text-xl font-normal text-[#20251F]">
                Samimiy O'zbek Mehmondo'stligi
              </h4>
              <p className="text-xs text-[#5C645B] font-light leading-relaxed">
                Har bir mehmonga alohida e'tibor va hurmat bilan yondashamiz. Sizning xohishingiz biz uchun ustuvor vazifadir.
              </p>
            </div>

            <div className="p-8 bg-white border border-[#B99A65]/20 rounded-sm space-y-4">
              <MapPin className="w-8 h-8 text-[#B99A65]" />
              <h4 className="font-serif text-xl font-normal text-[#20251F]">
                Qulay Joylashuv
              </h4>
              <p className="text-xs text-[#5C645B] font-light leading-relaxed">
                Farg'ona shahrining tinch hududida joylashgan bo'lib, aeroport, temir yo'l vokzali va shahar markaziga bir necha daqiqada yetib olish mumkin.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="p-10 sm:p-14 bg-[#153D2A] text-[#F5F1E8] rounded-sm text-center space-y-6">
          <h3 className="font-serif text-3xl sm:text-4xl font-normal">
            Farg'ona Safaringizni Ziyorat Hotel Bilan Boshlang
          </h3>
          <p className="text-xs sm:text-sm text-[#DCECE1] max-w-xl mx-auto font-light leading-relaxed">
            Biz sizga unutilmas taassurotlar va 4 yulduzli qulaylikni taqdim etishdan mamnunmiz.
          </p>
          <div className="pt-2">
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
