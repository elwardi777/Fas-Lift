import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronLeft, ChevronRight, Settings, Cpu, ShieldCheck } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';
import FloatingToolbar from '../components/FloatingToolbar';

const IMAGES = [
  {
    src: '/images/Gemini_Generated_Image_rim8vwrim8vwrim8.png',
    key: 'sliderCnc'
  },
  {
    src: '/images/Gemini_Generated_Image_mez5hgmez5hgmez5.png',
    key: 'sliderRobotic'
  },
  {
    src: '/images/quality_control.png',
    key: 'sliderQc'
  },
  {
    src: '/images/factory_cnc_precision.png',
    key: 'sliderQc'
  },
  {
    src: '/images/category-governors.png',
    key: 'sliderQc'
  }
];

export default function ProductionPage() {
  const { t } = useTranslation();
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % IMAGES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setActiveSlide(prev => (prev - 1 + IMAGES.length) % IMAGES.length);
  };

  const handleNext = () => {
    setActiveSlide(prev => (prev + 1) % IMAGES.length);
  };

  return (
    <div className="font-sans bg-[#F5F7FA] min-h-screen overflow-x-hidden text-[#4a5568]">
      <Navbar forceDark />

      {/* ── HERO SECTION ── */}
      <section className="relative flex min-h-[480px] md:min-h-[560px] items-center justify-start overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/production_hero_bg.png"
            alt="FasLift Production Facility"
            className="h-full w-full object-cover object-center"
          />
          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0d2b5e]/90 via-[#0d2b5e]/60 to-transparent" />
          {/* Bottom fade */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#F5F7FA] to-transparent" />
        </div>

        {/* Grid pattern overlay */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none z-[1]" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="hero-grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" strokeWidth="1" /></pattern></defs>
          <rect width="100%" height="100%" fill="url(#hero-grid)" />
        </svg>

        {/* Decorative gold accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D4A843]/40 to-transparent z-10" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="font-mono text-xs tracking-[0.2em] uppercase text-[#D4A843] mb-4"
            >
              {t('productionPage.sectionTitle')}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display font-black text-white uppercase leading-tight tracking-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.2rem)' }}
            >
              {t('productionPage.heroTitle')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-white/75 leading-relaxed font-normal"
            >
              {t('productionPage.heroSubtitle')}
            </motion.p>
          </div>
        </div>
      </section>


      {/* ── MAIN CONTENT SECTION ── */}
      <section className="py-24 px-6 md:px-12 bg-[#F5F7FA] relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Split Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

            {/* Left Column: Typography Block */}
            <div className="lg:col-span-5 space-y-8">
              {/* Monospace section heading */}
              <div className="flex items-center gap-3">
                <div className="w-6 h-[2px] bg-[#0b3d78]/30" />
                <span className="font-mono text-xs tracking-[0.15em] uppercase text-[#0b3d78]/60">
                  {t('productionPage.sectionTitle')}
                </span>
              </div>

              <h2 className="font-display font-bold text-3xl md:text-4xl text-[#0d2b5e] leading-tight">
                {t('productionPage.sectionSubtitle')}
              </h2>

              <p className="text-base leading-relaxed text-[#4a5568]/90">
                {t('productionPage.descParagraph1')}
              </p>

              <p className="text-base leading-relaxed text-[#4a5568]/90">
                {t('productionPage.descParagraph2')}
              </p>

              {/* Manufacturing Features list */}
              <div className="space-y-6 pt-4">
                {/* Feature 1 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#0d2b5e]/5 shadow-sm flex items-center justify-center text-[#0B3D78] shrink-0">
                    <Settings size={22} className="animate-spin-slow" />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#0d2b5e] mb-1">
                      {t('productionPage.feature1Title')}
                    </h3>
                    <p className="text-xs text-[#4a5568]/80 leading-relaxed">
                      {t('productionPage.feature1Desc')}
                    </p>
                  </div>
                </div>

                {/* Feature 2 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#0d2b5e]/5 shadow-sm flex items-center justify-center text-[#0B3D78] shrink-0">
                    <Cpu size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#0d2b5e] mb-1">
                      {t('productionPage.feature2Title')}
                    </h3>
                    <p className="text-xs text-[#4a5568]/80 leading-relaxed">
                      {t('productionPage.feature2Desc')}
                    </p>
                  </div>
                </div>

                {/* Feature 3 */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white border border-[#0d2b5e]/5 shadow-sm flex items-center justify-center text-[#0B3D78] shrink-0">
                    <ShieldCheck size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-[#0d2b5e] mb-1">
                      {t('productionPage.feature3Title')}
                    </h3>
                    <p className="text-xs text-[#4a5568]/80 leading-relaxed">
                      {t('productionPage.feature3Desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Monochrome Image Slider */}
            <div className="lg:col-span-7">
              <div className="relative bg-white rounded-[24px] border border-[#0d2b5e]/5 p-3 shadow-[0_15px_45px_rgba(0,0,0,0.06)] overflow-hidden">
                {/* Slider Image Container */}
                <div className="relative aspect-[4/3] rounded-[18px] overflow-hidden bg-slate-900 group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeSlide}
                      src={IMAGES[activeSlide].src}
                      alt="Manufacturing Process"
                      className="w-full h-full object-cover grayscale brightness-90 contrast-110 hover:scale-105 transition-transform duration-700 ease-out"
                      initial={{ opacity: 0, scale: 1.02 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      draggable={false}
                    />
                  </AnimatePresence>

                  {/* Dark gradient overlay at bottom for text contrast */}
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950/80 to-transparent pointer-events-none" />

                  {/* Active Slide description */}
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <motion.p
                      key={activeSlide}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      className="font-mono text-xs uppercase tracking-[0.2em] text-[#D4A843] mb-1"
                    >
                      Step {activeSlide + 1} of {IMAGES.length}
                    </motion.p>
                    <motion.h3
                      key={`h-${activeSlide}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.05 }}
                      className="font-display font-bold text-lg md:text-xl leading-tight"
                    >
                      {t(`productionPage.${IMAGES[activeSlide].key}`)}
                    </motion.h3>
                  </div>

                  {/* Slider Control arrows */}
                  <div className="absolute inset-y-0 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                    <button
                      onClick={handlePrev}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#0b3d78] transition-all duration-200 pointer-events-auto cursor-pointer"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-[#0b3d78] transition-all duration-200 pointer-events-auto cursor-pointer"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>

                {/* Slider indicators */}
                <div className="flex justify-center gap-2 mt-4 pb-2">
                  {IMAGES.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${activeSlide === index ? 'w-8 bg-[#0b3d78]' : 'w-2 bg-[#0b3d78]/20'
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── SECTION 2: PRODUCTION PROCESS STEPS ── */}


      {/* ── FOOTER & UTILITIES ── */}
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <FloatingToolbar />
    </div>
  );
}
