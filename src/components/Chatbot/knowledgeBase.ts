export interface KnowledgeItem {
  keywords: string[];
  answer: string;
  action?: {
    label: string;
    url: string;
    type: 'link' | 'download' | 'contact';
  };
}

export const KNOWLEDGE_BASE: Record<string, KnowledgeItem[]> = {
  en: [
    {
      keywords: ['what is fas lift', 'faslift', 'company', 'who we are', 'about us'],
      answer: 'FAS LIFT is a specialized company dedicated to supplying high-quality elevator overspeed governors, providing reliable safety solutions for modern vertical transportation systems. Founded in 2021, we focus on delivering durable, high-performance safety components that meet international standards (EN 81-20/50).',
      action: {
        label: 'Read More About Us',
        url: '/about',
        type: 'link'
      }
    },
    {
      keywords: ['speed governor', 'product', 'fs-01', 'fs-200', 'fs-250', 'what do you sell', 'models'],
      answer: 'We manufacture premium overspeed governors including: \n- FS-01 Monodirectional (pulley Ø300mm)\n- FS-01LR Bidirectional (pulley Ø300mm)\n- FS-200 Bidirectional (pulley Ø200mm)\n- FS-250 Bidirectional (pulley Ø250mm)\n\nAll models are certified by TÜV SÜD and comply with EN 81-20/50 standards.',
      action: {
        label: 'View Governors Page',
        url: '/products/speed-governors',
        type: 'link'
      }
    },
    {
      keywords: ['maximum speed', 'max speed', 'nominal speed', 'tripping speed', 'technical specifications', 'specs'],
      answer: 'The speed properties depend on the model:\n- FS-01 & FS-01LR: Nominal speed up to 1.6 m/s, Tripping speed 0.41 to 2.57 m/s.\n- FS-200: Nominal speed up to 1.83 m/s, Tripping speed 0.30 to 2.11 m/s.\n- FS-250: Nominal speed up to 1.96 m/s, Tripping speed 0.31 to 2.25 m/s.',
      action: {
        label: 'View Specifications',
        url: '/products/speed-governors?tab=specs',
        type: 'link'
      }
    },
    {
      keywords: ['download catalog', 'catalog', 'catalogue', 'brochure', 'pdf'],
      answer: 'You can download the official FAS LIFT Product Catalog (PDF) to browse our full list of speed governors, safety gears, and accessories.',
      action: {
        label: 'Download Catalog (PDF)',
        url: '/images/catalog.pdf',
        type: 'download'
      }
    },
    {
      keywords: ['order form', 'order', 'form pdf', 'buy', 'purchase'],
      answer: 'Please download and fill out our official Overspeed Governor Order Form PDF to specify your governor requirements (pulley diameter, coil type, voltage, direction, rope, nominal speed, etc.).',
      action: {
        label: 'Download Order Form (PDF)',
        url: '/images/FAS_LIFT_Overspeed_Governor_Order_Form.pdf',
        type: 'download'
      }
    },
    {
      keywords: ['contact', 'phone', 'email', 'whatsapp', 'how to reach', 'address', 'office'],
      answer: 'You can reach us through multiple channels:\n- Phone: +212 653-660399\n- Email: faslift@outlook.com\n- WhatsApp: +212 653-660399\n- Address: Zone Industrielle, Bloc B, No 7, Casablanca 20250, Morocco.',
      action: {
        label: 'Contact Details',
        url: '/corporate/contact',
        type: 'contact'
      }
    },
    {
      keywords: ['certificates', 'ce', 'tuv', 'tsek', 'iso', 'standards'],
      answer: 'Our products hold prestigious international quality certifications including:\n- CE Certificates (under Directive 2014/33/EU)\n- TÜV SÜD compliance approvals (EN 81-20/50)\n- TSEK Certificates\n- EAC Certificates (Gost TP TC 011/2011)\n- ISO 9001, ISO 14001, and ISO 45001 Quality Management Standards.',
      action: {
        label: 'Download Certificates',
        url: '/catalog',
        type: 'link'
      }
    },
    {
      keywords: ['tension weight', 'counterweight', 'fl-tw', 'weight'],
      answer: 'FAS LIFT offers multiple compatible tension weights for the FS-01 governor family, including standard, heavy, compact, spring, vertical, adjustable, and universal models.',
      action: {
        label: 'View Optional Accessories',
        url: '/products/speed-governors?tab=optional',
        type: 'link'
      }
    },
    {
      keywords: ['production', 'manufacturing', 'cnc', 'factory', 'quality control'],
      answer: 'Our production line in Casablanca combines state-of-the-art multi-axis CNC milling, expert manual assembly, and 100% mechanical stress testing to ensure zero-defect safety components.',
      action: {
        label: 'Explore Production Process',
        url: '/corporate/production',
        type: 'link'
      }
    }
  ],
  fr: [
    {
      keywords: ['c\'est quoi fas lift', 'faslift', 'entreprise', 'qui sommes nous', 'a propos', 'propos'],
      answer: 'FAS LIFT est une entreprise spécialisée dans la fourniture de limiteurs de vitesse et de solutions de sécurité pour ascenseurs modernisés et neufs. Fondée en 2021, l\'entreprise est axée sur la qualité et la conformité aux normes internationales (EN 81-20/50).',
      action: {
        label: 'En savoir plus',
        url: '/about',
        type: 'link'
      }
    },
    {
      keywords: ['limiteur de vitesse', 'produits', 'fs-01', 'fs-200', 'fs-250', 'modeles', 'vente'],
      answer: 'Nous fabriquons des limiteurs de vitesse de précision, notamment:\n- FS-01 Monodirectionnel (poulie Ø300mm)\n- FS-01LR Bidirectionnel (poulie Ø300mm)\n- FS-200 Bidirectionnel (poulie Ø200mm)\n- FS-250 Bidirectionnel (poulie Ø250mm)\n\nTous nos modèles sont certifiés TÜV SÜD et conformes aux exigences EN 81-20/50.',
      action: {
        label: 'Voir la page des limiteurs',
        url: '/products/speed-governors',
        type: 'link'
      }
    },
    {
      keywords: ['vitesse maximale', 'vitesse max', 'vitesse nominale', 'vitesse declenchement', 'specifications techniques', 'specs'],
      answer: 'Les spécifications de vitesse dépendent du modèle:\n- FS-01 & FS-01LR: Vitesse nominale jusqu\'à 1,6 m/s, Déclenchement de 0,41 à 2,57 m/s.\n- FS-200: Vitesse nominale jusqu\'à 1,83 m/s, Déclenchement de 0,30 à 2,11 m/s.\n- FS-250: Vitesse nominale jusqu\'à 1,96 m/s, Déclenchement de 0,31 à 2,25 m/s.',
      action: {
        label: 'Voir les spécifications',
        url: '/products/speed-governors?tab=specs',
        type: 'link'
      }
    },
    {
      keywords: ['telecharger catalogue', 'catalogue', 'brochure', 'pdf'],
      answer: 'Vous pouvez télécharger le catalogue technique officiel de FAS LIFT (PDF) pour découvrir l\'ensemble de nos limiteurs de vitesse et de nos accessoires.',
      action: {
        label: 'Télécharger le catalogue (PDF)',
        url: '/images/catalog.pdf',
        type: 'download'
      }
    },
    {
      keywords: ['bon de commande', 'commande', 'formulaire', 'acheter', 'achat'],
      answer: 'Veuillez télécharger et remplir notre formulaire de commande officiel (PDF) pour spécifier vos besoins techniques (diamètre poulie, bobine, tension, câble, vitesse nominale, etc.).',
      action: {
        label: 'Télécharger le bon de commande (PDF)',
        url: '/images/FAS_LIFT_Overspeed_Governor_Order_Form.pdf',
        type: 'download'
      }
    },
    {
      keywords: ['contact', 'telephone', 'email', 'whatsapp', 'adresse', 'bureau', 'joindre'],
      answer: 'Vous pouvez nous contacter via:\n- Téléphone: +212 653-660399\n- E-mail: faslift@outlook.com\n- WhatsApp: +212 653-660399\n- Adresse: Zone Industrielle, Bloc B, No 7, Casablanca 20250, Maroc.',
      action: {
        label: 'Coordonnées de contact',
        url: '/corporate/contact',
        type: 'contact'
      }
    },
    {
      keywords: ['certificats', 'ce', 'tuv', 'tsek', 'iso', 'normes'],
      answer: 'Nos composants disposent de certifications de qualité internationales:\n- Certificats CE (Directive 2014/33/UE)\n- Conformité TÜV SÜD (EN 81-20/50)\n- Certificats TSEK et EAC (Gost TP TC 011/2011)\n- Certifications ISO 9001, ISO 14001 et ISO 45001.',
      action: {
        label: 'Voir les certificats',
        url: '/catalog',
        type: 'link'
      }
    },
    {
      keywords: ['poulie de tension', 'poids de tension', 'fl-tw', 'tendeur'],
      answer: 'Nous proposons divers modèles de poulies de tension compatibles avec la famille FS-01: standard, lourd, compact, à ressort, vertical, réglable et universel.',
      action: {
        label: 'Voir les tendeurs',
        url: '/products/speed-governors?tab=optional',
        type: 'link'
      }
    }
  ],
  tr: [
    {
      keywords: ['fas lift nedir', 'faslift', 'firma', 'biz kimiz', 'hakkimizda', 'hakkında'],
      answer: 'FAS LIFT, modern asansör güvenlik sistemleri ve hız regülatörleri üretiminde uzmanlaşmış, güvenilir güvenlik çözümleri sunan bir markadır. 2021 yılında kurulan firmamız, uluslararası EN 81-20/50 standartlarına uygun, yüksek kaliteli güvenlik bileşenleri sunmaktadır.',
      action: {
        label: 'Daha Fazla Bilgi',
        url: '/about',
        type: 'link'
      }
    },
    {
      keywords: ['hiz regulatoru', 'hız regülatörü', 'urunler', 'ürünler', 'fs-01', 'fs-200', 'fs-250', 'modeller'],
      answer: 'Ürettiğimiz hassas hız regülatörü modelleri:\n- FS-01 Tek Yönlü (kasnak Ø300mm)\n- FS-01LR Çift Yönlü (kasnak Ø300mm)\n- FS-200 Çift Yönlü (kasnak Ø200mm)\n- FS-250 Çift Yönlü (kasnak Ø250mm)\n\nTüm modellerimiz TÜV SÜD onaylı olup EN 81-20/50 standartlarına tam uyumludur.',
      action: {
        label: 'Regülatörler Sayfası',
        url: '/products/speed-governors',
        type: 'link'
      }
    },
    {
      keywords: ['maksimum hiz', 'maksimun hız', 'nominal hiz', 'nominal hız', 'atma hızı', 'teknik ozellikler', 'teknik özellikler'],
      answer: 'Modellere göre hız özellikleri:\n- FS-01 & FS-01LR: 1.6 m/s nominal hız, 0.41 - 2.57 m/s atma hızı.\n- FS-200: 1.83 m/s nominal hız, 0.30 - 2.11 m/s atma hızı.\n- FS-250: 1.96 m/s nominal hız, 0.31 - 2.25 m/s atma hızı.',
      action: {
        label: 'Teknik Özellikleri İncele',
        url: '/products/speed-governors?tab=specs',
        type: 'link'
      }
    },
    {
      keywords: ['katalog indir', 'katalog', 'brosur', 'broşür', 'pdf'],
      answer: 'FAS LIFT Hız Regülatörleri ve güvenlik bileşenleri teknik detaylarını içeren resmi ürün kataloğunu PDF olarak indirebilirsiniz.',
      action: {
        label: 'Kataloğu İndir (PDF)',
        url: '/images/catalog.pdf',
        type: 'download'
      }
    },
    {
      keywords: ['siparis formu', 'sipariş formu', 'form indir', 'satın alma', 'siparis'],
      answer: 'Hız Regülatörü Sipariş Formu PDF\'ini indirip kasnak çapı, bobin durumu, voltaj, yön, halat gibi teknik parametrelerinizi belirleyerek sipariş talebinizi oluşturabilirsiniz.',
      action: {
        label: 'Sipariş Formunu İndir (PDF)',
        url: '/images/FAS_LIFT_Overspeed_Governor_Order_Form.pdf',
        type: 'download'
      }
    },
    {
      keywords: ['iletisim', 'telefon', 'e-posta', 'eposta', 'whatsapp', 'adres', 'ofis', 'ulasim'],
      answer: 'Bizimle iletişime geçebileceğiniz kanallar:\n- Telefon: +212 653-660399\n- E-posta: faslift@outlook.com\n- WhatsApp: +212 653-660399\n- Adres: Zone Industrielle, Bloc B, No 7, Kazablanka 20250, Fas.',
      action: {
        label: 'İletişim Bilgileri',
        url: '/corporate/contact',
        type: 'contact'
      }
    },
    {
      keywords: ['sertifikalar', 'ce', 'tuv', 'tsek', 'iso', 'standartlar'],
      answer: 'Ürünlerimiz uluslararası standartlara uygun sertifikalara sahiptir:\n- CE Sertifikaları (2014/33/EU Direktifi)\n- TÜV SÜD EN 81-20/50 onay belgeleri\n- TSEK Belgeleri\n- EAC Sertifikaları (Gost TP TC 011/2011)\n- ISO 9001, ISO 14001 ve ISO 45001 Kalite Standartları.',
      action: {
        label: 'Sertifikaları İncele',
        url: '/catalog',
        type: 'link'
      }
    },
    {
      keywords: ['gergi kasnagi', 'gergi ağırlığı', 'fl-tw', 'gergi'],
      answer: 'FS-01 regülatör ailesi ile uyumlu standart, ağır, kompakt, yaylı, dikey, ayarlanabilir ve üniversal gergi kasnağı/ağırlık modellerimiz mevcuttur.',
      action: {
        label: 'Gergi Kasnaklarını Gör',
        url: '/products/speed-governors?tab=optional',
        type: 'link'
      }
    }
  ]
};
