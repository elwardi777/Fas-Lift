import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
import { ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';
import FloatingToolbar from '../components/FloatingToolbar';
import About from '../components/About';



/* ══════════════════════════════════════════════════════
   ABOUT PAGE
══════════════════════════════════════════════════════ */
export default function AboutPage() {
  const { t } = useTranslation();
  return (
    <div className="font-['Inter',sans-serif] bg-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ── */}
      <section className="relative flex min-h-[100svh] items-start overflow-hidden bg-white pt-24 pb-16 lg:min-h-screen lg:items-center lg:pt-20 lg:pb-0">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          {/* Mobile Image (Phone mode) */}
          <img
            src="/images/Capture d’écran 2026-05-23 124814.png"
            alt="FasLift Speed Governor"
            className="h-full w-full object-cover object-bottom lg:hidden"
          />
          {/* PC Image (PC mode) */}
          <img
            src="/images/Gemini_Generated_Image_ibchg1ibchg1ibch.png"
            alt="FasLift Engineering Background"
            className="hidden h-full w-full object-cover object-[62%_center] opacity-85 sm:object-right md:object-center lg:block lg:object-cover lg:object-center lg:opacity-90"
          />
          {/* Subtle grid pattern overlay */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse"><path d="M 60 0 L 0 0 0 60" fill="none" stroke="#111C5A" strokeWidth="1" /></pattern></defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          {/* Left-to-right gradient overlay to guarantee text readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/85 to-transparent sm:bg-gradient-to-r sm:from-white sm:via-white/95 sm:to-white/10 md:from-white md:via-white/90 md:to-transparent" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white to-transparent sm:hidden" />
          {/* Bottom fade for smooth transition to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F5F7FA] to-transparent pointer-events-none" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-10 sm:px-6 lg:px-12 lg:py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="max-w-[620px] lg:max-w-none">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
                className="mb-5 inline-flex max-w-full items-center gap-2 rounded-full border border-[#111C5A]/15 bg-white/75 px-4 py-2 backdrop-blur-sm lg:mb-6 lg:bg-white/70">
                <span className="w-2 h-2 rounded-full bg-[#1565C0] animate-pulse" />
                <span className="font-['JetBrains_Mono',monospace] text-[10px] font-semibold uppercase tracking-[0.18em] text-[#111C5A]/60 lg:text-[11px] lg:tracking-[0.2em]">{t('aboutPage.heroBadge')}</span>
              </motion.div>
              <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-5 font-['Poppins',sans-serif] font-black leading-[1.0] text-[#0D1540] lg:mb-6 lg:tracking-[-0.03em]"
                style={{ fontSize: 'clamp(2.45rem, 13vw, 3rem)' }}>
                <span className="hidden lg:inline" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)' }}>
                  {t('aboutPage.heroTitlePart1')}<br /><span className="text-[#0B3D78]">{t('aboutPage.heroTitlePart2')}</span>
                </span>
                <span className="lg:hidden">
                  {t('aboutPage.heroTitlePart1')}<br /><span className="text-[#0B3D78]">{t('aboutPage.heroTitlePart2')}</span>
                </span>
              </motion.h1>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}
                className="mb-4 max-w-lg text-base leading-relaxed text-[#0D1540]/68 lg:text-lg lg:text-[#0D1540]/60">
                {t('aboutPage.heroSubtitle1')}
              </motion.p>
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.45 }}
                className="mb-8 max-w-md text-sm leading-7 text-[#0D1540]/58 lg:mb-10 lg:text-base lg:leading-relaxed lg:text-[#0D1540]/50">
                {t('aboutPage.heroSubtitle2')}
              </motion.p>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }} className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:gap-4">
                <a href="#timeline" className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#111C5A] px-6 py-4 text-sm font-semibold text-white transition-colors duration-300 hover:bg-[#1565C0] lg:w-auto lg:px-8">
                  {t('aboutPage.btnExplore')} <ArrowRight size={16} />
                </a>
                <Link to="/corporate/contact" className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#111C5A]/20 bg-white/50 px-6 py-4 text-sm font-semibold text-[#111C5A] backdrop-blur-sm transition-colors duration-300 hover:border-[#1565C0] hover:text-[#1565C0] lg:w-auto lg:bg-transparent lg:px-8 lg:backdrop-blur-none">
                  {t('aboutPage.btnContact')}
                </Link>
              </motion.div>
            </div>

            {/* ── RIGHT: Floating Glassmorphism Badge/Card ── */}

          </div>
        </div>
        <motion.div className="absolute bottom-10 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <span className="text-[10px] tracking-[0.2em] uppercase text-[#111C5A]/30 font-['JetBrains_Mono',monospace]">{t('aboutPage.scrollText')}</span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-[#111C5A]/30 to-transparent" />
        </motion.div>
      </section>

      {/* ── INTRO / STATS ── */}
      <IntroSection />

      {/* ── HISTORY TIMELINE ── */}
      <TimelineSection />

      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
      <FloatingToolbar />
    </div>
  );
}


/* ══════════════════════════════════════════════════════
   TIMELINE ITEM  (line → dot → card, sequenced)
══════════════════════════════════════════════════════ */
const CARD_HEIGHT = 220;
const LINE_DURATION = 0.85;
const DOT_DELAY = LINE_DURATION + 0.1;

function TimelineCard({
  item,
  side,
  cardReady,
}: {
  item: { year: string; title: string; desc: string };
  side: 'left' | 'right';
  cardReady: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 44, filter: 'blur(8px)' }}
      animate={cardReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className={`w-full max-w-[340px] ${side === 'left' ? 'self-end text-right' : 'self-start text-left'}`}
    >
      <div className={`mb-2 ${side === 'left' ? 'flex justify-end' : 'flex justify-start'}`}>
        <span className="inline-block bg-[#0D1540] text-white font-['Poppins',sans-serif] font-black text-sm px-4 py-1 skew-x-[-6deg]">
          <span className="inline-block skew-x-[6deg]">{item.year}</span>
        </span>
      </div>
      <div className="group bg-[#1565C0] text-white p-5 hover:bg-[#111C5A] transition-colors duration-300 cursor-default overflow-hidden">
        <h3 className="font-['Poppins',sans-serif] font-bold text-base mb-1">{item.title}</h3>
        <p className="text-white/75 text-sm leading-relaxed">{item.desc}</p>
      </div>
    </motion.div>
  );
}

/* RailConnector: anchored at rail center, line shoots left or right via overflow:visible */
function RailConnector({
  side, cardIndex, totalCards, onComplete,
}: {
  side: 'left' | 'right'; cardIndex: number; totalCards: number; onComplete: () => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(wrapRef, { once: true, margin: '-60px' });
  const topPct = (cardIndex / (totalCards - 1)) * 100;
  const reach = 320; // px — stops at card outer edge, not inside
  const endX = side === 'left' ? -reach : reach;

  return (
    <div ref={wrapRef} className="absolute" style={{ left: 'calc(50% - 3px)', top: `calc(${topPct}% - 1px)`, width: 1, height: 1 }}>
      <svg className="absolute pointer-events-none z-[6]" style={{ overflow: 'visible', left: 0, top: 0, width: 1, height: 1 }} fill="none">
        <defs>
          <linearGradient id={`g-${side}-${cardIndex}`} gradientUnits="userSpaceOnUse"
            x1="0" y1="0" x2={String(endX)} y2="0">
            <stop offset="0%" stopColor="#1565C0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#42a5f5" stopOpacity="0.15" />
          </linearGradient>
          <filter id={`gl-${side}-${cardIndex}`}>
            <feGaussianBlur stdDeviation="2.5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>
        {/* Glow stroke */}
        <motion.line x1="0" y1="0" x2={endX} y2="0"
          stroke={`url(#g-${side}-${cardIndex})`} strokeWidth="4" strokeLinecap="round"
          filter={`url(#gl-${side}-${cardIndex})`}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 0.7 } : {}}
          transition={{ duration: LINE_DURATION, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Dashed line */}
        <motion.line x1="0" y1="0" x2={endX} y2="0"
          stroke="#1565C0" strokeWidth="1.5" strokeDasharray="7 5" strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: LINE_DURATION, ease: [0.22, 1, 0.36, 1] }}
        />
        {/* Endpoint dot — fires card reveal */}
        <motion.circle cx={endX} cy={0} r="6"
          fill="white" stroke="#1565C0" strokeWidth="2.5"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.35, delay: DOT_DELAY, ease: 'backOut' }}
          onAnimationComplete={() => isInView && onComplete()}
        />
        {/* Pulse ring */}
        <motion.circle cx={endX} cy={0} r="11" fill="none"
          stroke="#1565C0" strokeWidth="1" strokeOpacity="0.4"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: [0, 1.8], opacity: [0.5, 0] } : {}}
          transition={{ duration: 0.7, delay: DOT_DELAY + 0.1, ease: 'easeOut' }}
        />
      </svg>
    </div>
  );
}

function TimelineItem({
  item, side, cardReady,
}: {
  item: { year: string; title: string; desc: string };
  side: 'left' | 'right';
  cardReady: boolean;
}) {
  return (
    <div className={`relative flex flex-col min-h-[220px] py-10 overflow-hidden ${side === 'left' ? 'items-end pr-6 text-right' : 'items-start pl-6 text-left'
      }`}>
      <TimelineCard item={item} side={side} cardReady={cardReady} />
    </div>
  );
}

function TimelineSection() {
  const { t } = useTranslation();
  const TIMELINE = [
    { year: '2015', title: t('aboutPage.timeline2015Title'), desc: t('aboutPage.timeline2015Desc') },
    { year: '2016', title: t('aboutPage.timeline2016Title'), desc: t('aboutPage.timeline2016Desc') },
    { year: '2017', title: t('aboutPage.timeline2017Title'), desc: t('aboutPage.timeline2017Desc') },
    { year: '2019', title: t('aboutPage.timeline2019Title'), desc: t('aboutPage.timeline2019Desc') },
    { year: '2021', title: t('aboutPage.timeline2021Title'), desc: t('aboutPage.timeline2021Desc') },
    { year: '2023', title: t('aboutPage.timeline2023Title'), desc: t('aboutPage.timeline2023Desc') },
    { year: '2025', title: t('aboutPage.timeline2025Title'), desc: t('aboutPage.timeline2025Desc') },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const railBodyRef = useRef<HTMLDivElement>(null);
  const elevatorRef = useRef<HTMLDivElement>(null);
  const fillLRef = useRef<HTMLDivElement>(null);
  const fillRRef = useRef<HTMLDivElement>(null);
  const mobileRailRef = useRef<HTMLDivElement>(null);
  const mobileElevRef = useRef<HTMLDivElement>(null);
  const mobileFillRef = useRef<HTMLDivElement>(null);

  const [readyCards, setReadyCards] = useState<boolean[]>(() => TIMELINE.map(() => false));
  const markReady = (i: number) =>
    setReadyCards(prev => { const next = [...prev]; next[i] = true; return next; });

  const [mobileReadyCards, setMobileReadyCards] = useState<boolean[]>(() => TIMELINE.map(() => false));
  const mobileTriggered = useRef<boolean[]>(TIMELINE.map(() => false));

  /* GSAP: elevator travels from top dot to bottom dot, scrubbed by scroll */
  useEffect(() => {
    const section = sectionRef.current;
    const body = railBodyRef.current;
    const elevator = elevatorRef.current;
    const fillL = fillLRef.current;
    const fillR = fillRRef.current;
    if (!section || !body || !elevator) return;

    // Measure the actual rendered height of the center column (rail container)
    const centerCol = elevator.parentElement as HTMLElement;
    const railH = centerCol.offsetHeight;              // total rail pixel height
    const imgH = elevator.offsetHeight;               // elevator image height
    // First dot is at top:0, last dot is at top:100% of centerCol
    // We want elevator CENTER on each dot → offset by half image height
    const startY = -(imgH / 2);                        // center of image on first dot (top:0)
    const endY = railH - (imgH / 2);                 // center of image on last dot (top:100%)

    const ctx = gsap.context(() => {
      /* Elevator scrub */
      gsap.fromTo(
        elevator,
        { y: startY },
        {
          y: endY,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.8,
          },
        }
      );

      /* Progressive rail fill (left) */
      if (fillL) {
        gsap.fromTo(
          fillL,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.5,
            },
          }
        );
      }
      /* Progressive rail fill (right) */
      if (fillR) {
        gsap.fromTo(
          fillR,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            transformOrigin: 'top center',
            scrollTrigger: {
              trigger: section,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.5,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  /* GSAP — mobile elevator (deferred so DOM is painted and offsetHeight is real) */
  useEffect(() => {
    const section = sectionRef.current;
    const mRail = mobileRailRef.current;
    const mElev = mobileElevRef.current;
    const mFill = mobileFillRef.current;
    if (!section || !mRail || !mElev) return;

    let ctx: ReturnType<typeof gsap.context>;

    const init = () => {
      const railH = mRail.offsetHeight;
      const imgH = mElev.offsetHeight || 120; // fallback if image not fully loaded yet
      if (railH === 0) return; // not visible yet (desktop)

      const startY = -(imgH / 2);
      const endY = railH - (imgH / 2);
      const totalItems = TIMELINE.length;

      ctx = gsap.context(() => {
        gsap.fromTo(mElev,
          { y: startY },
          { 
            y: endY, ease: 'none',
            scrollTrigger: {
              trigger: section, start: 'top top', end: 'bottom bottom', scrub: 1.8,
              onUpdate: (self) => {
                const p = self.progress;
                TIMELINE.forEach((_, i) => {
                  const dotP = i / (totalItems - 1);
                  if (p >= dotP && !mobileTriggered.current[i]) {
                    mobileTriggered.current[i] = true;
                    setMobileReadyCards(prev => {
                      const next = [...prev]; next[i] = true; return next;
                    });
                  }
                  if (p < dotP && mobileTriggered.current[i]) {
                    mobileTriggered.current[i] = false;
                    setMobileReadyCards(prev => {
                      const next = [...prev]; next[i] = false; return next;
                    });
                  }
                });
              },
            }
          }
        );
        if (mFill) gsap.fromTo(mFill,
          { scaleY: 0 },
          { 
            scaleY: 1, ease: 'none', transformOrigin: 'top center',
            scrollTrigger: { trigger: section, start: 'top top', end: 'bottom bottom', scrub: 0.5 }
          }
        );
      }, section);
    };

    // Run after two animation frames to ensure layout is complete
    const raf = requestAnimationFrame(() => requestAnimationFrame(init));

    // Trigger GSAP refresh on load & resize to ensure correct heights are computed
    const handleRefresh = () => {
      if (ctx) ctx.revert();
      init();
    };
    window.addEventListener('load', handleRefresh);
    window.addEventListener('resize', handleRefresh);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('load', handleRefresh);
      window.removeEventListener('resize', handleRefresh);
      ctx?.revert();
    };
  }, []);

  return (
    <section id="timeline" ref={sectionRef} className="relative bg-[#F5F7FA] pt-36 pb-20 overflow-x-hidden">
      {/* Heading */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 mb-32 text-center z-[10]">
        <div className="inline-flex items-center gap-3 mb-4">
          <div className="w-8 h-[2px] bg-[#1565C0]" />
          <span className="font-['JetBrains_Mono',monospace] text-[11px] tracking-[0.2em] uppercase text-[#111C5A]/40">{t('aboutPage.timelineSectionBadge')}</span>
          <div className="w-8 h-[2px] bg-[#1565C0]" />
        </div>
        <h2 className="font-['Poppins',sans-serif] font-black text-[#0D1540]" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
          {t('aboutPage.timelineSectionHeading')}
        </h2>
      </div>

      {/* Body */}
      <div ref={railBodyRef} className="relative max-w-6xl mx-auto px-6 lg:px-12 mt-8">
        <div className="hidden lg:flex">

          {/* LEFT items (even) */}
          <div className="flex-1 flex flex-col">
            {TIMELINE.map((item, i) =>
              i % 2 === 0
                ? <TimelineItem key={item.year} item={item} side="left" cardReady={readyCards[i]} />
                : <div key={item.year} style={{ minHeight: CARD_HEIGHT }} />
            )}
          </div>

          {/* CENTER: rails + elevator + connectors */}
          <div className="relative flex-shrink-0 w-[400px] lg:w-[600px]">

            {/* Base rail tracks (dim) */}
            <div className="absolute left-[calc(50%-16px)] top-0 bottom-0 w-[7px] bg-[#1565C0]/20 z-[2]" />
            <div className="absolute left-[calc(50%+9px)] top-0 bottom-0 w-[7px] bg-[#1565C0]/20 z-[2]" />

            {/* Progressive fill rails (bright, scaled by GSAP) */}
            <div ref={fillLRef} className="absolute left-[calc(50%-16px)] top-0 bottom-0 w-[7px] bg-[#1565C0] z-[3] origin-top" />
            <div ref={fillRRef} className="absolute left-[calc(50%+9px)] top-0 bottom-0 w-[7px] bg-[#1565C0] z-[3] origin-top" />

            {/* Connector lines — start at rail, extend to cards */}
            {TIMELINE.map((_, i) => (
              <RailConnector
                key={i}
                side={i % 2 === 0 ? 'left' : 'right'}
                cardIndex={i}
                totalCards={TIMELINE.length}
                onComplete={() => markReady(i)}
              />
            ))}

            {/* Elevator — GSAP moves this */}
            <div
              ref={elevatorRef}
              className="absolute z-[1] pointer-events-none"
              style={{ top: 0, left: '50%', transform: 'translateX(-50%)', width: '450px' }}
            >
              <img
                src="/images/manufacturing.png"
                alt="FasLift Elevator"
                style={{
                  display: 'block',
                  width: '100%',
                  height: 'auto',
                  filter: 'drop-shadow(0 16px 40px rgba(17,28,90,0.35)) drop-shadow(0 4px 12px rgba(21,101,192,0.2))',
                }}
              />
            </div>

            {/* Glowing rail dots */}
            {TIMELINE.map((_, i) => (
              <div
                key={i}
                className="absolute left-1/2 -translate-x-1/2 w-[14px] h-[14px] rounded-full bg-white border-2 border-[#1565C0] z-[9] shadow-[0_0_10px_rgba(21,101,192,0.7)]"
                style={{ top: `calc(${(i / (TIMELINE.length - 1)) * 100}% - 7px)` }}
              />
            ))}
          </div>

          {/* RIGHT items (odd) */}
          <div className="flex-1 flex flex-col">
            {TIMELINE.map((item, i) =>
              i % 2 !== 0
                ? <TimelineItem key={item.year} item={item} side="right" cardReady={readyCards[i]} />
                : <div key={item.year} style={{ minHeight: CARD_HEIGHT }} />
            )}
          </div>

        </div>
      </div>

      {/* ── MOBILE LAYOUT ── */}
      <div className="lg:hidden relative max-w-sm mx-auto px-4 mt-4">
        <div className="flex gap-3">

          {/* Cards — LEFT */}
          <div className="flex-1 flex flex-col">
            {TIMELINE.map((item, i) => (
              <MobileTimelineCard key={item.year} item={item} cardReady={mobileReadyCards[i]} />
            ))}
          </div>

          {/* Rail — RIGHT */}
          <div ref={mobileRailRef} className="relative flex-shrink-0 w-[50px]">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[5px] bg-[#1565C0]/20 z-[2]" />
            <div ref={mobileFillRef} className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[5px] bg-[#1565C0] z-[3] origin-top" />
            {TIMELINE.map((_, i) => (
              <div key={i}
                className="absolute left-1/2 -translate-x-1/2 w-[11px] h-[11px] rounded-full bg-white border-2 border-[#1565C0] z-[9] shadow-[0_0_8px_rgba(21,101,192,0.6)]"
                style={{ top: `calc(${(i / (TIMELINE.length - 1)) * 100}% - 5.5px)` }}
              />
            ))}
            <div
              ref={mobileElevRef}
              className="absolute z-[5] pointer-events-none"
              style={{ top: 0, left: '50%', transform: 'translateX(-50%)', width: '200px' }}
            >
              <img src="/images/manufacturing.png" alt="FasLift Elevator"
                style={{
                  display: 'block', width: '100%', height: 'auto',
                  filter: 'drop-shadow(0 6px 16px rgba(17,28,90,0.3))'
                }}
              />
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}

function MobileTimelineCard({ item, cardReady }: { item: { year: string; title: string; desc: string }; cardReady: boolean }) {
  return (
    <div style={{ minHeight: CARD_HEIGHT }} className="flex flex-col justify-center py-4">
      <motion.div
        initial={{ opacity: 0, y: 60, filter: 'blur(8px)' }}
        animate={cardReady ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="inline-block bg-[#0D1540] text-white font-['Poppins',sans-serif] font-black text-xs px-3 py-1 mb-2 skew-x-[-6deg]">
          <span className="inline-block skew-x-[6deg]">{item.year}</span>
        </span>
        <div className="bg-[#1565C0] text-white p-4">
          <h3 className="font-['Poppins',sans-serif] font-bold text-sm mb-1">{item.title}</h3>
          <p className="text-white/75 text-xs leading-relaxed">{item.desc}</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   INTRO SECTION
══════════════════════════════════════════════════════ */
function IntroSection() {
  return <About />;
}
