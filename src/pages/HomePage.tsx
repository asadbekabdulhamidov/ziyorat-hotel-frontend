import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ZIYORAT_ROOMS } from '../data/hotelData';
import { SEO } from '../components/seo/SEO';
import { HeroSection } from '../components/sections/HeroSection';
import { BookingSearch } from '../components/booking/BookingSearch';
import { ArrowRight, Waves, Utensils, Sparkles, Dumbbell, CheckCircle } from 'lucide-react';
import { Footer } from '../components/layout/Footer';
import { FullPage } from '../components/fullpage/FullPage';
import { Stagger, Group, Item } from '../components/fullpage/Reveal';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const { lang = 'uz' } = useParams<{ lang?: string }>();
  const currentLang = (['uz', 'ru', 'en', 'tr'].includes(lang) ? lang : 'uz') as 'uz' | 'ru' | 'en' | 'tr';

  const experiencesList = [
    {
      icon: Waves,
      title: t('experiences.pool'),
      desc: t('experiences.poolDesc'),
      image: "/hotel/a22091c41a17d8b0.webp"
    },
    {
      icon: Utensils,
      title: t('experiences.restaurant'),
      desc: t('experiences.restaurantDesc'),
      image: "/hotel/961d4acc3892919f.webp"
    },
    {
      icon: Sparkles,
      title: t('experiences.hammam'),
      desc: t('experiences.hammamDesc'),
      image: "/hotel/7686fdf8c4238815.webp"
    },
    {
      icon: Dumbbell,
      title: t('experiences.fitness'),
      desc: t('experiences.fitnessDesc'),
      image: "/hotel/f511d712633e8bd6.webp"
    }
  ];

  const sectionLabels = [
    t('nav.home'),
    t('nav.rooms'),
    t('nav.experiences'),
    t('nav.about'),
    t('nav.discover'),
    t('nav.contact'),
  ];

  return (
    <>
      <SEO
        title={t('hero.headline')}
        description={t('hero.subheadline')}
        lang={lang}
        path="/"
      />

      <FullPage labels={sectionLabels}>
      {/* 1. Hero Section (with booking search) */}
      <HeroSection>
        <BookingSearch />
      </HeroSection>


      {/* 2. Featured Rooms Section */}
      <section className="min-h-screen flex items-center py-24 lg:pt-28 lg:pb-14 bg-[#F5F1E8]">
        <Stagger className="w-full max-w-7xl mx-auto px-6 sm:px-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 lg:mb-10 gap-6">
            <div>
              <Item>
                <p className="text-xs uppercase tracking-widest3 text-[#B99A65] font-sans font-semibold mb-2">
                  {t('featuredRooms.tag')}
                </p>
              </Item>
              <Item>
                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#20251F]">
                  {t('featuredRooms.title')}
                </h2>
              </Item>
            </div>
            <Item from="left">
              <Link
                to={`/${lang}/rooms`}
                className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-semibold text-[#153D2A] hover:text-[#B99A65] border-b border-[#153D2A] pb-1 transition-colors self-start md:self-auto"
              >
                <span>{t('featuredRooms.viewAll')}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Item>
          </div>

          <Group className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.18}>
            {ZIYORAT_ROOMS.slice(0, 3).map((room) => (
              <Item
                key={room.id}
                distance={60}
                className="bg-white border border-[#B99A65]/20 rounded-sm overflow-hidden flex flex-col group shadow-sm hover:shadow-xl transition-shadow duration-300"
              >
                {/* Photo */}
                <div className="relative h-64 sm:h-72 lg:h-[30vh] overflow-hidden bg-[#153D2A]/10">
                  <img
                    src={room.image}
                    alt={room.name[currentLang]}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 px-2.5 py-1 bg-[#153D2A]/90 text-[#F5F1E8] text-[10px] uppercase tracking-widest font-sans font-semibold">
                    {room.size}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 sm:p-7 lg:p-6 flex-1 flex flex-col justify-between space-y-4 lg:space-y-3">
                  <div className="space-y-2">
                    <h3 className="font-serif text-2xl font-normal text-[#20251F] group-hover:text-[#153D2A] transition-colors">
                      {room.name[currentLang]}
                    </h3>
                    <p className="text-xs text-[#5C645B] line-clamp-2 font-light leading-relaxed">
                      {room.subtitle[currentLang]}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-[#7E867C]">
                    <span>{room.capacity} mehmon</span>
                    <span>•</span>
                    <span className="truncate max-w-[150px]">{room.bed[currentLang]}</span>
                  </div>

                  <div className="pt-2 flex items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-[#7E867C] block uppercase tracking-wider">
                        {t('featuredRooms.perNight')}
                      </span>
                      <span className="font-serif text-xl font-bold text-[#153D2A]">
                        {room.priceFormatted[currentLang]}
                      </span>
                    </div>

                    <Link
                      to={`/${lang}/rooms/${room.id}`}
                      className="px-4 py-2 bg-[#153D2A] hover:bg-[#0F2F20] text-[#F5F1E8] text-xs font-sans font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5"
                    >
                      <span>{t('featuredRooms.viewDetails')}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </Item>
            ))}
          </Group>
        </Stagger>
      </section>

      {/* 3. Hotel Experiences & Amenities */}
      <section className="min-h-screen flex items-center py-24 lg:pt-28 lg:pb-14 bg-[#0F2F20] text-[#F5F1E8] relative">
        <Stagger className="w-full max-w-7xl mx-auto px-6 sm:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-10">
            <Item>
              <p className="text-xs uppercase tracking-widest3 text-[#B99A65] font-sans font-semibold mb-2">
                {t('experiences.tag')}
              </p>
            </Item>
            <Item>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#F5F1E8]">
                {t('experiences.title')}
              </h2>
            </Item>
            <Item>
              <p className="text-xs sm:text-sm text-[#B9CBBF] mt-3 font-light leading-relaxed">
                {t('experiences.subtitle')}
              </p>
            </Item>
          </div>

          <Group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" stagger={0.15}>
            {experiencesList.map((exp, idx) => {
              const Icon = exp.icon;
              return (
                <Item
                  key={idx}
                  distance={60}
                  className="bg-[#153D2A] border border-[#B99A65]/20 rounded-sm overflow-hidden flex flex-col group"
                >
                  <div className="relative h-48 lg:h-[26vh] overflow-hidden">
                    <img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#153D2A] via-transparent to-transparent" />
                    <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#0F2F20]/80 border border-[#B99A65]/40 flex items-center justify-center text-[#B99A65]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-serif text-xl font-normal text-[#F5F1E8] mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-xs text-[#B9CBBF] font-light leading-relaxed">
                        {exp.desc}
                      </p>
                    </div>
                  </div>
                </Item>
              );
            })}
          </Group>

          <Item className="mt-12 lg:mt-10 text-center">
            <Link
              to={`/${lang}/experiences`}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-sans font-semibold text-[#B99A65] hover:text-[#D6C097] border-b border-[#B99A65] pb-1 transition-colors"
            >
              <span>{t('experiences.tag')} — Barchasini ko'rish</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </Item>
        </Stagger>
      </section>

      {/* 4. About Ziyorat Hotel Section */}
      <section className="min-h-screen flex items-center py-24 lg:pt-28 lg:pb-14 bg-[#F5F1E8] relative">
        <Stagger className="w-full max-w-7xl mx-auto px-6 sm:px-10" stagger={0.12}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <Item from="right">
                <p className="text-xs uppercase tracking-widest3 text-[#B99A65] font-sans font-semibold">
                  {t('about.tag')}
                </p>
              </Item>
              <Item from="right">
                <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#20251F] leading-[1.12]">
                  {t('about.title')}
                </h2>
              </Item>
              <Item from="right">
                <p className="text-sm text-[#444C42] leading-relaxed font-light">
                  {t('about.story')}
                </p>
              </Item>

              <Group className="space-y-3 pt-2 text-xs text-[#153D2A] font-medium" stagger={0.1}>
                {(['bullet1', 'bullet2', 'bullet3', 'bullet4'] as const).map((key) => (
                  <Item key={key} from="right" distance={24} className="flex items-center gap-2.5">
                    <CheckCircle className="w-4 h-4 text-[#B99A65]" />
                    <span>{t(`about.${key}`)}</span>
                  </Item>
                ))}
              </Group>

              <Item from="right" className="pt-4">
                <Link
                  to={`/${lang}/about`}
                  className="px-6 py-3 bg-[#153D2A] hover:bg-[#0F2F20] text-[#F5F1E8] text-xs font-sans uppercase tracking-widest font-semibold rounded-sm transition-colors inline-flex items-center gap-2"
                >
                  <span>Batafsil ma'lumot</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </Item>
            </div>

            {/* Right Asymmetrical Images */}
            <Group className="lg:col-span-6 grid grid-cols-2 gap-4" stagger={0.2}>
              <Item from="up" distance={80} className="relative h-80 sm:h-96 lg:h-[58vh] rounded-sm overflow-hidden border border-[#B99A65]/30">
                <img
                  src="/hotel/fb082889a68ce49f.webp"
                  alt="Ziyorat Hotel Room"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </Item>
              <Item from="down" distance={80} className="relative h-80 sm:h-96 lg:h-[58vh] rounded-sm overflow-hidden border border-[#B99A65]/30 mt-8">
                <img
                  src="/hotel/a7d063c66c24675e.webp"
                  alt="Ziyorat Hotel Spa"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </Item>
            </Group>
          </div>
        </Stagger>
      </section>

      {/* 5. Discover Fergana Regional Inspiration */}
      <section className="min-h-screen flex items-center py-24 lg:pt-28 lg:pb-14 bg-[#EFE9DC] text-[#20251F]">
        <Stagger className="w-full max-w-7xl mx-auto px-6 sm:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14 lg:mb-10">
            <Item>
              <p className="text-xs uppercase tracking-widest3 text-[#B99A65] font-sans font-semibold mb-2">
                {t('discover.tag')}
              </p>
            </Item>
            <Item>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#20251F]">
                {t('discover.title')}
              </h2>
            </Item>
            <Item>
              <p className="text-xs sm:text-sm text-[#5C645B] mt-3 font-light leading-relaxed">
                {t('discover.subtitle')}
              </p>
            </Item>
          </div>

          <Group className="grid grid-cols-1 md:grid-cols-3 gap-8" stagger={0.18}>
            {[
              {
                img: 'https://images.unsplash.com/photo-1596401057633-54a8fe8ef647?auto=format&fit=crop&w=800&q=80',
                alt: 'Margilan Silk',
                title: t('discover.margilan'),
                desc: t('discover.margilanDesc'),
              },
              {
                img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80',
                alt: 'Rishtan Ceramics',
                title: t('discover.rishtan'),
                desc: t('discover.rishtanDesc'),
              },
              {
                img: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
                alt: 'Kokand Palace',
                title: t('discover.kokand'),
                desc: t('discover.kokandDesc'),
              },
            ].map((place) => (
              <Item key={place.alt} distance={60} className="bg-white border border-[#B99A65]/20 rounded-sm overflow-hidden">
                <div className="h-56 lg:h-[30vh] overflow-hidden">
                  <img
                    src={place.img}
                    alt={place.alt}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl font-normal text-[#20251F] mb-2">{place.title}</h3>
                  <p className="text-xs text-[#5C645B] font-light leading-relaxed">{place.desc}</p>
                </div>
              </Item>
            ))}
          </Group>
        </Stagger>
      </section>

      {/* 6. Final Call to Action + Footer */}
      <div className="min-h-screen flex flex-col bg-[#0F2F20]">
        <section className="flex-1 flex items-center py-20 lg:pt-28 bg-[#153D2A] text-[#F5F1E8] text-center relative overflow-hidden">
          <Stagger className="w-full max-w-4xl mx-auto px-6 relative z-10 space-y-6">
            <Item>
              <p className="text-xs uppercase tracking-widest3 text-[#B99A65] font-sans font-semibold">
                Ziyorat Hotel Fergana
              </p>
            </Item>
            <Item>
              <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[#F5F1E8]">
                Sizni Kutib Qolamiz
              </h2>
            </Item>
            <Item>
              <p className="text-xs sm:text-sm text-[#DCECE1] max-w-xl mx-auto font-light leading-relaxed">
                Unutilmas dam olish yoki muvaffaqiyatli ish safari uchun bugunoq xonani eng yaxshi narxda band qiling.
              </p>
            </Item>
            <Item className="pt-2">
              <Link
                to={`/${lang}/booking`}
                className="px-8 py-3.5 bg-[#B99A65] hover:bg-[#A4844F] text-[#0F2F20] font-sans font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-xl inline-flex items-center gap-2 hover:scale-105"
              >
                <span>{t('hero.primaryCta')}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Item>
          </Stagger>
        </section>
        <Footer />
      </div>
      </FullPage>
    </>
  );
};
