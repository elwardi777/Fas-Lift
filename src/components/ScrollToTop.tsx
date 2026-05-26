import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const RocketTopIcon: React.FC = () => (
  <svg viewBox="0 0 80 90" fill="none" xmlns="http://www.w3.org/2000/svg" width="38" height="42">
    {/* Main rocket body — round top, wide bottom */}
    <path
      d="M40 6 C24 6 18 22 18 36 L18 58 L62 58 L62 36 C62 22 56 6 40 6 Z"
      fill="white"
    />
    {/* Dome / nose circle */}
    <circle cx="40" cy="18" r="10" fill="white" />
    {/* Window hole */}
    <circle cx="40" cy="18" r="6" fill="#0B3D78" />
    {/* Left fin */}
    <path d="M18 44 L4 62 L18 58 Z" fill="white" />
    {/* Right fin */}
    <path d="M62 44 L76 62 L62 58 Z" fill="white" />
    {/* Nozzle left */}
    <rect x="24" y="58" width="8" height="7" rx="2" fill="white" />
    {/* Nozzle center */}
    <rect x="36" y="58" width="8" height="9" rx="2" fill="white" />
    {/* Nozzle right */}
    <rect x="48" y="58" width="8" height="7" rx="2" fill="white" />
    {/* TOP text */}
    <text
      x="40" y="50"
      textAnchor="middle"
      fill="#0B3D78"
      fontSize="13"
      fontWeight="900"
      fontFamily="Arial Black, Arial, sans-serif"
      letterSpacing="1"
    >TOP</text>
  </svg>
);

const ScrollToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-6 z-[999] w-14 h-14 rounded-full bg-[#0B3D78] flex items-center justify-center shadow-lg cursor-pointer"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -3 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          aria-label="Scroll to top"
        >
          <RocketTopIcon />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
