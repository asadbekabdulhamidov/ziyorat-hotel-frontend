import React from 'react';
import { Helmet } from 'react-helmet-async';
import { HOTEL } from '../../data/hotelData';

interface SEOProps {
  title: string;
  description: string;
  lang: string;
  path?: string;
  image?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  lang,
  path = '',
  image = 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
}) => {
  const baseUrl = 'https://ziyorathotel.uz';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  const canonicalUrl = `${baseUrl}/${lang}${cleanPath === '/' ? '' : cleanPath}`;

  const supportedLangs = ['uz', 'ru', 'en', 'tr'];

  return (
    <Helmet>
      {/* Primary HTML & Title */}
      <html lang={lang} />
      {/* Tab title is always the brand name, in every language */}
      <title>Ziyorat</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Multilingual Hreflang Tags */}
      {supportedLangs.map((l) => (
        <link
          key={l}
          rel="alternate"
          hrefLang={l}
          href={`${baseUrl}/${l}${cleanPath === '/' ? '' : cleanPath}`}
        />
      ))}
      <link rel="alternate" hrefLang="x-default" href={`${baseUrl}/uz${cleanPath === '/' ? '' : cleanPath}`} />

      {/* Open Graph */}
      <meta property="og:type" content="hotel" />
      <meta property="og:site_name" content="Ziyorat" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content={lang === 'uz' ? 'uz_UZ' : lang === 'ru' ? 'ru_RU' : lang === 'tr' ? 'tr_TR' : 'en_US'} />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data Schema.org */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Hotel",
          "name": HOTEL.name,
          "alternateName": HOTEL.altName,
          "telephone": HOTEL.phone,
          "email": HOTEL.email,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Fergana",
            "addressLocality": "Fergana",
            "addressRegion": "Fergana Region",
            "addressCountry": "UZ"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": HOTEL.coordinates.lat,
            "longitude": HOTEL.coordinates.lng
          },
          "starRating": {
            "@type": "Rating",
            "ratingValue": HOTEL.stars
          },
          "checkinTime": HOTEL.checkIn,
          "checkoutTime": HOTEL.checkOut,
          "url": baseUrl
        })}
      </script>
    </Helmet>
  );
};
