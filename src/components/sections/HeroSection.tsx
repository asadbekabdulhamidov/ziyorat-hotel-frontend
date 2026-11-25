import React, { useState, useEffect, useCallback } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

const HERO_SLIDES = [
  {
    image: '/hotel/fe4501318103574d.webp',
    alt: 'Ziyorat Luxury Hotel Facade & Entrance',
  },
  {
    image: '/hotel/fb082889a68ce49f.webp',
    alt: 'Deluxe King Suite Interior',
  },
  {
    image: '/hotel/92517554090fdbd4.webp',
    alt: 'Heated Indoor & Summer Outdoor Pools',
  },
  {
    image: '/hotel/e157352c90060031.webp',
    alt: 'Grand Executive Suite Salon',
  },
  {
    image: '/hotel/18165b7504a6f18c.webp',
    alt: 'Ziyorat Restaurant & Gourmet Dining',
  },
];

const SLIDE_DURATION = 5500; // 5.5 seconds per slide

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();
  const { lang = 'uz' } = useParams<{ lang?: string }>();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Automatic timer
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <section className="relative min-h-[95vh] flex flex-col justify-between pt-36 pb-12 overflow-hidden bg-[#0F2F20]">
      {/* Background Image Slider with Crossfade & Cinematic Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="sync">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              opacity: { duration: 1.4, ease: 'easeInOut' },
              scale: { duration: 7, ease: 'easeOut' },
            }}
            className="absolute inset-0 w-full h-full bg-cover bg-center"
            style={{
              backgroundImage: `url('${HERO_SLIDES[currentSlide].image}')`,
            }}
          />
        </AnimatePresence>

        {/* Cinematic Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F2F20] via-[#0F2F20]/65 to-black/65 z-10" />
        <div className="absolute inset-0 bg-[#0F2F20]/30 z-10" />
      </div>

      {/* Manual Slide Navigation Arrows (Desktop) */}
      <div className="hidden lg:flex absolute inset-y-0 left-6 right-6 z-20 items-center justify-between pointer-events-none">
        <button
          onClick={prevSlide}
          className="pointer-events-auto p-3 rounded-full bg-black/30 hover:bg-[#153D2A] text-white/80 hover:text-[#B99A65] border border-white/10 hover:border-[#B99A65]/50 backdrop-blur-sm transition-all"
          aria-label="Previous slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          className="pointer-events-auto p-3 rounded-full bg-black/30 hover:bg-[#153D2A] text-white/80 hover:text-[#B99A65] border border-white/10 hover:border-[#B99A65]/50 backdrop-blur-sm transition-all"
          aria-label="Next slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Hero Typography & Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center my-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#B99A65]/40 bg-[#0F2F20]/75 backdrop-blur-md mb-6"
        >
          <span className="text-[10px] uppercase tracking-widest3 text-[#B99A65] font-sans font-semibold">
            {t('hero.badge')}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#F5F1E8] tracking-tight leading-[1.08] max-w-4xl mx-auto drop-shadow-lg"
        >
          {t('hero.headline')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[#DCECE1] text-sm sm:text-base md:text-lg max-w-2xl mx-auto mt-6 font-light leading-relaxed drop-shadow"
        >
          {t('hero.subheadline')}
        </motion.p>

        {/* CTA Actions */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            to={`/${lang}/booking`}
            className="px-7 py-3.5 bg-[#B99A65] hover:bg-[#A4844F] text-[#0F2F20] font-sans font-bold text-xs uppercase tracking-widest rounded-sm transition-all shadow-xl flex items-center gap-2 hover:scale-105"
          >
            <span>{t('hero.primaryCta')}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            to={`/${lang}/rooms`}
            className="px-6 py-3.5 border border-[#B99A65]/70 hover:bg-[#153D2A]/80 text-[#F5F1E8] text-xs font-sans uppercase tracking-widest font-semibold transition-all rounded-sm backdrop-blur-sm shadow-md"
          >
            {t('hero.secondaryCta')}
          </Link>
        </motion.div>
      </div>

      {/* Slide Indicators & Scroll Indicator */}
      <div className="relative z-20 flex flex-col items-center gap-4 mt-6">
        {/* Slider Pagination Dots */}
        <div className="flex items-center gap-2.5 bg-black/40 px-3.5 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === idx
                  ? 'w-6 h-2 bg-[#B99A65]'
                  : 'w-2 h-2 bg-white/40 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Scroll indicator */}
        <a
          href="#booking-search"
          className="text-[#B99A65]/80 hover:text-[#B99A65] flex flex-col items-center gap-1 transition-colors"
          aria-label={t('hero.scroll')}
        >
          <span className="text-[9px] tracking-widest3 font-sans uppercase text-[#DCECE1]/80">
            {t('hero.scroll')}
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#B99A65]" />
        </a>
      </div>
    </section>
  );
};
