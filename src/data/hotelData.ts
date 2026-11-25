export interface Room {
  id: string;
  category: 'deluxe' | 'suite' | 'family';
  name: {
    uz: string;
    ru: string;
    en: string;
    tr: string;
  };
  subtitle: {
    uz: string;
    ru: string;
    en: string;
    tr: string;
  };
  description: {
    uz: string;
    ru: string;
    en: string;
    tr: string;
  };
  price: number;
  priceFormatted: {
    uz: string;
    ru: string;
    en: string;
    tr: string;
  };
  size: string;
  capacity: number;
  bed: {
    uz: string;
    ru: string;
    en: string;
    tr: string;
  };
  image: string;
  gallery: string[];
  amenities: {
    uz: string[];
    ru: string[];
    en: string[];
    tr: string[];
  };
}

export const HOTEL = {
  name: "Ziyorat Hotel",
  altName: "Ziyorat Luxury Hotel",
  city: "Farg'ona / Fergana",
  stars: 4,
  phone: "+998 73 244 89 00",
  phoneRaw: "+998732448900",
  email: "hotel.ziyorat@mail.ru",
  address: "Farg'ona shahri, Farg'ona viloyati, O'zbekiston",
  addressEn: "Fergana City, Fergana Region, Uzbekistan",
  coordinates: {
    lat: 40.387296,
    lng: 71.790368
  },
  googleMapsUrl: "https://maps.google.com/?q=Ziyorat+Hotel+Fergana",
  yandexMapsUrl: "https://yandex.uz/maps/?text=Ziyorat+Hotel+Fergana",
  whatsappUrl: "https://wa.me/998732448900",
  checkIn: "14:00",
  checkOut: "12:00",
};

export const ZIYORAT_ROOMS: Room[] = [
  {
    id: "deluxe-twin",
    category: "deluxe",
    name: {
      uz: "Deluxe Ikki Kishilik (Twin)",
      ru: "Делюкс с двумя раздельными кроватями",
      en: "Deluxe Twin Room",
      tr: "Deluxe İki Yataklı Oda (Twin)"
    },
    subtitle: {
      uz: "Alohida to'shaklarni xush ko'ruvchi mehmonlar va hamkasblar uchun ideal shinam xona.",
      ru: "Прекрасный выбор для тех, кто путешествует вдвоем и предпочитает раздельные кровати.",
      en: "A refined retreat with two orthopedic single beds, ideal for travel partners and colleagues.",
      tr: "Ayrı yatak tercih eden seyahat arkadaşları ve iş ortakları için ideal konforlu oda."
    },
    description: {
      uz: "Ziyorat Hotelning Deluxe Twin xonasi tinch va yorug' muhitda joylashgan bo'lib, ikkita qulay ortopedik to'shak, yuqori tezlikdagi simsiz internet, zamonaviy konditsioner va shaxsiy vanna xonasi bilan to'liq jihozlangan.",
      ru: "Номер с двумя односпальными кроватями в гостинице Ziyorat — это прекрасный выбор для тех, кто путешествует вдвоем, но предпочитает отдельные спальные места. Просторная ванная комната, климат-контроль и рабочий стол.",
      en: "The Deluxe Twin room at Ziyorat Hotel features two plush single beds, tailored for comfort, productivity, and restful slumber. Equipped with smart climate control, fiber Wi-Fi, and an elegant en-suite bathroom.",
      tr: "Ziyorat Hotel Deluxe Twin odası, iki adet ortopedik tek kişilik yatak, yüksek hızlı Wi-Fi, klima ve modern banyo olanaklarıyla konforlu bir konaklama sunar."
    },
    price: 650000,
    priceFormatted: {
      uz: "650 000 UZS",
      ru: "650 000 UZS",
      en: "650,000 UZS",
      tr: "650.000 UZS"
    },
    size: "28 m²",
    capacity: 2,
    bed: {
      uz: "2 ta bir kishilik ortopedik to'shak",
      ru: "2 раздельные ортопедические кровати",
      en: "2 Orthopedic Single Beds",
      tr: "2 Tek Kişilik Ortopedik Yatak"
    },
    image: "/hotel/56e6c1e0e4d596c0.webp",
    gallery: [
      "/hotel/56e6c1e0e4d596c0.webp",
      "/hotel/7312659881f0213e.webp",
      "/hotel/026fc727c0145a69.webp",
      "/hotel/5f56929ff1e7fc51.webp"
    ],
    amenities: {
      uz: ["Shved stoli nonushtasi kiritilgan", "Turk hamomi va fin saunasi", "Ochiq va yopiq hovuz", "Tezyurar Wi-Fi & Smart TV", "Konditsioner", "Xavfsiz elektron seyf"],
      ru: ["Завтрак 'Шведский стол' включен", "Турецкий хаммам и сауна", "Бассейн (открытый / крытый)", "Скоростной Wi-Fi & Smart TV", "Климат-контроль", "Электронный сейф"],
      en: ["Breakfast Buffet included", "Turkish Hammam & Sauna access", "Dual Swimming Pools", "High-speed Wi-Fi & Smart TV", "Climate control", "In-room electronic safe"],
      tr: ["Açık büfe kahvaltı dahil", "Türk hamamı ve sauna kullanımı", "Açık ve kapalı havuz", "Hızlı Wi-Fi ve Smart TV", "Klima", "Elektronik kasa"]
    }
  },
  {
    id: "deluxe-king",
    category: "deluxe",
    name: {
      uz: "Deluxe Katta Karavotli Xona (King Size)",
      ru: "Делюкс с одной большой кроватью King Size",
      en: "Deluxe King Room",
      tr: "Deluxe King Yataklı Oda"
    },
    subtitle: {
      uz: "Katta King Size to'shak, sokin interyer va juftliklar uchun mukammal shinamlik.",
      ru: "Воплощение комфорта и уюта для тех, кто ценит максимальное удобство и широкое пространство.",
      en: "An expansive King Size bed, custom woodwork, and refined relaxation for couples or solo guests.",
      tr: "Geniş King Size yatak, zarif detaylar ve çiftler için huzurlu bir dinlenme ortamı."
    },
    description: {
      uz: "King Size karavotga ega Deluxe xona yuqori qulaylik va kenglikni xush ko'ruvchilar uchun yaratilgan. Katta derazalar xonani tabiiy yorug'lik bilan to'ldiradi, premium to'qimachilik buyumlari esa unutilmas uyqu hadya etadi.",
      ru: "Номер с большой кроватью King Size в гостинице Ziyorat — это воплощение комфорта и роскоши для тех, кто ценит максимальное удобство и пространство. Просторная комната с панорамным освещением.",
      en: "Our Deluxe King Room offers a sanctuary of peace featuring an oversized King mattress, curated art pieces, and an ergonomic work corner. Ideal for business leaders and romantic getaways.",
      tr: "King yataklı Deluxe odamız, geniş yaşam alanı ve kaliteli yatak tekstili ile günün yorgunluğunu atmak için mükemmel bir atmosfer sunar."
    },
    price: 750000,
    priceFormatted: {
      uz: "750 000 UZS",
      ru: "750 000 UZS",
      en: "750,000 UZS",
      tr: "750.000 UZS"
    },
    size: "32 m²",
    capacity: 2,
    bed: {
      uz: "1 ta katta King Size karavot",
      ru: "1 большая двуспальная кровать King Size",
      en: "1 Plush King Size Bed",
      tr: "1 Büyük Çift Kişilik King Yatak"
    },
    image: "/hotel/122397b3a2907070.webp",
    gallery: [
      "/hotel/122397b3a2907070.webp",
      "/hotel/fb082889a68ce49f.webp",
      "/hotel/03409af59db5da11.webp",
      "/hotel/c604df7245d7edaa.webp"
    ],
    amenities: {
      uz: ["Shved stoli nonushtasi", "Hovuz va turk hamomi", "Minibar va choy to'plami", "Shaxsiy vanna va xalatlar", "Smart TV", "Xona xizmati"],
      ru: ["Завтрак 'Шведский стол'", "Бассейн и хаммам", "Минибар и чайный набор", "Ванна, халаты и тапочки", "Smart TV", "Обслуживание в номере"],
      en: ["Daily Buffet Breakfast", "Pool & Hammam access", "Minibar & Coffee station", "En-suite bath & luxury robes", "Smart TV", "24/7 Room Service"],
      tr: ["Açık büfe kahvaltı", "Havuz ve hamam girişi", "Minibar ve çay seti", "Özel banyo ve bornozlar", "Smart TV", "Oda servisi"]
    }
  },
  {
    id: "executive-suite",
    category: "suite",
    name: {
      uz: "Ziyorat Hashamatli Qirol Lyuksi (Grand Suite)",
      ru: "Люкс с большой кроватью и гостиной",
      en: "Ziyorat Grand Executive Suite",
      tr: "Ziyorat Grand Executive Süit"
    },
    subtitle: {
      uz: "Alohida mehmonxona zali, hashamatli yotoqxona va VIP xizmat ko'rsatish darajasi.",
      ru: "Идеальный выбор для ценителей роскоши, пространства и исключительного сервиса.",
      en: "Opulent two-room suite featuring a dedicated salon lounge, marble bathroom, and VIP touches.",
      tr: "Geniş oturma odası, lüks yatak odası ve VIP hizmet arayanlar için en prestijli süitimiz."
    },
    description: {
      uz: "Ziyorat Hotelning eng nufuzli xonalaridan biri bo'lgan Grand Suite — nafis mebellar bilan bezatilgan alohida mehmonxona zali, qirollarcha yotoqxona, marmar vanna va Farg'ona shahriga qaragan manzarani o'z ichiga oladi.",
      ru: "Люкс номер с одной большой кроватью в гостинице Ziyorat — это идеальный выбор для тех, кто ценит роскошь, комфорт и высокий уровень обслуживания. Просторная гостиная зона, спальня с премиальным матрасом.",
      en: "The Grand Executive Suite redefines boutique luxury in the Fergana Valley. Combining a private salon for business or leisure with a serene master bedroom, it offers uninhibited space and elevated comfort.",
      tr: "Ziyorat Grand Executive Süit, ayrı oturma salonu, şık mermer banyosu ve ferah atmosferi ile hem iş hem tatil seyahatleriniz için kusursuz bir deneyim vadeder."
    },
    price: 1350000,
    priceFormatted: {
      uz: "1 350 000 UZS",
      ru: "1 350 000 UZS",
      en: "1,350,000 UZS",
      tr: "1.350.000 UZS"
    },
    size: "55 m²",
    capacity: 3,
    bed: {
      uz: "1 ta Grand King Size to'shak + Divan",
      ru: "1 Grand King Size кровать + диван",
      en: "1 Grand King Bed + Luxury Sofa",
      tr: "1 Grand King Yatak + Lüks Koltuk"
    },
    image: "/hotel/37b695bd79564788.webp",
    gallery: [
      "/hotel/37b695bd79564788.webp",
      "/hotel/e157352c90060031.webp",
      "/hotel/4e2eced059b01bc1.webp",
      "/hotel/85f8f293c50f6658.webp"
    ],
    amenities: {
      uz: ["Xonaga bepul yetkaziladigan nonushta", "Alohida mehmonxona zali", "Marmar vanna va dush", "Turk hamomi & sauna", "VIP aeroport transferi", "Nespresso qahva mashinasi"],
      ru: ["Завтрак в номер по желанию", "Отдельная гостиная комната", "Мраморная ванная", "Хаммам и сауна", "VIP трансфер из аэропорта", "Кофемашина Nespresso"],
      en: ["In-suite Gourmet Breakfast option", "Separate Living Room salon", "Italian marble bathroom", "Full Hammam & Sauna access", "VIP Airport Transfer on request", "Nespresso coffee machine"],
      tr: ["İsteğe göre odaya servis kahvaltı", "Ayrı oturma odası", "Mermer banyo", "Türk hamamı ve sauna", "VIP havalimanı transferi", "Nespresso kahve makinesi"]
    }
  },
  {
    id: "family-suite",
    category: "family",
    name: {
      uz: "Oilaviy Ikki Xonali Suite (Family)",
      ru: "Семейный двухкомнатный сьют",
      en: "Family Two-Bedroom Suite",
      tr: "Aile İki Odalı Süit"
    },
    subtitle: {
      uz: "Bolali oilalar va yaqinlar uchun keng, shinam va alohida xonalarga ega turar joy.",
      ru: "Просторный номер для семьи с детьми: две изолированные спальни и максимальный уют.",
      en: "Harmonious two-room apartment layout accommodating families with children in complete privacy.",
      tr: "Çocuklu aileler için tasarlanmış, iki ayrı yatak odalı ferah ve konforlu aile süiti."
    },
    description: {
      uz: "Oilaviy sayohatlar uchun mo'ljallangan ushbu keng suit ikkita mustaqil yotoqxona, bolalar uchun xavfsiz sharoitlar, ikkita televizor va qulay ovqatlanish burchagini o'z ichiga oladi.",
      ru: "Идеальное решение для комфортного семейного отдыха в Фергане: раздельные спальные зоны для родителей и детей, уютная атмосфера и абсолютная тишина.",
      en: "Engineered specifically for visiting families, this interconnected suite ensures peace of mind with separate master and twin bedrooms, two flat screens, and welcoming domestic comfort.",
      tr: "Aileler için özel olarak kurgulanan bu süit, ebeveyn ve çocuklar için iki bağımsız yatak odası ile ev konforunda tatil imkanı sunar."
    },
    price: 1650000,
    priceFormatted: {
      uz: "1 650 000 UZS",
      ru: "1 650 000 UZS",
      en: "1,650,000 UZS",
      tr: "1.650.000 UZS"
    },
    size: "65 m²",
    capacity: 4,
    bed: {
      uz: "1 King Bed + 2 Twin karavotlar",
      ru: "1 кровать King Size + 2 раздельные кровати",
      en: "1 King Bed + 2 Twin Beds",
      tr: "1 King Yatak + 2 Tek Kişilik Yatak"
    },
    image: "/hotel/37c40b8207a45a97.webp",
    gallery: [
      "/hotel/37c40b8207a45a97.webp",
      "/hotel/d54bd0d0c6c04cfe.webp",
      "/hotel/66da085fbaf246b2.webp",
      "/hotel/a27f11154bf59335.webp"
    ],
    amenities: {
      uz: ["Barcha oila a'zolari uchun nonushta", "Ikkita alohida yotoqxona", "Bolalar uchun qulayliklar", "Basseyn va dam olish", "Katta Smart TV lar", "Muzlatgich va minibar"],
      ru: ["Завтрак для всех членов семьи", "Две изолированные спальни", "Детские принадлежности", "Бассейн и хаммам", "2 Smart TV", "Холодильник и минибар"],
      en: ["Full breakfast for all guests", "Two separate bedrooms", "Children friendly amenities", "Pool & leisure access", "Two Smart TVs", "Refrigerator & minibar"],
      tr: ["Tüm aile için açık büfe kahvaltı", "İki bağımsız yatak odası", "Çocuk dostu olanaklar", "Havuz ve dinlenme alanı", "İki adet Smart TV", "Buzdolabı ve minibar"]
    }
  }
];
