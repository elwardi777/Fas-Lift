import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Maximize2, Layers } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';
import FloatingToolbar from '../components/FloatingToolbar';
import Lightbox from '../components/Lightbox';

interface GalleryItem {
  id: string;
  src: string;
  category: 'governors' | 'production' | 'team';
  titleKey: string;
  altKey: string;
  descKey: string;
}

export default function GalleryPage() {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  const CATEGORIES = [
    { id: 'all', label: t('galleryPage.filterAll') },
    { id: 'governors', label: t('galleryPage.filterGovernors') },
    { id: 'production', label: t('galleryPage.filterProduction') },
    { id: 'team', label: t('galleryPage.filterTeam') },
  ];

  const GALLERY_ITEMS: GalleryItem[] = [
    {
      id: 'gov-1',
      src: '/images/6779a6c7-c66c-4a51-b3ca-185ea2d6a6d3.jfif',
      category: 'governors',
      titleKey: 'trusted.card1Title',
      altKey: 'galleryPage.imageGov1Alt',
      descKey: 'trusted.card1Subtitle',
    },
    {
      id: 'gov-2',
      src: '/images/6de34a95-7714-4412-8154-c3c5040ec89f.jfif',
      category: 'governors',
      titleKey: 'trusted.card2Title',
      altKey: 'galleryPage.imageGov2Alt',
      descKey: 'trusted.card2Subtitle',
    },
    {
      id: 'gov-3',
      src: '/images/f6d7fe15-bded-4906-9800-bfdc7cb6d91a.jfif',
      category: 'governors',
      titleKey: 'trusted.card3Title',
      altKey: 'galleryPage.imageGov3Alt',
      descKey: 'trusted.card3Subtitle',
    },
    {
      id: 'gov-4',
      src: '/images/WhatsApp Image 2026-05-21 at 17.13.55 (1).jpeg',
      category: 'governors',
      titleKey: 'trusted.card4Title',
      altKey: 'galleryPage.imageGov4Alt',
      descKey: 'trusted.card4Subtitle',
    },
    {
      id: 'prod-1',
      src: '/images/Gemini_Generated_Image_rim8vwrim8vwrim8.png',
      category: 'production',
      titleKey: 'productionPage.sliderCnc',
      altKey: 'galleryPage.imageProd1Alt',
      descKey: 'productionPage.feature1Desc',
    },
    {
      id: 'prod-2',
      src: '/images/Gemini_Generated_Image_mez5hgmez5hgmez5.png',
      category: 'production',
      titleKey: 'productionPage.sliderRobotic',
      altKey: 'galleryPage.imageProd2Alt',
      descKey: 'productionPage.feature2Desc',
    },
    {
      id: 'prod-3',
      src: '/images/quality_control.png',
      category: 'production',
      titleKey: 'productionPage.sliderQc',
      altKey: 'galleryPage.imageProd3Alt',
      descKey: 'productionPage.feature3Desc',
    },
    {
      id: 'prod-4',
      src: '/images/factory_cnc_precision.png',
      category: 'production',
      titleKey: 'productionPage.feature1Title',
      altKey: 'galleryPage.imageProd1Alt',
      descKey: 'productionPage.feature1Desc',
    },
    {
      id: 'team-1',
      src: '/images/Gemini_Generated_Image_ibchg1ibchg1ibch.png',
      category: 'team',
      titleKey: 'about.title',
      altKey: 'galleryPage.imageTeam1Alt',
      descKey: 'about.subtitle',
    },
    {
      id: 'team-2',
      src: '/images/assistenza_donna.png',
      category: 'team',
      titleKey: 'support.techAssistTitle',
      altKey: 'galleryPage.imageTeam2Alt',
      descKey: 'support.techAssistDesc',
    },
    {
      id: 'team-3',
      src: '/images/Gemini_Generated_Image_ybxbbnybxbbnybxb.png',
      category: 'team',
      titleKey: 'support.heroTitle',
      altKey: 'galleryPage.imageTeam2Alt',
      descKey: 'support.heroSubtitle',
    },
  ];

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === selectedCategory);

  return (
    <div className="font-sans bg-[#F5F7FA] min-h-screen overflow-x-hidden text-[#4A5568]">
      <Navbar forceDark />

      {/* ── HERO SECTION ── */}
      <section className="relative flex min-h-[440px] md:min-h-[500px] items-center justify-start overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24">
        {/* Background Image with Dark Blueprint Theme */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/Gemini_Generated_Image_wh0prawh0prawh0p.png"
            alt="FasLift Gallery Background"
            className="h-full w-full object-cover object-center"
          />
          {/* Dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d2b5e]/95 via-[#0d2b5e]/75 to-[#0b3d78]/50" />
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F5F7FA] to-transparent" />
        </div>

        {/* Blueprint pattern overlay */}
        <div className="absolute inset-0 futuristic-grid opacity-15 pointer-events-none z-[1]" />

        {/* Subtle grid pattern overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.05] pointer-events-none z-[1]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="gallery-hero-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#gallery-hero-grid)" />
        </svg>

        {/* Decorative gold accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A843]/40 to-transparent z-10" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black text-white uppercase leading-tight tracking-tight mb-5"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)' }}
            >
              {t('galleryPage.heroTitle')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-white/75 leading-relaxed font-normal max-w-2xl"
            >
              {t('galleryPage.heroSubtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── FILTER & GRID SECTION ── */}
      <section className="py-16 md:py-24 px-6 md:px-12 bg-[#F5F7FA] relative z-10">
        <div className="max-w-7xl mx-auto">

          {/* Blueprint Background Decoration (Subtle) */}
          <div className="pointer-events-none absolute inset-0 product-groups-blueprint opacity-30 z-0" aria-hidden />

          {/* Interactive Category Selector Tabs */}
          <div className="relative z-10 flex md:justify-center mb-16 overflow-x-auto pb-4 scrollbar-none w-full max-w-full px-4 md:px-0 scroll-smooth">
            <div className="flex flex-nowrap md:flex-wrap bg-white p-1.5 rounded-2xl border border-[#0b3d78]/10 shadow-[0_10px_30px_rgba(11,61,120,0.04)] mx-auto">
              {CATEGORIES.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`relative px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-[11px] sm:text-xs font-semibold tracking-wider uppercase transition-all duration-300 ease-out cursor-pointer min-w-[100px] sm:min-w-[120px] text-center z-10 shrink-0 ${selectedCategory === category.id
                      ? 'text-white'
                      : 'text-[#4A5568] hover:text-[#0B3D78]'
                    }`}
                >
                  {/* Sliding pill indicator */}
                  {selectedCategory === category.id && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-[#0B3D78] rounded-xl z-[-1] shadow-[0_4px_15px_rgba(11,61,120,0.25)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          {/* Responsive Animated Image Grid */}
          <motion.div
            layout
            className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  key={item.id}
                  onClick={() => setLightboxImage({ src: item.src, alt: t(item.altKey) })}
                  className="group cursor-pointer bg-white rounded-3xl border border-[#0d2b5e]/5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_24px_50px_rgba(11,61,120,0.1)] transition-all duration-500 ease-out flex flex-col justify-between overflow-hidden"
                >
                  {/* Image container */}
                  <div className="relative overflow-hidden aspect-[4/3] w-full bg-slate-100">
                    <img
                      src={item.src}
                      alt={t(item.altKey)}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                      loading="lazy"
                    />

                    {/* Technical Blueprint overlay with subtle lines */}
                    <div className="absolute inset-0 bg-[#0B3D78]/70 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[2px]">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#0B3D78] shadow-lg"
                      >
                        <Maximize2 size={22} className="stroke-[2.5px]" />
                      </motion.div>
                    </div>

                    {/* Corner accents for blueprint vibe */}
                    <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-white/40 pointer-events-none group-hover:border-white/90 transition-colors" />
                    <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-white/40 pointer-events-none group-hover:border-white/90 transition-colors" />
                    <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-white/40 pointer-events-none group-hover:border-white/90 transition-colors" />
                    <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-white/40 pointer-events-none group-hover:border-white/90 transition-colors" />
                  </div>

                  {/* Card Info Section */}
                  <div className="p-6 bg-white flex-1 flex flex-col justify-between">
                    <div>
                      {/* Monospace tag */}
                      <div className="flex items-center gap-2 mb-3">
                        <Layers size={12} className="text-[#0B3D78]/50" />
                        <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#0B3D78]/60 font-semibold">
                          {t(`galleryPage.filter${item.category.charAt(0).toUpperCase() + item.category.slice(1)}`)}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-lg text-[#0d2b5e] leading-tight mb-2 group-hover:text-[#0B3D78] transition-colors duration-300">
                        {t(item.titleKey)}
                      </h3>

                      <p className="text-xs text-[#4a5568]/80 leading-relaxed line-clamp-2">
                        {t(item.descKey)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── FOOTER & UTILITIES ── */}
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <FloatingToolbar />

      {/* Lightbox modal for enlarged view */}
      <Lightbox
        src={lightboxImage?.src ?? ''}
        alt={lightboxImage?.alt ?? ''}
        isOpen={lightboxImage !== null}
        onClose={() => setLightboxImage(null)}
      />
    </div>
  );
}
