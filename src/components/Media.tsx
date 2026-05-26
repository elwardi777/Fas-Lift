import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Lightbox from './Lightbox';
import { CATALOG_PDF_URL, CATALOG_PDF_FILENAME } from '../constants/catalog';

interface GalleryImage {
  src: string;
  alt: string;
}

interface CatalogItem {
  name: string;
  file: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  { src: '/images/6779a6c7-c66c-4a51-b3ca-185ea2d6a6d3.jfif', alt: 'Speed Governor Front View' },
  { src: '/images/6de34a95-7714-4412-8154-c3c5040ec89f.jfif', alt: 'Speed Governor Side View' },
  { src: '/images/f6d7fe15-bded-4906-9800-bfdc7cb6d91a.jfif', alt: 'Speed Governor Detail' },
  { src: '/images/WhatsApp Image 2026-05-21 at 17.13.55 (1).jpeg', alt: 'Speed Governor Hero' },
];


const SectionHeading: React.FC<{ children: string }> = ({ children }) => (
  <div className="relative z-10 flex items-center gap-4 mb-12 md:mb-16">
    <div className="w-8 h-[2px] bg-[#0B3D78]/30" />
    <span className="font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.15em] uppercase text-[#0B3D78]/70">
      {children}
    </span>
    <div className="flex-1 h-[0.5px] bg-[#0B3D78]/10" />
  </div>
);

const Media: React.FC = () => {
  const { t } = useTranslation();
  const [lightboxImage, setLightboxImage] = useState<GalleryImage | null>(null);

  const CATALOGS: CatalogItem[] = [
    { name: t('catalog.name'), file: CATALOG_PDF_URL },
  ];

  return (
    <section id="media" className="relative py-20 md:py-28 bg-white overflow-hidden">
      <div className="pointer-events-none absolute inset-0 product-groups-blueprint opacity-60" aria-hidden />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading>{t('media.heading')}</SectionHeading>

        {/* Masonry Gallery Grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.div
              key={image.src}
              className="break-inside-avoid rounded-2xl overflow-hidden cursor-pointer group border border-[#DDE3EC] bg-white shadow-sm hover:shadow-md transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => setLightboxImage(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>

        {/* Catalog Download Section */}
        <div className="mt-16 md:mt-24 max-w-4xl mx-auto w-full px-4 sm:px-6">
          {CATALOGS.map((catalog, index) => (
            <motion.div
              key={catalog.name}
              className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16 lg:gap-20"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Left: Catalog Cover Image with realistic shadow */}
              <div className="w-full md:w-[45%] shrink-0 flex justify-center">
                <div className="relative group w-full max-w-[280px] sm:max-w-[320px] md:max-w-none">
                  <img
                    src="/images/catalog-cover.png"
                    alt={catalog.name}
                    className="w-full h-auto rounded-2xl shadow-[0_30px_70px_rgba(15,37,87,0.22)] border border-[#0B3D78]/5 object-contain transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-[0_40px_90px_rgba(15,37,87,0.32)]"
                    draggable={false}
                  />
                </div>
              </div>

              {/* Right: Info & Download Link */}
              <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start mt-6 md:mt-0">
                <h3 className="font-['Inter',sans-serif] text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight text-[#0B3D78] leading-tight">
                  {catalog.name}
                </h3>
                
                <p className="font-['Inter',sans-serif] text-[#0B3D78]/75 text-base md:text-lg lg:text-xl leading-relaxed mt-4 md:mt-6 max-w-md md:max-w-lg">
                  {t('catalog.description')}
                </p>

                <a
                  href={catalog.file}
                  download={CATALOG_PDF_FILENAME}
                  className="mt-8 md:mt-12 inline-flex items-center gap-2 text-sm sm:text-base font-extrabold tracking-[0.18em] text-[#0B3D78] hover:text-[#0B3D78]/80 transition-all duration-300 uppercase cursor-pointer group/link"
                >
                  {t('catalog.downloadText')}{' '}
                  <span className="text-[1.15em] font-normal transition-transform duration-300 inline-block group-hover/link:translate-y-1">
                    ↓
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        src={lightboxImage?.src ?? ''}
        alt={lightboxImage?.alt ?? ''}
        isOpen={lightboxImage !== null}
        onClose={() => setLightboxImage(null)}
      />
    </section>
  );
};

export default Media;
