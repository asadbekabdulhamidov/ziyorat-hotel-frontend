import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { HOTEL } from '../../data/hotelData';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  const { t } = useTranslation();
  const { lang = 'uz' } = useParams<{ lang?: string }>();

  return (
    <footer className="bg-[#0F2F20] text-[#DCECE1] border-t border-[#B99A65]/20 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 border border-[#B99A65] rounded-full flex items-center justify-center text-[#B99A65] font-serif text-xl font-bold bg-[#153D2A]">
                Z
              </div>
              <div>
                <span className="font-serif text-2xl tracking-widest text-[#F5F1E8] uppercase font-medium">
                  Ziyorat
                </span>
                <span className="text-[10px] text-[#B99A65] block tracking-widest3 uppercase">
                  ★★★★ • Fergana, Uzbekistan
                </span>
              </div>
            </div>

            <p className="text-xs text-[#B9CBBF] max-w-sm leading-relaxed font-light">
              {t('footer.aboutText')}
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs">
              <a
                href={HOTEL.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#B99A65] hover:text-[#D6C097] underline transition-colors"
              >
                <span>Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <span className="text-white/20">•</span>
              <a
                href={HOTEL.yandexMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#B99A65] hover:text-[#D6C097] underline transition-colors"
              >
                <span>Yandex Xarita</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-semibold tracking-widest text-[#B99A65] uppercase">
              {t('nav.home')}
            </h4>
            <ul className="space-y-2 text-xs text-[#B9CBBF]">
              <li>
                <Link to={`/${lang}/rooms`} className="hover:text-[#B99A65] transition-colors">
                  {t('nav.rooms')}
                </Link>
              </li>
              <li>
                <Link to={`/${lang}/experiences`} className="hover:text-[#B99A65] transition-colors">
                  {t('nav.experiences')}
                </Link>
              </li>
              <li>
                <Link to={`/${lang}/about`} className="hover:text-[#B99A65] transition-colors">
                  {t('nav.about')}
                </Link>
              </li>
              <li>
                <Link to={`/${lang}/contact`} className="hover:text-[#B99A65] transition-colors">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details (4 cols) */}
          <div className="lg:col-span-4 space-y-3 text-xs text-[#B9CBBF]">
            <h4 className="font-serif text-sm font-semibold tracking-widest text-[#B99A65] uppercase">
              {t('contact.tag')}
            </h4>
            <div className="space-y-2.5">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B99A65] flex-shrink-0 mt-0.5" />
                <span>{HOTEL.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B99A65] flex-shrink-0" />
                <a href={`tel:${HOTEL.phoneRaw}`} className="text-[#F5F1E8] hover:text-[#B99A65] font-semibold transition-colors">
                  {HOTEL.phone} (24/7)
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B99A65] flex-shrink-0" />
                <a href={`mailto:${HOTEL.email}`} className="hover:text-[#B99A65] transition-colors">
                  {HOTEL.email}
                </a>
              </p>
              <p className="flex items-center gap-2.5 text-[#B99A65]">
                <Clock className="w-4 h-4 flex-shrink-0" />
                <span>{t('footer.checkTimes')}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A9C90]">
          <p>© {new Date().getFullYear()} Ziyorat Hotel. {t('footer.rights')}</p>
          <div className="flex items-center gap-4">
            <Link to={`/${lang}/booking`} className="text-[#B99A65] hover:underline font-semibold">
              {t('nav.bookNow')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
