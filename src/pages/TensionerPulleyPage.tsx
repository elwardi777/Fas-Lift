import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import ScrollToTop from '../components/ScrollToTop';
import FloatingToolbar from '../components/FloatingToolbar';
import Lightbox from '../components/Lightbox';

/* ═══════════════════════════════════════════════════════════════════════════
   ProductShowcase Component
   ═══════════════════════════════════════════════════════════════════════════ */
const ProductShowcase = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState('50% 50%');

  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev === 0 ? 1 : 0));
    }, 4000); // Toggle between images every 4 seconds

    return () => clearInterval(interval);
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (window.innerWidth <= 768) return; // Disable hover-tracking zoom on mobile
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  };

  return (
    <div
      className="pdp-showcase-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setZoomOrigin('50% 50%');
      }}
    >
      {/* Soft radial light */}
      <div className="pdp-showcase-glow" />

      {/* Elegant shadow */}
      <div className="pdp-showcase-shadow" />

      {/* Slide 1: Real Product Photo */}
      <div
        className="pdp-showcase-slide"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: activeIndex === 0 ? 1 : 0,
          pointerEvents: activeIndex === 0 ? 'auto' : 'none',
          transition: 'opacity 900ms cubic-bezier(0.22, 1, 0.36, 1)',
          zIndex: activeIndex === 0 ? 3 : 2
        }}
      >
        <img
          src="/images/tensioner_pulley_real.png"
          alt={t('tensionerPulley.heroImageAlt', 'Tensioner Pulley industrial elevator component')}
          className="pdp-showcase-img"
        />
        <div className="pdp-metallic-sweep" />
      </div>

      {/* Slide 2: Technical Drawing Blueprint */}
      <div
        className="pdp-showcase-slide"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: activeIndex === 1 ? 1 : 0,
          pointerEvents: activeIndex === 1 ? 'auto' : 'none',
          transition: 'opacity 900ms cubic-bezier(0.22, 1, 0.36, 1)',
          zIndex: activeIndex === 1 ? 3 : 2
        }}
      >
        <img
          src="/images/tensioner_pulley_blueprint.png"
          alt={t('tensionerPulley.blueprintImageAlt', 'Tensioner Pulley Technical Drawing')}
          className="pdp-showcase-img pdp-showcase-blueprint"
          style={{
            transformOrigin: zoomOrigin,
            transition: 'transform 350ms ease-out, filter 350ms ease-out'
          }}
          onMouseMove={handleMouseMove}
        />
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════════
   InteractiveZoomImage Component
   ═══════════════════════════════════════════════════════════════════════════ */
const InteractiveZoomImage = ({
  src,
  alt,
  className = '',
  scale = 1.35,
}: {
  src: string;
  alt: string;
  className?: string;
  scale?: number;
}) => {
  const [zoomOrigin, setZoomOrigin] = useState('50% 50%');
  const [isZoomed, setIsZoomed] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLImageElement>) => {
    if (window.innerWidth <= 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomOrigin(`${x}% ${y}%`);
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`${className} cursor-zoom-in`}
      style={{
        transformOrigin: zoomOrigin,
        transform: isZoomed ? `scale(${scale})` : 'scale(1)',
        transition: 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1), filter 350ms ease-out',
        willChange: 'transform, transform-origin',
      }}
      onMouseEnter={() => setIsZoomed(true)}
      onMouseLeave={() => {
        setIsZoomed(false);
        setZoomOrigin('50% 50%');
      }}
      onMouseMove={handleMouseMove}
    />
  );
};

export default function TensionerPulleyPage() {
  const { t } = useTranslation();
  const [modalIndex, setModalIndex] = useState<number | null>(null);

  // Exact dimensions from PDF source of truth
  const VERIFIED_DIMENSIONS = [
    { label: t('tensionerPulley.overallLength', 'Overall Length'), value: '546.00 mm' },
    { label: t('tensionerPulley.refHeight', 'Reference Height'), value: '192.00 mm' },
    { label: t('tensionerPulley.overallHeight', 'Overall Height'), value: '355.30 mm' },
    { label: t('tensionerPulley.secRefHeight', 'Secondary Reference Height'), value: '291.97 mm' },
    { label: t('tensionerPulley.width', 'Width'), value: '76.00 mm' },
  ];

  const GALLERY_IMAGES = [
    {
      title: t('tensionerPulley.realProductView', 'Real Product View'),
      subtitle: t('tensionerPulley.realProductSub', 'Complete assembly with tensioning wheel, spring mechanism & safety switch'),
      src: '/images/tensioner_pulley_real.png',
      bg: '#F8FAFC',
    },
    {
      title: t('tensionerPulley.techBlueprint', 'Technical Blueprint'),
      subtitle: t('tensionerPulley.techBlueprintSub', 'Official engineering drawing with multi-angle projections'),
      src: '/images/tensioner_pulley_blueprint.png',
      bg: '#F1F5F9',
    },
  ];

  return (
    <>
      <style>{`
        .tp-page {
          background: #ffffff;
          color: #0f172a;
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
        }

        .tp-badge-industrial {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 6px 14px;
          border-radius: 20px;
          background: #EAF2FB;
          color: #0B3D78;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          border: 1px solid rgba(11, 61, 120, 0.15);
        }

        .tp-card {
          background: #ffffff;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
          transition: border-color 0.2s, box-shadow 0.2s;
        }

        .tp-card:hover {
          border-color: #CBD5E1;
          box-shadow: 0 10px 30px rgba(11, 61, 120, 0.06);
        }

        .tp-table {
          width: 100%;
          border-collapse: collapse;
        }

        .tp-table th {
          background: #0B3D78;
          color: #ffffff;
          font-size: 13px;
          font-weight: 700;
          text-align: left;
          padding: 12px 18px;
          letter-spacing: 0.02em;
        }

        .tp-table td {
          padding: 14px 18px;
          font-size: 14px;
          border-bottom: 1px solid #E2E8F0;
          color: #334155;
        }

        .tp-table tr:last-child td {
          border-bottom: none;
        }

        .tp-table td.val {
          font-weight: 700;
          color: #0B3D78;
          font-family: 'JetBrains Mono', monospace, monospace;
        }

        .tp-tech-spec-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .tp-spec-pill {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .tp-spec-pill .lbl {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #64748B;
          font-weight: 600;
        }

        .tp-spec-pill .val {
          font-size: 18px;
          font-weight: 800;
          color: #0B3D78;
          font-family: 'JetBrains Mono', monospace, monospace;
        }

        .tp-drawing-img {
          width: 100%;
          height: auto;
          max-height: 480px;
          object-fit: contain;
          border-radius: 12px;
          background: #FFFFFF;
        }

        /* Badge */
        .pdp-badge {
          background: #FFFFFF;
          color: #0B3D78;
          font-size: 13px;
          font-weight: 600;
          padding: 8px 18px;
          border-radius: 30px;
          border: 1px solid rgba(11, 61, 120, 0.2);
          box-shadow: 0 4px 10px rgba(11, 61, 120, 0.05);
          letter-spacing: 0.02em;
          white-space: nowrap;
          transition: all 0.3s ease;
          cursor: default;
        }
        .pdp-badge:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 15px rgba(11, 61, 120, 0.12);
          border-color: rgba(11, 61, 120, 0.4);
        }

        /* Fade-up animations */
        @keyframes pdp-fu { from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)} }
        .pdp-fu    { animation:pdp-fu .55s cubic-bezier(.16,1,.3,1) both; }
        .pdp-fu-d1 { animation-delay:.10s; }
        .pdp-fu-d2 { animation-delay:.20s; }
        .pdp-fu-d3 { animation-delay:.30s; }
        .pdp-fu-d4 { animation-delay:.42s; }

        .pdp-showcase-container {
          width: 100%;
          max-width: 600px;
          height: 480px;
          background: transparent;
          position: relative;
          overflow: hidden;
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          animation: pdp-float 6s ease-in-out infinite;
        }

        @keyframes pdp-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }

        .pdp-showcase-glow {
          position: absolute;
          width: 440px;
          height: 440px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(11, 61, 120, 0.08) 0%, rgba(255, 255, 255, 0) 70%);
          z-index: 1;
          pointer-events: none;
        }

        .pdp-showcase-shadow {
          position: absolute;
          bottom: 30px;
          width: 360px;
          height: 16px;
          background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.08) 0%, rgba(0, 0, 0, 0) 70%);
          z-index: 1;
          pointer-events: none;
        }

        .pdp-showcase-slide {
          width: 100%;
          height: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }

        .pdp-showcase-img {
          width: 100%;
          max-width: 540px;
          height: auto;
          max-height: 440px;
          object-fit: contain;
          transition: transform 350ms ease-out, filter 350ms ease-out, box-shadow 350ms ease-out;
          will-change: transform, transform-origin;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          filter: drop-shadow(0 10px 24px rgba(11, 61, 120, 0.12));
          image-rendering: auto;
        }

        .pdp-showcase-blueprint {
          cursor: zoom-in;
          transition: transform 350ms ease-out, filter 350ms ease-out, box-shadow 350ms ease-out;
        }
        
        @media(min-width: 769px) {
          .pdp-showcase-blueprint:hover {
            transform: scale(1.25);
            filter: drop-shadow(0 10px 25px rgba(11, 61, 120, 0.15));
          }
        }

        .pdp-metallic-sweep {
          position: absolute;
          top: 0; left: -150%; width: 100%; height: 100%;
          background: linear-gradient(
            90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0) 30%, 
            rgba(255, 255, 255, 0.45) 50%, 
            rgba(255, 255, 255, 0) 70%, 
            transparent 100%
          );
          transform: skewX(-25deg);
          pointer-events: none;
          animation: pdp-shimmer 8s infinite linear;
          z-index: 3;
        }

        @keyframes pdp-shimmer {
          0% { left: -150%; }
          12% { left: 150%; }
          100% { left: 150%; }
        }

        @media (max-width: 768px) {
          .pdp-showcase-container {
            max-width: 100%;
            height: 340px;
            margin: 0 auto;
          }
          .pdp-showcase-img {
            max-width: 320px;
            max-height: 320px;
          }
        }
        @media (max-width: 480px) {
          .pdp-showcase-container {
            height: 280px;
          }
          .pdp-showcase-img {
            max-width: 260px;
            max-height: 260px;
          }
        }
      `}</style>

      <div className="tp-page">
        <Navbar />

        {/* ═════════════════════════════════════════════════════════════
           1. HERO SECTION
           ═════════════════════════════════════════════════════════════ */}
        <section style={{ background: '#fff', padding: '108px 5% 0', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48, flexWrap: 'wrap', paddingBottom: 56 }}>
            {/* Left */}
            <div
              style={{
                flex: '1 1 340px',
                maxWidth: 620,
                position: 'relative',
                zIndex: 1,
                padding: '30px 0',
              }}
            >
              {/* Subtle geometric pattern background */}
              <div
                style={{
                  position: 'absolute',
                  top: '-10px', left: '-20px', right: '-40px', bottom: '-10px',
                  backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)',
                  backgroundSize: '24px 24px',
                  opacity: 0.35,
                  zIndex: -1,
                  borderRadius: '24px'
                }}
              />

              {/* Premium Badge Above Title */}
              <div className="pdp-fu" style={{ marginBottom: '24px', paddingLeft: 'clamp(16px, 3vw, 32px)' }}>
                <span style={{
                  background: '#E8F2FC',
                  color: '#0B3D78',
                  padding: '6px 14px',
                  borderRadius: '30px',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  border: '1px solid rgba(11,61,120,0.12)',
                  display: 'inline-block'
                }}>
                  {t('governor.industrialSensor', 'SAFETY SENSOR')}
                </span>
              </div>

              {/* Title Container with Left Accent Line */}
              <div style={{ borderLeft: '3px solid #0B3D78', paddingLeft: 'clamp(16px, 3vw, 32px)', marginBottom: '32px' }}>
                <h1 className="pdp-fu pdp-fu-d1"
                  style={{
                    fontSize: 'clamp(28px, 5.5vw, 68px)',
                    fontWeight: 800,
                    lineHeight: 1.05,
                    color: '#090d16',
                    margin: '0 0 16px 0',
                    letterSpacing: '-0.025em',
                    wordBreak: 'break-word'
                  }}>
                  {t('tensionerPulley.title1', 'Tensioner Pulley')}
                </h1>

                <h2 className="pdp-fu pdp-fu-d2"
                  style={{
                    fontSize: 'clamp(18px, 2.5vw, 28px)',
                    fontWeight: 600,
                    lineHeight: 1.3,
                    color: '#0F172A',
                    margin: '0 0 12px 0',
                    letterSpacing: '-0.01em'
                  }}>
                  FS-TP01 • Elevator Tensioning
                </h2>

                <h2 className="pdp-fu pdp-fu-d2"
                  style={{
                    fontSize: 'clamp(18px, 2.5vw, 28px)',
                    fontWeight: 600,
                    lineHeight: 1.3,
                    color: '#0F172A',
                    margin: 0,
                    letterSpacing: '-0.01em'
                  }}>
                  <span style={{ position: 'relative', display: 'inline-block', paddingBottom: '4px' }}>
                    {t('orderForm.bidirectional', 'Bidirectional')} & {t('governor.monodirectional', 'Monodirectional')}
                    <span style={{
                      position: 'absolute',
                      bottom: '0px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'linear-gradient(90deg, #0B3D78 0%, #60A5FA 100%)',
                      borderRadius: '1px'
                    }} />
                  </span>
                </h2>
              </div>

              {/* Subtitle */}
              <p className="pdp-fu pdp-fu-d3"
                style={{
                  fontSize: '18px',
                  color: '#4B5563',
                  fontWeight: 400,
                  lineHeight: 1.6,
                  margin: '0 0 28px 0',
                  paddingLeft: 'clamp(16px, 3vw, 32px)',
                  maxWidth: '480px'
                }}>
                {t('tensionerPulley.subtitle', 'Precision rope tensioning for ultimate elevator safety.')}
              </p>

              {/* Horizontal Divider */}
              <div className="pdp-fu pdp-fu-d3" style={{ height: '1px', background: '#E2E8F0', margin: '0 0 32px clamp(16px, 3vw, 32px)', width: '75%' }} />

              {/* Certification Badges */}
              <div className="pdp-fu pdp-fu-d4" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', paddingLeft: 'clamp(16px, 3vw, 32px)' }}>
                {(['tensionerPulley.badge1', 'tensionerPulley.badge2', 'tensionerPulley.badge3', 'tensionerPulley.badge4'] as const).map(k => (
                  <span key={k} className="pdp-badge">{t(k)}</span>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="pdp-fu pdp-fu-d2" style={{ flex: '0 1 600px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <ProductShowcase />
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
           3 & 4. TECHNICAL DRAWING & DIMENSIONS VISUALIZATION
           ═════════════════════════════════════════════════════════════ */}
        <section id="technical-drawing" className="py-16 md:py-24 bg-[#F8FAFC] border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-14">
              <span className="tp-badge-industrial mb-3 inline-block">
                {t('tensionerPulley.engineeringSpecification', 'Engineering Specification')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-3">
                {t('tensionerPulley.drawingTitle', 'Technical Drawing & Dimensions')}
              </h2>
              <p className="text-sm md:text-base text-[#64748B]">
                {t('tensionerPulley.drawingSubtitle', 'Verified engineering projections and mechanical dimension reference data.')}
              </p>
            </div>

            {/* Desktop: Side-by-side | Mobile: Stacked */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* Technical Drawing Column */}
              <div className="lg:col-span-7 tp-card p-6 bg-white">
                <h3 className="text-base font-bold text-[#0F172A] mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#0B3D78]" />
                  {t('tensionerPulley.engineeringDrawing', 'Engineering Drawing')}
                </h3>
                <div
                  className="cursor-pointer overflow-hidden rounded-lg border border-gray-100 flex justify-center bg-white p-2"
                  onClick={() => setModalIndex(1)}
                >
                  <InteractiveZoomImage
                    src="/images/tensioner_pulley_blueprint.png"
                    alt={t('tensionerPulley.blueprintImageAlt', 'Tensioner Pulley Technical Drawing')}
                    className="tp-drawing-img"
                    scale={1.45}
                  />
                </div>
                <p
                  className="text-xs text-center text-gray-500 hover:text-[#0B3D78] cursor-pointer mt-3 transition-colors flex items-center justify-center gap-1.5 font-medium"
                  onClick={() => setModalIndex(1)}
                >
                  <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                  {t('tensionerPulley.clickToExpand', 'Click drawing to expand full resolution blueprint view')}
                </p>
              </div>

              {/* Dimensions Table Column */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="tp-card overflow-hidden">
                  <div className="bg-[#0B3D78] px-6 py-4 text-white">
                    <h3 className="text-base font-bold">{t('tensionerPulley.verifiedDimensions', 'Verified Dimensions')}</h3>
                    <p className="text-xs text-white/80 mt-0.5">{t('tensionerPulley.techAssemblyDimensions', 'Technical Assembly Dimensions')}</p>
                  </div>
                  <table className="tp-table">
                    <tbody>
                      {VERIFIED_DIMENSIONS.map((dim, idx) => (
                        <tr key={idx}>
                          <td className="font-medium text-gray-700">{dim.label}</td>
                          <td className="val text-right">{dim.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Packaging Card */}
                <div className="tp-card p-6 bg-white border-l-4 border-l-[#0B3D78]">
                  <h4 className="text-xs uppercase tracking-wider font-bold text-[#64748B] mb-1">
                    {t('tensionerPulley.packagingDimensions', 'Packaging Dimensions')}
                  </h4>
                  <p className="text-2xl font-black text-[#0B3D78] font-mono">
                    560 × 110 × 280 mm
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
           5. PRODUCT VIEWS / GALLERY
           ═════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-extrabold text-[#0F172A] mb-3">
                {t('tensionerPulley.productViewsTitle', 'Product Views & Projections')}
              </h2>
              <p className="text-sm text-gray-600">
                {t('tensionerPulley.productViewsSubtitle', 'Explore actual product photography and technical drawing projections.')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {GALLERY_IMAGES.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => setModalIndex(idx)}
                  className="tp-card p-6 cursor-pointer group flex flex-col justify-between overflow-hidden"
                  style={{ background: item.bg }}
                >
                  <div className="h-[280px] flex items-center justify-center mb-4 overflow-hidden rounded-lg">
                    <InteractiveZoomImage
                      src={item.src}
                      alt={item.title}
                      className="max-h-full max-w-full object-contain"
                      scale={1.35}
                    />
                  </div>
                  <div className="border-t border-gray-200/80 pt-4">
                    <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0B3D78] transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
           6 & 8. PACKAGING & TECHNICAL INFORMATION SUMMARY
           ═════════════════════════════════════════════════════════════ */}
        <section className="py-16 bg-[#F8FAFC] border-b border-gray-200">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="tp-card p-8 md:p-10 bg-white">
              <div className="border-b border-gray-200 pb-6 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0B3D78]">
                  {t('tensionerPulley.genTechSpecs', 'General Technical Specifications')}
                </span>
                <h2 className="text-2xl font-extrabold text-[#0F172A] mt-1">
                  {t('tensionerPulley.techInfo', 'Technical Information')}
                </h2>
              </div>

              <div className="tp-tech-spec-grid mb-8">
                <div className="tp-spec-pill">
                  <span className="lbl">{t('tensionerPulley.modelCode', 'Model Code')}</span>
                  <span className="val text-base">FS-TP01</span>
                </div>
                <div className="tp-spec-pill">
                  <span className="lbl">{t('tensionerPulley.overallLength', 'Overall Length')}</span>
                  <span className="val">546.00 mm</span>
                </div>
                <div className="tp-spec-pill">
                  <span className="lbl">{t('tensionerPulley.width', 'Width')}</span>
                  <span className="val">76.00 mm</span>
                </div>
                <div className="tp-spec-pill">
                  <span className="lbl">{t('tensionerPulley.overallHeight', 'Overall Height')}</span>
                  <span className="val">355.30 mm</span>
                </div>
              </div>

              <div className="bg-[#F1F5F9] rounded-xl p-6 border border-gray-200">
                <h3 className="text-xs uppercase tracking-wider font-bold text-[#475569] mb-3">
                  {t('tensionerPulley.techDimSummary', 'Technical Dimension Summary:')}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 text-center font-mono text-sm font-bold text-[#0B3D78]">
                  <div className="bg-white py-2.5 px-3 rounded-lg border border-gray-200">546.00 mm</div>
                  <div className="bg-white py-2.5 px-3 rounded-lg border border-gray-200">291.97 mm</div>
                  <div className="bg-white py-2.5 px-3 rounded-lg border border-gray-200">192.00 mm</div>
                  <div className="bg-white py-2.5 px-3 rounded-lg border border-gray-200">355.30 mm</div>
                  <div className="bg-white py-2.5 px-3 rounded-lg border border-gray-200">76.00 mm</div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-300/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{t('tensionerPulley.packagingDimensions', 'Packaging Dimensions')}:</span>
                  <span className="text-base font-extrabold text-[#0B3D78] font-mono">560 × 110 × 280 mm</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═════════════════════════════════════════════════════════════
           8. ORDER FORM
           ═════════════════════════════════════════════════════════════ */}
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
            .order-download-button {
              display: inline-flex;
              align-items: center;
              justify-content: center;
              margin-top: 18px;
              min-height: 42px;
              padding: 0 20px;
              border-radius: 8px;
              background: #0B3D78;
              color: #fff;
              font-size: 13px;
              font-weight: 700;
              letter-spacing: 0.02em;
              text-decoration: none;
              transition: background 0.2s ease, transform 0.2s ease;
            }
            .order-download-button:hover {
              background: #145DA0;
              transform: translateY(-1px);
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
              {t('governor.orderFormTitle', 'FAS LIFT Speed Governor Order Form')}
            </h2>
          </div>

          {/* PDF Icon + Filename link */}
          <div className="order-anim order-anim-d2"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>

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

            <a
              href="/documents/FAS_LIFT_Overspeed_Governor_Order_Form.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="order-pdf-link"
              title={t('governor.orderFormTooltip', 'Open the speed governor order form PDF')}
              aria-label={t('governor.orderFormDownload', 'Download the FAS LIFT speed governor order form')}
            >
              {t('governor.orderFormFileLabel', 'Speed_Governor_Order_Form.pdf')}
            </a>
          </div>
          <div className="order-anim order-anim-d2">
            <a
              href="/documents/FAS_LIFT_Overspeed_Governor_Order_Form.pdf"
              download
              className="order-download-button"
              title={t('governor.orderFormTooltip', 'Open the speed governor order form PDF')}
              aria-label={t('governor.orderFormDownload', 'Download the FAS LIFT speed governor order form')}
            >
              {t('governor.orderFormButton', 'Download Order Form')}
            </a>
          </div>
        </section>

        {/* Modal Lightbox */}
        <Lightbox
          src={modalIndex !== null ? GALLERY_IMAGES[modalIndex].src : ''}
          alt={modalIndex !== null ? GALLERY_IMAGES[modalIndex].title : ''}
          isOpen={modalIndex !== null}
          onClose={() => setModalIndex(null)}
          background="rgba(11, 61, 120, 0.95)"
          onPrev={modalIndex !== null ? () => setModalIndex(prev => prev !== null ? (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length : null) : undefined}
          onNext={modalIndex !== null ? () => setModalIndex(next => next !== null ? (next + 1) % GALLERY_IMAGES.length : null) : undefined}
        />

        <FloatingToolbar />
        <WhatsAppButton />
        <ScrollToTop />
        <Footer />
      </div>
    </>
  );
}
