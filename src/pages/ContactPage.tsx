import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { SEO } from '../components/seo/SEO';
import { HOTEL } from '../data/hotelData';
import { MapPin, Phone, Mail, Clock, ExternalLink, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const contactSchema = z.object({
  fullName: z.string().min(2, "Ism kamida 2 ta harfdan iborat bo'lishi kerak"),
  phone: z.string().min(9, "Telefon raqamini to'g'ri kiriting"),
  email: z.string().email("To'g'ri elektron pochta manzilini kiriting").optional().or(z.literal('')),
  message: z.string().min(5, "Xabar matni kamida 5 ta belgidan iborat bo'lishi kerak"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactPage: React.FC = () => {
  const { t } = useTranslation();
  const { lang = 'uz' } = useParams<{ lang?: string }>();
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (_data: ContactFormData) => {
    // Demo submission simulation
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 6000);
  };

  return (
    <div className="bg-[#F5F1E8] min-h-screen pt-28 pb-24 text-[#20251F]">
      <SEO
        title={`${t('contact.title')} — Ziyorat Hotel`}
        description={t('contact.subtitle')}
        lang={lang}
        path="/contact"
      />

      {/* Header Banner */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 mb-16">
        <div className="max-w-3xl">
          <p className="text-xs uppercase tracking-widest3 text-[#B99A65] font-sans font-semibold mb-2">
            Ziyorat Hotel Fergana
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#20251F] leading-[1.1]">
            {t('contact.title')}
          </h1>
          <p className="text-sm sm:text-base text-[#5C645B] mt-4 font-light leading-relaxed">
            {t('contact.subtitle')}
          </p>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Info & Action Buttons (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Contact Details Card */}
            <div className="bg-white border border-[#B99A65]/20 rounded-sm p-8 shadow-sm space-y-6">
              <h2 className="font-serif text-2xl font-normal text-[#20251F]">
                To'g'ridan-To'g'ri Aloqa
              </h2>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-[#B99A65] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7E867C] block font-semibold">
                      {t('contact.address')}
                    </span>
                    <span className="font-medium text-[#20251F]">{HOTEL.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-[#B99A65] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7E867C] block font-semibold">
                      {t('contact.phone')}
                    </span>
                    <a
                      href={`tel:${HOTEL.phoneRaw}`}
                      className="font-bold text-[#153D2A] hover:text-[#B99A65] transition-colors"
                    >
                      {HOTEL.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Mail className="w-5 h-5 text-[#B99A65] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7E867C] block font-semibold">
                      {t('contact.email')}
                    </span>
                    <a
                      href={`mailto:${HOTEL.email}`}
                      className="font-medium text-[#20251F] hover:text-[#B99A65] transition-colors"
                    >
                      {HOTEL.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <Clock className="w-5 h-5 text-[#B99A65] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#7E867C] block font-semibold">
                      Qabul vaqtlari
                    </span>
                    <span className="text-[#5C645B]">
                      Kirish (Check-in): {HOTEL.checkIn} | Chiqish (Check-out): {HOTEL.checkOut}
                    </span>
                  </div>
                </div>
              </div>

              {/* Fast Map and Chat Links */}
              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5">
                <a
                  href={HOTEL.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-[#F5F1E8] hover:bg-[#153D2A] hover:text-[#F5F1E8] text-[#153D2A] text-xs font-semibold rounded-sm transition-all flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#B99A65]" />
                    <span>Google Xaritalarda ochish</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={HOTEL.yandexMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-[#F5F1E8] hover:bg-[#153D2A] hover:text-[#F5F1E8] text-[#153D2A] text-xs font-semibold rounded-sm transition-all flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#B99A65]" />
                    <span>Yandex Xaritada ochish</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href={HOTEL.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 bg-[#25D366]/10 hover:bg-[#25D366] hover:text-white text-[#128C7E] text-xs font-semibold rounded-sm transition-all flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp orqali yozish</span>
                  </span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right: Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#B99A65]/20 rounded-sm p-8 sm:p-10 shadow-sm">
              <h2 className="font-serif text-2xl font-normal text-[#20251F] mb-2">
                Xabar yoki Savol Qoldiring
              </h2>
              <p className="text-xs text-[#5C645B] mb-8 font-light">
                Mehmonxona xizmatlari, bron qilish shartlari yoki transfer haqida savollaringiz bo'lsa, quyidagi shaklni to'ldiring.
              </p>

              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-[#153D2A] text-[#F5F1E8] rounded-sm flex items-center gap-3 text-xs"
                >
                  <CheckCircle2 className="w-5 h-5 text-[#B99A65] flex-shrink-0" />
                  <span>{t('contact.sentSuccess')}</span>
                </motion.div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#7E867C] font-semibold block">
                      {t('contact.name')} *
                    </label>
                    <input
                      type="text"
                      placeholder={t('contact.namePlaceholder')}
                      {...register('fullName')}
                      className="w-full bg-[#F5F1E8] border border-[#B99A65]/30 rounded-sm px-4 py-3 text-xs text-[#20251F] focus:outline-none focus:border-[#153D2A]"
                    />
                    {errors.fullName && (
                      <p className="text-[11px] text-red-600 font-medium">{errors.fullName.message}</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#7E867C] font-semibold block">
                      Telefon raqam *
                    </label>
                    <input
                      type="tel"
                      placeholder={t('contact.phonePlaceholder')}
                      {...register('phone')}
                      className="w-full bg-[#F5F1E8] border border-[#B99A65]/30 rounded-sm px-4 py-3 text-xs text-[#20251F] focus:outline-none focus:border-[#153D2A]"
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-red-600 font-medium">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#7E867C] font-semibold block">
                    {t('contact.email')} (ixtiyoriy)
                  </label>
                  <input
                    type="email"
                    placeholder="email@misol.uz"
                    {...register('email')}
                    className="w-full bg-[#F5F1E8] border border-[#B99A65]/30 rounded-sm px-4 py-3 text-xs text-[#20251F] focus:outline-none focus:border-[#153D2A]"
                  />
                  {errors.email && (
                    <p className="text-[11px] text-red-600 font-medium">{errors.email.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#7E867C] font-semibold block">
                    {t('contact.message')} *
                  </label>
                  <textarea
                    rows={4}
                    placeholder={t('contact.messagePlaceholder')}
                    {...register('message')}
                    className="w-full bg-[#F5F1E8] border border-[#B99A65]/30 rounded-sm px-4 py-3 text-xs text-[#20251F] focus:outline-none focus:border-[#153D2A]"
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-600 font-medium">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3.5 bg-[#153D2A] hover:bg-[#0F2F20] text-[#F5F1E8] text-xs font-sans uppercase tracking-widest font-bold rounded-sm transition-all flex items-center gap-2 shadow-md hover:shadow-lg disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5 text-[#B99A65]" />
                  <span>{isSubmitting ? "Yuborilmoqda..." : t('contact.sendMessage')}</span>
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Embedded Interactive Map Section */}
        <div className="mt-16 bg-white border border-[#B99A65]/20 rounded-sm overflow-hidden shadow-sm">
          <div className="p-6 border-b border-[#B99A65]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-serif text-xl font-normal text-[#20251F]">
                Ziyorat Hotel Xaritada
              </h3>
              <p className="text-xs text-[#7E867C] mt-0.5">
                Koordinatalar: {HOTEL.coordinates.lat}, {HOTEL.coordinates.lng} • Farg'ona shahri
              </p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href={HOTEL.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 border border-[#153D2A] text-[#153D2A] hover:bg-[#153D2A] hover:text-[#F5F1E8] text-xs font-semibold rounded-sm transition-colors flex items-center gap-1.5"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href={HOTEL.yandexMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-[#B99A65] hover:bg-[#A4844F] text-[#0F2F20] text-xs font-bold rounded-sm transition-colors flex items-center gap-1.5"
              >
                <span>Yandex Xarita</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          <div className="h-[400px] w-full bg-slate-100">
            <iframe
              title="Ziyorat Hotel Fergana Location Map"
              src={`https://maps.google.com/maps?q=${HOTEL.coordinates.lat},${HOTEL.coordinates.lng}&hl=uz&z=15&output=embed`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
