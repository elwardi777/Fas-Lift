import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WhatsAppIcon: React.FC<{ size?: number }> = ({ size = 32 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

type LanguageConfig = {
  id: string;
  flag: string;
  label: string;
  bubbleText: string;
  prefillMessage: string;
  dir?: 'rtl' | 'ltr';
};

const LANGUAGES: LanguageConfig[] = [
  {
    id: 'tr',
    flag: '🇹🇷',
    label: 'TR',
    bubbleText: 'Merhaba, size nasıl yardımcı olabiliriz?',
    prefillMessage: 'Merhaba, FAS LIFT ürünleri hakkında bilgi almak istiyorum.',
  },
  {
    id: 'fr',
    flag: '🇫🇷',
    label: 'FR',
    bubbleText: 'Bonjour, comment pouvons-nous vous aider ?',
    prefillMessage: 'Bonjour, je souhaite obtenir plus d\'informations sur les produits FAS LIFT.',
  },
  {
    id: 'en',
    flag: '🇬🇧',
    label: 'EN',
    bubbleText: 'Hello, how can we help you?',
    prefillMessage: 'Hello, I would like more information about FAS LIFT products.',
  },
];

const WhatsAppButton: React.FC = () => {
  const [activeBubble, setActiveBubble] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Handle click outside to close bubble on mobile
  useEffect(() => {
    if (!isMobile) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.whatsapp-widget')) {
        setActiveBubble(null);
      }
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobile]);

  const handleAction = (lang: LanguageConfig, e: React.MouseEvent) => {
    if (isMobile) {
      if (activeBubble === lang.id) {
        // Tap again - open WhatsApp
        openWhatsApp(lang.prefillMessage);
        setActiveBubble(null);
      } else {
        // First tap - open bubble
        e.preventDefault();
        e.stopPropagation();
        setActiveBubble(lang.id);
      }
    } else {
      // Desktop - click always opens WhatsApp
      openWhatsApp(lang.prefillMessage);
    }
  };

  const openWhatsApp = (text: string) => {
    const baseUrl = 'https://wa.me/905316139223';
    const encodedText = encodeURIComponent(text);
    window.open(`${baseUrl}?text=${encodedText}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed bottom-5 left-4 md:bottom-[30px] md:left-[20px] lg:bottom-[40px] lg:left-[24px] z-[9999] flex flex-col gap-4 whatsapp-widget">
      {LANGUAGES.map((lang, index) => (
        <div 
          key={lang.id} 
          className="relative flex items-center group"
          onMouseEnter={() => !isMobile && setActiveBubble(lang.id)}
          onMouseLeave={() => !isMobile && setActiveBubble(null)}
        >
          {/* WhatsApp Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.15 }}
            whileHover={{ scale: 1.08 }}
            className="relative flex flex-col items-center justify-center w-[52px] h-[52px] rounded-full bg-[#25D366] text-white shadow-[0_4px_12px_rgba(37,211,102,0.3)] cursor-pointer outline-none border-none hover:shadow-[0_6px_16px_rgba(37,211,102,0.4)] transition-shadow z-10"
            onClick={(e) => handleAction(lang, e)}
            aria-label={`Chat in ${lang.label}`}
          >
            <div className="flex flex-col items-center justify-center mt-0.5 gap-0.5">
              <WhatsAppIcon size={22} />
              <div className="flex items-center gap-0.5 font-bold text-[10px] leading-none tracking-wide mt-[1px]">
                <span>{lang.label}</span>
              </div>
            </div>
          </motion.button>

          {/* Chat Bubble */}
          <AnimatePresence>
            {activeBubble === lang.id && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
                className="absolute left-[64px] pointer-events-none"
              >
                <div 
                  className="relative bg-white text-[#111] px-[18px] py-[12px] rounded-[16px] shadow-[0_2px_15px_rgba(0,0,0,0.1)] w-max max-w-[280px]"
                  dir={lang.dir || 'ltr'}
                >
                  {/* Speech Tail */}
                  <div className="absolute top-1/2 -left-[6px] -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-r-[8px] border-r-white border-b-[6px] border-b-transparent filter drop-shadow-[-1px_0_1px_rgba(0,0,0,0.03)]" />
                  
                  <p className="m-0 text-[14px] font-medium leading-snug">
                    {lang.bubbleText}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default WhatsAppButton;
