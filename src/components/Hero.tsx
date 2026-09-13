import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Layers, CheckCircle2 } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════════════════════
   Hero Governor Product Images Array
   ═══════════════════════════════════════════════════════════════════════════ */
const GOVERNOR_SHOWCASE_IMAGES = [
  {
    src: '/images/governor_3d_transparent.png',
    alt: 'FasLift Elevator Speed Governor - 3D Render View',
    label: '3D CAD PROJECTION',
    scale: 'scale-[1.35]',
  },
  {
    src: '/images/20260525_170005.jpg-removebg-preview.png',
    alt: 'FasLift Elevator Speed Governor - Front Assembly View',
    label: 'FRONT ASSEMBLY VIEW',
    scale: 'scale-[1.65]',
  },
  {
    src: '/images/20260525_165958.jpg-removebg-preview.png',
    alt: 'FasLift Elevator Speed Governor - Side Angle View',
    label: 'SIDE ANGLE VIEW',
    scale: 'scale-[1.65]',
  },
  {
    src: '/images/20260525_165930.jpg-removebg-preview.png',
    alt: 'FasLift Elevator Speed Governor - Chassis View',
    label: 'STEEL CHASSIS VIEW',
    scale: 'scale-[1.65]',
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   Engineering Grid Background Canvas
   ═══════════════════════════════════════════════════════════════════════════ */
const EngineeringGridCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = (timestamp: number) => {
      const W = canvas.offsetWidth;
      const H = canvas.offsetHeight;
      const t = timestamp * 0.0003;

      ctx.clearRect(0, 0, W, H);

      // Gradient background: Pristine Light Engineering Sky
      const bgGrad = ctx.createLinearGradient(0, 0, W, H);
      bgGrad.addColorStop(0, '#FFFFFF');
      bgGrad.addColorStop(0.5, '#F4F8FC');
      bgGrad.addColorStop(1, '#EBF3FA');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, W, H);

      // Technical Perspective Grid
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = 'rgba(11, 61, 120, 0.04)';

      // Vertical lines
      const gridSize = 48;
      for (let x = 0; x < W; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }

      // Horizontal lines
      for (let y = 0; y < H; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }

      // Dynamic animated CAD crosshairs in corners
      const crosshairColor = 'rgba(11, 61, 120, 0.25)';
      ctx.strokeStyle = crosshairColor;
      ctx.lineWidth = 1;

      // Top-Left Crosshair
      const chSize = 12;
      ctx.beginPath();
      ctx.moveTo(60 - chSize, 60); ctx.lineTo(60 + chSize, 60);
      ctx.moveTo(60, 60 - chSize); ctx.lineTo(60, 60 + chSize);
      ctx.stroke();

      // Top-Right Crosshair
      ctx.beginPath();
      ctx.moveTo(W - 60 - chSize, 60); ctx.lineTo(W - 60 + chSize, 60);
      ctx.moveTo(W - 60, 60 - chSize); ctx.lineTo(W - 60, 60 + chSize);
      ctx.stroke();

      // Subtle Vertical Speed Axis Line (Elevator Travel Simulation)
      const axisX = W * 0.88;
      ctx.beginPath();
      ctx.moveTo(axisX, 0);
      ctx.lineTo(axisX, H);
      ctx.strokeStyle = 'rgba(11, 61, 120, 0.08)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      // Moving Elevator Marker on Axis
      const markerY = (Math.sin(t * 1.5) * 0.4 + 0.5) * H;
      ctx.beginPath();
      ctx.arc(axisX, markerY, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#0B3D78';
      ctx.fill();

      // Soft ambient light glow behind product (Right side center)
      const glowGrad = ctx.createRadialGradient(W * 0.72, H * 0.5, 20, W * 0.72, H * 0.5, 340);
      glowGrad.addColorStop(0, 'rgba(11, 61, 120, 0.09)');
      glowGrad.addColorStop(0.6, 'rgba(96, 165, 250, 0.03)');
      glowGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(W * 0.72, H * 0.5, 340, 0, Math.PI * 2);
      ctx.fill();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
};

/* ═══════════════════════════════════════════════════════════════════════════
   Main Hero Component
   ═══════════════════════════════════════════════════════════════════════════ */
const Hero: React.FC = () => {
  const { t } = useTranslation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Automatic Smooth Slideshow Timer (Cycles every 3.5s)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % GOVERNOR_SHOWCASE_IMAGES.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused]);

  const TITLE_LINES = [
    { text: t('hero.line1', 'THE TRUSTED'), opacity: 1 },
    { text: t('hero.line2', 'ELEVATOR SAFETY'), opacity: 0.8 },
    { text: t('hero.line3', 'MANUFACTURER'), opacity: 0.5 },
  ];

  const currentImage = GOVERNOR_SHOWCASE_IMAGES[currentImageIndex];

  return (
    <section className="relative w-full overflow-hidden flex items-start pt-6 sm:pt-8 lg:pt-[32px] pb-8 lg:pb-12 bg-[#F8FAFC]">
      {/* ── Background Engineering Canvas ── */}
      <EngineeringGridCanvas />

      {/* ── Main Container ── */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-12 pt-0 pb-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-6 items-center">

          {/* ═════════════════════════════════════════════════════════
             LEFT COLUMN: BRAND MESSAGE, HEADLINE, DESCRIPTION & CTAS
             ═════════════════════════════════════════════════════════ */}
          <motion.div
            className="lg:col-span-6 flex flex-col items-start space-y-6 lg:pr-4"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >


            {/* Main Headline */}
            <div className="space-y-1">
              {TITLE_LINES.map((line, idx) => (
                <motion.h1
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: line.opacity, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + idx * 0.12 }}
                  className="font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#0B3D78] uppercase leading-[1.02]"
                >
                  {line.text}
                </motion.h1>
              ))}
            </div>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-[#334155] leading-relaxed max-w-xl font-normal">
              {t(
                'hero.subtitle',
                'FasLift Solutions manufactures premium elevator speed governors and elevator safety systems for modern vertical transportation infrastructure.'
              )}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2 w-full sm:w-auto">
              <Link to="/corporate/contact">
                <button className="w-full sm:w-auto py-4 px-8 rounded-full bg-[#0B3D78] text-white font-mono text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-[#082a54] hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 group cursor-pointer border border-[#0B3D78]">
                  <span>{t('hero.cta', 'I WANT TO GET A QUOTE')}</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>

              <Link to="/products/overspeed-governors">
                <button className="w-full sm:w-auto py-4 px-8 rounded-full bg-white text-[#0B3D78] border-2 border-[#0B3D78] font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#EAF2FB] transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer shadow-xs">
                  <span>{t('hero.secondaryCta', 'VIEW TECHNICAL DETAILS')}</span>
                </button>
              </Link>
            </div>

            {/* Standards & Certifications Bar */}
            <div className="pt-6 border-t border-gray-200/80 w-full flex flex-wrap items-center gap-4 sm:gap-6 font-mono text-xs text-[#64748B]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-[#0B3D78]" />
                <span className="font-bold text-[#0F172A]">EN 81-20/50</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={14} className="text-[#0B3D78]" />
                <span className="font-bold text-[#0F172A]">TÜV SÜD CERTIFIED</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers size={14} className="text-[#0B3D78]" />
                <span className="font-bold text-[#0F172A]">2014/33/EU DIRECTIVE</span>
              </div>
            </div>
          </motion.div>


          {/* ═════════════════════════════════════════════════════════
             RIGHT COLUMN: AUTOMATIC SLIDESHOW PRODUCT SHOWCASE
             ═════════════════════════════════════════════════════════ */}
          <motion.div
            className="lg:col-span-6 relative flex flex-col items-center justify-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Showcase Stage Container */}
            <div className="relative w-full max-w-[650px] h-[480px] sm:h-[560px] lg:h-[600px] flex items-center justify-center">

              {/* 360° Ring Technical Indicator */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                <div className="w-[400px] sm:w-[480px] h-[400px] sm:h-[480px] rounded-full border border-dashed border-[#0B3D78]/25 animate-[spin_40s_linear_infinite]" />
                <div className="w-[340px] sm:w-[400px] h-[340px] sm:h-[400px] rounded-full border border-gray-200/80" />
              </div>

              {/* Grounded Reflection & Shadow Platform */}
              <div className="absolute bottom-6 w-80 sm:w-[420px] h-10 bg-radial from-black/20 via-black/5 to-transparent rounded-full filter blur-md z-0 pointer-events-none" />

              {/* Main Visual Display (Automatic Slideshow with Smooth AnimatePresence Transition) */}
              <div className="relative z-10 w-full h-[400px] sm:h-[500px] flex items-center justify-center p-4">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={currentImage.src}
                    alt={currentImage.alt}
                    initial={{ opacity: 0, y: 15, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 1.02 }}
                    transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className={`max-h-[380px] sm:max-h-[480px] max-w-full object-contain filter drop-shadow-2xl transition-transform duration-300 ${currentImage.scale}`}
                  />
                </AnimatePresence>
              </div>

              {/* Interactive Slide Indicator Dots */}
              <div className="absolute bottom-2 z-20 flex items-center gap-2 bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-gray-200 shadow-xs">
                {GOVERNOR_SHOWCASE_IMAGES.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    aria-label={`View ${img.label}`}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${currentImageIndex === idx
                      ? 'w-6 bg-[#0B3D78]'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                      }`}
                  />
                ))}
              </div>

            </div>

          </motion.div>

        </div>
      </div>

      {/* Decorative Bottom Separation Border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0B3D78]/20 to-transparent" />
    </section>
  );
};

export default Hero;




