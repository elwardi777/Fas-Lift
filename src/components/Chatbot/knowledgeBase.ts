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
      keywords: ['what is fas lift', 'faslift', 'company', 'who we are', 'about us', 'fas lift'],
      answer: 'FAS LIFT is a specialized company dedicated to supplying high-quality elevator overspeed governors, tensioner pulleys, and cast iron traction pulleys for modern vertical transportation systems. Founded in 2021, we focus on delivering durable, high-performance safety components that meet international standards (EN 81-20/50).',
      action: {
        label: 'Read More About Us',
        url: '/about',
        type: 'link'
      }
    },
    {
      keywords: [
        'tensioner pulley',
        'tensioner-pulley',
        '/tensioner-pulley',
        'tensioner',
        'pulley tensioner',
        'rope tensioner',
        'fs-tp01',
        'tp01',
        'elevator tensioning',
        'tensioning pulley',
        'tensioning',
        'tensioner pulley page'
      ],
      answer: 'FS-TP01 — Tensioner Pulley is our high-precision rope tensioning safety component for elevator safety.\n\nVerified Specifications:\n- Model Code: FS-TP01\n- Overall Length: 546.00 mm\n- Reference Height: 192.00 mm\n- Overall Height: 355.30 mm\n- Secondary Ref. Height: 291.97 mm\n- Width: 76.00 mm\n- Packaging Dimensions: 560 × 110 × 280 mm\n- Standards: EN 81-20/50, TÜV SÜD Approved, 2014/33/EU Directive\n- Key Features: Spring-loaded tensioning wheel, integrated safety contact switch, heavy-duty steel body.',
      action: {
        label: 'View Tensioner Pulley Page',
        url: '/products/tensioner-pulley',
        type: 'link'
      }
    },
    {
      keywords: [
        'pulleys',
        'pulley',
        'pulleys page',
        '/products/pulleys',
        '/pulleys',
        'cast iron pulley',
        'v-belt pulley',
        'v belt pulley',
        'traction pulley',
        'cast iron',
        'ggg-50',
        'ggg50',
        'fs-p210',
        'fs-p240',
        'fs-p320',
        'fs-p400',
        'p210',
        'p240',
        'p320',
        'p400'
      ],
      answer: 'We manufacture premium Cast Iron V-Belt Traction Pulleys (GGG-50 grade) designed for smooth power transmission and long elevator cable life:\n\n1. FS-P210: Pulley Ø210 mm | Shaft Bore Ø50 mm | Cast Iron GGG-50\n2. FS-P240: Pulley Ø240 mm | Shaft Bore Ø80 mm | Cast Iron GGG-50\n3. FS-P320: Pulley Ø320 mm | Shaft Bore Ø90 mm | Cast Iron GGG-50\n4. FS-P400: Pulley Ø400 mm | Shaft Bore Ø90 mm | Cast Iron GGG-50\n\nAll pulleys are CNC precision-turned and EN81-20/50 certified.',
      action: {
        label: 'View Pulleys Page',
        url: '/products/pulleys',
        type: 'link'
      }
    },
    {
      keywords: ['fs-p210', 'p210', 'pulley 210', 'pulley 210mm'],
      answer: 'FS-P210 — Cast Iron V-Belt Pulley (210 mm):\n- Pulley Diameter: 210 mm\n- Shaft Bore Diameter: 50 mm\n- Material Grade: Cast Iron GGG-50\n- Product Type: V-Belt Traction Pulley\n- Standard: EN 81-20/50 Certified',
      action: {
        label: 'View FS-P210 Details',
        url: '/products/pulleys',
        type: 'link'
      }
    },
    {
      keywords: ['fs-p240', 'p240', 'pulley 240', 'pulley 240mm'],
      answer: 'FS-P240 — Cast Iron V-Belt Pulley (240 mm):\n- Pulley Diameter: 240 mm\n- Shaft Bore Diameter: 80 mm\n- Material Grade: Cast Iron GGG-50\n- Product Type: V-Belt Traction Pulley\n- Standard: EN 81-20/50 Certified',
      action: {
        label: 'View FS-P240 Details',
        url: '/products/pulleys',
        type: 'link'
      }
    },
    {
      keywords: ['fs-p320', 'p320', 'pulley 320', 'pulley 320mm'],
      answer: 'FS-P320 — Cast Iron V-Belt Pulley (320 mm):\n- Pulley Diameter: 320 mm\n- Shaft Bore Diameter: 90 mm\n- Material Grade: Cast Iron GGG-50\n- Product Type: V-Belt Traction Pulley\n- Standard: EN 81-20/50 Certified',
      action: {
        label: 'View FS-P320 Details',
        url: '/products/pulleys',
        type: 'link'
      }
    },
    {
      keywords: ['fs-p400', 'p400', 'pulley 400', 'pulley 400mm'],
      answer: 'FS-P400 — Cast Iron V-Belt Pulley (400 mm):\n- Pulley Diameter: 400 mm\n- Shaft Bore Diameter: 90 mm\n- Material Grade: Cast Iron GGG-50\n- Product Type: V-Belt Traction Pulley\n- Standard: EN 81-20/50 Certified',
      action: {
        label: 'View FS-P400 Details',
        url: '/products/pulleys',
        type: 'link'
      }
    },
    {
      keywords: [
        'speed governor',
        'speed governors',
        'overspeed governor',
        'governors',
        'governor',
        'product',
        'products',
        'fs-01',
        'fs-01lr',
        'fs-200',
        'fs-250',
        'models'
      ],
      answer: 'We manufacture premium certified overspeed governors including:\n- FS-01 Bidirectional (pulley Ø300mm)\n- FS-01LR Bidirectional (pulley Ø300mm)\n- FS-200 Bidirectional (pulley Ø200mm)\n- FS-250 Bidirectional (pulley Ø250mm)\n\nAll models are certified by TÜV SÜD and comply with EN 81-20/50 standards.',
      action: {
        label: 'View Speed Governors Page',
        url: '/products/speed-governors',
        type: 'link'
      }
    },
    {
      keywords: ['maximum speed', 'max speed', 'nominal speed', 'tripping speed', 'technical specifications', 'specs'],
      answer: 'The speed properties depend on the governor model:\n- FS-01 & FS-01LR: Nominal speed up to 1.6 m/s, Tripping speed 0.41 to 2.57 m/s.\n- FS-200: Nominal speed up to 1.83 m/s, Tripping speed 0.30 to 2.11 m/s.\n- FS-250: Nominal speed up to 1.96 m/s, Tripping speed 0.31 to 2.25 m/s.',
      action: {
        label: 'View Specifications',
        url: '/products/speed-governors?tab=specs',
        type: 'link'
      }
    },
    {
      keywords: ['download catalog', 'catalog', 'catalogue', 'brochure', 'pdf'],
      answer: 'You can download the official FAS LIFT Product Catalog (PDF) to browse our full list of speed governors, tensioner pulleys, cast iron pulleys, and safety accessories.',
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
      answer: 'You can reach us through multiple channels:\n- Phone: +90 531 613 9223 / +90 531 634 8986\n- Email: info@faslift.com / faslift@outlook.com\n- WhatsApp: +90 531 613 9223\n- Address: Ikitelli OSB, Aykosan Industrial Estate 34490 Basaksehir/Istanbul, Turkey.',
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
      answer: 'Our production lines combine state-of-the-art multi-axis CNC milling, expert manual assembly, and 100% mechanical stress testing to ensure zero-defect elevator safety components.',
      action: {
        label: 'Explore Production Process',
        url: '/corporate/production',
        type: 'link'
      }
    }
  ],
  fr: [
    {
      keywords: ['c\'est quoi fas lift', 'faslift', 'entreprise', 'qui sommes nous', 'a propos', 'propos', 'fas lift'],
      answer: 'FAS LIFT est une entreprise spécialisée dans la fourniture de limiteurs de vitesse, poulies tendeuses et poulies de traction en fonte pour ascenseurs modernisés et neufs. Fondée en 2021, l\'entreprise est axée sur la qualité et la conformité aux normes internationales (EN 81-20/50).',
      action: {
        label: 'En savoir plus',
        url: '/about',
        type: 'link'
      }
    },
    {
      keywords: [
        'poulie tendeuse',
        'poulie-tendeuse',
        'poulie tensorielle',
        'tendeuse',
        'tendeur',
        'tendeur de cable',
        'fs-tp01',
        'tp01',
        '/tensioner-pulley',
        'tensioner pulley',
        'poulie de tension'
      ],
      answer: 'FS-TP01 — Poulie Tendeuse est notre composant de précision pour le tensionnement du câble d\'ascenseur.\n\nSpécifications vérifiées:\n- Code Modèle: FS-TP01\n- Longueur totale: 546.00 mm\n- Hauteur de référence: 192.00 mm\n- Hauteur totale: 355.30 mm\n- Hauteur réf. secondaire: 291.97 mm\n- Largeur: 76.00 mm\n- Dimensions emballage: 560 × 110 × 280 mm\n- Normes: EN 81-20/50, Approuvé TÜV SÜD, Directive 2014/33/UE\n- Caractéristiques: Roue tendeuse avec mécanisme à ressort, interrupteur de contact de sécurité intégré, corps en acier haute résistance.',
      action: {
        label: 'Voir Poulie Tendeuse',
        url: '/products/tensioner-pulley',
        type: 'link'
      }
    },
    {
      keywords: [
        'poulies',
        'poulie',
        'poulie en fonte',
        'poulie gorge v',
        'poulie de traction',
        'fonte',
        'ggg-50',
        'ggg50',
        'fs-p210',
        'fs-p240',
        'fs-p320',
        'fs-p400',
        'p210',
        'p240',
        'p320',
        'p400',
        '/pulleys',
        '/products/pulleys'
      ],
      answer: 'Nous fabriquons des poulies de traction à gorge en V en fonte haute résistance (GGG-50):\n\n1. FS-P210: Poulie Ø210 mm | Arbre Ø50 mm | Fonte GGG-50\n2. FS-P240: Poulie Ø240 mm | Arbre Ø80 mm | Fonte GGG-50\n3. FS-P320: Poulie Ø320 mm | Arbre Ø90 mm | Fonte GGG-50\n4. FS-P400: Poulie Ø400 mm | Arbre Ø90 mm | Fonte GGG-50\n\nUsinées avec précision CNC et certifiées EN81-20/50.',
      action: {
        label: 'Voir la page des Poulies',
        url: '/products/pulleys',
        type: 'link'
      }
    },
    {
      keywords: ['fs-p210', 'p210', 'poulie 210', 'poulie 210mm'],
      answer: 'FS-P210 — Poulie en Fonte (210 mm):\n- Diamètre poulie: 210 mm\n- Diamètre d\'arbre: 50 mm\n- Matériau: Fonte GGG-50\n- Type: Poulie de traction à gorge en V\n- Norme: Certifié EN 81-20/50',
      action: {
        label: 'Détails FS-P210',
        url: '/products/pulleys',
        type: 'link'
      }
    },
    {
      keywords: ['fs-p240', 'p240', 'poulie 240', 'poulie 240mm'],
      answer: 'FS-P240 — Poulie en Fonte (240 mm):\n- Diamètre poulie: 240 mm\n- Diamètre d\'arbre: 80 mm\n- Matériau: Fonte GGG-50\n- Type: Poulie de traction à gorge en V\n- Norme: Certifié EN 81-20/50',
      action: {
        label: 'Détails FS-P240',
        url: '/products/pulleys',
        type: 'link'
      }
    },
    {
      keywords: ['fs-p320', 'p320', 'poulie 320', 'poulie 320mm'],
      answer: 'FS-P320 — Poulie en Fonte (320 mm):\n- Diamètre poulie: 320 mm\n- Diamètre d\'arbre: 90 mm\n- Matériau: Fonte GGG-50\n- Type: Poulie de traction à gorge en V\n- Norme: Certifié EN 81-20/50',
      action: {
        label: 'Détails FS-P320',
        url: '/products/pulleys',
        type: 'link'
      }
    },
    {
      keywords: ['fs-p400', 'p400', 'poulie 400', 'poulie 400mm'],
      answer: 'FS-P400 — Poulie en Fonte (400 mm):\n- Diamètre poulie: 400 mm\n- Diamètre d\'arbre: 90 mm\n- Matériau: Fonte GGG-50\n- Type: Poulie de traction à gorge en V\n- Norme: Certifié EN 81-20/50',
      action: {
        label: 'Détails FS-P400',
        url: '/products/pulleys',
        type: 'link'
      }
    },
    {
      keywords: ['limiteur de vitesse', 'limiteurs', 'produits', 'fs-01', 'fs-01lr', 'fs-200', 'fs-250', 'modeles', 'vente'],
      answer: 'Nous fabriquons des limiteurs de vitesse de précision certifiés, notamment:\n- FS-01 Bidirectionnel (poulie Ø300mm)\n- FS-01LR Bidirectionnel (poulie Ø300mm)\n- FS-200 Bidirectionnel (poulie Ø200mm)\n- FS-250 Bidirectionnel (poulie Ø250mm)\n\nTous nos modèles sont certifiés TÜV SÜD et conformes aux exigences EN 81-20/50.',
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
      answer: 'Vous pouvez télécharger le catalogue technique officiel de FAS LIFT (PDF) pour découvrir l\'ensemble de nos limiteurs de vitesse, poulies tendeuses, poulies en fonte et accessoires.',
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
      answer: 'Vous pouvez nous contacter via:\n- Téléphone: +90 531 613 9223 / +90 531 634 8986\n- E-mail: info@faslift.com / faslift@outlook.com\n- WhatsApp: +90 531 613 9223\n- Adresse: Ikitelli OSB, Zone Industrielle Aykosan 34490 Basaksehir/Istanbul, Turquie.',
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
      answer: 'Nous proposons divers modèles de poids de tension compatibles avec la famille FS-01: standard, lourd, compact, à ressort, vertical, réglable et universel.',
      action: {
        label: 'Voir les tendeurs',
        url: '/products/speed-governors?tab=optional',
        type: 'link'
      }
    }
  ],
  tr: [
    {
      keywords: ['fas lift nedir', 'faslift', 'firma', 'biz kimiz', 'hakkimizda', 'hakkında', 'fas lift'],
      answer: 'FAS LIFT, modern asansör güvenlik sistemleri, hız regülatörleri, gergi kasnakları ve döküm tahrik kasnakları üretiminde uzmanlaşmış güvenilir bir markadır. 2021 yılında kurulan firmamız, uluslararası EN 81-20/50 standartlarına uygun, yüksek kaliteli güvenlik bileşenleri sunmaktadır.',
      action: {
        label: 'Daha Fazla Bilgi',
        url: '/about',
        type: 'link'
      }
    },
    {
      keywords: [
        'gergi kasnağı',
        'gergi kasnagi',
        'gergi-kasnagi',
        'gergi',
        'kasnak gergi',
        'halat gerdirme',
        'gerdirme',
        'fs-tp01',
        'tp01',
        '/tensioner-pulley',
        'tensioner pulley'
      ],
      answer: 'FS-TP01 — Gergi Kasnağı, asansör güvenliği için tasarlanmış hassas halat gerdirme güvenlik bileşenidir.\n\nDoğrulanmış Teknik Özellikler:\n- Model Kodu: FS-TP01\n- Toplam Uzunluk: 546.00 mm\n- Referans Yüksekliği: 192.00 mm\n- Toplam Yükseklik: 355.30 mm\n- İkincil Ref. Yüksekliği: 291.97 mm\n- Genişlik: 76.00 mm\n- Ambalaj Boyutları: 560 × 110 × 280 mm\n- Standartlar: EN 81-20/50, TÜV SÜD Onaylı, 2014/33/EU Direktifi\n- Ana Özellikler: Yay mekanizmalı gergi çarkı, entegre emniyet kontağı, ağır hizmet tipi çelik gövde.',
      action: {
        label: 'Gergi Kasnağını İncele',
        url: '/products/tensioner-pulley',
        type: 'link'
      }
    },
    {
      keywords: [
        'kasnaklar',
        'kasnak',
        'döküm kasnak',
        'dokum kasnak',
        'v kayış kasnak',
        'tahrik kasnağı',
        'döküm',
        'ggg-50',
        'ggg50',
        'fs-p210',
        'fs-p240',
        'fs-p320',
        'fs-p400',
        'p210',
        'p240',
        'p320',
        'p400',
        '/pulleys',
        '/products/pulleys'
      ],
      answer: 'Yüksek dayanıklılık ve sessiz çalışma için tasarlanmış pik döküm (GGG-50) V-Kayış Tahrik Kasnaklarımız:\n\n1. FS-P210: Kasnak Ø210 mm | Mil Çapı Ø50 mm | Pik Döküm GGG-50\n2. FS-P240: Kasnak Ø240 mm | Mil Çapı Ø80 mm | Pik Döküm GGG-50\n3. FS-P320: Kasnak Ø320 mm | Mil Çapı Ø90 mm | Pik Döküm GGG-50\n4. FS-P400: Kasnak Ø400 mm | Mil Çapı Ø90 mm | Pik Döküm GGG-50\n\nTüm kasnaklarımız CNC işleme ile üretilmekte ve EN81-20/50 standartlarına uygundur.',
      action: {
        label: 'Kasnaklar Sayfası',
        url: '/products/pulleys',
        type: 'link'
      }
    },
    {
      keywords: ['fs-p210', 'p210', 'kasnak 210', 'kasnak 210mm'],
      answer: 'FS-P210 — Döküm V-Kayış Kasnağı (210 mm):\n- Kasnak Çapı: 210 mm\n- Mil Göbek Çapı: 50 mm\n- Malzeme Kalitesi: Pik Döküm GGG-50\n- Ürün Tipi: V-Kayış Tahrik Kasnağı\n- Standart: EN 81-20/50 Sertifikalı',
      action: {
        label: 'FS-P210 Detayları',
        url: '/products/pulleys',
        type: 'link'
      }
    },
    {
      keywords: ['fs-p240', 'p240', 'kasnak 240', 'kasnak 240mm'],
      answer: 'FS-P240 — Döküm V-Kayış Kasnağı (240 mm):\n- Kasnak Çapı: 240 mm\n- Mil Göbek Çapı: 80 mm\n- Malzeme Kalitesi: Pik Döküm GGG-50\n- Ürün Tipi: V-Kayış Tahrik Kasnağı\n- Standart: EN 81-20/50 Sertifikalı',
      action: {
        label: 'FS-P240 Detayları',
        url: '/products/pulleys',
        type: 'link'
      }
    },
    {
      keywords: ['fs-p320', 'p320', 'kasnak 320', 'kasnak 320mm'],
      answer: 'FS-P320 — Döküm V-Kayış Kasnağı (320 mm):\n- Kasnak Çapı: 320 mm\n- Mil Göbek Çapı: 90 mm\n- Malzeme Kalitesi: Pik Döküm GGG-50\n- Ürün Tipi: V-Kayış Tahrik Kasnağı\n- Standart: EN 81-20/50 Sertifikalı',
      action: {
        label: 'FS-P320 Detayları',
        url: '/products/pulleys',
        type: 'link'
      }
    },
    {
      keywords: ['fs-p400', 'p400', 'kasnak 400', 'kasnak 400mm'],
      answer: 'FS-P400 — Döküm V-Kayış Kasnağı (400 mm):\n- Kasnak Çapı: 400 mm\n- Mil Göbek Çapı: 90 mm\n- Malzeme Kalitesi: Pik Döküm GGG-50\n- Ürün Tipi: V-Kayış Tahrik Kasnağı\n- Standart: EN 81-20/50 Sertifikalı',
      action: {
        label: 'FS-P400 Detayları',
        url: '/products/pulleys',
        type: 'link'
      }
    },
    {
      keywords: ['hiz regulatoru', 'hız regülatörü', 'regülatörler', 'urunler', 'ürünler', 'fs-01', 'fs-01lr', 'fs-200', 'fs-250', 'modeller'],
      answer: 'Ürettiğimiz hassas sertifikalı hız regülatörü modelleri:\n- FS-01 Çift Yönlü (kasnak Ø300mm)\n- FS-01LR Çift Yönlü (kasnak Ø300mm)\n- FS-200 Çift Yönlü (kasnak Ø200mm)\n- FS-250 Çift Yönlü (kasnak Ø250mm)\n\nTüm modellerimiz TÜV SÜD onaylı olup EN 81-20/50 standartlarına tam uyumludur.',
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
      answer: 'FAS LIFT Hız Regülatörleri, gergi kasnakları ve döküm kasnaklar teknik detaylarını içeren resmi ürün kataloğunu PDF olarak indirebilirsiniz.',
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
      answer: 'Bizimle iletişime geçebileceğiniz kanallar:\n- Telefon: +90 531 613 9223 / +90 531 634 8986\n- E-posta: info@faslift.com / faslift@outlook.com\n- WhatsApp: +90 531 613 9223\n- Adres: İkitelli OSB, Aykosan Sanayi Sitesi 34490 Başakşehir/İstanbul, Türkiye.',
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
