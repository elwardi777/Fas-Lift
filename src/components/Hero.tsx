import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ModelViewer3D from './ModelViewer3D';

// ---------------------------------------------------------------------------
// Animated Wave Background Canvas
// ---------------------------------------------------------------------------
const WaveCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

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
      const t = timestamp * 0.00025; // slow animation
      timeRef.current = t;

      ctx.clearRect(0, 0, W, H);

      // ── Background gradient ──────────────────────────────────────────
      const bg = ctx.createLinearGradient(0, 0, W * 0.6, H);
      bg.addColorStop(0, '#dde8f5');
      bg.addColorStop(0.4, '#e8f0f9');
      bg.addColorStop(1, '#f0f5fc');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      // ── Large sweeping arc lines (top area — like the reference) ─────
      const arcCx = W * -0.05;
      const arcCy = H * -0.3;
      const arcCount = 28;
      for (let i = 0; i < arcCount; i++) {
        const radius = W * 0.5 + i * (W * 0.032);
        const alpha = 0.022 - i * 0.0005;
        if (alpha <= 0) continue;
        ctx.beginPath();
        ctx.arc(arcCx, arcCy, radius, 0, Math.PI * 0.72);
        ctx.strokeStyle = `rgba(90,110,150,${alpha})`;
        ctx.lineWidth = 0.7;
        ctx.stroke();
      }

      // ── Flowing silk ribbon ──────────────────────────────────────────
      // The ribbon is a bundle of many thin lines each offset slightly,
      // following a sine wave path. This recreates the look in the reference.
      const ribbonLineCount = 55;
      const ribbonCenterY = H * 0.42;  // vertical center of ribbon
      const ribbonSpread = H * 0.18;   // vertical spread of the ribbon bundle

      for (let li = 0; li < ribbonLineCount; li++) {
        // Each line gets a vertical offset within the ribbon
        const frac = li / (ribbonLineCount - 1);          // 0..1
        const spread = (frac - 0.5) * ribbonSpread;

        // Opacity: lines near center of ribbon are slightly more visible
        const centeredness = 1 - Math.abs(frac - 0.5) * 2;
        const alpha = 0.04 + centeredness * 0.08;

        // Phase shift per line creates the 3D ribbon twist effect
        const phaseShift = (frac - 0.5) * Math.PI * 1.2;

        ctx.beginPath();
        const steps = 120;
        for (let si = 0; si <= steps; si++) {
          const x = (si / steps) * W;
          const px = si / steps; // 0..1 along width

          // Main wave — two bumps across the width (matches reference)
          const amp1 = H * 0.085 * Math.sin(px * Math.PI * 0.8 + t + phaseShift);
          const amp2 = H * 0.065 * Math.sin(px * Math.PI * 1.6 + t * 1.3 + phaseShift + Math.PI);

          // Ribbon compression at ends (taper inward at left and right edges)
          const taper = Math.sin(px * Math.PI);
          const y = ribbonCenterY + (spread * taper) + amp1 + amp2;

          if (si === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(80, 100, 140, ${alpha})`;
        ctx.lineWidth = 0.65;
        ctx.stroke();
      }

      // ── Small diamond sparkle (bottom-right corner, like reference) ──
      const dx = W * 0.97;
      const dy = H * 0.92;
      const ds = 6;
      ctx.save();
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.shadowColor = 'rgba(200,210,230,0.9)';
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.moveTo(dx, dy - ds);
      ctx.lineTo(dx + ds * 0.5, dy);
      ctx.lineTo(dx, dy + ds);
      ctx.lineTo(dx - ds * 0.5, dy);
      ctx.closePath();
      ctx.fill();
      ctx.restore();

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ display: 'block' }}
    />
  );
};

// ---------------------------------------------------------------------------
// Animation variants
// ---------------------------------------------------------------------------
const titleLineVariants = {
  hidden: { y: 40, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    clipPath: 'inset(0% 0 0 0)',
    transition: {
      duration: 0.7,
      delay: 0.3 + i * 0.18,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

const fadeUpVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const showcaseVariants = {
  hidden: { opacity: 0, scale: 0.96, x: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    transition: { duration: 0.9, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  },
};

// ---------------------------------------------------------------------------
// Hero Component
// ---------------------------------------------------------------------------
const Hero: React.FC = () => {
  const { t } = useTranslation();

  const TITLE_LINES = [
    { text: t('hero.line1'), opacity: 1 },
    { text: t('hero.line2'), opacity: 0.7 },
    { text: t('hero.line3'), opacity: 0.4 },
  ];
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden flex items-center"
    >
      {/* ── Animated canvas background ── */}
      <WaveCanvas />

      {/* =========================================================
          CONTENT WRAPPER
          ========================================================= */}
      <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-16 pt-[108px] sm:pt-40 pb-16 lg:pt-20 lg:pb-12 lg:-mt-16">
        <div className="flex flex-col lg:flex-row items-center lg:items-center gap-12 lg:gap-4">
          {/* -------------------------------------------------------
              LEFT SIDE — Text Content  (≈52%)
              ------------------------------------------------------- */}
          <motion.div
            className="w-full lg:w-[52%] flex flex-col items-start pt-0 sm:pt-16"
            initial="hidden"
            animate="visible"
          >
            {/* Title lines */}
            <div className="mb-8">
              {TITLE_LINES.map((line, i) => (
                <motion.h1
                  key={line.text}
                  custom={i}
                  variants={titleLineVariants}
                  className="font-['Inter',sans-serif] font-extrabold leading-[1.05] tracking-[-0.03em] text-[#0B3D78]"
                  style={{
                    opacity: line.opacity,
                    fontSize: 'clamp(2rem, 4.5vw, 3.75rem)',
                  }}
                >
                  {line.text}
                </motion.h1>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p
              variants={fadeUpVariants}
              custom={0.95}
              className="text-[#0B3D78]/80 text-base sm:text-lg leading-relaxed max-w-[520px] mb-10 font-normal"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTA Button */}
            <div className="w-full flex justify-center lg:justify-start">
              <Link to="/corporate/contact" className="inline-block">
                <motion.button
                  variants={fadeUpVariants}
                  custom={1.2}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.96 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  className="cta-btn inline-flex items-center gap-2 bg-[#123F73] text-white font-semibold
                             text-sm sm:text-base px-7 py-3.5 rounded-full
                             shadow-none hover:bg-[#0D3562] active:shadow-none
                             focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123F73]/35
                             transition-colors duration-200 cursor-pointer"
                >
                  {t('hero.cta')}
                  <span className="text-lg leading-none">→</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>

          {/* -------------------------------------------------------
              RIGHT SIDE — Interactive 3D Model  (≈48%)
              ------------------------------------------------------- */}
          <motion.div
            className="relative w-full max-w-full overflow-hidden lg:w-[48%] flex items-center justify-center pt-16"
            variants={showcaseVariants}
            initial="hidden"
            animate="visible"
          >
            {/* 3D Model Viewer */}
            <ModelViewer3D className="relative z-10 w-full h-[320px] sm:h-[420px] md:h-[480px] lg:h-[540px] mt-8 lg:mt-0" />
          </motion.div>
        </div>
      </div>

      {/* =========================================================
          DECORATIVE — Subtle bottom rule
          ========================================================= */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-[#0B3D78]/10" />
    </section>
  );
};

export default Hero;
