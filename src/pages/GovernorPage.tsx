import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';
import FloatingToolbar from '../components/FloatingToolbar';
import Lightbox from '../components/Lightbox';

/* ═══════════════════════════════════════════════════════════════════════════
   initDragScroll — shared function reused for both carousels (S3 & S7)
   ═══════════════════════════════════════════════════════════════════════════ */
function initDragScroll(el: HTMLElement): () => void {
  let isDown = false, startX = 0, startY = 0, scrollLeft = 0;

  function onMouseDown(e: MouseEvent) {
    isDown = true; el.style.cursor = 'grabbing';
    startX = e.pageX - el.offsetLeft; scrollLeft = el.scrollLeft;
  }
  function onMouseLeave() { isDown = false; el.style.cursor = 'grab'; }
  function onMouseUp() { isDown = false; el.style.cursor = 'grab'; }
  function onMouseMove(e: MouseEvent) {
    if (!isDown) return; e.preventDefault();
    el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX) * 1.5;
  }
  function onTouchStart(e: TouchEvent) {
    startX = e.touches[0].pageX; startY = e.touches[0].pageY; scrollLeft = el.scrollLeft;
  }
  function onTouchMove(e: TouchEvent) {
    const dx = e.touches[0].pageX - startX, dy = e.touches[0].pageY - startY;
    if (Math.abs(dx) > Math.abs(dy)) { e.preventDefault(); el.scrollLeft = scrollLeft - dx; }
  }

  el.style.cursor = 'grab';
  el.addEventListener('mousedown', onMouseDown);
  el.addEventListener('mouseleave', onMouseLeave);
  el.addEventListener('mouseup', onMouseUp);
  el.addEventListener('mousemove', onMouseMove);
  el.addEventListener('touchstart', onTouchStart, { passive: true });
  el.addEventListener('touchmove', onTouchMove, { passive: false });
  return () => {
    el.removeEventListener('mousedown', onMouseDown);
    el.removeEventListener('mouseleave', onMouseLeave);
    el.removeEventListener('mouseup', onMouseUp);
    el.removeEventListener('mousemove', onMouseMove);
    el.removeEventListener('touchstart', onTouchStart);
    el.removeEventListener('touchmove', onTouchMove);
  };
}

/* ═══════════════════════════════════════════════════════════════════════════
   Constants
   ═══════════════════════════════════════════════════════════════════════════ */
const A = '#0B3D78'; // primary accent

/* ═══════════════════════════════════════════════════════════════════════════
   SVG helpers
   ═══════════════════════════════════════════════════════════════════════════ */
function GovernorSVG({ size = 90 }: { size?: number }) {
  const h = Math.round(size * 1.2);
  return (
    <svg width={size} height={h} viewBox="0 0 90 108" fill="none">
      <circle cx="45" cy="36" r="32" stroke={A} strokeWidth="4" fill="none" opacity=".35" />
      <circle cx="45" cy="36" r="22" stroke={A} strokeWidth="2.5" fill="none" opacity=".25" />
      <circle cx="45" cy="36" r="7" fill={A} opacity=".5" />
      {[0, 60, 120, 180, 240, 300].map(d => {
        const r = (d * Math.PI) / 180;
        return <line key={d} x1={45 + 7 * Math.cos(r)} y1={36 + 7 * Math.sin(r)} x2={45 + 22 * Math.cos(r)} y2={36 + 22 * Math.sin(r)} stroke={A} strokeWidth="2" opacity=".3" />;
      })}
      <rect x="28" y="66" width="34" height="30" rx="4" fill={A} opacity=".5" />
      <rect x="32" y="70" width="26" height="14" rx="2" fill={A} opacity=".3" />
      <rect x="10" y="60" width="20" height="5" rx="2.5" fill={A} opacity=".4" />
      <rect x="60" y="60" width="20" height="5" rx="2.5" fill={A} opacity=".4" />
      <rect x="14" y="94" width="62" height="8" rx="4" fill={A} opacity=".5" />
      <circle cx="22" cy="98" r="3" fill={A} opacity=".7" />
      <circle cx="68" cy="98" r="3" fill={A} opacity=".7" />
    </svg>
  );
}

/*
function WeightSVG() {
  return (
    <svg width="52" height="68" viewBox="0 0 52 68" fill="none">
      <rect x="12" y="0" width="28" height="46" rx="8" fill={A} opacity=".45" />
      <circle cx="26" cy="23" r="11" fill={A} opacity=".6" />
      <circle cx="26" cy="23" r="5" fill="white" opacity=".4" />
      <rect x="0" y="46" width="52" height="9" rx="4.5" fill={A} opacity=".4" />
      <rect x="6" y="55" width="40" height="5" rx="3" fill={A} opacity=".3" />
      <circle cx="14" cy="58" r="2.5" fill={A} opacity=".6" />
      <circle cx="38" cy="58" r="2.5" fill={A} opacity=".6" />
    </svg>
  );
}
*/

/* ═══════════════════════════════════════════════════════════════════════════
   Page Component
   ═══════════════════════════════════════════════════════════════════════════ */
type Tab = 'visual' | 'specs' | 'optional';

export default function GovernorPage() {
  const { t } = useTranslation();

  /* ── translated data (re-derived on language change) ─────────────── */
  const GALLERY_ANGLES = [
    { key: 'governor.angleFront', img: '/images/20260525_165930.jpg-removebg-preview.png', bg: '#EBF7FD' },
    { key: 'governor.angleSideLeft', img: '/images/20260525_170005.jpg-removebg-preview.png', bg: '#E8F5FA' },
    { key: 'governor.angleThreeQuarter', img: '/images/6b4f27c3-cd50-4921-bb6a-835f75c85019-removebg-preview.png', bg: '#EDF4FB' },
    { key: 'governor.angleBack', img: '/images/20260525_165958.jpg-removebg-preview.png', bg: '#F0F8FF' },
    { key: 'governor.angleSideRight', img: '/images/20260525_165943.jpg-removebg-preview.png', bg: '#EBF3FA' },
    { key: 'governor.angleTop', img: '/images/20260525_170005.jpg-removebg-preview.png', bg: '#E4F0F8' },
    { key: 'governor.angleDetail', img: '/images/20260525_170005.jpg-removebg-preview.png', bg: '#F4F8FC' },
  ];

  const SPEC_ROWS = [
    { lk: 'governor.rowPulley', vk: ['governor.pulley1', 'governor.pulley2', 'governor.pulley3'] },
    { lk: 'governor.rowNominal', vk: ['governor.nominal1', 'governor.nominal2', 'governor.nominal3'] },
    { lk: 'governor.rowTripping', vk: ['governor.tripping1', 'governor.tripping2', 'governor.tripping3'] },
    { lk: 'governor.rowCert', vk: ['governor.cert', 'governor.cert', 'governor.cert'] },
  ];

  const OPT_ROWS = [
    { lk: 'governor.optTestGroove', v: [true, true, true] },
    { lk: 'governor.optRopeSafety', v: [true, true, true] },
    { lk: 'governor.optProtection', v: [true, true, true] },
    { lk: 'governor.optRemote', v: [false, false, false] },
    { lk: 'governor.optEncoder', v: [false, false, false] },
    { lk: 'governor.optUcm', v: [false, false, false] },
  ];

  const TECH_PROPERTIES = [
    'Factory adjusted and sealed according to the rated speed.',
    'Suitable for instantaneous and progressive safety gears.',
    'Easy installation and maintenance.',
    'Quiet and smooth operation.',
    'Activates safety gears in upward and downward directions.',
    'Fully compliant with EN 81-20 and EN 81-50.',
    'Governor rope diameter: Ø6 / Ø6.5 / Ø8 mm.',
    'Designed for long service life.',
    'High-quality steel construction.',
    'Reliable performance under continuous operation.',
  ];

  const TECH_STANDARDS = [
    'EN 81-20',
    'EN 81-50',
    'Passenger Elevators',
    'Freight Elevators',
    'High Reliability',
    'Long Service Life',
  ];

  /*
  const WEIGHTS = [
    { nk: 'governor.wStandard', bg: '#D6EDF9', c: [{ m: 'FS-01', w: '30 kg', d: '▼▲' }, { m: 'FS-01LR, 200, 250', w: '60 kg', d: '▼' }] },
    { nk: 'governor.wHeavy', bg: '#D2E8F5', c: [{ m: 'FS-01', w: '45 kg', d: '▼▲' }, { m: 'FS-01LR, 200, 250', w: '90 kg', d: '▼' }] },
    { nk: 'governor.wCompact', bg: '#D8F0E8', c: [{ m: 'FS-01', w: '25 kg', d: '▼' }, { m: 'FS-01LR, 200, 250', w: '50 kg', d: '▼' }] },
    { nk: 'governor.wSpring', bg: '#F5EDD5', c: [{ m: 'FS-01', w: '35 kg', d: '▼▲' }, { m: 'FS-01LR, 200, 250', w: '70 kg', d: '▼▲' }] },
    { nk: 'governor.wVertical', bg: '#EAE0F5', c: [{ m: 'FS-01', w: '40 kg', d: '▼' }, { m: 'FS-01LR, 200, 250', w: '80 kg', d: '▼' }] },
    { nk: 'governor.wAdjustable', bg: '#FFE8E8', c: [{ m: 'FS-01', w: '30–50 kg', d: '▼▲' }, { m: 'FS-01LR, 200, 250', w: '60–104 kg', d: '▼▲' }] },
    { nk: 'governor.wUniversal', bg: '#E0F4FF', c: [{ m: 'FS-01', w: '55 kg', d: '▼▲' }, { m: 'FS-01LR, 200, 250', w: '110 kg', d: '▼▲' }] },
  ];
  */

  const COLS = [t('governor.col1'), t('governor.col2'), t('governor.col3')];

  /* ── state & refs ─────────────────────────────────────────────────── */
  const [activeTab, setActiveTab] = useState<Tab>('visual');
  const [galleryDot, setGalleryDot] = useState(0);
  // const [weightDot, setWeightDot] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [isTechnicalVisible, setIsTechnicalVisible] = useState(false);

  const tabBarRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLElement>(null);
  const specsRef = useRef<HTMLElement>(null);
  const optionalRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const technicalRef = useRef<HTMLElement>(null);
  // const weightsRef = useRef<HTMLDivElement>(null);

  /* ── drag scroll ──────────────────────────────────────────────────── */
  useEffect(() => {
    const fns: (() => void)[] = [];
    if (galleryRef.current) fns.push(initDragScroll(galleryRef.current));
    // if (weightsRef.current) fns.push(initDragScroll(weightsRef.current));
    return () => fns.forEach(f => f());
  }, []);

  /* ── active tab from scroll ───────────────────────────────────────── */
  useEffect(() => {
    const onScroll = () => {
      const navH = 72;
      const tabH = tabBarRef.current?.offsetHeight ?? 60;
      const triggerLimit = navH + tabH + 20; // 20px buffer
      const optTop = optionalRef.current?.getBoundingClientRect().top ?? Infinity;
      const spcTop = specsRef.current?.getBoundingClientRect().top ?? Infinity;
      if (optTop <= triggerLimit) setActiveTab('optional');
      else if (spcTop <= triggerLimit) setActiveTab('specs');
      else setActiveTab('visual');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* ── gallery dots ─────────────────────────────────────────────────── */
  useEffect(() => {
    const el = galleryRef.current; if (!el) return;
    const fn = () => {
      const max = el.scrollWidth - el.clientWidth; if (!max) return;
      setGalleryDot(Math.round((el.scrollLeft / max) * (GALLERY_ANGLES.length - 1)));
    };
    el.addEventListener('scroll', fn, { passive: true });
    return () => el.removeEventListener('scroll', fn);
  }, []);

  useEffect(() => {
    const el = technicalRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsTechnicalVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.18 });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  /* ── weight dots ──────────────────────────────────────────────────── */
  /*
  useEffect(() => {
    const el = weightsRef.current; if (!el) return;
    const fn = () => {
      const max = el.scrollWidth - el.clientWidth; if (!max) return;
      setWeightDot(Math.round((el.scrollLeft / max) * (WEIGHTS.length - 1)));
    };
    el.addEventListener('scroll', fn, { passive: true });
    return () => el.removeEventListener('scroll', fn);
  }, []);
  */

  /* ── helpers ──────────────────────────────────────────────────────── */
  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    const navH = 72;
    const tabH = tabBarRef.current?.offsetHeight ?? 60;
    window.scrollTo({ top: (ref.current?.offsetTop ?? 0) - navH - tabH, behavior: 'smooth' });
  };
  const scrollC = (ref: React.RefObject<HTMLDivElement | null>, dir: -1 | 1) => {
    if (!ref.current) return;
    ref.current.scrollBy({ left: dir * ref.current.clientWidth / (window.innerWidth >= 900 ? 4 : 2), behavior: 'smooth' });
  };
  const jumpDot = (ref: React.RefObject<HTMLDivElement | null>, idx: number) => {
    if (!ref.current) return;
    const card = ref.current.children[idx] as HTMLElement;
    if (!card) return;
    const pl = parseFloat(getComputedStyle(ref.current).paddingLeft) || 0;
    ref.current.scrollTo({ left: card.offsetLeft - pl, behavior: 'smooth' });
  };

  const tabItems = [
    { key: 'visual' as Tab, lk: 'governor.tabVisual', ref: visualRef },
    { key: 'specs' as Tab, lk: 'governor.tabSpecs', ref: specsRef },
    { key: 'optional' as Tab, lk: 'governor.tabOptional', ref: optionalRef },
  ];

  /* ── render ───────────────────────────────────────────────────────── */
  return (
    <>
      {/* ── scoped styles (prefixed .pdp- to avoid global bleed) ───── */}
      <style>{`
        /* Page wrapper — isolated from body navy */
        .pdp-page { background:#fff; color:#1a1a1a; font-family:'Inter',system-ui,-apple-system,sans-serif; }

        /* Only scope resets to elements INSIDE .pdp-scope, NOT to Footer/floats */
        .pdp-scope *, .pdp-scope *::before, .pdp-scope *::after { box-sizing:border-box; }

        /* Drag strip */
        .pdp-strip {
          display:flex; overflow-x:scroll; scroll-snap-type:x mandatory;
          scrollbar-width:none; gap:16px; padding:32px 5%;
        }
        .pdp-strip::-webkit-scrollbar { display:none; }
        .pdp-strip > * { scroll-snap-align:start; }

        /* Gallery card widths & container height */
        .pdp-gcard { flex: 0 0 calc(25% - 5px); }
        .pdp-gallery-img-container { height: 320px; }
        @media(max-width:900px){ .pdp-gcard{flex:0 0 calc(50% - 8px);} }
        @media(max-width:480px){ 
          .pdp-gcard{flex:0 0 calc(33.33% - 11px) !important;} 
          .pdp-gallery-img-container { height: 120px !important; }
          .pdp-strip { padding: 16px 5% !important; }
        }

        /* Weight card */
        .pdp-wcard { flex:0 0 200px; min-width:180px; }

        /* Arrow button */
        .pdp-arr {
          position:absolute; top:50%; transform:translateY(-50%); z-index:10;
          width:42px; height:42px; border-radius:50%; background:#fff;
          border:1.5px solid #dde3ec; display:flex; align-items:center;
          justify-content:center; cursor:pointer; color:#555;
          transition:background .2s,border-color .2s,color .2s;
        }
        .pdp-arr:hover { background:${A}; border-color:${A}; color:#fff; }

        /* Pagination dot */
        .pdp-dot {
          width:8px; height:8px; border-radius:50%; background:#c8d8e8;
          border:none; cursor:pointer; flex-shrink:0;
          transition:background .25s,width .25s,border-radius .25s;
        }
        .pdp-dot--on { background:${A}; width:24px; border-radius:4px; }

        /* Tab */
        .pdp-tab {
          padding:16px 28px; font-size:14px; font-weight:600;
          background:none; border:none; border-bottom:3px solid transparent;
          cursor:pointer; white-space:nowrap; color:#666; font-family:inherit;
          transition:color .2s,border-color .2s;
        }
        .pdp-tab:hover:not(.pdp-tab--on){ color:#333; }
        .pdp-tab--on { color:${A}; border-bottom-color:${A}; }

        /* Technical properties section */
        .pdp-tech {
          background: #FFFFFF;
          padding: 100px 5%;
        }
        .pdp-tech__inner {
          max-width: 1280px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 58fr) minmax(0, 42fr);
          gap: 80px;
          align-items: start;
        }
        .pdp-tech-reveal {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.8s ease-out, transform 0.8s ease-out;
        }
        .pdp-tech-reveal--visible {
          opacity: 1;
          transform: translateY(0);
        }
        .pdp-tech__title {
          margin: 0 0 30px;
          color: #123F73;
          font-size: 52px;
          font-weight: 500;
          line-height: 1.1;
          letter-spacing: 0;
        }
        .pdp-tech__list {
          margin: 0;
          padding-left: 28px;
          color: #5F6775;
          font-size: 22px;
          line-height: 1.9;
        }
        .pdp-tech__list li {
          padding-left: 10px;
          margin-bottom: 24px;
        }
        .pdp-tech__list li::marker {
          color: #5F6775;
          font-size: 0.75em;
        }
        .pdp-tech__panel-title {
          margin: 4px 0 20px;
          color: #123F73;
          font-size: 28px;
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: 0;
        }
        .pdp-tech-table-wrap {
          overflow: hidden;
          border: 2px solid #123F73;
          border-radius: 8px;
          background: #FFFFFF;
        }
        .pdp-tech-table {
          width: 100%;
          border-collapse: collapse;
          table-layout: fixed;
          color: #5F6775;
          font-size: 20px;
          text-align: center;
        }
        .pdp-tech-table th {
          background: #123F73;
          color: #FFFFFF;
          font-weight: 600;
          padding: 18px;
          border-right: 2px solid #123F73;
          border-bottom: 2px solid #123F73;
        }
        .pdp-tech-table th:last-child,
        .pdp-tech-table td:last-child {
          border-right: none;
        }
        .pdp-tech-table td {
          padding: 18px;
          border-right: 2px solid #123F73;
          background: #FFFFFF;
          font-weight: 500;
        }
        .pdp-standards {
          margin-top: 46px;
        }
        .pdp-standards__list {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 16px 28px;
          margin: 0;
          padding: 0;
          list-style: none;
          color: #5F6775;
          font-size: 20px;
          line-height: 1.45;
        }
        .pdp-standards__list li {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .pdp-standards__check {
          color: #2F78C4;
          font-weight: 700;
          line-height: 1;
        }

        /* Badge */
        .pdp-badge {
          background: rgba(11, 61, 120, 0.07); color:${A}; font-size:11px; font-weight:700;
          padding:5px 13px; border-radius:20px; border:1px solid rgba(11, 61, 120, 0.18);
          letter-spacing:.03em; white-space:nowrap;
        }

        /* Rounded Table Card with Shadow */
        .pdp-table-card {
          background: #fff;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05), 0 2px 8px rgba(0, 0, 0, 0.02);
          border: 1px solid #e2e8f0;
          overflow: hidden;
        }

        /* Spec table */
        .pdp-tbl { width:100%; border-collapse:collapse; border:none; }
        .pdp-tbl th,.pdp-tbl td {
          padding:14px 18px; text-align:center; vertical-align:top;
          font-size:13.5px; line-height:1.6;
          border-right:1px solid #e5e7eb; border-bottom:1px solid #e5e7eb;
        }
        .pdp-tbl th:last-child, .pdp-tbl td:last-child { border-right:none; }
        .pdp-tbl tr:last-child td { border-bottom:none; }
        .pdp-tbl thead th { background:${A}; color:#fff; font-weight:700; font-size:14px; }
        .pdp-tbl thead th:first-child { background:#f0f4f8; color:#333; }
        .pdp-tbl tbody td:first-child { background:#f7f9fc; font-weight:700; text-align:left; color:#222; width:170px; }

        /* Optional table */
        .pdp-opt { width:100%; border-collapse:collapse; border:none; }
        .pdp-opt th,.pdp-opt td {
          padding:13px 16px; text-align:center; font-size:14px;
          border-right:1px solid #dde8f0; border-bottom:1px solid #dde8f0;
        }
        .pdp-opt th:last-child, .pdp-opt td:last-child { border-right:none; }
        .pdp-opt tr:last-child td { border-bottom:none; }
        .pdp-opt thead th { background:${A}; color:#fff; font-weight:700; }
        .pdp-opt thead th:first-child { text-align:left; }
        .pdp-opt tbody td:first-child { text-align:left; background:#f7f9fc; color:#333; font-size:13px; }
        .pdp-opt tbody tr:nth-child(even) td:first-child { background:#f0f5fa; }
        .pdp-opt tbody tr:nth-child(even) td { background:#f8fbfe; }

        /* Section title */
        .pdp-stitle { font-size:clamp(20px,2.8vw,28px); font-weight:800; text-align:center; color:#0e0e1a; line-height:1.2; }

        /* Fade-up animations */
        @keyframes pdp-fu { from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)} }
        .pdp-fu    { animation:pdp-fu .55s cubic-bezier(.16,1,.3,1) both; }
        .pdp-fu-d1 { animation-delay:.10s; }
        .pdp-fu-d2 { animation-delay:.20s; }
        .pdp-fu-d3 { animation-delay:.30s; }
        .pdp-fu-d4 { animation-delay:.42s; }

        /* Mobile responsiveness improvements */
        @media (max-width: 768px) {
          .pdp-decor-triangle { display: none !important; }
          .pdp-arr { display: none !important; }
          .pdp-tech {
            padding: 72px 5%;
          }
          .pdp-tech__inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          .pdp-tech__title {
            font-size: clamp(36px, 10vw, 52px);
          }
          .pdp-tech__list {
            font-size: 18px;
            line-height: 1.75;
          }
          .pdp-tech__list li {
            margin-bottom: 18px;
          }
          .pdp-tech-table,
          .pdp-standards__list {
            font-size: 17px;
          }
          .pdp-standards__list {
            grid-template-columns: 1fr;
          }
        }

        /* Contact button hover style */
        .pdp-contact-btn:hover {
          border-color: #0B3D78 !important;
          background: #0B3D78 !important;
          color: #fff !important;
          box-shadow: 0 6px 16px rgba(11,61,120,0.15) !important;
        }

        /* 360 Gallery Hover Zoom & Transparency */
        .pdp-gallery-item {
          background: none !important;
          border: none !important;
          box-shadow: none !important;
          overflow: visible !important;
        }
        .pdp-gallery-item:hover .pdp-gallery-img {
          transform: scale(1.1);
          filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.24));
        }
      `}</style>

      {/* Navbar with standard dynamic visibility (dark blue links over white bg) */}
      <Navbar />

      {/* Floating site widgets — rendered OUTSIDE .pdp-scope so Tailwind classes work */}
      <WhatsAppButton />
      <ScrollToTop />
      <FloatingToolbar />

      {/* Main page content */}
      <div className="pdp-page pdp-scope">

        {/* ══ S1 — Hero ════════════════════════════════════════════════ */}
        <section style={{ background: '#fff', padding: '108px 5% 0', overflow: 'hidden' }}>


          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48, flexWrap: 'wrap', paddingBottom: 56 }}>
            {/* Left */}
            <div style={{ flex: '1 1 340px', maxWidth: 560 }}>
              <h1 className="pdp-fu pdp-fu-d1"
                style={{ fontSize: 'clamp(28px,3.8vw,44px)', fontWeight: 800, lineHeight: 1.1, color: '#0e0e1a', margin: 0 }}>
                {t('governor.title1')}
              </h1>
              <p className="pdp-fu pdp-fu-d2"
                style={{ fontSize: 'clamp(20px,2.8vw,34px)', fontWeight: 700, lineHeight: 1.2, color: '#1a2a3a', margin: '6px 0 18px' }}>
                {t('governor.title2')}
              </p>
              <p className="pdp-fu pdp-fu-d3"
                style={{ fontSize: 17, color: '#9aa3b0', fontWeight: 400, margin: '0 0 34px' }}>
                {t('governor.subtitle')}
              </p>
              <div className="pdp-fu pdp-fu-d4" style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {(['governor.badge1', 'governor.badge2', 'governor.badge3', 'governor.badge4'] as const).map(k => (
                  <span key={k} className="pdp-badge">{t(k)}</span>
                ))}
              </div>
            </div>
            {/* Right */}
            <div className="pdp-fu pdp-fu-d2" style={{ flex: '0 1 460px', display: 'flex', justifyContent: 'center', alignItems: 'flex-end' }}>
              <img src="/images/Gemini_Generated_Image_j9zws1j9zws1j9zw-removebg-preview.png" alt={t('governor.title1')}
                style={{ width: '100%', maxWidth: 460, height: 'auto', objectFit: 'contain', display: 'block' }} />
            </div>
          </div>
        </section>

        {/* ══ S2 — Sticky Tabs ═════════════════════════════════════════ */}
        <div ref={tabBarRef}
          style={{ position: 'sticky', top: 72, zIndex: 200, background: '#fff', borderBottom: '1.5px solid #e5e7eb' }}>
          <div style={{ display: 'flex', padding: '0 5%', overflowX: 'auto', scrollbarWidth: 'none' }}>
            {tabItems.map(tab => (
              <button key={tab.key}
                className={`pdp-tab${activeTab === tab.key ? ' pdp-tab--on' : ''}`}
                id={`pdp-tab-${tab.key}`}
                onClick={() => { setActiveTab(tab.key); scrollTo(tab.ref); }}>
                {t(tab.lk)}
              </button>
            ))}
          </div>
        </div>

        {/* ══ S3 — Visual 360° Gallery ═════════════════════════════════ */}
        <section ref={visualRef} id="visual" style={{ padding: '60px 0 52px', background: '#fafbfd' }}>
          <div style={{ position: 'relative' }}>
            <button className="pdp-arr" style={{ left: 'max(6px,0.5%)' }} onClick={() => scrollC(galleryRef, -1)} aria-label="prev">
              <ChevronLeft size={18} />
            </button>

            <div ref={galleryRef} className="pdp-strip">
              {GALLERY_ANGLES.map((a, index) => {
                const label = t(a.key);
                return (
                  <div key={a.key} className="pdp-gcard pdp-gallery-item"
                    style={{ userSelect: 'none' }}>
                    <div className="pdp-gallery-img-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'visible' }}>
                      {a.img
                        ? <img
                          src={a.img}
                          alt={label}
                          className="pdp-gallery-img"
                          style={{
                            maxHeight: '100%',
                            maxWidth: '100%',
                            objectFit: 'contain',
                            pointerEvents: 'auto',
                            cursor: 'zoom-in',
                            transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), filter 0.4s ease'
                          }}
                          draggable={false}
                          onClick={() => setModalIndex(index)}
                        />
                        : <GovernorSVG size={120} />}
                    </div>
                  </div>
                );
              })}
            </div>

            <button className="pdp-arr" style={{ right: 'max(6px,0.5%)' }} onClick={() => scrollC(galleryRef, 1)} aria-label="next">
              <ChevronRight size={18} />
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 28 }}>
            {GALLERY_ANGLES.map((_, i) => (
              <button key={i} className={`pdp-dot${i === galleryDot ? ' pdp-dot--on' : ''}`} onClick={() => jumpDot(galleryRef, i)} aria-label={`img ${i + 1}`} />
            ))}
          </div>
        </section>

        {/* ══ S4 — Specs Description ═══════════════════════════════════ */}
        <section
          ref={technicalRef}
          className={`pdp-tech pdp-tech-reveal${isTechnicalVisible ? ' pdp-tech-reveal--visible' : ''}`}
        >
          <div className="pdp-tech__inner">
            <div>
              <h2 className="pdp-tech__title">⚙ Properties</h2>
              <ul className="pdp-tech__list">
                {TECH_PROPERTIES.map(item => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="pdp-tech__panel-title">Technical Specifications</h3>
              <div className="pdp-tech-table-wrap">
                <table className="pdp-tech-table">
                  <thead>
                    <tr>
                      <th>Diameter</th>
                      <th>Min–Max Nominal Speed</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Ø200 mm</td>
                      <td>0.50 – 1.60 m/s</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="pdp-standards">
                <h3 className="pdp-tech__panel-title">International Standards</h3>
                <ul className="pdp-standards__list">
                  {TECH_STANDARDS.map(item => (
                    <li key={item}>
                      <span className="pdp-standards__check" aria-hidden="true">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section ref={specsRef} id="specs"
          style={{ padding: '72px 5%', background: '#fff', position: 'relative', overflow: 'hidden' }}>
          {/* decorative triangles */}
          <div className="pdp-decor-triangle" style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: '64px', height: '180px', background: 'linear-gradient(to right, #0B3D78, #3b82f6)', clipPath: 'polygon(0 0, 100% 50%, 0 100%)', opacity: .75 }} />
          <div className="pdp-decor-triangle" style={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', width: '64px', height: '180px', background: 'linear-gradient(to left, #0B3D78, #3b82f6)', clipPath: 'polygon(100% 0, 0 50%, 100% 100%)', opacity: .75 }} />

          <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center', position: 'relative' }}>
            <p style={{ fontSize: 11, color: A, fontWeight: 700, letterSpacing: '.16em', textTransform: 'uppercase', marginBottom: 20 }}>
              {t('governor.specsBadge')}
            </p>
            <h2 style={{ fontSize: 'clamp(22px,3vw,32px)', fontWeight: 800, color: '#0e0e1a', lineHeight: 1.2, marginBottom: 10 }}>
              {t('governor.specsTitle')}
            </h2>
            <p style={{ fontSize: 'clamp(15px,2vw,20px)', fontWeight: 600, color: '#334455', marginBottom: 36 }}>
              {t('governor.specsTitle2')}
            </p>
            <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.8, marginBottom: 18 }}>{t('governor.specsDesc1')}</p>
            <p style={{ fontSize: 15, color: '#6b7280', lineHeight: 1.8 }}>{t('governor.specsDesc2')}</p>
          </div>
        </section>

        {/* ══ S5 — Specs Table ═════════════════════════════════════════ */}
        <section style={{ padding: '0 0 64px', background: '#fff' }}>
          <div style={{ overflowX: 'auto', padding: '12px 5% 28px' }}>
            <div className="pdp-table-card" style={{ minWidth: 700 }}>
              <table className="pdp-tbl">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }} />
                    {COLS.map(c => <th key={c}>{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {SPEC_ROWS.map(row => (
                    <tr key={row.lk}>
                      <td>{t(row.lk)}</td>
                      {row.vk.map((vk, i) => <td key={i} style={{ whiteSpace: 'pre-line', color: '#444' }}>{t(vk)}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ══ S6 — Optional Features ═══════════════════════════════════ */}
        <section ref={optionalRef} id="optional"
          style={{ padding: '64px 5% 72px', background: '#fff' }}>
          <p className="pdp-stitle" style={{ marginBottom: 8 }}>{t('governor.optTitle')}</p>
          <p style={{ textAlign: 'center', color: '#9aa3b0', fontSize: 14, marginBottom: 40 }}>{t('governor.optSubtitle')}</p>
          <div style={{ overflowX: 'auto', padding: '12px 4px 28px' }}>
            <div className="pdp-table-card" style={{ minWidth: 560 }}>
              <table className="pdp-opt">
                <thead>
                  <tr>
                    <th style={{ minWidth: 180 }}>{t('governor.optHeader')}</th>
                    {COLS.map(c => <th key={c}>{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {OPT_ROWS.map(row => (
                    <tr key={row.lk}>
                      <td>{t(row.lk)}</td>
                      {row.v.map((v, i) => (
                        <td key={i}>
                          {v ? <span style={{ color: '#16a34a', fontWeight: 800, fontSize: 19 }}>✓</span>
                            : <span style={{ color: '#dc2626', fontWeight: 800, fontSize: 17 }}>✗</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ══ S7 — Tension Weights ═════════════════════════════════════ 
         <section style={{ padding: '64px 0 80px', background: 'linear-gradient(180deg,#EBF7FD 0%,#ECF0F5 100%)' }}>
          <p className="pdp-stitle" style={{ marginBottom: 8, padding: '0 5%' }}>{t('governor.weightsTitle')}</p>
          <p style={{ textAlign: 'center', color: '#9aa3b0', fontSize: 14, marginBottom: 44 }}>{t('governor.weightsSubtitle')}</p>

          <div style={{ position: 'relative' }}>
            <button className="pdp-arr" style={{ left: 'max(6px,0.5%)' }} onClick={() => scrollC(weightsRef, -1)} aria-label="prev">
              <ChevronLeft size={18} />
            </button>

            <div ref={weightsRef} className="pdp-strip">
              {WEIGHTS.map(w => (
                <div key={w.nk} className="pdp-wcard"
                  style={{ background: '#fff', borderRadius: 16, padding: '20px 16px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, userSelect: 'none' }}>
                  <div style={{ width: '100%', aspectRatio: '1', borderRadius: 12, background: `linear-gradient(135deg,${w.bg},#c8dff0)`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                    <WeightSVG />
                    <span style={{ fontSize: 9, color: A, fontWeight: 700, letterSpacing: '.07em', textTransform: 'uppercase' }}>
                      {t('governor.weightLabel')}
                    </span>
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: '#111', textAlign: 'center', lineHeight: 1.3, margin: 0 }}>{t(w.nk)}</p>
                  <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {w.c.map(ci => (
                      <div key={ci.m} style={{ background: '#f0f7fb', borderRadius: 8, padding: '8px 10px' }}>
                        <p style={{ fontSize: 10, color: '#888', marginBottom: 3, fontWeight: 500 }}>{ci.m}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <span style={{ color: A, fontSize: 12, fontWeight: 800 }}>{ci.d}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, color: '#1a2a3a' }}>{ci.w}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button className="pdp-arr" style={{ right: 'max(6px,0.5%)' }} onClick={() => scrollC(weightsRef, 1)} aria-label="next">
              <ChevronRight size={18} />
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 32 }}>
            {WEIGHTS.map((_, i) => (
              <button key={i} className={`pdp-dot${i === weightDot ? ' pdp-dot--on' : ''}`} onClick={() => jumpDot(weightsRef, i)} aria-label={`w ${i + 1}`} />
            ))}
          </div>
        </section>*/}


        {/* ══ S8 — More Information ═══════════════════════════════════ */}
      

        {/* ══ S9 — Order Form ═══════════════════════════════════════════ */}
        <section style={{
          background: '#fff',
          padding: '52px 5% 48px',
          textAlign: 'center',
          borderTop: '1px solid #dde3ec',
        }}>
          <style>{`
            @keyframes order-fade-up {
              from { opacity: 0; transform: translateY(24px); }
              to   { opacity: 1; transform: translateY(0); }
            }
            .order-anim {
              animation: order-fade-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
            }
            .order-anim-d1 { animation-delay: 0.05s; }
            .order-anim-d2 { animation-delay: 0.18s; }
            .order-pdf-link {
              font-size: 15px;
              color: #374151;
              text-decoration: underline;
              text-underline-offset: 3px;
              text-decoration-color: #9ca3af;
              cursor: pointer;
              transition: color 0.2s ease, text-decoration-color 0.2s ease;
              font-family: 'Inter', system-ui, sans-serif;
              font-weight: 400;
              line-height: 1;
            }
            .order-pdf-link:hover {
              color: #0B3D78;
              text-decoration-color: #0B3D78;
            }
          `}</style>

          {/* Title */}
          <div className="order-anim order-anim-d1">
            <h2 style={{
              fontSize: 'clamp(20px, 2.2vw, 28px)',
              fontWeight: 400,
              color: '#111827',
              lineHeight: 1.3,
              marginBottom: 28,
              fontFamily: "'Georgia', 'Times New Roman', serif",
              letterSpacing: '0.01em',
            }}>
              FAS LIFT Overspeed Governor Order Form
            </h2>
          </div>

          {/* PDF Icon + Filename link — identical layout to reference image */}
          <div className="order-anim order-anim-d2"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>

            {/* Small outlined PDF document icon — matches reference */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#374151"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ flexShrink: 0, marginTop: 1 }}
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="8" y1="13" x2="16" y2="13" />
              <line x1="8" y1="17" x2="12" y2="17" />
            </svg>

            {/* Clickable filename — opens the HTML order form in a new tab */}
            <a
              href="/documents/FAS_LIFT_Overspeed_Governor_Order_Form.html"
              target="_blank"
              rel="noopener noreferrer"
              className="order-pdf-link"
            >
              Overspeed_Governor_Order_Form.pdf
            </a>
          </div>
        </section>

        {/* Bottom thin divider */}
        <div style={{ borderTop: '1px solid #dde3ec' }} />

        {/* ══ Footer ═══════════════════════════════════════════════════ */}
        {/* Rendered outside pdp-scope so its Tailwind classes are not overridden */}
      </div>{/* end pdp-scope */}

      {/* Footer outside the scoped div so Tailwind utility classes work normally */}
      <Footer />

      <Lightbox
        src={modalIndex !== null ? GALLERY_ANGLES[modalIndex].img : ''}
        alt="Product Visual 360"
        isOpen={modalIndex !== null}
        onClose={() => setModalIndex(null)}
        background="rgba(11, 61, 120, 0.95)"
        onPrev={modalIndex !== null ? () => setModalIndex(prev => prev !== null ? (prev - 1 + GALLERY_ANGLES.length) % GALLERY_ANGLES.length : null) : undefined}
        onNext={modalIndex !== null ? () => setModalIndex(next => next !== null ? (next + 1) % GALLERY_ANGLES.length : null) : undefined}
      />
    </>
  );
}
