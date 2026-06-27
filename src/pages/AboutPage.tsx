import { useRef } from 'react';
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
  return (
    <section className="bg-white pt-24 pb-12 md:pt-28 md:pb-20">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

          {/* ── LEFT: Premium Anniversary Composition (≈45%) ── */}
          <div className="w-full lg:w-[45%] flex flex-col items-center justify-center relative min-h-[480px] lg:mt-[100px]">
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
              @keyframes years-fadein {
                0% { opacity: 0; transform: translateX(-8px); }
                100% { opacity: 1; transform: translateX(0); }
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
              .anim-years-fadein {
                animation: years-fadein 0.8s ease-out 2.2s forwards;
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

            {/* Diagonal Line crossing underneath the number */}
            <div
              className="absolute w-[95%] h-[1.5px] anim-diagonal-line z-0"
              style={{
                top: '64%',
                background: 'linear-gradient(90deg, transparent 0%, #123F73 25%, #58C5E8 50%, #8D98A8 75%, transparent 100%)',
                boxShadow: '0 0 8px rgba(88,197,232,0.4)',
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
            <div className="relative anim-number-descend z-10 flex flex-col items-center select-none mb-12">
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
                  className="absolute top-[-10px] right-[-150px] md:right-[-190px] lg:right-[-210px] font-['Inter',sans-serif] font-semibold text-[#123F73] uppercase anim-years-fadein"
                  style={{
                    fontSize: 'clamp(1.5rem, 2.5vw, 1.875rem)',
                    letterSpacing: '10px',
                  }}
                >
                </span>
              </div>
            </div>

            {/* Subtitle */}
            <FadeIn delay={1.8} className="z-10 mt-4">
              <p
                className="text-center font-['Georgia','Times_New_Roman',serif] font-normal text-[#4A5568] uppercase tracking-[6px]"
                style={{
                  fontSize: 'clamp(0.9rem, 1.8vw, 1.1rem)',
                  letterSpacing: '6px'
                }}
              >
                FROM 2021 TO THE FUTURE
              </p>
            </FadeIn>

            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.8, ease: 'easeOut' }}
              className="mt-5 z-10 flex justify-center"
            >
              <img
                src="/images/governor-4-removebg-preview.png"
                alt="FAS LIFT"
                className="h-16 md:h-20 w-auto object-contain"
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
                From 2021 to the Future...
              </h2>
            </FadeIn>

            <div className="max-w-[700px] space-y-5 text-[15px] leading-[1.85] text-[#4b5563] md:text-[16px]">
              <FadeIn delay={0.15}>
                <p>Every great journey begins with a single step.</p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p>
                  Since its establishment in 2021, <strong className="text-[#374151]">FAS LIFT</strong> has been dedicated to providing reliable elevator safety solutions with quality, professionalism, and customer satisfaction at the core of its mission.
                </p>
              </FadeIn>

              <FadeIn delay={0.25}>
                <p>
                  Today, we proudly supply high-quality <strong className="text-[#374151]">Speed Governors</strong>, ensuring safety, reliability, and compliance with international standards. Through continuous improvement and strong partnerships, we continue to grow and deliver dependable products and services.                </p>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p>
                  We sincerely thank our customers, partners, and suppliers for their trust and support as we continue building a safer future for vertical transportation.                </p>
              </FadeIn>





              <FadeIn delay={0.5}>
                <p className="font-semibold text-[#374151] italic">
                  The best is yet to come.
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
  // 4 images for the gallery row
  const galleryImages = [
    { src: '/images/governor-1.jpg', alt: 'Manufacturing Line' },
    { src: '/images/fabrika-detay-1.webp', alt: 'Precision Engineering' },
    { src: '/images/WhatsApp Image 2026-06-09 at 21.13.18 (2).jpeg', alt: 'Quality Control' },
    { src: '/images/fabrika-detay-3.webp', alt: 'Production Facility' },
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
                About Us
              </h2>
            </FadeIn>

            <div className="max-w-[540px] space-y-5 text-[15px] leading-[1.85] text-[#4b5563] md:text-[16px]">
              <FadeIn delay={0.1}>
                <p>
                  Founded in 2021, <strong className="text-[#374151]">FAS LIFT</strong> is a specialized company dedicated to supplying high-quality Elevator Speed Governors, providing reliable safety solutions for modern elevator systems.
                </p>
              </FadeIn>

              <FadeIn delay={0.15}>
                <p>
                  Since its establishment, we have focused on delivering durable, high-performance products that meet international safety standards and the evolving needs of the elevator industr                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <p>
                  Working with trusted manufacturers and partners, we are committed to quality, professionalism, and customer satisfaction by providing reliable products and efficient service.
                </p>
              </FadeIn>

              <FadeIn delay={0.25}>
                <p>
                  With a vision for continuous growth, <strong className="text-[#374151]">FAS LIFT</strong> continues to strengthen its position as a trusted partner in the elevator industry.                </p>
              </FadeIn>


            </div>
          </div>

          {/* RIGHT — Company Building Image */}
          <FadeIn className="w-full lg:w-[50%]" direction="left" delay={0.15}>
            <div className="relative overflow-hidden rounded-sm">
              <img
                src="/images/321da7c8-f094-4c2e-977c-48ed719647ae.jfif                   "
                alt="FAS LIFT Company Building"
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
            FAS LIFT continues to grow and improve within the elevator industry, building on its foundation of quality and customer trust. With a dedicated approach to service and product excellence, the company is committed to contributing to safer and more reliable vertical transportation systems worldwide.
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
  return (
    <section className="bg-white pb-20 md:pb-28">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="border-t border-gray-200 mb-16 md:mb-20" />

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* LEFT COLUMN */}
          <div className="w-full lg:w-1/2">
            <FadeIn>
              <h2 className="text-[32px] md:text-[38px] lg:text-[40px] font-light text-[#6D7483] leading-[1.2] mb-8 md:mb-10">
                Vision- Mission-Our Goal
              </h2>
            </FadeIn>

            <div className="space-y-8 md:space-y-10">
              <FadeIn delay={0.15}>
                <div>
                  <h3 className="text-[15px] md:text-[16px] font-bold uppercase text-[#123F73] mb-2">OUR VISION</h3>
                  <p className="text-[15px] md:text-[16px] leading-[1.85] text-[#6B7280]">
                    To become a trusted and globally recognized provider of <strong className="text-[#374151] font-semibold">elevator safety solutions</strong>, delivering reliable products, innovative technologies, and sustainable value to customers and partners worldwide.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <div>
                  <h3 className="text-[15px] md:text-[16px] font-bold uppercase text-[#123F73] mb-2">OUR MISSION</h3>
                  <p className="text-[15px] md:text-[16px] leading-[1.85] text-[#6B7280]">
                    To supply high-quality <strong className="text-[#374151] font-semibold">Elevator Speed Governors</strong> and safety components that meet international standards while providing dependable service, technical expertise, and customer-focused solutions built on quality, integrity, and continuous improvement.
                  </p>
                </div>
              </FadeIn>

              <FadeIn delay={0.45}>
                <div>
                  <h3 className="text-[15px] md:text-[16px] font-bold uppercase text-[#123F73] mb-2">OUR GOAL</h3>
                  <p className="text-[15px] md:text-[16px] leading-[1.85] text-[#6B7280]">
                    To strengthen our position in the elevator industry by continuously improving our products and services, building long-term partnerships, and contributing to safer and more reliable vertical transportation systems.
                  </p>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="w-full lg:w-1/2">
            <FadeIn delay={0.15}>
              <h2 className="text-[32px] md:text-[38px] lg:text-[40px] font-light text-[#6D7483] leading-[1.2] mb-8 md:mb-10">
                Our Quality & Environmental Commitment
              </h2>
            </FadeIn>

            <div className="space-y-6 md:space-y-8 text-[15px] md:text-[16px] leading-[1.85] text-[#6B7280]">
              <FadeIn delay={0.3}>
                <p>
                  At <strong className="text-[#374151] font-semibold">FAS LIFT</strong>, quality, safety, and environmental responsibility are fundamental values that guide every aspect of our business.
                </p>
              </FadeIn>

              <FadeIn delay={0.45}>
                <p>
                  We are committed to supplying reliable elevator safety products while minimizing our environmental impact through responsible resource management, waste reduction, and sustainable business practices.
                </p>
              </FadeIn>

              <FadeIn delay={0.6}>
                <p>
                  Our company continuously improves its operations by adopting efficient processes, complying with applicable regulations, and promoting environmental awareness throughout the organization.
                </p>
              </FadeIn>

              <FadeIn delay={0.75}>
                <p>
                  We invest in employee development, encourage continuous learning, and strive to provide innovative solutions that ensure safety, customer satisfaction, and long-term sustainable growth.
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
  return (
    <section className="bg-[#f9fafb] pt-24 pb-12 md:pt-36 md:pb-16">
      <div className="mx-auto max-w-[1200px] px-6 lg:px-12">

        {/* Heading */}
        <FadeIn>
          <h2
            className="font-['Georgia','Times_New_Roman',serif] italic font-normal text-[#6b7280] mb-12"
            style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.6rem)', lineHeight: 1.15 }}
          >
            FAS LIFT is a Worldwide Brand
          </h2>
        </FadeIn>

        {/* World Map */}
        <FadeIn delay={0.15}>
          <div className="relative mb-10">
            <img
              src="/images/Gemini_Generated_Image_5rcoyx5rcoyx5rco.png"
              alt="FAS LIFT Worldwide Presence"
              className="w-full h-auto object-contain"
              draggable={false}
            />
          </div>
        </FadeIn>

        {/* Logo + Tagline row */}


        {/* Description */}
        <FadeIn delay={0.3}>
          <p className="max-w-[960px] text-[15px] md:text-[16px] leading-[1.85] text-[#4b5563]">
            Since 2021, FAS LIFT has continued to expand its presence by providing reliable elevator safety products and building strong partnerships with customers around the world.
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
  return (
    <section className="bg-white">
      {/* Top Divider */}
      <div className="mx-auto max-w-[1000px] px-6 lg:px-12">
        <div className="border-t border-gray-300" />
      </div>

      <div className="py-16 md:py-20 flex flex-col items-center text-center px-6">
        <FadeIn>
          <h2 className="font-['Inter',sans-serif] font-bold text-[#111827] mb-6 text-[18px] md:text-[20px] tracking-wide">
            Contact Information
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
            <p>Zone Industrielle, Bloc B, N°7 Casablanca 20250 / MOROCCO</p>
            <p>
              Phone: <span onClick={() => window.location.href = 'tel:+212531613923'} className="hover-group"><span className="anim-text-shift font-normal transition-colors duration-300">+212 531 613 923</span></span> | Fax: <span onClick={() => window.location.href = 'tel:+212541132463'} className="hover-group"><span className="anim-text-shift font-normal transition-colors duration-300">+212 541 132 463</span></span>
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
