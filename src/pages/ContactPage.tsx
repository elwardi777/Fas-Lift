import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';
import FloatingToolbar from '../components/FloatingToolbar';

export default function ContactPage() {
  const { t } = useTranslation();

  return (
    <div className="font-['Inter',sans-serif] bg-[#F5F7FA] min-h-screen overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative flex min-h-[400px] md:min-h-[500px] md:h-auto items-center justify-center overflow-hidden bg-white pt-24 pb-16 md:pt-28 md:pb-36">
        {/* Background Image Container */}
        <div className="absolute inset-0 md:left-auto md:w-1/2 z-0">
          <img
            src="/images/Gemini_Generated_Image_pnhwm6pnhwm6pnhw.png"
            alt="FasLift Contact Background"
            className="h-full w-full object-cover opacity-85"
          />
          {/* Subtle grid pattern overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-contact" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#0B3D78" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-contact)" />
          </svg>
          {/* Gradients to guarantee text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40 md:bg-gradient-to-r md:from-white md:via-white/70 md:to-transparent" />
        </div>

        {/* Full-width bottom gradient to transition to Contact section */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#F5F7FA] to-transparent pointer-events-none z-0" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
          <div className="max-w-[620px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#0B3D78]/15 bg-white/75 px-4 py-2 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-[#0B3D78] animate-pulse" />
              <span className="font-['JetBrains_Mono',monospace] text-[10px] font-semibold uppercase tracking-[0.18em] text-[#0B3D78]/70">
                {t('contact.heading')}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-['Poppins',sans-serif] font-black text-[#0B3D78] uppercase leading-tight"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}
            >
              {t('nav.contact')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-3 text-base text-[#0B3D78]/70 max-w-md md:max-w-lg"
            >
              {t('contact.heroSubtitle')}
            </motion.p>
          </div>
        </div>
      </section>

      {/* ── CONTACT COMPONENT ── */}
      <div className="-mt-16 relative z-20">
        <Contact />
      </div>

      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <FloatingToolbar />
    </div>
  );
}
