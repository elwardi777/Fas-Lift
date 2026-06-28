import { useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';
import FloatingToolbar from '../components/FloatingToolbar';

const PdfIcon = ({ size = 64, color = "#123F73", className = "" }: { size?: number, color?: string, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke={color} 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="12" y2="17" />
  </svg>
);

import { useTranslation } from 'react-i18next';

export default function CatalogPage() {
  const { t } = useTranslation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white min-h-screen flex flex-col font-sans overflow-x-hidden">
      <Navbar />

      <main className="flex-1 w-full max-w-[1200px] mx-auto px-6 pt-[110px] pb-12 md:pt-[140px] md:pb-12">
        
        {/* Top Header */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-left font-light text-[#7A7A7A] mb-[70px]"
          style={{ fontSize: 'clamp(36px, 5vw, 48px)', lineHeight: 1 }}
        >
          {t('catalog.title')}
        </motion.h1>

        {/* Top Divider */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-[1px] bg-[#D9D9D9]" 
        />

        {/* Space 80px */}
        <div className="h-[60px] md:h-[80px]" />

        {/* Main Catalog Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
          className="flex flex-col items-center justify-center text-center w-full"
        >
          {/* Centered Title */}
          <h2 
            className="font-light text-[#7A7A7A]"
            style={{ fontSize: 'clamp(36px, 5vw, 48px)', lineHeight: 1 }}
          >
            {t('catalog.catalogLabel')}
          </h2>

          {/* Space 55px */}
          <div className="h-[40px] md:h-[55px]" />

          {/* PDF Download Row */}
          <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4">
            <PdfIcon className="w-[40px] h-[40px] md:w-[50px] md:h-[50px]" color="#2c3e50" />
            
            <a 
              href="/catalog.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#7B8794] font-medium transition-colors duration-300 hover:text-[#123F73] text-[14px] md:text-[16px] no-underline"
            >
              {t('catalog.catalogPdf')}
            </a>
          </div>
        </motion.div>

        {/* Space 90px */}
        <div className="h-[70px] md:h-[90px]" />

        {/* First Divider */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full h-[1px] bg-[#D9D9D9] mb-16 md:mb-20" 
        />

        {/* Certificate Lists */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col gap-16 md:gap-24 w-full"
        >
          {/* Row 1: TSEK & CE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
            {/* TSEK */}
            <div className="flex flex-col items-center w-full">
              <h3 className="font-bold text-[#7A7A7A] mb-8 text-[18px] md:text-[20px]">{t('catalog.tsekTitle')}</h3>
              <div className="w-full max-w-[360px] flex flex-col pl-14 pr-4 md:px-0">
                {[
                  t('catalog.tsekDoorLock'),
                  t('catalog.tsekShockAbsorber'),
                  t('catalog.tsekRetiringCam')
                ].map((item, index, arr) => (
                  <div key={index} className={`flex items-center py-4 ${index !== arr.length - 1 ? 'border-b border-[#D9D9D9]' : ''}`}>
                    <PdfIcon className="w-[32px] h-[32px] mr-5 shrink-0" color="#2c3e50" />
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#7B8794] text-[14px] md:text-[15px] font-medium transition-colors hover:text-[#123F73] no-underline">
                      {item}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* CE */}
            <div className="flex flex-col items-center w-full">
              <h3 className="font-bold text-[#7A7A7A] mb-8 text-[18px] md:text-[20px]">{t('catalog.ceTitle')}</h3>
              <div className="w-full max-w-[360px] flex flex-col pl-14 pr-4 md:px-0">
                {[
                  t('catalog.clSgCe'),
                  t('catalog.cl08_200Ce'),
                  t('catalog.cl08_250Ce'),
                  t('catalog.cl08_300Ce'),
                  t('catalog.cl01Ce')
                ].map((item, index, arr) => (
                  <div key={index} className={`flex items-center py-4 ${index !== arr.length - 1 ? 'border-b border-[#D9D9D9]' : ''}`}>
                    <PdfIcon className="w-[32px] h-[32px] mr-5 shrink-0" color="#2c3e50" />
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#7B8794] text-[14px] md:text-[15px] font-medium transition-colors hover:text-[#123F73] no-underline">
                      {item}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Middle Divider */}
          <div className="w-full h-[1px] bg-[#D9D9D9]" />

          {/* Row 2: EAC & ISO */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
            {/* EAC */}
            <div className="flex flex-col items-center w-full">
              <h3 className="font-bold text-[#7A7A7A] mb-8 text-[18px] md:text-[20px]">{t('catalog.eacTitle')}</h3>
              <div className="w-full max-w-[360px] flex flex-col pl-14 pr-4 md:px-0">
                {[
                  t('catalog.clSgEac'),
                  t('catalog.cl08Eac')
                ].map((item, index, arr) => (
                  <div key={index} className={`flex items-center py-4 ${index !== arr.length - 1 ? 'border-b border-[#D9D9D9]' : ''}`}>
                    <PdfIcon className="w-[32px] h-[32px] mr-5 shrink-0" color="#2c3e50" />
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#7B8794] text-[14px] md:text-[15px] font-medium transition-colors hover:text-[#123F73] no-underline">
                      {item}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* ISO */}
            <div className="flex flex-col items-center w-full">
              <h3 className="font-bold text-[#7A7A7A] mb-8 text-[18px] md:text-[20px]">{t('catalog.isoTitle')}</h3>
              <div className="w-full max-w-[360px] flex flex-col pl-14 pr-4 md:px-0">
                {[
                  t('catalog.iso9001'),
                  t('catalog.iso14001'),
                  t('catalog.iso45001')
                ].map((item, index, arr) => (
                  <div key={index} className={`flex items-center py-4 ${index !== arr.length - 1 ? 'border-b border-[#D9D9D9]' : ''}`}>
                    <PdfIcon className="w-[32px] h-[32px] mr-5 shrink-0" color="#2c3e50" />
                    <a href="#" target="_blank" rel="noopener noreferrer" className="text-[#7B8794] text-[14px] md:text-[15px] font-medium transition-colors hover:text-[#123F73] no-underline">
                      {item}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

      </main>

      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <FloatingToolbar />
    </div>
  );
}
