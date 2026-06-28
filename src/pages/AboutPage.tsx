import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';
import FloatingToolbar from '../components/FloatingToolbar';

/* ─────────────────────────────────────────────────────────────────────────────
   Fade-in wrapper — reveals children when they scroll into view
───────────────────────────────────────────────────────────────────────────── */
function FadeIn({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  const initial: Record<string, number> = { opacity: 0 };
  if (direction === 'up') initial.y = 40;
  if (direction === 'down') initial.y = -40;
  if (direction === 'left') initial.x = 40;
  if (direction === 'right') initial.x = -40;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={isInView ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.75, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 1 — FROM 2021 TO THE FUTURE
═══════════════════════════════════════════════════════════════════════════ */
function AnniversarySection() {
  const { t } = useTranslation();
  return (
    <section className="bg-white pt-24 pb-12 md:pt-28 md:pb-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-2 md:gap-16 lg:gap-20">

          {/* ── LEFT: Premium Anniversary Composition (≈45%) ── */}
          <div className="w-full lg:w-[45%] flex flex-col items-center justify-center relative min-h-[480px] lg:mt-[20px]">
            <style>{`
              @keyframes diagonal-descend {
                0% {
                  transform: translateY(-250px) rotate(-12deg);
                  opacity: 0;
                }
                100% {
                  transform: translateY(0) rotate(-12deg);
                  opacity: 1;
                }
              }
              @keyframes number-descend {
                0% {
                  transform: translateY(-300px);
                  opacity: 0;
                }
                75% {
                  transform: translateY(6px);
                  opacity: 1;
                }
                90% {
                  transform: translateY(-2px);
                }
                100% {
                  transform: translateY(0);
                  opacity: 1;
                }
              }
              @keyframes number-float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-2px); }
              }
              @keyframes shimmer-sweep {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
              }
              @keyframes premium-years-fadein {
                0% { opacity: 0; transform: translateY(-12px); }
                100% { opacity: 1; transform: translateY(0); }
              }
              .anim-diagonal-line {
                animation: diagonal-descend 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
              }
              .anim-number-descend {
                animation: number-descend 1.0s cubic-bezier(0.25, 0.46, 0.45, 0.94) 1.2s forwards;
                opacity: 0;
              }
              .anim-number-float {
                animation: number-float 5s ease-in-out infinite;
                animation-delay: 2.2s;
              }
              .anim-premium-years {
                animation: premium-years-fadein 700ms cubic-bezier(0.22, 1, 0.36, 1) 2.2s forwards;
                opacity: 0;
              }
            `}</style>

            {/* Soft Blue Radial Glow (Tighter blur for sharpness) */}
            <div
              className="absolute w-[260px] h-[260px] rounded-full opacity-20 pointer-events-none z-0"
              style={{
                background: 'radial-gradient(circle, rgba(88,197,232,0.3) 0%, transparent 70%)',
                filter: 'blur(30px)',
                top: '18%',
              }}
            />

            {/* Realistic Shadow beneath the number */}
            <div
              className="absolute w-[180px] h-[10px] rounded-full pointer-events-none opacity-25 z-0"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(18,63,115,0.4) 0%, transparent 75%)',
                filter: 'blur(6px)',
                top: '62%',
                left: '50%',
                transform: 'translateX(-50%)',
              }}
            />

            {/* Number "5" Group */}
            <div className="relative anim-number-descend z-10 flex flex-col items-center select-none mb-6 md:mb-12 lg:mb-2">
              <div className="anim-number-float relative">
                {/* Large "5" with brushed metallic sweep */}
                <span
                  className="block font-['Poppins',sans-serif] font-black leading-none"
                  style={{
                    fontSize: 'clamp(10rem, 24vw, 18rem)',
                    background: 'linear-gradient(135deg, #123F73 0%, #58C5E8 25%, #8D98A8 50%, #123F73 75%, #58C5E8 100%)',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 15px 30px rgba(18,63,115,0.22)) drop-shadow(0 2px 4px rgba(88,197,232,0.15))',
                    animation: 'shimmer-sweep 6s linear infinite',
                    WebkitTextStroke: '1px rgba(255,255,255,0.25)',
                  }}
                >
                  5
                </span>

                {/* YEARS label upper-right */}
                <span
                  className="absolute top-[-25px] right-[-110px] md:top-[-30px] md:right-[-150px] lg:top-[-20px] lg:right-[-190px] font-['Playfair_Display','Cinzel','Cormorant_Garamond',serif] font-bold uppercase anim-premium-years"
                  style={{
                    fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
                    letterSpacing: '0.45em',
                    background: 'linear-gradient(180deg, #67B9E6 0%, #1E4F92 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    filter: 'drop-shadow(0 0 12px rgba(103,185,230,0.3)) drop-shadow(0 2px 4px rgba(30,79,146,0.15))',
                  }}
                >
                  {t('about.years')}
                </span>
              </div>
            </div>

            {/* Diagonal Line (Relative flow to sit perfectly between number and text) */}
            <div className="relative w-[85%] md:w-[95%] h-[50px] md:h-[70px] z-0 flex items-center justify-center my-2 md:my-4">
              <div
                className="absolute w-full h-[1.5px] anim-diagonal-line"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, #123F73 25%, #58C5E8 50%, #8D98A8 75%, transparent 100%)',
                  boxShadow: '0 0 8px rgba(88,197,232,0.4)',
                }}
              />
            </div>

            {/* Subtitle */}
            <FadeIn delay={1.8} className="z-10 mt-2 md:mt-4">
              <p
                className="text-center font-['Georgia','Times_New_Roman',serif] font-medium md:font-normal text-[#4A5568] uppercase tracking-[4px] md:tracking-[6px]"
                style={{
                  fontSize: 'clamp(14px, 3vw, 1.1rem)',
                }}
              >
                {t('aboutPage.anniversaryTagline')}
              </p>
            </FadeIn>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 md:mt-8 lg:mt-8 mb-0 md:mb-0 z-10 flex justify-center w-full"
            >
              <img
                src="/images/governor-4-removebg-preview.png"
                alt="FAS LIFT"
                className="h-[120px] md:h-[130px] lg:h-auto lg:w-[200px] object-contain drop-shadow-sm"
                draggable={false}
              />
            </motion.div>
          </div>

          {/* ── RIGHT: Text Content (≈55%) ── */}
          <div className="w-full lg:w-[55%]">
            <FadeIn delay={0.1}>
              <h2
                className="font-['Georgia','Times_New_Roman',serif] font-normal text-[#6b7280] mb-8"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', lineHeight: 1.15 }}
              >
                {t('aboutPage.anniversaryTitle')}
              </h2>
            </FadeIn>

            <div className="max-w-[700px] space-y-5 text-[15px] leading-[1.85] text-[#4b5563] md:text-[16px]">
              <FadeIn delay={0.15}>
                <p>{t('aboutPage.anniversaryP1')}</p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p>{t('aboutPage.anniversaryP2')}</p>
              </FadeIn>

              <FadeIn delay={0.25}>
                <p>{t('aboutPage.anniversaryP3')}</p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p>{t('aboutPage.anniversaryP4')}</p>
              </FadeIn>

              <FadeIn delay={0.5}>
                <p className="font-semibold text-[#374151] italic">
                  {t('aboutPage.anniversaryP5')}
                </p>
              </FadeIn>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2 — ABOUT US
═══════════════════════════════════════════════════════════════════════════ */
function AboutUsSection() {
  const { t } = useTranslation();
  // 4 images for the gallery row
  const galleryImages = [
    { src: '/images/governor-1.jpg', alt: t('aboutPage.altManufacturing') },
    { src: '/images/fabrika-detay-1.webp', alt: t('aboutPage.altPrecision') },
    { src: '/images/WhatsApp Image 2026-06-09 at 21.13.18 (2).jpeg', alt: t('aboutPage.altQuality') },
    { src: '/images/fabrika-detay-3.webp', alt: t('aboutPage.altProduction') },
  ];

  return (
    <section className="bg-white py-24 md:py-36">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">

        {/* ── Top: Two-column layout ── */}
        <div className="flex flex-col lg:flex-row gap-14 lg:gap-16 mb-16">

          {/* LEFT — Text */}
          <div className="w-full lg:w-[50%]">
            <FadeIn>
              <h2
                className="font-['Georgia','Times_New_Roman',serif] font-normal text-[#4b5563] mb-8"
                style={{ fontSize: 'clamp(2rem, 4.5vw, 3rem)', lineHeight: 1.1 }}
              >
                {t('aboutPage.aboutUsTitle')}
              </h2>
            </FadeIn>

            <div className="max-w-[540px] space-y-5 text-[15px] leading-[1.85] text-[#4b5563] md:text-[16px]">
              <FadeIn delay={0.1}>
                <p>{t('aboutPage.aboutUsP1')}</p>
              </FadeIn>

              <FadeIn delay={0.15}>
                <p>{t('aboutPage.aboutUsP2')}</p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p>{t('aboutPage.aboutUsP3')}</p>
              </FadeIn>

              <FadeIn delay={0.25}>
                <p>{t('aboutPage.aboutUsP4')}</p>
              </FadeIn>
            </div>
          </div>

          {/* RIGHT — Company Building Image */}
          <FadeIn className="w-full lg:w-[50%]" direction="left" delay={0.15}>
            <div className="relative overflow-hidden rounded-sm">
              <img
                src="/images/321da7c8-f094-4c2e-977c-48ed719647ae.jfif                   "
                alt={t('aboutPage.altCompanyBuilding')}
                className="w-full h-auto object-cover rounded-sm"
                style={{ aspectRatio: '4/3' }}
                draggable={false}
              />
            </div>
          </FadeIn>

        </div>

        {/* ── Gallery: 4 images in one row ── */}
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
            {galleryImages.map((img, i) => (
              <FadeIn key={i} delay={0.1 + i * 0.08}>
                <div className="overflow-hidden rounded-sm">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-auto object-cover transition-transform duration-500 hover:scale-105"
                    style={{ aspectRatio: '4/3' }}
                    draggable={false}
                  />
                </div>
              </FadeIn>
            ))}
          </div>
        </FadeIn>

        {/* ── Closing paragraph ── */}
        <FadeIn delay={0.2}>
          <p className="mx-auto max-w-[920px] text-center text-[15px] md:text-[16px] leading-[1.85] text-[#4b5563]">
            {t('aboutPage.aboutUsBottom')}
          </p>
        </FadeIn>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 2.5 — VISION, MISSION & QUALITY
═══════════════════════════════════════════════════════════════════════════ */
function VisionMissionSection() {
  const { t } = useTranslation();
  return (
    <section className="bg-white pb-20 md:pb-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="border-t border-gray-200 mb-16 md:mb-20" />

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* LEFT COLUMN */}
          <div className="w-full lg:w-1/2">
            <FadeIn>
              <h2 className="text-[32px] md:text-[38px] lg:text-[40px] font-light text-[#6D7483] leading-[1.2] mb-8 md:mb-10">
                {t('aboutPage.visionMissionTitle')}
              </h2>
            </FadeIn>

            <div className="space-y-8 md:space-y-10">
              <FadeIn delay={0.15}>
                <div>
                  <h3 className="text-[15px] md:text-[16px] font-bold uppercase text-[#123F73] mb-2">{t('aboutPage.ourVision')}</h3>
                  <p className="text-[15px] md:text-[16px] leading-[1.85] text-[#6B7280]">
                    {t('aboutPage.visionDesc')}
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div>
                  <h3 className="text-[15px] md:text-[16px] font-bold uppercase text-[#123F73] mb-2">{t('aboutPage.ourMission')}</h3>
                  <p className="text-[15px] md:text-[16px] leading-[1.85] text-[#6B7280]">
                    {t('aboutPage.missionDesc')}
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.45}>
                <div>
                  <h3 className="text-[15px] md:text-[16px] font-bold uppercase text-[#123F73] mb-2">{t('aboutPage.ourGoal')}</h3>
                  <p className="text-[15px] md:text-[16px] leading-[1.85] text-[#6B7280]">
                    {t('aboutPage.goalDesc')}
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full lg:w-1/2">
            <FadeIn delay={0.15}>
              <h2 className="text-[32px] md:text-[38px] lg:text-[40px] font-light text-[#6D7483] leading-[1.2] mb-8 md:mb-10">
                {t('aboutPage.qualityEnvTitle')}
              </h2>
            </FadeIn>

            <div className="space-y-6 md:space-y-8 text-[15px] md:text-[16px] leading-[1.85] text-[#6B7280]">
              <FadeIn delay={0.3}>
                <p>
                  {t('aboutPage.qualityP1')}
                </p>
              </FadeIn>

              <FadeIn delay={0.45}>
                <p>
                  {t('aboutPage.qualityP2')}
                </p>
              </FadeIn>

              <FadeIn delay={0.6}>
                <p>
                  {t('aboutPage.qualityP3')}
                </p>
              </FadeIn>

              <FadeIn delay={0.75}>
                <p>
                  {t('aboutPage.qualityP4')}
                </p>
              </FadeIn>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 3 — FAS LIFT IS A WORLDWIDE BRAND
═══════════════════════════════════════════════════════════════════════════ */
function WorldwideBrandSection() {
  const { t } = useTranslation();
  return (
    <section className="bg-[#f9fafb] pt-24 pb-12 md:pt-36 md:pb-16">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">

        {/* Heading */}
        <FadeIn>
          <h2
            className="font-['Georgia','Times_New_Roman',serif] italic font-normal text-[#6b7280] mb-12"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', lineHeight: 1.15 }}
          >
            {t('aboutPage.worldwideTitle')}
          </h2>
        </FadeIn>

        {/* World Map */}
        <FadeIn delay={0.15}>
          <div className="relative mb-10">
            <img
              src="/images/Gemini_Generated_Image_5rcoyx5rcoyx5rco.png"
              alt={t('aboutPage.altWorldwide')}
              className="w-full h-auto object-contain"
              draggable={false}
            />
          </div>
        </FadeIn>

        {/* Description */}
        <FadeIn delay={0.3}>
          <p className="max-w-[960px] text-[15px] md:text-[16px] leading-[1.85] text-[#4b5563]">
            {t('aboutPage.worldwideDesc')}
          </p>
        </FadeIn>

      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION 4 — CONTACT INFORMATION
═══════════════════════════════════════════════════════════════════════════ */
function ContactInformationSection() {
  const { t } = useTranslation();
  return (
    <section className="bg-white">
      {/* Top Divider */}
      <div className="mx-auto max-w-[1000px] px-6 lg:px-12">
        <div className="border-t border-gray-300" />
      </div>

      <div className="py-16 md:py-20 flex flex-col items-center text-center px-6">
        <FadeIn>
          <h2 className="font-['Inter',sans-serif] font-bold text-[#111827] mb-6 text-[18px] md:text-[20px] tracking-wide">
            {t('aboutPage.contactInfoTitle')}
          </h2>
        </FadeIn>

        <style>{`
          @keyframes text-color-shift {
            0%, 100% { color: #6b7280; }
            50% { color: #123F73; }
          }
          .anim-text-shift {
            animation: text-color-shift 4s ease-in-out infinite;
            display: inline-block;
          }
          .hover-group {
            text-decoration: none !important;
            outline: none !important;
          }
          .hover-group:hover .anim-text-shift {
            animation: none !important;
            color: #123F73 !important;
          }
        `}</style>

        <FadeIn delay={0.1} className="flex flex-col items-center w-full">
          <div className="text-[#6b7280] font-light text-[14px] md:text-[15px] leading-[1.8] flex flex-col items-center w-full">
            <p>FAS LIFT SOLUTIONS</p>
            <p style={{ whiteSpace: 'pre-line' }}>{t('footer.address')}</p>
            <p>
              {t('footer.phoneLabel')}: <span onClick={() => window.location.href = 'tel:+212531613923'} className="hover-group"><span className="anim-text-shift font-normal transition-colors duration-300">+212 531 613 923</span></span> | Fax: <span onClick={() => window.location.href = 'tel:+212541132463'} className="hover-group"><span className="anim-text-shift font-normal transition-colors duration-300">+212 541 132 463</span></span>
            </p>

            <p className="mt-6">
              e-mail: <span onClick={() => window.location.href = 'mailto:faslift@outlook.com'} className="hover-group"><span className="anim-text-shift font-normal transition-colors duration-300">faslift@outlook.com</span></span>
            </p>
          </div>
        </FadeIn>
      </div>

      {/* Bottom Divider */}
      <div className="mx-auto max-w-[1000px] px-6 lg:px-12">
        <div className="border-b border-gray-300" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   ABOUT PAGE
═══════════════════════════════════════════════════════════════════════════ */
export default function AboutPage() {

  return (
    <div className="font-['Inter',sans-serif] bg-white overflow-x-hidden">
      <Navbar />

      {/* ── Section 1: From 2021 to the Future ── */}
      <AnniversarySection />

      {/* Subtle divider */}
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="border-t border-[#e5e7eb]" />
      </div>

      {/* ── Section 2: About Us ── */}
      <AboutUsSection />

      {/* ── Section 2.5: Vision, Mission & Quality ── */}
      <VisionMissionSection />

      {/* ── Section 3: Worldwide Brand ── */}
      <WorldwideBrandSection />

      {/* ── Section 4: Contact Information ── */}
      <ContactInformationSection />

      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <FloatingToolbar />
    </div>
  );
}
